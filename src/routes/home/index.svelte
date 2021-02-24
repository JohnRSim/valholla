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
</style>

<svelte:head>
	<title>Home:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<section style="padding-top:60px;">
	<!-- Jim Add your magic -->
	... Return me to Ragnarok!!! arghh..
</section>
{/if}