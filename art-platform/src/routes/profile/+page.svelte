<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores'; 
    import { showToast } from '$lib/toast';
    import ProfileRight from "$lib/ProfileRight.svelte";
    $: username = $page.params.username;

    let count = 5;
    let images = [
        "/B2.jpeg", "/B3.jpeg", "/B4.jpeg",
        "/B5.jpeg", "/B6.jpeg", "/B7.jpeg", "/B8.jpeg", "/B1.jpeg"
    ];

    let userID: string | null = null;
    let profile: any = null;
    let isOwnProfile: boolean = false;
    let followers: any[] = [];
    let following: any[] = [];
    let followerProfiles: any[] = [];
    let followingProfiles: any[] = [];
    let isFollowingUser: boolean = false;
    let isArtist: boolean = false; 
    let artistPosts: any[] = [];
    let rating: any | null = null;
    let reviewAmount: any | null = null;

    onMount(async () => {
        const token = localStorage.getItem("token");
        const urlProfileId = $page.url.searchParams.get('id'); 

        if (token) {
            try {
               
                const response = await fetch("http://localhost:8000/auth/tokenID", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });

                if (response.ok) {
                    const currentUserId = await response.json();
                    
                    
                    if (urlProfileId) {
                        userID = urlProfileId;
                        isOwnProfile = currentUserId === urlProfileId;
                    } else {
                        userID = currentUserId;
                        isOwnProfile = true;
                    }
                   
                    const profileRes = await fetch("http://localhost:8000/profile/getById", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ _id: userID })
                    });

                    if (profileRes.ok) {
                        profile = await profileRes.json();
                        
                        isArtist = profile.role === "artist"; 
                        
                        const followersRes = await fetch("http://localhost:8000/follow/followers", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ userId: userID })
                        });

                        if (followersRes.ok) {
                            followers = await followersRes.json();
                            
                            if (!isOwnProfile) {
                                isFollowingUser = followers.some(follower => follower.followerId === currentUserId);
                            }
                            
                           
                            followerProfiles = await Promise.all(
                                followers.map(async (follower) => {
                                    try {
                                        const followerProfileRes = await fetch("http://localhost:8000/profile/getById", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({ _id: follower.followerId })
                                        });
                                        
                                        if (followerProfileRes.ok) {
                                            const followerProfile = await followerProfileRes.json();
                                            return {
                                                ...followerProfile,
                                                _id: follower.followerId
                                            };
                                        }
                                        return {
                                            firstName: "Unknown",
                                            lastName: "User",
                                            profileImage: "/logo.png",
                                            _id: follower.followerId
                                        };
                                    } catch (err) {
                                        showToast("error", "Failed to fetch follower profile. Please try again.");
                                        return {
                                            firstName: "Unknown",
                                            lastName: "User",
                                            profileImage: "/logo.png",
                                            _id: follower.followerId
                                        };
                                    }
                                })
                            );
                        } else {
                            showToast("error", "Failed to fetch followers. Please try again.");
                        }

                       
                        const followingRes = await fetch("http://localhost:8000/follow/following", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ userId: userID })
                        });

                        if (followingRes.ok) {
                            following = await followingRes.json();
                            
                            followingProfiles = await Promise.all(
                                following.map(async (following) => {
                                    try {
                                        const followingProfileRes = await fetch("http://localhost:8000/profile/getById", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({ _id: following.userId })
                                        });
                                        
                                        if (followingProfileRes.ok) {
                                            const followingProfile = await followingProfileRes.json();
                                            return {
                                                ...followingProfile,
                                                _id: following.userId
                                            };
                                        }
                                        return {
                                            firstName: "Unknown",
                                            lastName: "User",
                                            profileImage: "/logo.png",
                                            _id: following.userId
                                        };
                                    } catch (err) {
                                        showToast("error", "Failed to fetch following profile. Please try again.");
                                        return {
                                            firstName: "Unknown",
                                            lastName: "User",
                                            profileImage: "/logo.png",
                                            _id: following.userId
                                        };
                                    }
                                })
                            );
                        } else {
                            showToast("error", "Failed to fetch following. Please try again.");
                        }

                       
                        if (isArtist) {
                            const artistPostsRes = await fetch("http://localhost:8000/post/getPostByUserId", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ userId: userID })
                            });

                            if (artistPostsRes.ok) {
                                artistPosts = await artistPostsRes.json();
                                
                            } else {

                            }
                            
                            const res = await fetch("http://localhost:8000/review/getAllReviewsByRevieweeId", {
                                method: "POST",
                                headers: {
                                "Content-Type": "application/json"
                                },
                                body: JSON.stringify({id: userID})
                            });
                            if (res.ok) {
                                const reviewData = await res.json();
                                let tempRating = 0;
                                for (const review of reviewData){
                                    tempRating += review.rating
                                }
                                rating = tempRating / reviewData.length
                                reviewAmount = reviewData.length
                            }
                            else{
                                rating = -1
                            }
                        }
                    } else {
                        showToast("error", "Failed to fetch profile. Please try again.");
                    }
                } else {
                    showToast("error", "Failed to fetch user ID. Please log in again.");
                }
            } catch (err) {
                showToast("error", "An error occurred while fetching user ID. Please try again.");
            }
        } else {
            showToast("error", "No token found. Please log in again.");
        }
    });

    async function toggleFollow() {
        if (!userID) return;
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                showToast("error", "No token found. Please log in again.");
                return;
            }

            const currentUserRes = await fetch("http://localhost:8000/auth/tokenID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            if (currentUserRes.ok) {
                const currentUserId = await currentUserRes.json();
                
                const followData = {
                    userId: userID,
                    followerId: currentUserId
                };

                
                if (!isFollowingUser) {
                    
                    const followRes = await fetch("http://localhost:8000/follow/follows", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...followData,
                            recstatus: 1
                        })
                    });
                    
                    if (followRes.ok) {
                        showToast("info", "Successfully followed user");
                        isFollowingUser = true;
                    } else {
                        showToast("error", "Failed to follow user. Please try again.");
                    }
                } else {
                    
                    const unfollowRes = await fetch("http://localhost:8000/follow/unfollow", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...followData,
                        })
                    });
                    
                    if (unfollowRes.ok) {
                        showToast("info", "Successfully unfollowed user");
                        isFollowingUser = false;
                    } else {
                        showToast("error", "Failed to unfollow user. Please try again.");
                    }
                }
                
               
                const followersRes = await fetch("http://localhost:8000/follow/followers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: userID })
                });

                if (followersRes.ok) {
                    followers = await followersRes.json();
                    
                    
                    followerProfiles = await Promise.all(
                        followers.map(async (follower) => {
                            try {
                                const followerProfileRes = await fetch("http://localhost:8000/profile/getById", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ _id: follower.followerId })
                                });
                                
                                if (followerProfileRes.ok) {
                                    const followerProfile = await followerProfileRes.json();
                                    return {
                                        ...followerProfile,
                                        _id: follower.followerId
                                    };
                                }
                                return {
                                    firstName: "Unknown",
                                    lastName: "User",
                                    profileImage: "/logo.png",
                                    _id: follower.followerId
                                };
                            } catch (err) {
                                showToast("error", "Failed to fetch follower profile. Please try again.");
                                return {
                                    firstName: "Unknown",
                                    lastName: "User",
                                    profileImage: "/logo.png",
                                    _id: follower.followerId
                                };
                            }
                        })
                    );
                }
            }
        } catch (err) {
            showToast("error", "An error occurred while toggling follow. Please try again.");
        }
    }

    let showFollowersModal = false;
    let showFollowingModal = false;

    function navigateToProfile(userId: string) {
        window.location.href = `/profile?id=${userId}`;
    }
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
        padding: 1.5rem 1.5rem;
        height: 850px;
        
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
        margin-left: -5rem;
    }
    h2{
        font-size: 2rem;
    }


    .follow-stats {
        font-size: 0.8rem;
        margin-top: 1rem;
        cursor: pointer;
        color: #333;
    }
    .follow-stats span {
        margin-right: 1rem;
        font-weight: bold;
    }

    .follow-stats span:hover {
        text-decoration: underline;
        color: hsl(5, 85%, 63%);
    }

    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999;
    }

    .modal-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1rem;
        width: 300px;
        max-height: 70vh;
        overflow-y: auto;
        border-radius: 1rem;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .modal-user {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        text-decoration: none;
        color: #333;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background 0.2s;
        cursor: pointer;
    }

    .modal-user:hover {
        background-color: #f0f0f0;
    }

    .modal-user img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999;
    }

    .modal-box h3{
        border-bottom: 1px solid hsl(5, 85%, 63%);
        padding-bottom: 0.5rem;
    }

    .loading {
        text-align: center;
        padding: 1rem;
        color: #666;
    }
