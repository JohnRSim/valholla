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
		margin: 60px auto;
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
    	margin: 0px auto;
	}

	footer {
		position: absolute;
		bottom:0px;
		left:0px;
		right:0px;
		padding: 20px;
	}

	footer ul {
		margin:0px;
		padding:0px;
		float:right;
		display: flex;
	}

	footer li {
		list-style: none;
		margin-right:10px;
	}
	footer a {
		display: block;
		text-indent: -9999px;
		overflow: hidden;
		width:24px;
		height:24px;
	}

	.ico_fb {
		background-color: #fff;
		-webkit-mask:  url("/ico/facebook-square-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/facebook-square-brands.svg") no-repeat 50% 50%;
	}
	.ico_ig {
		background-color: #fff;
		-webkit-mask:  url("/ico/instagram-square-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/instagram-square-brands.svg") no-repeat 50% 50%;
	}
	.ico_tw {
		background-color: #fff;
		-webkit-mask:  url("/ico/twitter-square-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/twitter-square-brands.svg") no-repeat 50% 50%;
	}
	.ico_yt {
		background-color: #fff;
		-webkit-mask:  url("/ico/youtube-square-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/youtube-square-brands.svg") no-repeat 50% 50%;
	}
	.ico_pi {
		background-color: #fff;
		-webkit-mask:  url("/ico/pinterest-square-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/pinterest-square-brands.svg") no-repeat 50% 50%;
	}
	.ico_md {
		background-color: #fff;
		-webkit-mask:  url("/ico/mastodon-brands.svg") no-repeat 50% 50%;
		mask: url("/ico/mastodon-brands.svg") no-repeat 50% 50%;
	}
</style>

<svelte:head>
	<title>Home:: Val-hölla</title>
	<meta name="description" content="The perfect place to chat, invest and expand the Solana ecosystem">
</svelte:head>

{#if (isMounted)}
<section class="overview">
	<h1 on:click="{() => { navTo('/home'); }}">
		<span>Val-hölla</span>
		<img src="/img/logo_valholla.png" width="220" height="140" alt="Val-holla "/>
	</h1>
	
	<button>
		Coming soon...
		<button>#Valholla</button>	
	</button>
</section>
<!-- Footer -->
<footer>
	<nav>
		<ul>
			<li>
				<a class="ico_fb" target="_blank" rel="me noopener" href="https://www.facebook.com/val-holla">Facebook</a>
			</li>
			<li>
				<a class="ico_ig" target="_blank" rel="me noopener" href="https://www.instagram.com/val-holla">Instagram</a>
			</li>
			<li>
				<a class="ico_tw" target="_blank" rel="me noopener" href="https://twitter.com/val-holla">Twitter</a>
			</li>
			<li>
				<a class="ico_yt" target="_blank" rel="me noopener" href="https://www.youtube.com/channel/">Youtube</a>
			</li>
			<li>
				<a class="ico_pi" target="_blank" rel="me noopener" href="https://www.pinterest.co.uk/val-holla/">Pinterest</a>
			</li>
			<li>
				<a class="ico_md" target="_blank" rel="me noopener" href="https://mstdn.social/@val-holla">Mastodon</a>
			</li>
			<li style="display:none;"><a href="/sitemap.xml">SiteMap</a></li>
		</ul>
	</nav>
</footer>
<!-- xFooter -->
{/if}