<script lang="ts">
    import PostRank from "$lib/PostRank.svelte";
    import { onMount } from "svelte";

    let rankedPosts: any[] = [];
    let postsWithProfiles: any[] = [];
    let isLoading = true;
    
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
    
    // Fetch the ranked posts and their associated profiles
    onMount(async () => {
        try {
            // Fetch ranked posts
            const response = await fetch("http://localhost:8000/post/getRanking", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                rankedPosts = await response.json();
                console.log("Ranked posts data:", rankedPosts);
                
                // Create enhanced posts with profile data
                const enhancedPosts = await Promise.all(
                    rankedPosts.map(async (post) => {
                        // Fetch profile for each post
                        const profileData = await fetchProfileData(post.userId);
                        
                        // Merge post and profile data
                        return {
                            ...post,
                            username: profileData ? `${profileData.firstName} ${profileData.lastName}` : "Unknown User",
                            profileUrl: profileData?.profileImage || "/default-profile.png"
                        };
                    })
                );
                
                postsWithProfiles = enhancedPosts;
                console.log("Posts with profiles:", postsWithProfiles);
            } else {
                console.error("Failed to fetch ranked posts");
            }
        } catch (error) {
            console.error("Error fetching ranked posts:", error);
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
            width: 100%;
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
            
    </style>
    
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
    
    
    