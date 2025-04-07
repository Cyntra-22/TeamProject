<script lang="ts">
    import { images } from '$lib/images';
    import DetailArt from '$lib/DetailArt.svelte';
  
    export let params: { id: string };
    let id = parseInt(params.id);
  
    // Check if the ID is valid
    let selectedImage = !isNaN(id) && id >= 0 && id < images.length ? images[id] : null;
  </script>
  
  <div>

    {#if selectedImage}
        <DetailArt image={selectedImage} id={id} />
    {:else}
        <p>Image not found.</p>
    {/if}
Hlelel
</div>
  

  