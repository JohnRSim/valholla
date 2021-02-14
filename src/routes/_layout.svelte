<script>
	
	//svelte
	import { onDestroy, onMount, tick } from 'svelte';

	//export let segment;
	
	//on mount set defaults
	onMount(async() => {
		console.info('[Layout][Mount]');
		
	});

</script>

<style>
#V-siteWrapper {
	padding:0px;
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


<!-- valholla Site Wrapper -->
<div id="V-siteWrapper">

	<main>
		<slot></slot>
	</main>

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
</div>
<!-- valholla Site Wrapper -->