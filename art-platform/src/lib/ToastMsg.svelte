<script lang="ts">
  import { toast } from '$lib/toast';
  import { fly, fade } from 'svelte/transition';
  import { derived } from 'svelte/store';

  const visibleToast = derived(toast, $t => $t);
</script>

{#if $visibleToast.visible}
  <div
    class="toast"
    transition:fly={{ y: 20, duration: 200 }}
    data-type={$visibleToast.type}
  >
    {$visibleToast.message}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1.5rem 2rem;
    border-radius: 0.75rem;
    font-weight: bold;
    color: white;
    z-index: 9999;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    max-width: 80%;
    text-align: center;
  }

  .toast[data-type="info"] {
    background-color: #2d9cdb;
  }

  .toast[data-type="warning"] {
    background-color: #f2c94c;
    color: #000;
  }

  .toast[data-type="error"] {
    background-color: #eb5757;
  }
</style>
