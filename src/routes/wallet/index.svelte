<script>
	//svelte
	import { onDestroy, onMount } from 'svelte';

	//utils
	import { navTo } from '../route.js';

	let isMounted = false;

	onMount(() => {
		console.info('[/wallet][Mount]');
		isMounted = true;
			
	});

	onDestroy(() => {
		if (process.browser) {
			console.info('[/wallet][Destroy]');
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
</style>

<svelte:head>
	<title>Wallet:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>


{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-Home" style="transform: translate3d(0px, 120px, 0px);">
	<div dir="auto" style="width:100%">
		<section style="padding:0px 20px 40px 20px;">
			<article class="card" on:click="{() => { window.open('https://forms.gle/jqQLA9CsDQgA4fjK7'); }}">
				<div class="cardLine"></div>

				<h4>Connect to Val-hölla</h4>

				<p>
					Connect your wallet to access more features and display more 
					relevant information on connected Defi projects.
				</p>
			</article>

		</section>
	</div>
</div>
{/if}