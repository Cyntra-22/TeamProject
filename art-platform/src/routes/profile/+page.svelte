<script lang="ts">
    import ProfileRight from "$lib/ProfileRight.svelte";

    let count = 5;
    let images = [
        "/B2.jpeg", "/B3.jpeg", "/B4.jpeg",
        "/B5.jpeg", "/B6.jpeg", "/B7.jpeg", "/B8.jpeg", "/B1.jpeg"
        
    ];
    
</script>
<style>
    .profile-container{
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr;
    }

    .more-profile-container{
        border: 1px solid hsl(5, 85%, 50%);
        border-radius: 1rem;
        padding: 1.5rem 1rem;
    }
    .right-above-container{
        border-radius: 1rem;
        border: 1px solid hsl(5, 85%, 50%);
        padding: 1rem;
        
    }
    .leftside-container{
        margin-right: 1.5rem;
    }
    .right-below-container h3{
        text-align: center;
    }
    .collection{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.3rem;
        padding: 0.5rem;
    }

    .collection img {
        width: 100%;
        border-radius: 0.7rem;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    .collection img:hover {
        transform: scale(1.05);
    }

    .right-above-container img{
        width: 100%;
        height: 100px;
        border-radius: 1rem;
    }

    .profile-right-container{
        display: grid;
        grid-template-columns: 3fr 2fr;
    }

    .img-container{
        margin-top: -5rem;
       
    }

    .img-container img{
        width: 110px;
        height: 110px;
        border: 1px solid rgb(234, 201, 201);
        border-radius: 50%;
        padding: 0.3rem;
    }

    .img-container h3{
        padding: 0;
        margin-bottom: 0.5rem;
        text-align: left;
        
    }

    .profile-right-container p{
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 0.8rem;
        color: rgb(103, 101, 101);
    }

    .img-container{
        padding: 1.2rem;
    }

    .pbtn-2{
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        padding: 0.3rem 1.5rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.8rem;
    }

    .pbtn-2:hover{
        background-color: hsl(5, 85%, 50%);
        
    }

    .like-count{
        display: flex;
        padding-right: 0.5rem;
        
    }

    .info-detail{
        font-size: 0.8rem;
        padding-left: 0.5rem;
        padding-top: 0.3rem;
    }

    .like-count .small-img{
        width: 25px;
        height: 25px;
    }

    .profile-left-container{
        margin-top: 1rem;
    }

    .right-header{
            display: grid;
            grid-template-columns: 1fr 2fr;
    }


    .review-small-container{
        padding-top: 1.9rem;
        margin-left: -4rem;
    }
    h2{
        font-size: 2rem;
    }


    
</style>

<div class="profile-container">
    <div class="leftside-container">
        <div class="right-above-container">
            <img src="/cover.png" alt="cover image" />
            <div class="profile-right-container">
                <div class="img-container">
                    <img src="/logo.png" alt="profile image" />
                    <h3>Reachel Emma</h3>
                    <p>My work explores the relationship between critical theory and emotional memory.</p>
                    <button class="pbtn-2">+ Follow</button>
                    <a href="/edit-profile">
                        <button class="pbtn-2">Edit Profile</button>
                    </a>
                    
                </div>
                <div class="profile-left-container">
                    <div class="like-count">
                        <div><img class="small-img" src="/phone-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">+66624452270, +66945073029</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/email-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">myopa2345artist@gmail.com</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/location-icon.jpg" alt="comment" /></div>
                        <div class="info-detail">Bangkok, Bangkok City, Thailand</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/facebook-icon.jpg" alt="comment" /></div>
                        <div class="info-detail">Rachel Emma</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/link-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">Rachel Emma</div>
                    </div>
                    <div class="right-header">
                        <div>
                            <h2>4.5</h2>
                        </div>
                        <div class="review-small-container">
                            <p class="star">****</p>
                            <p>324 <a href="/review"><span class="review-border">reviews</span></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-below-container">
            <h3>Explore My Collections</h3>
            <div class="collection">
                {#each images as image, index}
                    <img 
                        src={image} 
                        alt="Buddhist Art {index + 1}" 
                        class="{index === 3 ? 'selected' : ''}" 
                    />
                {/each}
            </div>
        </div>
    </div>
    <div class="more-profile-container">
        {#each Array(count) as _, i}
            <ProfileRight />
        {/each}    
    </div>
    
</div>

