<script>
	//svelte
	import { onDestroy, onMount } from 'svelte';

	//utils
	import { navTo } from '../route.js';

	let isMounted = false;

	onMount(() => {
		console.info('[/home][Mount]');
		isMounted = true;
			
	});

	onDestroy(() => {
		if (process.browser) {
			console.info('[/home][Destroy]');
		}
	});
</script>

<style>

	.card {
		background:#242927;
		border-radius: 10px;
		padding:15px;
		min-height:60px;
		margin:20px 0px 40px;
		padding-left:18px;
		position: relative;
	}

	h4 {
		color:#00FFA3;
		font-weight:bold;
	}
	.cardLine {
		
		position: absolute;
		height: 60%;
		top: 20%;
		width: 6px;
		border-radius: 0.75rem;
		left: -3px;
		background: rgb(0, 255, 163);
	}

	footer {
		height:30px;
		margin-bottom:-30px;
		display: flex;
		justify-content: center;
	}
	button {
		border-radius: 100px;
		min-height:30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#1B4E3F;
		border:0px;
		background:#00FFA3;
		padding:0px 20px;
		font-weight: bold;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content:space-between;
	}
	.grid article {
		width:47%;
		margin:10px 0px;
	}
</style>

<svelte:head>
	<title>Home:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-home" style="transform: translate3d(0px, 60px, 0px);">
	<div dir="auto" style="width:100%">
		<section style="padding:0px 20px 40px 20px;">
			<article class="card" on:click="{() => { window.open('https://forms.gle/jqQLA9CsDQgA4fjK7'); }}">
				<div class="cardLine"></div>

				<h4>Apply to be listed</h4>

				<p>
					Please fill in this application form to be 
					begin your screening process to be listed 
					on Val-hölla.
				</p>

				<footer>
					<button>Apply</button>
				</footer>
			</article>

			<!-- Jim Add your magic -->
			<article class="card" style="margin-bottom:10px;">
			... Return me to Ragnarok!!! arghh..
			Chart goes here...
			</article>

			<section class="grid">
			
				<article class="card">
				1 ???
				</article>
				<article class="card">
				2 ???
				</article>
				<article class="card">
				3 ???
				</article>
				<article class="card">
				4 ???
				</article>
			</section>

			<article class="card">
			Table list of projects?..
			</article>
		</section>
	</div>
</div>
{/if}