<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { showToast } from '$lib/toast';

    let userID: string | null = null;
    let profile: any = null;
    let email: string = '';
    let firstName: string = '';
    let lastName: string = '';
    let facebook: string = '';
    let linkedin: string = '';
    let birthdate: string = '';

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
                    userID = data;

                    const profileRes = await fetch("http://localhost:8000/profile/getById", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ _id: userID })
                    });

                    if (profileRes.ok) {
                        profile = await profileRes.json();

                        email = profile?.email || '';
                        firstName = profile?.firstName || '';
                        lastName = profile?.lastName || '';
                        facebook = profile?.facebook || '';
                        linkedin = profile?.linkedin || '';
                        birthdate = profile?.birthdate ? new Date(profile?.birthdate).toISOString().split('T')[0] : '';
                    } else {
                        showToast("error", "Failed to fetch profile. Please try again.");
                    }
                } else {
                    showToast("error", "Failed to fetch user ID. Please log in again.");
                }
            } catch (err) {
                showToast("error", "An error occurred while fetching user ID. Please try again.");
            }
        } else {
            showToast("error", "No token found. Please log in again.");
        }
    });

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        const updatedProfile = {
            email,
            firstName,
            lastName,
            facebook,
            linkedin,
            birthdate
        };

        try {
            const res = await fetch("http://localhost:8000/profile/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: userID, ...updatedProfile })
            });

            if (res.ok) {
                showToast("info", "Profile updated successfully.");
                goto("/profile");
            } else {
                showToast("error", "Failed to update profile. Please try again.");
            }
        } catch (err) {
            showToast("error", "An error occurred while updating profile. Please try again.");
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
    <form on:submit={handleSubmit}>

        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} placeholder={profile?.email} required>

        <label for="firstname">First Name</label>
        <input type="text" id="fname" bind:value={firstName} placeholder={profile?.firstName} required>

        <label for="lastname">Last Name</label>
        <input type="text" id="lname" bind:value={lastName} placeholder={profile?.lastName} required>

        <label for="socialmedia">Facebook</label>
        <input type="text" id="sfacebook" bind:value={facebook} placeholder={profile?.facebook || "https://www.facebook.com/mppk"}>

        <label for="socialmedia">LinkedIn</label>
        <input type="text" id="slinkedin" bind:value={linkedin} placeholder={profile?.linkedin || "https://www.linkedin.com/mppk"}>

        <label for="birthdate">Birthdate</label>
        <input type="date" id="birthdate" bind:value={birthdate} required>

        <button type="submit" class="signup-btn">Continue</button>
    </form>
</div>
