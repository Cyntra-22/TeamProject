<script lang="ts">
	let selectedInterests: string[] = [];
    import { goto } from '$app/navigation';


	const interests = [
		"Concept Art", "Digital Portraits", "3D", "CGI in films", "Pixel Art",
		"Web Art", "Motion Graphics", "Illustraions", "Logos", "Generative Art",
		"NFT art", "Glitch Art"
	];

	function toggleInterest(interest: string) {
		if (selectedInterests.includes(interest)) {
			selectedInterests = selectedInterests.filter((i) => i !== interest);
		} else {
			selectedInterests = [...selectedInterests, interest];
		}
	}

	function continueAction() {
		if (selectedInterests.length >= 2) {
			alert(`You selected: ${selectedInterests.join(", ")}`);
            goto('/');
			// Perform navigation or further action
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
	background-color: hsl(5, 85%, 63%);
	cursor: not-allowed;
}
</style>

<div class="container">
	<div class="login-box">
		<h2>Let’s select your interests.</h2>
		<p>Please select two or more to proceed.</p>

		<div class="interest-grid">
			{#each interests as interest}
				<button
					type="button"
					class="interest-button {selectedInterests.includes(interest) ? 'selected' : ''}"
					on:click={() => toggleInterest(interest)}
				>
					{interest}
				</button>
			{/each}
		</div>

		<button
			type="submit"
			class="continue-button"
			on:click={continueAction}
			disabled={selectedInterests.length < 2}
		>
			Continue
		</button>
	</div>
</div>
