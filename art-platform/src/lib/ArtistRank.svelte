<style>
    .review-container{
            border: 1px solid grey;
            border-radius: 1rem;
            padding: 1rem 2rem;
            margin: 1rem 1.5rem;
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
      
</style>

<div class="review-container">
    <div class="ranking-container">
        <div class="review-content-flex">      
            <div class="left-header">
                <div>
                    <img src="/logo.png" alt="profile" />
                </div>
           
                <div>
                    <h4>Rachel Emma</h4>   
                </div>
            </div>
            <div class="right-header">
                <div>
                    <h3>4.5</h3>
                </div>
                <div>
                    <p class="star">****</p>
                    <p>324 <a href="/review"><span class="review-border">reviews</span></a></p>
                </div>
            </div>
        </div>      
        
    </div>
    
    <div class="review-content-flex">
        <div class="like-count">
            <div><img class="small-img" src="/heart-blank.png" alt="heart-blank" /></div>
            <div class="bold-text">100k</div>
        </div>
        <div>
            EngagementPt:<span class="bold-text"> 1.5M</span>
        </div>
    </div>
   
    
</div>