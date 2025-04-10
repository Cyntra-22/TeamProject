<script lang="ts">
    import {images} from './images.js';
    import {onMount} from 'svelte';
    import { page } from "$app/stores";
    import { showToast } from "$lib/toast";

    let posts: any[] = [];
    let isLoading = true;

    onMount(async () => {
        try {
            const urlParams = $page.url.searchParams;
            const searchTitle = urlParams.get('title');
            const searchTopic = urlParams.get('taggedTopic');
            
            let endpoint = "http://localhost:8000/post/getReccomended";
            let method = "GET";
            let body = null;
            
            // If there's a search query (title or topic or both), use the search endpoint
            if (searchTitle || searchTopic) {
                endpoint = "http://localhost:8000/post/getPostByNameAndTag";
                method = "POST";
                body = JSON.stringify({
                    title: searchTitle || "",
                    taggedTopic: searchTopic || ""
                });
            }
            
            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ?? undefined
            };
            
            if (body) {
                options.body = body;
            }
            
            const response = await fetch(endpoint, options);
            
            if (response.ok) {
                posts = await response.json();
            }
        } catch (error) {
            showToast("error", "An error occurred while fetching posts. Please try again.");
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