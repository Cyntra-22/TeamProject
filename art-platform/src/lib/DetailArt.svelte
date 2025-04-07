<script>
	export let image;
	export let id;
    console.log("Image:", image, id);
</script>

{#if image}
	<h2>Buddhist Art #{id + 1}</h2>
	<img src={image} alt={`Buddhist Art ${id + 1}`} style="width: 100%; max-width: 600px; border-radius: 0.7rem;" />
	<p style="margin-top: 1rem;">This is the detail page for Buddhist Art #{id + 1}. You can describe the history, origin, or meaning of the artwork here.</p>
{/if}
hello
