<script>
    export let title = "Phone Wallpaper";
    export let username = "Rachel Emma";
    export let tags = "aesthetic, apple, airpods pro, airpods max, iphone, iphone pro";
    export let likes = "100k";
    export let imageUrl = "/logo.png";
    export let profileUrl = "/logo.png";
    export let trophy = "/gold.png";

    let liked = false;
	 // or your initial like count

	function toggleLike() {
		liked = !liked;
		likes += liked ? 1 : -1;
	}
</script>
<style>
    .review-container{
            border: 2px solid hsl(5, 85%, 63%);
            border-radius: 1rem;
            padding: 1rem 2rem;
            margin: 1rem 1.5rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
           box-shadow:1cap 0 20px rgba(80, 38, 38, 0.1);
           background-color: white; 
        }

        .left-header{
            display: flex;
        }
        .left-header img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid hsl(5, 85%, 63%);
            padding: 0.1rem;
        }

        p{
            padding-left: 0.2rem;
            font-size: 0.8rem;
        }

        .review-content-flex{
            display: flex;
            float: right;
            margin-top: 1rem;
            
        }

        .header-container{
            display: grid;
            grid-template-columns: 7fr 2fr;
        }

      
        img{
            width: 45px;
            height: 50px;
        }
       
        h4{
            margin: 0.6rem 0.2rem; 
            
        }
       
      
       .like-count{
            display: flex;
            padding-right: 0.5rem;
        
       }
       .bit-img img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        max-width: 11rem;
        max-height: 11rem;
        border-radius: 1rem;
        
       }
       .right-container{
        margin-left: 0.2rem;
       }
       .trophy-img img{
        width: 90px;
        height: 90px;
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
    <div class="bit-img">
        <img src={imageUrl} alt={imageUrl} />
    </div>
    <div class="right-container">
        <div>
            <div class="header-container">
                <div class="left-header">
                    <img src={profileUrl} alt="profile" />
                    <h4>{username}</h4> 
                </div>

                {#if trophy}
                    <div class="trophy-img">
                        <img src={trophy} alt={trophy} />
                    </div>
                    {:else}
                    <div class="trophy-img">
                        <img src="/default_tropy.png" alt="Default Trophy" />
                    </div>
                {/if}
                    
            </div>
            <div>
                <h4>{title}</h4>
                <p>{tags}</p>
            </div>
        </div>
        <div class="review-content-flex">
            <div class="like-count">
                <div><span on:click={toggleLike} style="cursor: pointer; font-size: 1.5rem; font-weight: bold; color: hsl(5, 85%, 63%);">
                    {liked ? '❤️' : '🤍'}{likes}
                </span></div>
                
            </div>
        </div>
    </div>
    

</div>






