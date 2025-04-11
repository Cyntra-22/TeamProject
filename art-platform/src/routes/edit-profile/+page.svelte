<script lang="ts">
    import { onMount } from 'svelte';
    import { showToast } from '$lib/toast';
    import AccountDetail from "$lib/AccountDetail.svelte";
    import ChangePW from "$lib/ChangePW.svelte";
    import EditProfile from "$lib/EditProfile.svelte";
    import LogOut from "$lib/LogOut.svelte";
    import { goto } from '$app/navigation';

    let currentComponent = "AccountDetail";
    let profileImage = "/logo.png"; 

    function setComponent(component: string) {
        currentComponent = component;
    }

    onMount(async () => {
        try {
            
            const token = localStorage.getItem('token'); 
            
            if (!token) {
                showToast("error", "No token found. Please log in again.");
                return;
            }

           
            const idResponse = await fetch("http://localhost:8000/auth/tokenID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            if (!idResponse.ok) {
                throw new Error("Failed to fetch user ID");
            }

            const userId = await idResponse.json();

         
            const profileResponse = await fetch("http://localhost:8000/profile/getById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: userId })
            });

            if (!profileResponse.ok) {
                throw new Error("Failed to fetch profile data");
            }

            const profileData = await profileResponse.json();
            
           
            if (profileData.profileImage && profileData.profileImage.trim() !== "") {
                profileImage = profileData.profileImage;
            }
        } catch (error) {
            showToast("error", "An error occurred while fetching profile data. Please try again.");
        }
    });
    function back() {
        goto('/profile');
    }
</script>

<style>
    .container {
        display: flex;  
        background: white;
        padding-top: 1rem;
        margin-left: 5rem;
        margin-right: 5rem;
        width: 50%;
        margin: 0 auto;
        margin-top: 1.5rem;
    }

    .sidebar {
        width: 250px;
        background: #F4F4F4;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-right: 1px solid #ddd;
        border-radius: 1rem;
    }

    .sidebar button {
        padding: 15px;
        font-size: 16px;
        text-align: left;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    .sidebar button.active {
        background: #E4714E;
        color: white;
        border-radius: 5px;
    }

    .content {
        flex: 1;
        padding: 30px;
    }

    img {
        width: 150px;
        height: 150px;
        border: 1px solid rgb(234, 201, 201);
        border-radius: 50%;
        padding: 0.2rem;
        margin-left: 3rem;
        margin-bottom: 1rem;
        object-fit: cover; 
    }
    .back {
		position: absolute;
		left: 20rem;
		top: 8rem;
		cursor: pointer;
		font-size: 1.5rem;
	}
</style>

<div class="container">
    <span class="back" on:click={back}>←</span>
   
    <div class="sidebar">
        <img src={profileImage} alt="profile image" />

        <button 
            class={currentComponent === "AccountDetail" ? "active" : ""} 
            on:click={() => setComponent("AccountDetail")}>
            Account Detail
        </button>
        <button 
            class={currentComponent === "ChangePassword" ? "active" : ""} 
            on:click={() => setComponent("ChangePassword")}>
            Change Password
        </button>
        <button 
            class={currentComponent === "EditProfile" ? "active" : ""} 
            on:click={() => setComponent("EditProfile")}>
            Edit Profile
        </button>
        <button 
            class={currentComponent === "LogOut" ? "active" : ""} 
            on:click={() => setComponent("LogOut")}>
            Logout
        </button>
    </div>

 
    <div class="content">
        {#if currentComponent === "AccountDetail"}
            <AccountDetail />
        {:else if currentComponent === "ChangePassword"}
            <ChangePW />
        {:else if currentComponent === "EditProfile"}
            <EditProfile />
        {:else if currentComponent === "LogOut"}
            <LogOut />
        {/if}
    </div>
</div>