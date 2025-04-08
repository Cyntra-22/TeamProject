<script lang="ts">
    import { goto } from '$app/navigation';

    let isFollowing = false;

    // Dynamic user data
    let user = {
        username: 'rachel-emma', 
        name: 'Rachel Emma',     
        bio: 'My work explores the relationship between critical theory and emotional memory.',
        profilePic: '/logo.png', 
    };

    function toggleFollow() {
        isFollowing = !isFollowing;
       
    }

    function navigateToProfile() {
       
        goto(`/profile/${user.username}`);
    }
</script>

<style>
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
        padding: 0.4rem 1rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid hsl(5, 85%, 63%);
        font-size: 0.8rem;
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

<div class="more-profile">
    <div>
        <img src={user.profilePic} alt="profile logo" />
    </div>
    <div>
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
        <button class="pbtn-1" on:click={navigateToProfile}>View Profile</button>
        <button class="pbtn-2" on:click={toggleFollow}>
            {isFollowing ? 'Followed' : '+ Follow'}
        </button>
    </div>
</div>
