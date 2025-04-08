<script lang="ts">
    import {images} from './images.js';
    import {onMount} from 'svelte';

    let posts: any[] = [];
    let isLoading = true;

    // Fetch the ranked posts and their associated profiles
    onMount(async () => {
        try {
            // Fetch ranked posts
            const response = await fetch("http://localhost:8000/post/getReccomended", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (response.ok) {
                posts = await response.json();
                console.log("Posts Home data:", posts);
                return posts;
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            isLoading = false;
        }
    });
</script>

<style>
    img {
        width: 100%;
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    img:hover {
        transform: scale(1.05);
    }

    .selected {
        border: 2px solid hsl(5, 85%, 63%);
        border-radius: 0.5rem;
    }
</style>

{#each posts as post, index (post.id)}
    <a href ={`/art-detail/${post.id}`}>
        <img 
            src={post.postImage} 
            alt={post.title} 
            class="{index === 5 ? 'selected' : ''}" 
        />
    </a>
{/each}