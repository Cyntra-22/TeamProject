<script lang="ts">
    import ProfileLeft from "$lib/ProfileLeft.svelte";

    let count = 5;
    let images = [
        "/B2.jpeg", "/B3.jpeg", "/B4.jpeg",
        "/B5.jpeg", "/B6.jpeg", "/B7.jpeg", "/B8.jpeg", "/B1.jpeg"
        
    ];
    
</script>
<style>
    .profile-container{
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr;
    }

    .more-profile-container{
        border: 1px solid hsl(5, 85%, 50%);
        border-radius: 1rem;
        padding: 1.5rem 1rem;
    }
    .right-above-container{
        border-radius: 1rem;
        border: 1px solid hsl(5, 85%, 50%);
        padding: 1rem;
        
    }
    .leftside-container{
        margin-right: 1.5rem;
    }
    h3{
        text-align: center;
    }
    .collection{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.3rem;
        padding: 0.5rem;
    }

    .collection img {
        width: 100%;
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .collection img:hover {
        transform: scale(1.05);
    }

    
</style>

<div class="profile-container">
    <div class="leftside-container">
        <div class="right-above-container">
            <h1>hello</h1>
        </div>
        <div class="right-below-container">
            <h3>Explore My Collections</h3>
            <div class="collection">
                {#each images as image, index}
                    <img 
                        src={image} 
                        alt="Buddhist Art {index + 1}" 
                        class="{index === 3 ? 'selected' : ''}" 
                    />
                {/each}
            </div>
        </div>
    </div>
    <div class="more-profile-container">
        {#each Array(count) as _, i}
            <ProfileLeft />
        {/each}    
    </div>
    
</div>

