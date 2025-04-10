<script lang="ts">
    export let author: string;
    export let date: string;
    export let stars: number;
    export let content: string;
    export let userProfile;
</script>
<style>
    .review-container{
            border: 1px solid grey;
            border-radius: 1rem;
            padding: 1rem 2rem;
            margin: 1rem 3rem;
        }

        
        .review-content-header{
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
        .review-content-header p{
            font-size: 0.6rem;
            padding: 0;
            margin: 0;
        }
        h4{
            margin: 0.4rem 0; 
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
</style>

<div class="review-container">
    <div >
        <div class="review-content-flex">      
            <div class="review-content-header">
                <div class="image-preview">
                    <img src="{userProfile}" alt="profile" />
                </div>
           
                <div>
                    <h4>{author}</h4>
                    <p>{date}</p>
                </div>
            </div>
            <div>{"★".repeat(stars)}</div>
        </div>      
        
    </div>
    
    <div>
        <p>{content}</p>
    </div>
   
    
</div>