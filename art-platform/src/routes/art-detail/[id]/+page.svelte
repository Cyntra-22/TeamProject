<script lang="ts">
	import { images } from '$lib/images';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { get } from 'svelte/store';

	export let data;
	let selectedImage = data.image;

	let liked = false;
	let likes = 12; // default

	

	const toggleLike = () => {
		liked = !liked;
		likes += liked ? 1 : -1;
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

    let comments = [{ name: 'John', text: 'Hello' }]

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
        // Put your actual delete logic here
        alert("Post deleted!"); // Or call an API
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


</style>

<span class="back" on:click={back}>←</span>
<div class="container">
	


	<img class="image" src={selectedImage.src} alt={selectedImage.title} />

	<div class="details">
		<div class="profile">
			<img src="https://i.pravatar.cc/100" alt="profile" />
			<span>Rachel Emma</span>

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
                        <button on:click={() => (showConfirmDelete = false)} class="pbtn-1" >Cancel</button>
                        <button on:click={deletePost} class="pbtn-2">Confirm</button>
                        
                    </div>
                {/if}
    
            </div>
		</div>

		<div class="scroll-area">
            <h3>{selectedImage.title}</h3>
            <p style="color: gray;">
                aesthetic, apple, airpods pro, airpods max, iphone, iphone pro,
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


<!--
<div class="gallery">
    {#each images as image, index}
        <img 
            src={image.src}
            alt={image.title}
            class:selected={image === selectedImage}
            on:click={() => selectedImage = image}
        />
    {/each}
</div>
-->


 
  

  