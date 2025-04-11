<script>
    export let artistName = "";
    export let rating = 5.0;
    export let totalReviews = 0;
    export let likes = 0;
    export let engagementPoints = 0;
    export let userId = "";
    export let userProfile = "";

    $: stars = "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "★" : "");
    let liked = false;
	 // or your initial like count

	function toggleLike() {
		liked = !liked;
	}
</script>

<style>
    .review-container{
        border: 2px solid hsl(5, 85%, 63%);
        border-radius: 1rem;
        padding: 1rem 2rem;
        margin: 1rem 1.5rem;
        box-shadow:1cap 0 20px rgba(75, 33, 33, 0.1);
        background-color: white;
    }
    
    .left-header{
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .right-header{
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .review-content-flex{
        display: flex;
        justify-content: space-between;
    }

    img{
        width: 45px;
        height: 50px;
    }
   
    h4{
        margin: 0.6rem 0; 
    }
    .right-header p{
        margin:0;
        padding: 0;
        font-size: 0.7rem;
    }
    .right-header .star{
        font-size: 1rem;
        padding-top: 0.4rem;
        margin: 0;
    }
    h3{
        font-size: 1.8rem;
        padding-right: 0.5rem;
        margin: 0.5rem 0;
    }
    .review-border{
        border-bottom: 1px solid hsl(5, 85%, 63%);
    }
    a {
        text-decoration: none;
        cursor: pointer;
        color: black;
        font-style: italic;
    }
    .review-content-flex .small-img{
        width: 20px;
        height: 20px;
    }
    .ranking-container{
        margin-bottom: 0.7rem;
    }
    .bold-text{
        font-weight: bold;
    }
    .like-count{
        display: flex;
    }
    .image-preview {
        max-width: 100%;
        max-height: 100%;
    }

    .image-preview img {
        width: 30pt;
        height: 30pt;
        object-fit: cover;
        border-radius: 8px;
    }
    span {
		transition: transform 0.2s;
		user-select: none;
	}

	span:hover {
		transform: scale(1.1);
	}
</style>

<div class="review-container">
    <div class="ranking-container">
        <div class="review-content-flex">      
            <div class="left-header">
                <div class="image-preview">
                    <img src="{userProfile}" alt="profile" />
                </div>
           
                <div>
                    <h4>{artistName}</h4>   
                </div>
            </div>
            <div class="right-header">
                <div>
                    <h3>{rating}</h3>
                </div>
                <div>
                    <p class="star">{stars}</p>
                    <p>{totalReviews} <a href="/review/{userId}"><span class="review-border">reviews</span></a></p>
                </div>
            </div>
        </div>      
    </div>
    
    <div class="review-content-flex">
        <div class="like-count">
            <div><span on:click={toggleLike} style="cursor: pointer; font-size: 1.5rem; font-weight: bold; color: hsl(5, 85%, 63%);">
                {liked ? '❤️' : '🤍'}{likes}
            </span></div>
            
        </div>
        <div>
            EngagementPt: <span class="bold-text"> {engagementPoints}</span>
        </div>
    </div>
</div>