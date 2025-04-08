<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data; // This receives data from +page.ts

	let postId: string;
	let postData: any = null;
	let isLoading = true;
	let selectedImage = { src: '', title: '' };
    let profileData: any = null;
    let currentUserId: string | null = null;
    let isOwner = false;

	let liked = false;
	let likes = 0;

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
                console.error("Failed to fetch profile for user", userId);
                return null;
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    }

    // Get current user ID from token
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
                    console.log("Current User ID:", data);
                    return data;
                } else {
                    console.error("Failed to fetch user ID", response.status);
                    return null;
                }
            } catch (err) {
                console.error("Error fetching user ID:", err);
                return null;
            }
        } else {
            console.warn("No token found in localStorage");
            return null;
        }
    }

    // Function to check if user has already liked the post
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
                console.log("Likes list:", likesList);

                // Check if current user's ID is in the likes list
                liked = likesList.some((like: { userId: string; postId: string }) => like.userId === currentUserId);
                console.log("User has liked this post:", liked);
            } else {
                console.error("Failed to check like status");
            }
        } catch (error) {
            console.error("Error checking like status:", error);
        }
    }

	onMount(async () => {
		// Get the post ID from URL using window.location (without page store)
		const pathParts = window.location.pathname.split('/');
		postId = pathParts[pathParts.length - 1];
		console.log("Post ID from URL:", postId);

        // Get current user ID from token
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
					console.log("Post data:", postData);

					// Check if current user is the post owner
                    if (postData.userId === currentUserId) {
                        isOwner = true;
                    } else {
                        isOwner = false;
                    }

                    console.log("Current user ID:", currentUserId);
                    console.log("Is owner:", isOwner);
                    
					// Update the UI with fetched data
					if (postData) {
						selectedImage = {
							src: postData.postImage,
							title: postData.title
						};
						
						likes = postData.likeAmount || 0;

                        // Fetch profile data for the post's user
						if (postData.userId) {
							profileData = await fetchProfileData(postData.userId);
							console.log("Profile data:", profileData);
						}

                        if (currentUserId) {
                            await checkLikeStatus();
                        }

					}
				} else {
					console.error("Failed to fetch post details");
				}
			} catch (error) {
				console.error("Error fetching post details:", error);
			} finally {
				isLoading = false;
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
            // Check if user is logged in
            if (!currentUserId) {
                alert("Please log in to like posts");
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
                    console.log("Post unliked successfully");
                } else {
                    console.error("Failed to unlike post:", await response.text());
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
                    console.log("Post liked successfully");
                } else {
                    console.error("Failed to like post:", await response.text());
                }
            }
        } catch (error) {
            console.error("Error toggling like:", error);
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
    let comments = [{ name: 'John', text: 'Hello' }];

	function addComment() {
		if (newComment.trim() !== '') {
			comments = [...comments, { name: 'You', text: newComment }];
			newComment = '';
		}
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

    function deletePost() {
        showConfirmDelete = false;
        // Here you would add code to delete the post via API
        alert("Post deleted!");
    }
</script>

<style>
	.container {
		display: flex;
		align-items: center;
		padding: 2rem;
		border: 1px solid #f0dcdc;
		border-radius: 1.5rem;
        margin: 2rem 10rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
		gap: 2rem;
		position: relative;
	}

	.back {
		position: absolute;
		left: 11rem;
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
        padding: 1rem 2rem;
        border: 1px solid #ccc;
        z-index: 200;
        border: 0.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .confirm-box p {
        border-bottom: 1px solid #ccc;
        padding-bottom: 1rem;
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
				<img src={profileImageUrl} alt="profile" />
                <span>{username}</span>

				<div class="icons" style="position: relative;">
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

					<!-- Only show options button if user is the post owner -->
					{#if isOwner}
						<span style="cursor: pointer;" on:click={toggleOptions}>⋯</span>

						{#if showOptions}
							<div class="tooltip-menu">
								<button on:click={confirmDelete}>Remove Post</button>
								<button on:click={() => goto('/create')}>Edit Post</button>
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
				<p style="color: gray;">
					{postData.taggedTopic ? postData.taggedTopic.join(', ') : 'aesthetic, apple, airpods pro, airpods max, iphone, iphone pro'}
				</p>
			
				<h4>{comments.length} Comment{comments.length > 1 ? 's' : ''}</h4>
				{#each comments as comment}
					<p><i>{comment.name}</i> - {comment.text}</p>
				{/each}
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