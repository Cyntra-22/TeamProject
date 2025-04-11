<script lang="ts">
    import ArtistRank from "$lib/ArtistRank.svelte";
    import { onMount } from 'svelte';
    import { showToast } from '$lib/toast';

    
    let count = 10;
    let artistList: any = [];
    let loading = true;

    function formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toString();
    }

    function calculateEngagement(totalLikes: number, totalRating: number, totalReviews: number): number {
        return (totalRating * totalReviews * 50) + totalLikes;
    }

    async function getTopRankArtist() {
        try {
            loading = true;
            const artists = await fetch('http://localhost:8000/profile/getArtist');
                
            if (!artists.ok) {
                throw new Error(`HTTP error! Status: ${artists.status}`);
            }
            
            const artistData = await artists.json();
            const artistsWithEngagement = [];
            
            for (const artist of artistData) {
                const totalLike = await fetch("http://localhost:8000/like/getAllLikeByUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: artist._id })
                });
                
                if (!totalLike.ok) {
                    continue
                }
                
                const likeData = await totalLike.json();

                const totalReview = await fetch("http://localhost:8000/review/getAllRatingByUserId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: artist._id })
                });
                if (!totalReview.ok) {
                    continue
                }

                const reviewData = await totalReview.json();
                
                const engagementPoints = calculateEngagement(
                    likeData.totalLike || 0, 
                    reviewData.totalRating || 0, 
                    reviewData.totalReview || 0
                );
                
                artistsWithEngagement.push({
                    ...artist,
                    engagementPoints,
                    formattedLikes: formatNumber(likeData.totalLike || 0),
                    formattedEngagement: formatNumber(engagementPoints),
                    rating: Number(reviewData.totalRating).toFixed(2) || 0,
                    totalReviews: reviewData.totalReview || 0,
                    userId: artist._id,
                    userProfile: artist.profileImage
                });
            }
            
            artistsWithEngagement.sort((a, b) => b.engagementPoints - a.engagementPoints);
            
            artistList = artistsWithEngagement.slice(0, count);
            
            loading = false;
        } catch (err) {
            showToast("error", "An error occurred while fetching artist data. Please try again later.");
            loading = false;
        }
    }
    
    onMount(() => {
        getTopRankArtist();
    });
    
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

<style>
    .create-post-container {
        padding: 0;
        background: white;
        width: 70%;
        margin: 0 auto;
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
    
    .top-btn img {
        width: 30px;
        height: 20px;
    }
    
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    
    .loading, .error {
        text-align: center;
        padding: 2rem;
        grid-column: span 2;
    }
</style>

<div class="create-post-container">
    <div class="header">
        <h2>Top Ranking Artists Here!</h2>
    </div>
    
    <div class="grid-container">
        {#if loading}
            <div class="loading">Loading top artists...</div>
        {:else if artistList.length === 0}
            <div class="error">No artists found</div>
        {:else}
            {#each artistList as artist, i}
                <ArtistRank 
                    artistName={`${artist.firstName} ${artist.lastName}`}
                    rating={artist.rating}
                    totalReviews={artist.totalReviews}
                    likes={artist.formattedLikes}
                    engagementPoints={artist.formattedEngagement}
                    userId={artist.userId}
                    userProfile={artist.profileImage? artist.profileImage: "logo.png"}
                />
            {/each}
        {/if}
    </div>
    
    <button class="top-btn" on:click={scrollToTop}>
        <img src="/topButton.png" alt="top button">
    </button>
</div>