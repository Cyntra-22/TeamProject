<style>
    .review-container{
            border: 1px solid grey;
            border-radius: 1rem;
            padding: 1rem 2rem;
            margin: 1rem 1.5rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
        }

        .left-header{
            display: flex;
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
            grid-template-columns: 6fr 2fr;
        }

      
        img{
            width: 45px;
            height: 50px;
        }
       
        h4{
            margin: 0.6rem 0.2rem; 
            
        }
       
       .review-content-flex .small-img{
      
        width: 20px;
        height: 20px;
       }
       
       .bold-text{
            font-weight: bold;
       }
       .like-count{
            display: flex;
            padding-right: 0.5rem;
        
       }
       .bit-img img{
        width: 150px;
        height: 200px;
        border: 1px solid hsl(5, 85%, 63%);
        border-radius: 1rem;
       }
       .right-container{
        margin-left: 0.2rem;
       }
       .trophy-img img{
        width: 70px;
        height: 70px;
       }
      
</style>

<div class="review-container">
    <div class="bit-img">
        <img src="/logo.png" alt="logo" />
    </div>
    <div class="right-container">
        <div>
            <div class="header-container">
                <div class="left-header">
                    <img src="/logo.png" alt="profile" />
                    <h4>Rachel Emma</h4> 
                </div>

                <div class="trophy-img">
                    <img src="/gold.png" alt="profile" />
                </div>
            </div>
            <div>
                <h4>Phone Wallpaper</h4>
                <p>aesthetic, apple, airpods pro, airpods max, iphone, iphone pro,</p>
            </div>
        </div>
        <div class="review-content-flex">
            <div class="like-count">
                <div><img class="small-img" src="/heart-blank.png" alt="heart-blank" /></div>
                <div class="bold-text">100k</div>
            </div>
            <div class="like-count">
                <div><img class="small-img" src="/comment.png" alt="comment" /></div>
                <div class="bold-text">10k</div>
            </div>
        </div>
    </div>
    

</div>






