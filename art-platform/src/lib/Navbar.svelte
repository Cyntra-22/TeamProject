<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let showDropdown = false;
    let userID: string | null = null;
    let isArtist: boolean = false;
    let userInterests: string[] = [];
    
    let searchQuery = '';

    // Define all available art interest topics with images
    const allArtTopics = [
        { title: 'Concept Art', img: '/ConceptArt.jpg' },
        { title: 'Digital Portraits', img: '/DigitalPort.png' },
        { title: '3D', img: '/3D.jpg' },
        { title: 'CGI in films', img: '/CGIart.jpg' },
        { title: 'Pixel Art', img: '/PixelArt.jpg' },
        { title: 'Web Art', img: '/WebArt.jpg' },
        { title: 'Motion Graphics', img: '/MotionGraphic.jpg' },
        { title: 'Illustrations', img: '/IllustrationArt.jpg' },
        { title: 'Logos', img: '/LogoArt.jpg' },
        { title: 'Generative Art', img: '/GenerativeArt.jpg' },
        { title: 'NFT art', img: '/NFTArt.jpg' },
        { title: 'Glitch Art', img: '/GlitchArt.jpg' }
    ];
    
    $: routeId = $page.route.id ?? "";
    
    $: forYouItems = userInterests.map(interest => {
        const matchingTopic = allArtTopics.find(topic => topic.title === interest);
        return {
            title: interest,
            img: matchingTopic ? matchingTopic.img : '/NFTArt.jpg'
        };
    }).slice(0, 3);
        
    $: popularItems = allArtTopics.filter(item => 
        !forYouItems.some(forYouItem => forYouItem.title === item.title)
    );

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }
    

    async  function handleSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        event.preventDefault();
        showSearchModal = false;
        const url = `/?title=${encodeURIComponent(searchQuery)}`;
        await goto(url);
        location.reload();
        }
    }

    async function handleTopicClick(topicTitle: string) {
        const url = `/?taggedTopic=${encodeURIComponent(topicTitle)}`;
        await goto(url);
        location.reload();
    }

    let showSearchModal = false;

    function toggleSearchModal() {
        showSearchModal = !showSearchModal;
    }

    onMount(async () => {
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
                    const userID = await response.json();

                    const userProfile = await fetch("http://localhost:8000/profile/getById", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ _id: userID })
                    });

                    if (userProfile.ok) {
                        const userData = await userProfile.json();
                        isArtist = userData.role === "artist";
                        if (userData.interests && Array.isArray(userData.interests)) {
                            userInterests = userData.interests;
                        }
                    } 
                    else {
                        console.error("Failed to fetch user profile", userProfile.status);
                    }

                } else {
                    console.error("Failed to fetch user ID", response.status);
                }
            } catch (err) {
                console.error("Error fetching user ID:", err);
            }
        } else {
            console.warn("No token found in localStorage");
        }
    });
</script>

