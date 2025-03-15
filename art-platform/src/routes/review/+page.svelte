<script lang="ts">
    import WriteReview from "$lib/WriteReview.svelte";
   
    let count = 5;
    function writeReview(){
        
    }
    function scrollToTop() {

        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>
    
<style>
        .create-post-container {
            padding: 2rem;
            background: white;
            width: 100%;
        }
    
        .header {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 3rem;
            
            display: flex;
            justify-content: space-between;
        }
     
    
        .review-btn {
            background-color: hsl(5, 85%, 63%);
            color: white;
            padding: 0.5rem 3rem;
            border: none;
            border-radius: 3rem;
            font-size: 1rem;
            cursor: pointer;
            align-self: flex-start;
        }

        .review-btn:hover{
        background-color: hsl(5, 85%, 50%);
       
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
            
        
    
    </style>
    
    <div class="create-post-container">
        <div class="header">
            <div>Reviews</div>
            <div><button class="review-btn" on:click={writeReview}>Review Here</button></div>
        </div> 
        <div>
            {#each Array(count) as _, i}
                <WriteReview/>
            {/each}
            
        </div>
       <button class="top-btn" on:click={scrollToTop}><img src="/topButton.png" alt="top button"></button>
   
    </div>
    
    
    