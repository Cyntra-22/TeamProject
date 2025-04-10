<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { showToast } from '$lib/toast';

    let selectedInterests: string[] = [];
    let userId: string | null = null;
    let isProcessing: boolean = false;

    const interests = [
        "Concept Art", "Digital Portraits", "3D", "CGI in films", "Pixel Art",
        "Web Art", "Motion Graphics", "Illustraions", "Logos", "Generative Art",
        "NFT art", "Glitch Art"
    ];

    onMount(() => {
       
        userId = $page.url.searchParams.get('userId');
        console.log("User ID from URL:", userId);
        
        if (!userId) {
            console.warn("No userId found in URL parameters");
        }
    });

    function toggleInterest(interest: string) {
        if (selectedInterests.includes(interest)) {
            selectedInterests = selectedInterests.filter((i) => i !== interest);
        } else {
            selectedInterests = [...selectedInterests, interest];
        }
    }

    async function continueAction() {
        if (selectedInterests.length >= 2 && userId) {
            isProcessing = true;
            try {
                
                const updateData = {
                    _id: userId,
                    interests: selectedInterests
                };

                const response = await fetch("http://localhost:8000/profile/edit", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Interests updated successfully:", result);
                    showToast("info", `Your interests have been updated: ${selectedInterests.join(", ")}`);
                    
                    
                    goto('/login');
                } else {
                    const errorData = await response.json();
                    console.error("Error updating interests:", errorData);
                    showToast("error", `There was an error updating your interests. Please try again.`);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                showToast("error", "Unexpected error while updating interests. Please try again.");
            } finally {
                isProcessing = false;
            }
        } else if (!userId) {
            showToast("error", "User ID not found. Please sign up again.");
            goto('/signup');
        }
    }
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6rem auto;
}

.login-box {
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

.login-box h2 {
    margin-bottom: 0.5rem;
    color: #111;
    font-size: 1.5rem;
}

.login-box p {
    margin-bottom: 1.5rem;
    color: #666;
}

.interest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 2rem;
}

.interest-button {
    border: 1px solid #aaa;
    border-radius: 2rem;
    padding: 0.5rem 0.3rem;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
}

.interest-button.selected {
    border: 2px solid hsl(5, 85%, 63%);
    background-color: rgba(255, 99, 71, 0.15);
}

.continue-button {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
    color: #fff;
    background-color: hsl(5, 85%, 63%);
    transition: background-color 0.2s ease;
}

.continue-button:hover:enabled {
    background-color: hsl(5, 67%, 52%);
}

.continue-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.processing {
    opacity: 0.7;
}
</style>

<div class="container">
    <div class="login-box">
        <h2>Let's select your interests.</h2>
        <p>Please select two or more to proceed.</p>

        <div class="interest-grid">
            {#each interests as interest}
                <button
                    type="button"
                    class="interest-button {selectedInterests.includes(interest) ? 'selected' : ''}"
                    on:click={() => toggleInterest(interest)}
                    disabled={isProcessing}
                >
                    {interest}
                </button>
            {/each}
        </div>

        <button
            type="submit"
            class="continue-button"
            on:click={continueAction}
            disabled={selectedInterests.length < 2 || isProcessing || !userId}
            class:processing={isProcessing}
        >
            {isProcessing ? 'Processing...' : 'Continue'}
        </button>
    </div>
</div>