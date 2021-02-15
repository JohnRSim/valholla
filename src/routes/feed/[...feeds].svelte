<script context="module">
	export async function preload(page, session) {
		const [ feeds ] = page.params.feeds;
		let { tab } = page.query;
		tab = (typeof(tab) !== 'undefined')?tab: '';
		return { feeds, tab };
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

	//stores

	//transitions
	//import { send, receive } from '../../transition/crossfade';
	import { fade } from 'svelte/transition';
	
	//Nav
	export let feeds = 'Home';
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
	<title>{feeds}:: Feed:: Val-hölla</title>
</svelte:head>

{#if (isMounted)}
<section>
	Hello World..
</section>
{/if}