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
video {
	width: 100%;
	height:100%;
}
	.card {
		background:#242927;
		border-radius: 10px;
		padding:15px;
		min-height:60px;
		margin:20px 0px 40px;
		padding-left:18px;
		position: relative;
		margin:15px;
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
	<title>About:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<div class="profile scrollable gpu_acc" id="V-Video" style="transform: translate3d(0px, 60px, 0px);">
	<div dir="auto" style="width:100%">
		<section style="padding:0px">
			<video controls autoplay src="/egg/WhatsApp Video 2021-02-24 at 16.08.41.mp4">Your browser doesn’t support video playback.</video>

			
			<article class="card" on:click="{() => { window.open('https://forms.gle/jqQLA9CsDQgA4fjK7'); }}">
				<div class="cardLine"></div>

				<h4>Easter egg!</h4>

				<p>
					You found it!.. Day 1 of the hackathon.. .. <br />
					What do we create... Enjoy.
				</p>

			</article>
		</section>
	</div>
</div>
{/if}