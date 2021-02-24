<script context="module">
	export async function preload(page, session) {
		const [ collections ] = page.params.collections;
		let { tab } = page.query;
		tab = (typeof(tab) !== 'undefined')?tab: '';
		return { collections, tab };
	}
</script>

<script>
	//sapper
	import { goto } from '@sapper/app';

	// svelte
	import { onMount, tick } from 'svelte';

	//i18n
	import { _ } from 'svelte-i18n';

	//utils
	import { navTo } from '../route.js';

	//transitions
	//import { send, receive } from '../../transition/crossfade';
	import { fade } from 'svelte/transition';
	
	//Nav
	export let collections = 'Home';
	export let tab = '';
	
	//console
	const Inf = 'background-color: #f8ffff; color: #276f86';
	
	if (tab) {
		console.info('%c[==========]',Inf);
		console.info(`%c[Tab][${tab}]`,Inf);
		console.info('%c[==========]',Inf);
	}


	let isMounted = false;

	onMount(async () => {
		isMounted = true;

	});
</script>

<style>

</style>

<svelte:head>
	<title>{collections}:: Feed:: Val-hölla</title>
</svelte:head>

{#if (isMounted)}
<section>
	Hello World..
</section>
{/if}