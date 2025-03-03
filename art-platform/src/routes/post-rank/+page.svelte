<script lang="ts">
    import PostRank from "$lib/PostRank.svelte";
   
    let count = 10;
  
    function scrollToTop() {

        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>
    
<style>
        .create-post-container {
            padding: 0;
            background: white;
            width: 100%;
        }
    
        .header {
            
            font-weight: bold;
            margin-bottom: 3rem;
            text-align: center;
        }
     
    
      

        .top-btn {

            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background: hsl(5, 85%, 63%);
            color: white;
            padding: 0.5rem 0.3rem;
            border: none;
            border-radius: 1rem;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .top-btn img{
            width: 30px;
            height: 20px;
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr); 
            
           
        }
            
        
    
    </style>
    
    <div class="create-post-container">
        <div class="header">
            <h2>Top Ranking Posts Here !</h2>

        </div> 
        <div class="grid-container">
            {#each Array(count) as _, i}
              <PostRank />
            {/each}      
          </div>
       <button class="top-btn" on:click={scrollToTop}><img src="/topButton.png" alt="top button"></button>
   
    </div>
    
    
    