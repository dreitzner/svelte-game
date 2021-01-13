<script lang="ts">
	import {questions} from './services/questions';
	import Name from './components/Name.svelte';

	let input: HTMLInputElement;
	let name: string = '';
	let names: IName[] = [];
	
	$: openQuestions = questions.filter(q => !q.asked);
	let currentText = ' ';

	const addName = () => {
		names = [...names, {name, points: 0}];
		name = '';
		input.focus();
	};

	let started = false;
	const start = () => {
		started = true;
	};

	let animating = false;
	const question = () => {
		animating = true;
		let time = 10;
		const animate = async () => {
			const randomIndex = Math.floor(Math.random() * openQuestions.length);
			currentText = openQuestions[randomIndex].text;
			if (time > 1) {
				return setTimeout(() => {
					time -= 1/time;
					animate();
				}, 1000/time);
			}
			const realIndex = questions.findIndex(q => q.text === currentText);
			questions[realIndex].asked = true;
			animating = false;
		}
		animate();
	};

	$: sorted = names.sort((a, b) => b.points - a.points);
	
	$: finished = sorted[0]?.points >= 21 || !openQuestions.length;

	$: styles = `transform: translateY(-${(Number(started) + Number(finished)) * 100}vh)`
</script>

<main>
	<section style={styles}>
		<div>
			<h1>Add names</h1>
			<input
				type="text"
				placeholder="Name"
				bind:value={name}
				bind:this={input}>
			<button
				class="add"
				on:click={addName}>
				Add Name
			</button>
			{#if names.length}
				<button
					on:click={start}>
					Start the game
				</button>
				<h2>Players</h2>
				<ol>
					{#each names as _name}
						<li>{_name.name}</li>
					{/each}
				</ol>
			{/if}
		</div>
	</section>
	<section style={styles}>
		<div>
			<h1>Find a Bible verse that...</h1>
			<h1 class:animating>
				{currentText}
			</h1>
			<button
				on:click={question}>
				Show me the next question
			</button>
			<div class="flex names">
				{#each sorted as name}
					<Name bind:name />
				{/each}
			</div>
		</div>
	</section>
	<section style={styles}>
		<div>
			<h1>👑 The winner is {sorted[0]?.name} 👑</h1>
		</div>
	</section>
	<section style={styles}><div>END - nothing to see here</div></section>
</main>

<style>
	main {
		text-align: center;
		height: 100vh;
		overflow: hidden;
	}

	section {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all .35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	section > div {
		max-width: 980px;
		width: 100%;
	}
	section:nth-child(2n+1) {
		background: orangered;
		color: white;
	}
	section:nth-child(2n) {
		background: skyblue;
	}
	input {
		border: none;
		background: linear-gradient(to bottom, white, lightgrey);
		box-shadow: 0 0 25px gold;
		outline: none;
	}

	button {
		margin-top: 35px;
		background: darkred;
		color: orange;
		box-shadow: 0 0 25px gold;
		border: none;
		outline: none;
		border-radius: 15px;
		margin-left: 15px;
		padding: 8px 16px;
		font-weight: bold;
	}

	.add {
		background: darkblue;
	}

	.animating {
		opacity: .3;
	}

</style>