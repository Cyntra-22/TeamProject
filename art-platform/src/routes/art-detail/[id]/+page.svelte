<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { showToast } from '$lib/toast';
    import { get } from 'svelte/store';

	export let data; // This receives data from +page.ts

	let postId: string;
	let postData: any = null;
	let isLoading = true;
	let selectedImage = { src: '', title: '' , description:''};
    let profileData: any = null;
    let currentUserId: string | null = null;
    let isOwner = false;
    let showModal = false;
    let editedText = '';
    let commentToEdit: any = null;
    let commentIdToEdit: string = '';
    let userId: string;

	let liked = false;
	let likes = 0;

    let showEditModal = false;
    let editTitle = "";
    let editDescription = "";
    let editTaggedTopicString = "";
    let file: File | null = null;
    let imagePreview: string | null = null;
    let uploadError = false;

    $: if (showEditModal && postData) {
        editTitle = postData.title;
        editDescription = postData.description;
        editTaggedTopicString = (postData.taggedTopic || []).join(", ");
    }

    // Helper function to convert file to base64
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    async function submitEditForm() {
        isLoading = true;
        try {
            let base64Image = null;
            
            // Only convert file to base64 if it exists
            if (file) {
                base64Image = await fileToBase64(file);
            }

            base64Image = base64Image || postData.postImage; // Use existing image if no new file

            const updatedPost = {
                _id: postId,
                title: editTitle,
                description: editDescription,
                taggedTopic: editTaggedTopicString
                    .split(",")
                    .map((tag) => tag.trim()),
                postImage: base64Image,
                userId: currentUserId
            };

            const res = await fetch("http://localhost:8000/post/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPost),
            });

            if (res.ok) {
                showToast("info", "Post updated successfully!");
                showEditModal = false;
    
                // Reload the current page to refresh all data
                window.location.reload();
            } else {
                showToast("error", "Failed to update post. Please try again.");
            }
        } catch (error) {
            showToast("error", "Failed to update post. Please try again.");
        } finally {
            isLoading = false;
        }
    }

    // Valid image formats (add more formats as needed)
    const validImageFormats = ["image/jpeg", "image/png", "image/gif"];

    function handleFileUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const selectedFile = target.files[0];
            if (validImageFormats.includes(selectedFile.type)) {
                file = selectedFile;
                uploadError = false;  // Reset error state if file is valid

                // Create a preview URL for the image
                const reader = new FileReader();
                reader.onload = () => {
                    imagePreview = reader.result as string;  // Store image preview
                };
                reader.readAsDataURL(selectedFile);  // Read the file as a data URL
            } else {
                uploadError = true;  // Set error state if file is invalid
                file = null;  // Clear the file in case of error
                imagePreview = null;  // Clear the preview
            }
        }
    }

    // Function to fetch profile data for a user
    async function fetchProfileData(userId: string) {
        try {
            const profileRes = await fetch("http://localhost:8000/profile/getById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: userId })
            });
            
            if (profileRes.ok) {
                return await profileRes.json();
            } else {
                showToast("error", "Failed to fetch profile data. Please try again.");
                return null;
            }
        } catch (error) {
            showToast("error", "Failed to fetch profile data. Please try again.");
            return null;
        }
    }

   
    async function getCurrentUserId() {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch("http://localhost:8000/auth/tokenID", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });

                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else {
                    showToast("error", "Failed to fetch user ID. Please log in again.");
                    return null;
                }
            } catch (err) {
                showToast("error", "An error occurred while fetching user ID. Please try again.");
                return null;
            }
        } else {
            showToast("error", "No token found. Please log in again.");
            return null;
        }
    }

    
    async function checkLikeStatus() {
        if (!currentUserId || !postId) return;
        
        try {
            const response = await fetch(`http://localhost:8000/like/getLikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    _id: postId
                })
            });
            
            if (response.ok) {
                const likesList = await response.json();
                // Check if current user's ID is in the likes list
                liked = likesList.some((like: { userId: string; postId: string }) => like.userId === currentUserId);
            } else {
                showToast("error", "Failed to check like status. Please try again.");
            }
        } catch (error) {
            showToast("error", "Error checking like status. Please try again.");
        }
    }

	onMount(async () => {
		const pathParts = window.location.pathname.split('/');
		postId = pathParts[pathParts.length - 1];

        currentUserId = await getCurrentUserId();

		if (postId) {
			try {
				// Fetch post details using the ID
				const response = await fetch(`http://localhost:8000/post/getPostById`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ _id: postId })
				});

				if (response.ok) {
					postData = await response.json();

					// Check if current user is the post owner
                    if (postData.userId === currentUserId) {
                        isOwner = true;
                    } else {
                        isOwner = false;
                    }
                    
					// Update the UI with fetched data
					if (postData) {
						selectedImage = {
							src: postData.postImage,
							title: postData.title,
                            description: postData.description
						};
						
						likes = postData.likeAmount || 0;

                        // Fetch profile data for the post's user
						if (postData.userId) {
							profileData = await fetchProfileData(postData.userId);
						}

                        if (currentUserId) {
                            await checkLikeStatus();
                        }

					}
				} else {
                    showToast("error", "Failed to fetch post details. Please try again.");
				}
			} catch (error) {
                showToast("error", "Failed to fetch post details. Please try again.");
			} finally {
				isLoading = false;
                getComments()
			}
		}
	});

	// Compute the username from profile data
	$: username = profileData ? 
		`${profileData.firstName} ${profileData.lastName}` : 
		'Unknown User';
	
	// Get profile image URL
	$: profileImageUrl = profileData?.profileImage;

    // Function to handle like/unlike action
	const toggleLike = async () => {
        try {
            
            if (!currentUserId) {
                showToast("error", "Please log in to like posts");
                return;
            }

            if (liked) {
                // Unlike endpoint uses DELETE method
                const response = await fetch(`http://localhost:8000/like/unlikePost`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        postId: postId,
                        userId: currentUserId 
                    })
                });

                if (response.ok) {
                    liked = false;
                    likes -= 1;
                } else {
                    showToast("error", "Failed to unlike post");
                }
            } else {
                // Like endpoint uses POST method
                const response = await fetch(`http://localhost:8000/like/likePost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        postId: postId,
                        userId: currentUserId 
                    })
                });

                if (response.ok) {
                    liked = true;
                    likes += 1;
                } else {
                    showToast("error", "Failed to like post");
                }
            }
        } catch (error) {
            showToast("error", "An error occurred while liking/unliking the post");
        }
    };

	const back = () => history.back();

    let showShareOptions = false;

	function toggleShare() {
		showShareOptions = !showShareOptions;
	}

	function shareTo(platform: string) {
		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent(`Check this out: ${selectedImage.title}`);
		let shareUrl = '';

		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
				break;
			case 'twitter':
				shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
				break;
			case 'linkedin':
				shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
				break;
			case 'reddit':
				shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
				break;
		}
		window.open(shareUrl, '_blank');
	}

	let newComment = '';
    let comments : any[] = [];

    async function getComments() {
        const postId = $page.params.id;
        const res = await fetch("http://localhost:8000/comment/getByPostId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id : postId })
                });
        if (res.ok) {
            const token = localStorage.getItem("token");
            let userId: string;
            if (token) {
                const sessionIdResponse = await fetch("http://localhost:8000/auth/tokenID", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });
                userId = await sessionIdResponse.json()
            }
            const commentData = await res.json();
            comments = await Promise.all(
                commentData.map(async (comment: any) => {
                const profileRes = await fetch("http://localhost:8000/profile/getById", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ _id: comment.userId }) 
                });
                const userProfile = profileRes.ok ? await profileRes.json() : null;
                    return {
                        name: userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Unknown User",
                        text: comment.description,
                        userId: userId,
                        postId : postId,
                        access : userId == userProfile._id,
                        commentId: comment.id
                    };
                })
            );    
        } else {

        }
    }

	async function addComment() {
		if (newComment.trim() !== '') {
			const postId = $page.params.id;
            const token = localStorage.getItem("token");

            if (token) {
                const sessionIdResponse = await fetch("http://localhost:8000/auth/tokenID", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });
                const userId = await sessionIdResponse.json()
                const res = await fetch("http://localhost:8000/comment/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        postId : postId,
                        description : newComment,
                        commentTopicId : null,
                        userId : userId
                    })
                });
                if (res.ok){
                    showToast("info", "Comment added!")
                    await getComments()
                }
                else{
                    showToast("error", "Internal server error")
                }
            } else {
                showToast("error", "Unauthorized")
            }
			newComment = '';
		}
	}

    async function editComment(comment: any) {
        if (comment.access) {
            commentIdToEdit = comment.commentId;
            commentToEdit = comment;
            editedText = comment.text;
            userId = comment.userId;
            showModal = true;
        }
    }

    async function saveEdit() {
        if (editedText.trim() !== '' && commentIdToEdit) {
            try {
                const response = await fetch("http://localhost:8000/comment/edit", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        commentId: commentIdToEdit,
                        description: editedText,
                        userId: userId,
                        postId: $page.params.id,
                        commentTopicId: null
                    })
                });
                if (response.ok) {
                    showToast("info", "Comment updated successfully");
                    await getComments();
                    closeModal();
                } else {
                    showToast("error", "Failed to update comment");
                }
            } catch (error) {
                showToast("error", "Error updating comment");
            }
        }
    }

    function closeModal() {
        showModal = false;
        commentToEdit = null;
        editedText = '';
        commentIdToEdit = '';
    }

    async function deleteComment(comment: any) {
        const deleteResponse = await fetch("http://localhost:8000/comment/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentId : comment.commentId,
                userId : comment.userId
            })
        });
        
        if (deleteResponse.ok) {
            showToast("info", "Comment deleted successfully");
        } else {
            showToast("error", "Failed to delete comment");
        }
        await getComments(); 
                
    }

    let showOptions = false;
    let showConfirmDelete = false;

    function toggleOptions() {
        showOptions = !showOptions;
    }

    function confirmDelete() {
        showOptions = false;
        showConfirmDelete = true;

    }

    const deletePost = async () =>{
        try {
            const response = await fetch(`http://localhost:8000/post/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: postId })
            });

            if (response.ok) {
                window.location.href = "/";
                showToast("info", "Delete Successfully.");
                goto('/');
            } else {
                showToast("error", "Failed to delete post. Please try again.");
            }
        } catch (error) {
            showToast("error", "Error deleting post. Please try again.");
        } finally {
            showConfirmDelete = false;
        }
    }
