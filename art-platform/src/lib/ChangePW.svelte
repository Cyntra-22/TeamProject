<script lang="ts">
    let showPassword = {
        previous: false,
        new: false,
        confirm: false
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
    <form>
        <label for="pre-password">Previous Password</label>
        <div class="input-container">
            <input type={showPassword.previous ? "text" : "password"} id="pre-password" required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, previous: !showPassword.previous }}>
                <img src={showPassword.previous ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <label for="new-password">New Password</label>
        <div class="input-container">
            <input type={showPassword.new ? "text" : "password"} id="new-password" required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, new: !showPassword.new }}>
                <img src={showPassword.new ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <label for="confirm-password">Confirm Password</label>
        <div class="input-container">
            <input type={showPassword.confirm ? "text" : "password"} id="confirm-password" required>
            <button type="button" class="eye-icon" 
                on:click={() => showPassword = { ...showPassword, confirm: !showPassword.confirm }}>
                <img src={showPassword.confirm ? "/eye-open.png" : "/eye-close.png"} alt="Toggle visibility">
            </button>
        </div>

        <button type="submit" class="signup-btn">Continue</button>
    </form>
</div>
