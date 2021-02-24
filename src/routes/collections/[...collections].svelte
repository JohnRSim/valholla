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
	
    //components
    import Projects from '../../ui/components/cards/Projects.svelte';

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

	footer.spacer {
		min-height:60px;
	}
</style>

<svelte:head>
	<title>{collections}:: Feed:: Val-hölla</title>
</svelte:head>

{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-Collections" style="transform: translate3d(0px, 60px, 0px);">
	<div dir="auto" style="width:100%">
		<section style="padding:0px 20px 40px 20px;">

			<Projects />
			<Projects />
			<Projects />
			<Projects />

			<footer class="spacer"></footer>
		</section>
	</div>
</div>
{/if}