</script>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #333;
    }

    .modal input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .modal-actions button {
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }

    .modal-actions button:first-child {
        background-color: hsl(5, 85%, 63%);
        color: white;
    }

    .modal-actions button:last-child {
        background-color: #eee;
        color: #333;
    }

    .modal-actions button:hover {
        opacity: 0.9;
    }

    .container {
        display: flex;
        align-items: center;
        padding: 2rem;
        border: 1px solid #f0dcdc;
        border-radius: 1.5rem;
        /* Replace fixed margins with auto horizontal margins for true centering */
        margin: 2rem auto;
        /* Set a max-width instead of fixed margins */
        max-width: 900px;
        width: 90%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        gap: 2rem;
        position: relative;
    }

    .back {
		position: absolute;
		left: 25rem;
		top: 8rem;
		cursor: pointer;
		font-size: 1.5rem;
	}

	.image {
		border-radius: 1rem;
		width: 300px;
		object-fit: cover;
	}

	.details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-weight: bold;
	}

	.profile img {
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}

	.icons {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		font-size: 1.2rem;
        margin-left: 15rem;
	}

	.comment-box {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
        width: 38rem;
	}

	input[type="text"] {
		border: none;
		border-radius: 1rem;
		padding: 0.8rem 1rem;
		background: #e2e2e2;
		outline: none;
        width: 87%;
	}

    .overlay {
        position: absolute;
        inset: 5rem;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .share-popup {
        background: white;
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        gap: 1.2rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .share-popup button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .share-popup button:hover {
        transform: scale(1.1);
    }

    .share-popup img {
        width: 24px;
        height: 24px;
    }

    .scroll-area {
        max-height: 200px;
        overflow-y: auto;
        padding-right: 0.5rem;
    }
    .scroll-area::-webkit-scrollbar {
        width: 6px;
    }
    .scroll-area::-webkit-scrollbar-thumb {
        background-color: orange;
        border-radius: 10px;
    }

    .tooltip-menu {
        position: absolute;
        right: 0;
        top: 40px;
        background: white;
        border: 1px solid #ccc;
        padding: 0.5rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
    }

    .tooltip-menu button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem 1rem;
        text-align: left;
        font-size: 1rem;
        color: #333;
        transition: background 0.2s ease;
    }

    .tooltip-menu button:hover {
        background: #f0f0f0;
    }

    .confirm-box {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 2rem;
        border: 1px solid #ccc;
        z-index: 200;
        border: 0.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
    }
    .confirm-box p {
        border-bottom: 1px solid #ccc;
        padding-bottom: 1.5rem;
    }

    .pbtn-2{
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        padding: 0.4rem 1.5rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.8rem;
    }
    .pbtn-1{
        background-color: white;
        color: hsl(5, 85%, 63%);
        border: none;
        padding: 0.4rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid hsl(5, 85%, 63%);
        font-size: 0.8rem;
    }

    .pbtn-2:hover{
        background-color: hsl(5, 85%, 50%);
    }

    .pbtn-1:hover{
        color: hsl(5, 85%, 50%);
        border: 1px solid hsl(5, 85%, 50%);
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        font-size: 1.2rem;
        color: #666;
    }

    .unselectable {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
    }

    .modal-overlay-form {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        width: 90%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
    }

    .modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #888;
    }

    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .modal-form input,
    .modal-form textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 6px;
    }

    .modal-form button {
        background-color: hsl(5, 85%, 63%);
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        align-self: flex-end;
    }

    .modal-form button:hover {
        background-color: #15803d;
    }
