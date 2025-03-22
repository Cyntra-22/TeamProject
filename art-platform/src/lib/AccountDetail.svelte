<script lang="ts">
    let email = "myopa2345artist@gmail.com";
    let firstName = "Myo Pa";
    let lastName = "Pa Kyaw";
    let facebook = "https://www.facebook.com/mppk";
    let linkedin = "https://www.linkedin.com/mppk";
    let phoneNumber = "+66945073029";
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
        float: right;
          
    }

    .signup-btn:hover {
        background-color: hsl(5, 80%, 57%);
    }
</style>

<h2>Account Settings</h2>

<div>
    <form >

        <label for="email">Email</label>
        <input type="email" id="email" placeholder="myopa@gmail.com" required>

        <label for="firstname"> First Name</label>
        <input type="name" id="fname" placeholder="Myo Pa " required>

        <label for="lastname">Last Name</label>
        <input type="name" id="lname" placeholder="Pa Kyaw" required>

        <label for="socialmedia">Facebook</label>
        <input type="text" id="sfacebook" placeholder="https://www.facebook.com/mppk" required>

        <label for="socialmedia">LinkedIn</label>
        <input type="text" id="slinkedin"  placeholder="https://www.linkedin.com/mppk" required>

        <label for="phoneno">Phone Number</label>
        <input type="phoneno" id="phno"  placeholder="+66945073029" required>

        <button type="submit" class="signup-btn">Continue</button>
    </form>
</div>
