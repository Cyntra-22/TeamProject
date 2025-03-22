<script lang="ts">
    import AccountDetail from "$lib/AccountDetail.svelte";
    import ChangePW from "$lib/ChangePW.svelte";
    import EditProfile from "$lib/EditProfile.svelte";
    import LogOut from "$lib/LogOut.svelte";

    let currentComponent = "AccountDetail";

    function setComponent(component: string) {
        currentComponent = component;
    }
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
    }
</style>

<div class="container">
    <!-- Sidebar -->
    <div class="sidebar">

        <img src="/logo.png" alt="profile image" />

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
