<script lang="ts">
    
    let showDropdown = false;
    import { page } from "$app/stores";

    $: routeId = $page.route.id ?? "";

    
    function toggleDropdown() {
        showDropdown = !showDropdown;
    }
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
</style>

<nav>
    <div class="nav-left">
        <div class="logo"><img alt=" " src="/logo.png" /></div>
        <div class="nav-links">
            <a href="/" class:active={routeId === "/"}>Home</a>
            <a href="/create" class:active={routeId === "/create"}>Create</a>
        </div>
    </div>

    <input type="text" class="search" placeholder="Search for" />

    <div class="nav-icons">
        <!-- Rank Icon with Dropdown -->
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

        <!-- User Profile Icon -->
        <a href="/profile">
            <img alt="Profile" src={routeId === "/profile" ? "/profile-active-icon.png" : "/user-profile.png"} />
        </a>
    </div>
</nav>