<script lang="ts">
    import { onMount } from 'svelte';
    import { showToast } from '$lib/toast';

    export let count: number = 7; 

    interface Artist {
        _id: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        bio?: string;
    }

    let artists: Artist[] = [];
    let isLoading = true;
    let error: string | null = null;
    let currentUserId: string | null = null;

    onMount(async () => {
        try {
            
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            
            const tokenResponse = await fetch("http://localhost:8000/auth/tokenID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });
            
            if (!tokenResponse.ok) {
                throw new Error(`Token validation failed! Status: ${tokenResponse.status}`);
            }
            
            const tokenData = await tokenResponse.json();
            
           
            const response = await fetch('http://localhost:8000/profile/getArtist');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            
            const filteredArtists = Array.isArray(data) ? 
                data.filter(artist => artist._id !== tokenData) : 
                (data._id !== tokenData ? [data] : []);
                
           
            const uniqueArtists = [...new Map(filteredArtists.map(item => [item._id, item])).values()];
            
           
            artists = uniqueArtists.slice(0, count).map(artist => ({
                ...artist,
                bio: artist.bio || "My work explores the relationship.",
            }));
            
            isLoading = false;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = "An unknown error occurred";
            }
            isLoading = false;
            showToast("error", "An error occurred while fetching artists. Please try again later.");
        }
    });
    
    function navigateAndReload(id: string) {
        window.location.href = `/profile?id=${id}`;
    }
</script>

<style>
    .more-profile-container {
        margin-top: 1rem;
        max-height: 830px;
        overflow-y: auto;
        padding-right: 10px;
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

    

    .pbtn-1 {
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        padding: 0.4rem 1.5rem; 
        margin-top: -1rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid hsl(5, 85%, 63%);
        font-size: 0.8rem;
          
        text-align: center; 
    }

   

    .pbtn-1:hover {
        color: hsl(5, 85%, 50%);
        border: 1px solid hsl(5, 85%, 50%);
        background-color: white;
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
    .more-profile-content {
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        
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
                <div class="more-profile-content">
                    <div>
                        <h3>{artist.firstName} {artist.lastName}</h3>
                        <p>{artist.bio}</p>
                    </div>
                    <div >
                        <button class="pbtn-1" on:click={() => navigateAndReload(artist._id)}>View Profile</button>
                    </div>
                    
                    
                </div>
            </div>
        {/each}
    {/if}
</div>