<style>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 3rem;
        background: white;
        border-bottom: 1px solid #ddd;
    }

    .nav-left {
        display: flex;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-right: 1rem;
    }

    .nav-links {
        display: flex;
        gap: 1rem;
    }

    .nav-links a {
        text-decoration: none;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 3rem;
        color: black;
    }

    .nav-links a.active {
        border: 1px solid hsl(5, 85%, 63%);
        border-radius: 3rem;
    }

    .search {
        flex: 1;
        max-width: 70%;
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        border-radius: 1rem;
        font-size: 1rem;
    }

    .nav-icons {
        position: relative;
        display: flex;
        gap: 1rem;
    }

    .nav-icons img {
        width: 35px;
        height: 35px;
        cursor: pointer;

    }

    .nav-icons button{
        background-color: white;
        border: none;
    }

    .logo img {
        width: 45px;
        height: 50px;
    }

        input {
            margin: 0 0.5rem;
        }


    .dropdown {
        position: absolute;
        top: 40px;
        left: 0;
        background: white;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        width: 130px;
        display: flex;
        flex-direction: column;
        z-index: 10;
    }

    .dropdown a {
        text-decoration: none;
        padding: 10px;
        color: black;
        font-size: 0.9rem;
        transition: background 0.2s ease-in-out;
        
    }
    
    .dropdown .link{
        border-bottom: 1px solid rgb(210, 202, 202);
    }

    .dropdown a:hover {
        background: hsl(5, 85%, 90%);
    }

    .search-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-container {
        background: white;
        width: 90%;
        max-width: 800px;
        max-height: 60vh;
        border-radius: 12px;
        overflow-y: auto;
        padding: 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        scrollbar-width: thin;
        scrollbar-color: #888 transparent;
    }

    .search-container::-webkit-scrollbar {
        width: 6px;
    }

    .search-container::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 4px;
    }

    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-search-bar {
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }

    .close-btn {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }

    .recent-history h4 {
        margin-bottom: 0.5rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
    }

    .tag {
        background-color: #f0f0f0;
        padding: 0.5rem 1.3rem;
        border-radius: 9999px;
        font-size: 0.9rem;
        cursor: pointer;
        white-space: nowrap;
    }

    .section h4 {
        margin-bottom: 0.5rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
    }

    .card-link {
        text-decoration: none;
        color: inherit;
    }

    .card {
        background-color: #fafafa;
        border-radius: 12px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
    }

    .card:hover {
        transform: scale(1.03);
    }

    .card img {
        width: 100%;
        height: 100px;
        object-fit: cover;
    }

    .card span {
        display: block;
        padding: 0.5rem;
        font-weight: 500;
        font-size: 0.9rem;
    }
</style>

<nav>
    <div class="nav-left">
        <div class="logo"><img alt=" " src="/logo.png" /></div>
        <div class="nav-links">
            <a href="/" on:click|preventDefault={() => window.location.href = '/'} class:active={routeId === "/"}>Home</a>
            {#if isArtist}
                <a href="/create" class:active={routeId === "/create"}>Create</a>
            {/if}
        </div>
    </div>

    <input 
    type="text" 
    class="search" 
    placeholder="Search for" 
    bind:value={searchQuery}
    on:keydown={handleSearch}
    on:focus={() => {
        if (!showSearchModal) toggleSearchModal();
    }}/>

    <div class="nav-icons">
       
        <div style="position: relative;">
            <button 
                class="dropdown-btn" 
                on:click={toggleDropdown} 
                aria-haspopup="true" 
                aria-expanded={showDropdown} 
            >
            <img alt="Ranking Menu" src={(routeId?.startsWith("/post-rank") || routeId?.startsWith("/artist-rank") || routeId?.startsWith("/review")) ? "/rank-active-logo.png" : "/rank.png"} />
            </button>
            {#if showDropdown}
                <div class="dropdown">
                    <a class="link" href="/post-rank">Post Ranking</a>
                    <a class="link" href="/artist-rank">Artist Ranking</a>
                    <a href="/review">Write Review</a>
                </div>
            {/if}
        </div>

       
        <a href="/profile">
            <img alt="Profile" src={routeId === "/profile" ? "/profile-active-icon.png" : "/user-profile.png"} />
        </a>
    </div>
</nav>

{#if showSearchModal}
	<div class="search-modal">
		<div class="search-container">
			<div class="search-header">
                <input 
                type="text" 
                class="modal-search-bar" 
                placeholder="Search" 
                bind:value={searchQuery}
                on:keydown={handleSearch} />
                <button class="close-btn" on:click={toggleSearchModal}>X</button>
			</div>
			<div class="section">
				<h4>For you</h4>
				<div class="grid">
					{#if forYouItems.length > 0}
                        {#each forYouItems as item}
                            <div class="card-link" on:click={() => handleTopicClick(item.title)}>
                                <div class="card">
                                    <img src={item.img} alt={item.title} />
                                    <span>{item.title}</span>
                                </div>
                            </div>
                        {/each}
					{:else}
						<p>Loading your interests...</p>
					{/if}
				</div>
			</div>

			<div class="section">
				<h4>Popular</h4>
				<div class="grid">
                    {#each popularItems as item}
                        <div class="card-link" on:click={() => handleTopicClick(item.title)}>
                            <div class="card">
                                <img src={item.img} alt={item.title} />
                                <span>{item.title}</span>
                            </div>
                        </div>
                    {/each}
				</div>
			</div>
		</div>
	</div>
{/if}