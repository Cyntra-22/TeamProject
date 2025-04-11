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
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .masonry {
        column-count: 1;
        column-gap: 1rem;
        padding: 1rem;
        width: 100vw;
        box-sizing: border-box;
        max-width: 1700px;
    }

    @media(min-width: 600px) {
        .masonry {
            column-count: 3;
        }
    }

    @media(min-width: 900px) {
        .masonry {
            column-count: 3;
        }
    }

    @media(min-width: 1200px) {
        .masonry {
            column-count: 4;
        }
    }

    .masonry-item {
        break-inside: avoid;
        margin-bottom: 1rem;
        display: block;
        width: 100%;
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s;
    }

    img:hover {
        transform: scale(1.05);
        border-radius: 0.7rem; 
    }
    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100vw;
    }

    .spinner {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #555;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }


</style>

{#if isLoading}
    <div class="loading-container">
        <div class="spinner"></div>
    </div>
{:else}
<div class="masonry">
    {#each posts as post, index (post.id)}
        <a href={`/art-detail/${post.id}`} class="masonry-item">
            <img 
                src={post.postImage} 
                alt={post.title} 
                class="{index === 5 ? 'selected' : ''}" 
            />
        </a>
    {/each}
</div>
{/if}