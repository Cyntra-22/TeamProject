<script lang="ts">
    let images = [
        "/B1.jpeg", "/B2.jpeg", "/B3.jpeg", "/B4.jpeg",
        "/B5.jpeg", "/B6.jpeg", "/B7.jpeg", "/B8.jpeg",
        "/B1.jpeg", "/B2.jpeg", "/B3.jpeg", "/B4.jpeg",
        "/B5.jpeg", "/B6.jpeg", "/B7.jpeg", "/B8.jpeg",
        "/B9.jpeg","/B2.jpeg"
    ];
</script>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    .gallery img {
        width: 100%;
        
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .gallery img:hover {
        transform: scale(1.05);
    }

    .selected {
        border: 2px solid hsl(5, 85%, 63%);
        border-radius: 0.5rem;
    }
</style>

<div class="gallery">
    {#each images as image, index}
        <img 
            src={image} 
            alt="Buddhist Art {index + 1}" 
            class="{index === 5 ? 'selected' : ''}" 
        />
    {/each}
</div>
