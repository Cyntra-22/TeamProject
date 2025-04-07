<script lang="ts">
    import Home from "$lib/Home.svelte";
    import { images } from '$lib/images';
 
</script>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

</style>

<div class="gallery">
   <Home/>
</div>