</style>

<span class="back" on:click={back}>←</span>

{#if isLoading}
	<div class="loading-container">
		<p>Loading post details...</p>
	</div>
{:else if !postData}
	<div class="loading-container">
		<p>Post not found or error loading post.</p>
	</div>
{:else}
	<div class="container">
		<img class="image" src={selectedImage.src} alt={selectedImage.title} />

		<div class="details">
			<div class="profile">
                <img 
                    src={profileImageUrl} 
                    alt="profile" 
                    on:click={() => goto(`/profile?id=${postData.userId}`)}
                    style="cursor: pointer;" 
                />
                <span 
                    on:click={() => goto(`/profile?id=${postData.userId}`)}
                    style="cursor: pointer;"
                >{username}</span>

				<div class="icons unselectable" style="position: relative;">
					<span on:click={toggleLike} style="cursor: pointer;">
						{liked ? '❤️' : '🤍'} {likes}
					</span>
					<span>💬 {comments.length}</span>
					<span style="cursor: pointer;" on:click={toggleShare}>📤</span>
				
					{#if showShareOptions}
						<div class="overlay" on:click={toggleShare}>
							<div class="share-popup" on:click|stopPropagation>
								<button on:click={() => shareTo('link')}><img src="/link.jpg" alt="Link" /></button>
								<button on:click={() => shareTo('facebook')}><img src="/facebook.jpg" alt="Facebook" /></button>
								<button on:click={() => shareTo('instagram')}><img src="/instagram.jpg" alt="Instagram" /></button>
								<button on:click={() => shareTo('whatsapp')}><img src="/whatsapp.png" alt="WhatsApp" /></button>
							</div>
						</div>
					{/if}

                    {#if isOwner}
                        <span style="cursor: pointer;" on:click={toggleOptions}
                            >⋯</span
                        >

                        {#if showOptions}
                            <div class="tooltip-menu">
                                <button on:click={confirmDelete}
                                    >Remove Post</button
                                >
                                <button on:click={() => (showEditModal = true)}
                                    >Edit Post</button
                                >
                            </div>
                        {/if}
                        {#if showEditModal}
                            <div class="modal-overlay-form">
                                <div class="modal-content">
                                    <button
                                        class="modal-close"
                                        on:click={() => (showEditModal = false)}
                                        >✖</button
                                    >
                                    <h2>Edit Post</h2>

                                    <form
                                        on:submit|preventDefault={submitEditForm}
                                        class="modal-form"
                                        enctype="multipart/form-data"
                                    >
                                        <label>
                                            Title:
                                            <input
                                                type="text"
                                                bind:value={editTitle}
                                                required
                                            />
                                        </label>

                                        <label>
                                            Description:
                                            <textarea
                                                bind:value={editDescription}
                                                rows="4"
                                            ></textarea>
                                        </label>

                                        <label>
                                            Tagged Topics:
                                            <input
                                                type="text"
                                                bind:value={
                                                    editTaggedTopicString
                                                }
                                                placeholder="e.g. tech, nature"
                                            />
                                        </label>

                                        <label>
                                            Current Image:
                                            {#if postData?.postImage}
                                                <img
                                                    src={postData.postImage}
                                                    alt="Current"
                                                    class="image"
                                                />
                                            {:else}
                                                <p>No image available.</p>
                                            {/if}
                                        </label>

                                        <label>
                                            Upload New Image:
                                            <input
                                                type="file"
                                                accept="image/*"
                                                on:change={handleFileUpload}
                                            />
                                        </label>

                                        <button type="submit"
                                            >Save Changes</button
                                        >
                                    </form>
                                </div>
                            </div>
                        {/if}

						{#if showConfirmDelete}
							<div class="confirm-box">
								<p>Are you sure you want to delete this post?</p>
								<button on:click={() => (showConfirmDelete = false)} class="pbtn-1">Cancel</button>
								<button on:click={deletePost} class="pbtn-2">Confirm</button>
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<div class="scroll-area">
				<h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
				<p style="color: gray;">
					{postData.taggedTopic ? postData.taggedTopic.join(', ') : 'aesthetic, apple, airpods pro, airpods max, iphone, iphone pro'}
				</p>
			
				<h4>{comments.length} Comment{comments.length > 1 ? 's' : ''}</h4>
				{#each comments as comment}
                <p>
                    <i>{comment.name}</i> - {comment.text}
                    {#if comment.access}
                    <button  on:click={() => editComment(comment)}>Edit</button>
                    <button on:click={() => deleteComment(comment)}>Delete</button>
                    {/if}
                </p>
                {/each}

                {#if showModal}
                <div class="modal-overlay">
                    <div class="modal">
                    <h3>Edit Comment</h3>
                    <input type="text" bind:value={editedText} placeholder={commentToEdit.text} />
                    <div class="modal-actions">
                        <button on:click={saveEdit}>Save</button>
                        <button on:click={closeModal}>Cancel</button>
                    </div>
                    </div>
                </div>
                {/if}
			</div>

			<div class="comment-box">
				<strong>What do you think ?</strong>
				<input
					type="text"
					placeholder="Add a comment"
					bind:value={newComment}
					on:keydown={(e) => e.key === 'Enter' && addComment()}
				/>
			</div>
		</div>
	</div>
{/if}