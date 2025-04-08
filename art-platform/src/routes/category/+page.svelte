<script lang="ts">
    import { goto } from "$app/navigation";

    let selectedRole: string | null = null;

    function selectRole(role: string) {
        selectedRole = role;
    }

    function continueAction() {
        if (selectedRole) {
            alert(`You selected: ${selectedRole}`);
            goto('/user-interest');
            // Perform navigation or further action
        }
    }
</script>
<style>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 12rem auto;
    }


    .login-box {
        background-color: #fff;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 350px;
        text-align: center;
    }

    .login-box h2 {
        margin-bottom: 2rem;
        color: #333;
    }

    

    .button-container button {
        padding: 0.5rem 5rem;
        border: none;
        border-radius: 2rem;
        font-size: 0.9rem;
        cursor: pointer;
        color: #fff;
        background-color: hsl(5, 85%, 63%);
        margin-top: 1rem;
    }

    .category {
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-around;
    }

    .category-container{
        border: 1px solid grey;
        border-radius: 1rem;
        padding: 1rem;
    }

   .category button{
        background-color: white;
        cursor: pointer;
   }

    .button-container button:hover {
        background-color: hsl(5, 67%, 52%);
    }

    img{
        width: 100px;
        height: 100px;
        padding: 0px;
    }
    p{
        padding: 0;
        margin: 0;
    }

    .selected {
        border: 2px solid hsl(5, 85%, 63%);
        background-color: rgba(255, 99, 71, 0.2);
    }

    .button-container button:disabled {
        background-color: hsl(5, 85%, 63%);
        cursor: not-allowed;
    }

</style>

<div class="container">
    <div class="login-box">
        <h2>Please select your role</h2>

        <div class="category">
            <button
                class="category-container {selectedRole === 'artist' ? 'selected' : ''}"
                type="button"
                on:click={() => selectRole('artist')}
                on:keydown={(e) => e.key === "Enter" && selectRole('artist')}
            >
                <img alt="artist profile" src="/artist-profile.png" />
                <p>Artist</p>
            </button>

            <button
                class="category-container {selectedRole === 'user' ? 'selected' : ''}"
                type="button"
                on:click={() => selectRole('user')}
                on:keydown={(e) => e.key === "Enter" && selectRole('user')}
            >
                <img alt="user profile" src="/user-profile.png" />
                <p>User</p>
            </button>
        </div>

        <div class="button-container">
            <button type="submit" on:click={continueAction} disabled={!selectedRole}>
                Continue
            </button>
        </div>
    </div>
</div>