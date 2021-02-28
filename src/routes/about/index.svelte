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
<div class="profile scrollable gpu_acc" id="V-About" style="transform: translate3d(0px, 60px, 0px);">
	<div dir="auto" style="width:100%">
		<section style="padding:0px 20px 40px 20px;">
			<article class="markdown-body entry-content container-lg" itemprop="text">
				<p align="center">
					<img width="400" src="/defix.png" alt="Solana x serum DEFI hackathon" style="max-width:100%;">
					<a target="_blank" rel="noopener noreferrer" href="/logo_valholla.png">
					<br>
					<br><img width="200" src="/logo_valholla.png" alt="Val-hölla" style="max-width:100%;"></a>
					<br>
					<br>
				</p>

				<h1><a id="user-content-val-hölla" class="anchor" aria-hidden="true" href="#val-hölla"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Val-hölla</h1>
				
				<p>The perfect place to chat, invest and expand the Solana ecosystem.<br>
				<p>Your Solana DEFI kickstarter and investment platform.</p>
				
				<p><a href="http://www.val-holla.com" rel="nofollow">www.val-holla.com</a></p>
				
				<p align="center">
					<a href="/hackThePlanet.png"><img width="100%" src="/hackThePlanet_tn.png" alt="Valholla hackathon" style="max-width:100%;"></a>
					<br>
					<br>
				</p>
				
				<h1><a id="user-content-install-app" class="anchor" aria-hidden="true" href="#install-app"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Install app</h1>
				
				<p>Val-hölla is a progressive Web APp, the next generation of mobile applications. Once installed you won't feel a difference to a native Android or iOS app, only that you never need to update it.</p>
				
				<h2><a id="user-content-android" class="anchor" aria-hidden="true" href="#android"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Android</h2>
				
				<p>Download from Google PlayStore™</p>
				
				<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/f8cc865a8fa303cbf10e8d0451254fa21c07163dc23a5becc9c174f28f4028f7/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f7374617469632f696d616765732f6261646765732f656e5f62616467655f7765625f67656e657269632e706e67"><img width="200" src="https://camo.githubusercontent.com/f8cc865a8fa303cbf10e8d0451254fa21c07163dc23a5becc9c174f28f4028f7/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f7374617469632f696d616765732f6261646765732f656e5f62616467655f7765625f67656e657269632e706e67" data-canonical-src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style="max-width:100%;"></a></p>
				
				<h3><a id="user-content-or-install-as-pwa" class="anchor" aria-hidden="true" href="#or-install-as-pwa"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>or install as PWA:</h3>
				
				<p>Open <a href="http://www.val-holla.com" rel="nofollow">www.val-holla.com</a> in a PWA compatible browser.</p>
				
				<h2><a id="user-content-chrome-recommended--brave" class="anchor" aria-hidden="true" href="#chrome-recommended--brave"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Chrome (recommended) / Brave</h2>
				
				<p>Once you open the page the browser will open a banner at the bottom of the page that says "Add Val-hölla to Home screen". Click on it and you're ready to go.</p>
				
				<p>If the banner does not appear click on the menu icon and in the menu "Add to Home screen". That's it, open the app via the app icon.</p>
				
				<h2><a id="user-content-firefox" class="anchor" aria-hidden="true" href="#firefox"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Firefox</h2>
				
				<p>In the address bar, to the right of the page URL you should see a little house icon with a plus symbol in the middle. Click on it and '+ Add to home screen'. That's it!</p>
				
				<p><em>NOTE: There might be some limitations when installing Val-hölla with Brave or Firefox due to limited PWA support, we strongly recommend to install the app with Chrome.</em></p>
				
				<h2><a id="user-content-ios" class="anchor" aria-hidden="true" href="#ios"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>iOS</h2>
				
				<p>Open this page with Safari, click on the share button (box with up arrow) and in the opening popup "Add to Home Screen". Ready!</p>
				
				<h2><a id="user-content-desktop-chromeedge" class="anchor" aria-hidden="true" href="#desktop-chromeedge"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Desktop (Chrome/Edge)</h2>
				
				<p>To install Val-hölla on your desktop open this page with Chrome and click on the small plus icon  on the right side of the address bar. If you do not see the icon, click on the menu icon and "Add to Home screen".</p>
				
				<p><em>NOTE: The app also works perfectly fine in the browser and you do not need to install it on your device. However, we recommend to install it for a better user experience.</em></p>
				
			</article>
		</section>
	</div>
</div>
{/if}