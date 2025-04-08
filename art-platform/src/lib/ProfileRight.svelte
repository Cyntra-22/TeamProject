<script lang="ts">
    import { onMount } from 'svelte';

    export let count: number = 7; 

    interface Artist {
        _id: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        bio?: string;
        isFollowing?: boolean;
    }

    let artists: Artist[] = [];
    let isLoading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:8000/profile/getArtist');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            const uniqueArtists = Array.isArray(data) ? 
                [...new Map(data.map(item => [item._id, item])).values()] : 
                [data];
            
            artists = uniqueArtists.slice(0, 7).map(artist => ({
                ...artist,
                bio: artist.bio || "My work explores the relationship.",
                isFollowing: false
            }));
            
            isLoading = false;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = "An unknown error occurred";
            }
            isLoading = false;
            console.error("Error fetching artists:", err);
        }
    });

    function toggleFollow(index: number) {
        artists[index].isFollowing = !artists[index].isFollowing;
        artists = [...artists];
    }
    
    function navigateAndReload(id: string) {
        window.location.href = `/profile?id=${id}`;
    }
</script>

<style>
    .more-profile-container {
        margin-top: 2rem;
    }
    
    .loading {
        color: #666;
        text-align: center;
        padding: 1rem;
    }
    
    .error {
        color: hsl(5, 85%, 63%);
        text-align: center;
        padding: 1rem;
        border: 1px solid hsl(5, 85%, 63%);
        border-radius: 4px;
        margin: 1rem 0;
    }

    .more-profile {
        display: grid;
        grid-template-columns: 1fr 5fr;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgb(252, 186, 164);
        margin-bottom: 1.5rem;
    }

    img {
        width: 40px;
        height: 40px;
        border: 1px solid hsl(5, 85%, 50%);
        border-radius: 50%;
        padding: 0.3rem;
        margin-right: 1rem;
        object-fit: cover;
    }

    .pbtn-2 {
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        padding: 0.4rem 1.5rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.8rem;
    }

    .pbtn-1 {
        background-color: white;
        color: hsl(5, 85%, 63%);
        border: none;
        padding: 0.4rem 1.5rem;  /* Increased horizontal padding */
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid hsl(5, 85%, 63%);
        font-size: 0.8rem;
        min-width: 150px;  /* Added a minimum width */
        text-align: center; /* Center the text */
    }

    .pbtn-2:hover {
        background-color: hsl(5, 85%, 50%);
    }

    .pbtn-1:hover {
        color: hsl(5, 85%, 50%);
        border: 1px solid hsl(5, 85%, 50%);
    }

    p {
        font-size: 0.8rem;
        color: rgb(103, 101, 101);
        margin: 0;
        padding: 0;
    }

    h3 {
        margin: 0;
        padding: 0;
    }
</style>

<div class="more-profile-container">
    {#if isLoading}
        <div class="loading">Loading artists...</div>
    {:else if error}
        <div class="error">Error: {error}</div>
    {:else if artists.length === 0}
        <div class="loading">No artists found</div>
    {:else}
        {#each artists as artist, i}
            <div class="more-profile">
                <div>
                    <img src={artist.profileImage || "/logo.png"} alt="profile" />
                </div>
                <div>
                    <h3>{artist.firstName} {artist.lastName}</h3>
                    <p>{artist.bio}</p>
                    <button class="pbtn-1" on:click={() => navigateAndReload(artist._id)}>View Profile</button>
                </div>
            </div>
        {/each}
    {/if}
</div>