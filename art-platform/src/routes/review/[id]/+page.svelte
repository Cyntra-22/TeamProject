<script lang="ts">
    import WriteReview from "$lib/WriteReview.svelte";
    import { showToast } from '$lib/toast';
    import { page } from '$app/stores';

    let showReviewModal = false;
    let note = "";
    let selectedStars = 0;

    type Review = {
        author: string;
        date: string;
        stars: number;
        content: string;
    };

    let reviews: Review[] = [];


  
    function writeReview() {
      showReviewModal = true;
    }
  
    function closeReview() {
      showReviewModal = false;
      note = "";
      selectedStars = 0;
    }
  
    async function submitReview() {
      const token = localStorage.getItem("token");
      if (token)
      {
        const userId = await fetch("http://localhost:8000/auth/tokenID", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });
        
        if (userId.ok){
          const sessionUserId = await userId.json()
          const reviewPayload = {
            rating: selectedStars,
            description: note,
            userId: sessionUserId,
            revieweeId: $page.params.id
          }
          
          const res = await fetch("http://localhost:8000/review/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reviewPayload)
                });
          console.log(await res.json())
        } else {
          // server error
        }
      } else {
        showToast("error", "Unauthorized")
      }
        closeReview();
      }
  
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function setStars(n: number) {
        selectedStars = n;
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
  
    .review-btn:hover {
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
  
    .top-btn img {
      width: 30px;
      height: 20px;
    }
  
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .modal {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  
    .stars {
      font-size: 1.5rem;
      color: #f0803c;
      margin-bottom: 1rem;
    }
  
    .title {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  
 
  
    textarea {
      width: 90%;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid #ccc;
      resize: none;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  
    .btns {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  
    .btn {
      flex: 1;
      padding: 0.75rem;
      border-radius: 1rem;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }
  
    .cancel {
      background-color: #eee;
    }
  
    .submit {
      background-color: hsl(5, 85%, 63%);
      color:white;

    }
  </style>
  
  <div class="create-post-container">
    <div class="header">
      <div>Reviews</div>
      <div><button class="review-btn" on:click={writeReview}>Review Here</button></div>
    </div> 
  
    <button class="top-btn" on:click={scrollToTop}>
      <img src="/topButton.png" alt="top button" />
    </button>
  
    {#if showReviewModal}
      <div class="modal-overlay">
        <div class="modal">
            <div class="stars">
                {#each Array(5) as _, i}
                  <span
                    on:click={() => setStars(i + 1)}
                    style="cursor: pointer; color: {i < selectedStars ? '#f0803c' : '#ccc'};"
                  >
                    ★
                  </span>
                {/each}
              </div>
          <div class="title">Write Your Review Here !</div>
          
          <textarea bind:value={note} rows="4" placeholder="Write your note"></textarea>
          <div class="btns">
            <button class="btn cancel" on:click={closeReview}>Cancel</button>
            <button class="btn submit" on:click={submitReview}>Submit</button>
          </div>
        </div>
      </div>
    {/if}
    {#each reviews as review}
        <WriteReview
            author={review.author}
            date={review.date}
            stars={review.stars}
            content={review.content}
        />
    {/each}
  </div>
  