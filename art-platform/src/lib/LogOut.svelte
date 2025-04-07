<script lang="ts">
    import { userInfo } from "$lib/loginUserInfo";

    function cancelLogout() {
        // Go back to previous page or home page

        history.back();
    }

    function handleLogout() {
        // Clear token from localStorage
        localStorage.removeItem("token");
        
        userInfo.set({
            id: null,
            name: "",
            email: "",
            isLoggedIn: false,
        });

        window.location.href = "/login";
    }
</script>

<div class="logout-container">
    <div class="logout-box">
        <h2>Are you sure want to log out?</h2>
        <form>
            <button class="pbtn-2" onclick={cancelLogout}>Cancel</button>
            <button class="pbtn-1" onclick={handleLogout}>Log Out</button>
        </form>
    </div>
</div>

<style>
    .logout-container {
        padding-top: 5rem;
    }
    .logout-box {
        width: 50%;
        margin: 0 auto;
        padding: 2rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .pbtn-2 {
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        padding: 0.5rem 1.5rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.8rem;
    }

    .pbtn-2:hover {
        background-color: hsl(5, 85%, 50%);
    }

    .pbtn-1 {
        background-color: white;
        color: hsl(5, 85%, 63%);
        border: none;
        padding: 0.4rem 1rem;
        margin-top: 1rem;
        border-radius: 20px;
        cursor: pointer;
        border: 1px solid hsl(5, 85%, 63%);
        font-size: 0.8rem;
    }

    .pbtn-1:hover {
        color: hsl(5, 85%, 50%);
        border: 1px solid hsl(5, 85%, 50%);
    }
</style>
