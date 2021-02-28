<script>
	//svelte
	import { onDestroy, onMount } from 'svelte';

	//utils
	import { navTo } from '../../route.js';

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
	footer.spacer {
		min-height:60px;
	}
</style>

<svelte:head>
	<title>About:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-Project" style="transform: translate3d(0px, 0px, 0px);">
	<div dir="auto" style="width:100%">
		<a href="/collections/Projects"><img src="/img/tmp/project.png" alt="" /></a>
		<footer class="spacer"></footer>
	</div>
</div>
{/if}