<script lang="ts">

import {onMount} from "svelte";

interface User {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    birthdate: string;
}

function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirm-password") as HTMLInputElement).value;
    const firstName = (form.elements.namedItem("firstname") as HTMLInputElement).value;
    const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
    const birthdate = (form.elements.namedItem("birthday") as HTMLInputElement).value;

    // Validation
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user: User = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastname,
        birthdate: birthdate
    };
    console.log(user)
    registerUser(user);
}

async function registerUser(user: User) {
    try {
        const response = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            // If you want to include cookies, add this line:
            // credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("User created:", data);
            alert("Sign-up successful! Welcome to Art World.");
            window.location.href = "/login";
        } else {
            const errorData = await response.json();
            console.error("Error creating user:", errorData.detail);
            alert(`Error: ${errorData.detail}`);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("Unexpected error. Please try again.");
    }
}

onMount(() => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});

</script>
<style>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        margin: 5rem auto;
    }


    .signup-box {
        background-color: #fff;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(55, 17, 17, 0.1);
        text-align: center;
        width: 100%;
    }

    .signup-box h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #333;
    }

    .signup-box p {
        margin-bottom: 28px;
        color: #666;
        font-size: 0.9rem;
    }

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

    input {
        padding: 12px;
        font-size: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 2rem;
        background-color: #f9f9f9;
        margin-bottom: 1rem;
    }

    input:focus {
        outline: none;
        border-color: hsl(5, 85%, 63%);
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
        
        
    }

    .signup-btn:hover {
        background-color: hsl(5, 80%, 57%);
    }

    a{
        text-decoration: none;
        color:hsl(5, 80%, 57%);
    }


</style>

<div class="container">

    <div class="signup-box">
        <h2>Welcome to Art World</h2>
        <form >

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="myopa@gmail.com" required>

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" required>

            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm password" required>

            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" placeholder="Input firstname" required>

            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" placeholder="Input lastname" required>

            <label for="birthday">Birthday</label>
            <input type="date" id="birthday"  required>

            <button type="submit" class="signup-btn">Continue</button>
        </form>
        <div class="forgot-password">
            <p>Already have an account? <a href="/login" style="font-size:small">Log in </a></p>
        </div>

    </div>
</div>