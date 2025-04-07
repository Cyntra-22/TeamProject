<script>
  import {images} from './images.js';
    
</script>

<style>
    img {
        width: 100%;
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    img:hover {
        transform: scale(1.05);
    }

    .selected {
        border: 2px solid hsl(5, 85%, 63%);
        border-radius: 0.5rem;
    }
</style>

{#each images as image, index}
    <a href ={`/art-detail/${image.id}`}>
        <img 
            src={image.src} 
            alt={image.title} 
            class="{index === 5 ? 'selected' : ''}" 
        />
    </a>
{/each}