</style>

<div class="profile-container">
    <div class="leftside-container">
        <div class="right-above-container">
           
            <img src="/cover.png" alt="cover image" />
            <div class="profile-right-container">
                <div class="img-container">
                   
                    <img src={profile?.profileImage || "/logo.png"} alt="profile image" />
                    <h3>{profile?.firstName} {profile?.lastName}
                        {#if isArtist}
                        <span class="artist-icon" title="Artist Profile">🎨</span>
                        {/if}
                    </h3>
                    <p>My work explores the relationship between critical theory and emotional memory.</p>
                    
                    {#if isOwnProfile}
                    <a href="/edit-profile">
                        <button class="pbtn-2">Edit Profile</button>
                    </a>
                    {:else}
                        <button class="pbtn-2" on:click={toggleFollow}>
                            {isFollowingUser ? "Following" : "+ Follow"}
                        </button>
                    {/if}
                    
                    <div class="follow-stats">
                        <span on:click={() => showFollowersModal = true}>
                            <strong>{followers.length}</strong> Followers
                        </span> • 
                        <span on:click={() => showFollowingModal = true}>
                            <strong>{following.length}</strong> Following
                        </span>
                    </div>
                </div>
                {#if showFollowersModal}
                    <div class="modal-backdrop" on:click={() => showFollowersModal = false}></div>
                    <div class="modal-box">
                        <h3>Followers</h3>
                        <div class="modal-content">
                        {#if followers.length === 0}
                            <p>No followers yet</p>
                        {:else if followerProfiles.length === 0}
                            <p class="loading">Loading...</p>
                        {:else}
                            {#each followerProfiles as follower}
                                <div class="modal-user" on:click|stopPropagation={() => navigateToProfile(follower._id)}>
                                <img src={follower.profileImage || "/logo.png"} alt="profile" />
                                <span>{follower.firstName} {follower.lastName}</span>
                                </div>
                            {/each}
                        {/if}
                        </div>
                    </div>
                {/if}

                {#if showFollowingModal}
                    <div class="modal-backdrop" on:click={() => showFollowingModal = false}></div>
                    <div class="modal-box">
                        <h3>Following</h3>
                        <div class="modal-content">
                        {#if following.length === 0}
                            <p>Not following anyone yet</p>
                        {:else if followingProfiles.length === 0}
                            <p class="loading">Loading...</p>
                        {:else}
                            {#each followingProfiles as follow}
                                <div class="modal-user" on:click|stopPropagation={() => navigateToProfile(follow._id)}>
                                <img src={follow.profileImage || "/logo.png"} alt="profile" />
                                <span>{follow.firstName} {follow.lastName}</span>
                                </div>
                            {/each}
                        {/if}
                        </div>
                    </div>
                {/if}

                <div class="profile-left-container">
                    <div class="like-count">
                        <div><img class="small-img" src="/phone-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">+66624452270, +66945073029</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/email-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">{profile?.email}</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/location-icon.jpg" alt="comment" /></div>
                        <div class="info-detail">Bangkok, Bangkok City, Thailand</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/facebook-icon.jpg" alt="comment" /></div>
                        <div class="info-detail">{profile?.facebook || "No Facebook profile"}</div>
                    </div>
                    <div class="like-count">
                        <div><img class="small-img" src="/link-logo.jpg" alt="comment" /></div>
                        <div class="info-detail">{profile?.linkedin || "No LinkedIn profile"}</div>
                    </div>
                    
                    
                    {#if isArtist}
                    <div class="right-header">
                        <div>
                            <h2>{Number(rating).toFixed(2)}</h2>
                        </div>
                        <div class="review-small-container">
                            <p class="star">{"★".repeat(Math.floor(rating))}</p>
                            <p>{reviewAmount} {#if userID}
                                <a href={`/review/${userID}`}><span class="review-border">reviews</span></a>
                            {:else}
                                <span class="review-border">reviews</span>
                            {/if} </p>
                        </div>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
        {#if isArtist}
            <div class="right-below-container">
                <h3>Explore My Collections</h3>
                <div class="collection">
                    {#each artistPosts as post, index (post.id)}
                        <a href ={`/art-detail/${post.id}`}>
                            <img 
                            src={post.postImage} 
                            alt="{post.title}" 
                            class="{index === 3 ? 'selected' : ''}" 
                            />
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
    <div class="more-profile-container">
        <ProfileRight />
    </div>
</div>