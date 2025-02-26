<script lang="ts">
    export let activePage: string = "home";
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
        display: flex;
        gap: 1rem;
    }
    .nav-icons img{
        width: 35px;
        height: 35px;
    }

    .logo img{
        width: 45px;
        height: 50px;
    }
    input{
        margin: 0 0.5rem;
    }
</style>

<nav>
    <div class="nav-left">
        <div class="logo"><img alt=" " src="/logo.png" /></div>
        <div class="nav-links">
            <a href="/" class="{activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="/create" class="{activePage === 'create' ? 'active' : ''}">Create</a>
        </div>
    </div>

    <input type="text" class="search" placeholder="Search for" />

    <div class="nav-icons">
        <img alt=" " src="/rank.png"/>
        <img alt=" " src="/user-profile.png"/>
        
    </div>
</nav>
