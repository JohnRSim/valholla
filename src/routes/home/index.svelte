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

	.tvl-chart {
		max-width: 100%;
		border-radius: 5px;
	}

	footer.spacer {
		min-height:60px;
	}
</style>

<svelte:head>
	<title>Home:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-Home" style="transform: translate3d(0px, 60px, 0px);">
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

			<article class="card" style="margin-bottom:10px; padding:5px;">
				<header style="padding:10px; color:#888B8A; font-weight:bold;">
					Total Value locked in DeFi
				</header>
				<img src="/img/solana-tvl.png" alt="Solana Total Value Locked" class="tvl-chart" />
			</article>

			<section class="grid">
			
				<article class="card">
				SOL: $5.23
				</article>
				<article class="card">
				SRM: 4.32
				</article>
				<article class="card">
				FIDA: $1.34
				</article>
				<article class="card">
				RAY: $3.10
				</article>
			</section>

			<article class="card" style="margin-bottom:10px;">
				<h5>NEWS</h5>
				<p>FTX Announces Oxygen IEO</p>
				<p>Solana Hackathon Nears Completion</p>
				<p>Eth2.0 | The BSC Killer?</p>
			</article>

			<footer class="spacer"></footer>
		</section>
	</div>
</div>
{/if}