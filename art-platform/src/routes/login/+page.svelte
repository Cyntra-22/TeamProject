<script lang="ts">
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
        margin-bottom: 1rem;
        color: #333;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }

    label {
        font-size: 1rem;
        color: #555;
        text-align: left;
    }

    input {
        padding: 10px;
        font-size: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 2rem;
        background-color: #f9f9f9;
        margin-bottom: 0.3rem;
    }

    button {
        padding: 12px;
        border: none;
        border-radius: 2rem;
        font-size: 1rem;
        cursor: pointer;
        color: #fff;
        background-color: hsl(5, 85%, 63%);
        margin-top: 10px;
    }

    button:hover {
        background-color: hsl(5, 67%, 52%);
    }



    .forgot-password a {
        font-size: 0.85rem;
        color: hsl(5, 85%, 63%);
        text-decoration: none;
        float: left;
    }


    .forgot-password1 a{
        font-size: 0.85rem;
        color: hsl(5, 85%, 63%);
        text-decoration: none;
    }


    .forgot-password a:hover {
        text-decoration: underline;
    }
    .login-box p {
      
        color: #666;
        font-size: 0.9rem;
    }


</style>

<div class="container">
   
    <div class="login-box">
        <h2>Welcome to Art World</h2>
        <form >
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" required>

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="********" required>

            <div class="forgot-password">
                <a href="/">Forgot your password?</a>
            </div>

            <button type="submit">Log in</button>
            <p class="forgot-password1">Not Account Yet? <a href="/login" style="font-size:small">Sign up </a></p>
        </form>
        
        

    </div>
</div>