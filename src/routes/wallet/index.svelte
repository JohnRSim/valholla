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
</style>

<svelte:head>
	<title>Wallet:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<section style="padding-top:60px;">
	... wallet
</section>
{/if}