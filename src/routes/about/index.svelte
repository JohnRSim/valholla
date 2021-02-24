<script>
	//svelte
	import { onDestroy, onMount } from 'svelte';

	//utils
	import { navTo } from '../route.js';

	let isMounted = false;

	onMount(() => {
		console.info('[/about][Mount]');
		isMounted = true;
			
	});

	onDestroy(() => {
		if (process.browser) {
			console.info('[/about][Destroy]');
		}
	});
</script>

<style>
</style>

<svelte:head>
	<title>About:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<section style="padding-top:60px;">
	... about
</section>
{/if}