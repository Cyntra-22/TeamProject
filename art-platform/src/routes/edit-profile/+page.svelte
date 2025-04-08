<script lang="ts">
    import { onMount } from 'svelte';
    import AccountDetail from "$lib/AccountDetail.svelte";
    import ChangePW from "$lib/ChangePW.svelte";
    import EditProfile from "$lib/EditProfile.svelte";
    import LogOut from "$lib/LogOut.svelte";

    let currentComponent = "AccountDetail";
    let profileImage = "/logo.png"; // Default image

    function setComponent(component: string) {
        currentComponent = component;
    }

    onMount(async () => {
        try {
            // Get token from localStorage or your auth store
            const token = localStorage.getItem('token'); // Adjust based on how you store the token
            
            if (!token) {
                console.error("No token found");
                return;
            }

            // Step 1: Get user ID from token
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

            // Step 2: Get profile using the user ID
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
            
            // Step 3: Update profile image with data from the server
            if (profileData.profileImage && profileData.profileImage.trim() !== "") {
                profileImage = profileData.profileImage;
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    });
</script>

<style>
    .container {
        display: flex;  
        background: white;
        padding-top: 1rem;
        margin-left: 5rem;
        margin-right: 5rem;
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
        object-fit: cover; /* Ensures the image covers the area nicely */
    }
</style>

<div class="container">
    <!-- Sidebar -->
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

    <!-- Dynamic Content -->
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