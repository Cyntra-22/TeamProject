<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let showPassword = {
        previous: false,
        new: false,
        confirm: false
    };

    let userId: string | null = null;

    onMount(async () => {
        const token = localStorage.getItem("token");
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
                    const data = await response.json();
                    userId = data
                    console.log("User ID:", userId);
                } else {
                    console.error("Failed to fetch user ID", response.status);
                }
            } catch (err) {
                console.error("Error fetching user ID:", err);
            }
        } else {
            console.warn("No token found in localStorage");
        }
    });
    let currentPassword: string = "";
    let newPassword: string = "";
    let confirmNewPassword: string = "";

    
    const handleSubmit = async (event: Event) => {
        event.preventDefault();

       
        if (newPassword !== confirmNewPassword) {
            alert("New Password and Confirm New Password do not match.");
            return;
        }

       
        const payload = {
            userId,
            currentPassword,
            newPassword,
            confirmNewPassword
        };

        try {
            const res = await fetch("http://localhost:8000/auth/passwordchange", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            console.log(payload)

            if (res.ok) {
                const data = await res.json();
                console.log("Password changed successfully:", data);
                alert("Password changed successfully");
                goto("/profile");
                
            } else {
                const errorData = await res.json();
                console.error("Failed to change password:", errorData);
                alert("Failed to change password. Please try again.");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            alert("Error occurred while changing password.");
        }
    };
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 1rem;
        color: #555;
        text-align: left;
        margin-bottom: 0.3rem;
    }

    .input-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    input {
        width: 100%;
        padding: 12px;
        font-size: 0.9rem;
        border: 1px solid #ddd;
        border-radius: 2rem;
        background-color: #f9f9f9;
        margin-bottom: 1rem;
        padding-right: 40px; /* Space for icon */
    }

    input:focus {
        outline: none;
        border-color: hsl(5, 85%, 63%);
    }

    .eye-icon {
        position: absolute;
        right: 12px;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
    }

    .eye-icon img {
        width: 20px;
        height: 20px;
        margin-top: -12px;
    }

    .signup-btn {
        padding: 12px;
        background-color: hsl(5, 85%, 63%);
        color: white;
        border: none;
        border-radius: 2rem;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 15px;
        float: right;
    }

    .signup-btn:hover {
        background-color: hsl(5, 80%, 57%);
    }
</style>

<h2>Account Settings</h2>

<div>
    <form on:submit={handleSubmit}>
        <label for="pre-password">Previous Password</label>
        <div class="input-container">
            <input type={showPassword.previous ? "text" : "password"} id="pre-password" bind:value={currentPassword} required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, previous: !showPassword.previous }} >
                <img src={showPassword.previous ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <label for="new-password">New Password</label>
        <div class="input-container">
            <input type={showPassword.new ? "text" : "password"} id="new-password" bind:value={newPassword} required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, new: !showPassword.new }} >
                <img src={showPassword.new ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <label for="confirm-password">Confirm Password</label>
        <div class="input-container">
            <input type={showPassword.confirm ? "text" : "password"} id="confirm-password" bind:value={confirmNewPassword} required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, confirm: !showPassword.confirm }} >
                <img src={showPassword.confirm ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <button type="submit" class="signup-btn">Change Password</button>
    </form>
</div>
