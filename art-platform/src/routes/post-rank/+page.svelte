<script lang="ts">
    import PostRank from "$lib/PostRank.svelte";
    import { onMount } from "svelte";
    import { showToast } from '$lib/toast';

    let rankedPosts: any[] = [];
    let postsWithProfiles: any[] = [];
    let isLoading = true;
    
    
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
            showToast("error", "An error occurred while fetching profile data. Please try again.");
            return null;
        }
    }
    
    
    onMount(async () => {
        try {
           
            const response = await fetch("http://localhost:8000/post/getRanking", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                rankedPosts = await response.json();
                
                const enhancedPosts = await Promise.all(
                    rankedPosts.map(async (post) => {
                       
                        const profileData = await fetchProfileData(post.userId);
                        
                        
                        return {
                            ...post,
                            username: profileData ? `${profileData.firstName} ${profileData.lastName}` : "Unknown User",
                            profileUrl: profileData?.profileImage || "logo.png"
                        };
                    })
                );
                
                postsWithProfiles = enhancedPosts;
            } else {
                showToast("error", "Failed to fetch ranked posts. Please try again.");
            }
        } catch (error) {
            showToast("error", "An error occurred while fetching ranked posts. Please try again.");
        } finally {
            isLoading = false;
        }
    });

    function scrollToTop() {

        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>
    
<style>
        .create-post-container {
            padding: 0;
            background: white;
            width: 80%;
            margin:0 auto;
        }
    
        .header {
            
            font-weight: bold;
            margin-bottom: 3rem;
            text-align: center;
        }

        .top-btn {

            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background: hsl(5, 85%, 63%);
            color: white;
            padding: 0.5rem 0.3rem;
            border: none;
            border-radius: 1rem;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .top-btn img{
            width: 30px;
            height: 20px;
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);   
           
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
    <div class="create-post-container">
        <div class="header">
            <h2>Top Ranking Posts Here !</h2>

        </div> 
        <div class="grid-container">
            {#each postsWithProfiles as post, index (post.id)}
                <PostRank 
                    title={post.title}
                    username={post.username}
                    tags={post.taggedTopic}
                    likes={post.likeAmount}
                    imageUrl={post.postImage}
                    profileUrl={post.profileUrl}
                    trophy={
                        index === 0 ? "/gold.png" :
                        index === 1 ? "/silver.png" :
                        index === 2 ? "/bronze.png" :
                        ""
                    }
                />
            {/each}
          </div>
       <button class="top-btn" on:click={scrollToTop}><img src="/topButton.png" alt="top button"></button>
   
    </div>
{/if}
    
    