<script lang="ts">
	let translation: ITranslation = {
		questions: [],
	};
	import Name from './components/Name.svelte';
	import { questionMapper } from './services/questionMapper';

	let input: HTMLInputElement;
	let name: string = '';
	let names: IName[] = [];
	
	const setLanguage = async (lang: string) => {
		if(lang === 'DE') {
			translation = (await import(`./translations/translationDE`)).default;
		}
		if(lang === 'EN') {
			translation = (await import(`./translations/translationEN`)).default;
		}
	};

	$: translate = (section: string, type: string) => translation?.[section]?.[type] ?? '';

	$: openQuestions = translation.questions.filter(q => !q.asked);
	let currentText = '...';

	const createNamePoints = (name: string) => ({name, points: 0});
	const addName = () => {
		names = [...names, createNamePoints(name)];
		name = '';
		input.focus();
	};

	let started = false;
	const start = () => {
		started = true;
	};

	let animating = false;
	const question = () => {
		if (animating) return;
		animating = true;
		let time = 7.5;
		const animate = async () => {
			const randomIndex = Math.floor(Math.random() * openQuestions.length);
			currentText = openQuestions[randomIndex].text;
			if (time > 1) {
				return setTimeout(() => {
					time -= 1/time;
					animate();
				}, 1000/time);
			}
			const realIndex = translation.questions.findIndex(q => q.text === currentText);
			translation.questions[realIndex].asked = true;
			animating = false;
		}
		animate();
	};

	$: sorted = names.sort((a, b) => b.points - a.points);
	
	$: finished = sorted[0]?.points >= 21 || (translation.questions.length && !openQuestions.length);

	$: styles = `transform: translateY(-${(Number(translation.questions.length > 0) + Number(started) + Number(finished)) * 100}vh)`;

	const reset = () => {
		translation.questions = questionMapper(translation.questions.map(({text}) => text));
		names = names.map(({name}) => createNamePoints(name));
	}
</script>

<main>
	<section style={styles}>
		<div>
			<button class="add" on:click={() => setLanguage('EN')}>English</button>
			<button on:click={() => setLanguage('DE')}>Deutsch</button>
		</div>
	</section>
	<section style={styles}>
		<div>
			<h1>{translate('setup', 'headline')}</h1>
			<h2>{translate('setup', 'subHeadline')}</h2>
			<input
				type="text"
				placeholder="Name"
				bind:value={name}
				bind:this={input}>
			<button
				class="add"
				on:click={addName}>
				{translate('setup', 'addButton')}
			</button>
			{#if names.length}
				<button
					on:click={start}>
					{translate('setup', 'startButton')}
				</button>
				<h2>{translate('setup', 'players')}</h2>
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
			<h1>{translate('game', 'headline')}</h1>
			<h1 class:animating>
				{currentText}
			</h1>
			<button
				class:animating
				on:click={question}>
				{translate('game', 'button')}
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
			<h1>👑 {translate('winner', 'winner')} {sorted[0]?.name} 👑</h1>
			<p on:click="{reset}">{translate('winner', 'again')}?</p>
		</div>
	</section>
	<section style={styles}><div>END - nothing to see here</div></section>
</main>

<style>
	h1{
		font-size: 42px;
		margin: 15px;
	}
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
		background: skyblue;
	}
	section:nth-child(2n) {
		background: orangered;
		color: white;
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

	p {
		text-decoration: underline;
		margin-top: 50px;
		cursor: pointer;
	}

</style>