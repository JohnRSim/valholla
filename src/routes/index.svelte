<script>
	//svelte
	import { onDestroy, onMount } from 'svelte';

	//utils
	import { navTo } from './route.js';

	let isMounted = false;

	onMount(() => {
		console.info('[/][Mount]');
		isMounted = true;
			
	});

	onDestroy(() => {
		if (process.browser) {
			console.info('[/][Destroy]');
		}
	});
</script>

<style>
	.overview {
		width: 300px;
		margin: 0px auto;
	}
	button {
		color: rgba(255,255,255,0.5);
		text-transform: uppercase;
		background: rgba(255,255,255,0.05);
		border-radius: 60px;
		padding:8px 16px;
		border:0px;
		letter-spacing: 1px;
		font-size: 0.8em;
	}
	h1 {
		overflow: hidden;
		position: relative;
	}
	h1 span {
		position: absolute;
		left:-9999px;
	}

	img {
		/*opacity: 0.6;*/
	}
</style>

<svelte:head>
	<title>Home:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<section class="overview">
	<h1 on:click="{() => { navTo('/feed/Home'); }}">
		<span>Val-hölla</span>
		<img src="/img/logo_valholla.png" width="220" height="140" alt="Val-holla "/>
	</h1>
	
	<button>
		Coming soon...
		<button>#Valholla</button>	
	</button>
</section>
{/if}