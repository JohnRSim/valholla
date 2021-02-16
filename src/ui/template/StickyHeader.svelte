<script>
	export let headerNavTransparent = false;
	let headerType = '';
</script>

<style>

/*Statusbar height
240x320 - 20px ldpi

320x480 - 25px mdpi

480x800+ - 38px hdpi
*/
	.overlay {
		position: fixed;
		top: var(--statusbar-height);
		margin-left:0%;
		margin-right:0%;
		left: 0;
		right: 0;
		display: flex;
		z-index: 12;
    	transition: margin 0.3s;
    	/*width: 100vw;*/
		width:100%;
	}

	
	.trigger-menu-wrapperx {
		/*position: fixed;*/
		position: absolute;
		top: 0px;
		left: 0;
		right: 0;
		display: flex;
		z-index: 20;
		background-color:var(--bg-stickyHeader);
		flex-direction: column;
		transition:background 0.2s;
	}
	.trigger-menu-wrapperx::after {
		opacity: 0;
		content: "";
		position: absolute;
		left: 0px;
		right: 0px;
		top: 100%;
		height: 4px;
		transition: opacity 0.3s;
		will-change: opacity;
		background: linear-gradient(rgba(9, 30, 66, 0.13) 0px, rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.08) 1px, rgba(9, 30, 66, 0) 4px);
	}
	
	
	.trigger-menu-wrapperx.transparent {
		background:transparent;
	}
	
	
	:global(.stopHeaderAnim .trigger-menu-wrapperx) {
		transition:unset !important;
	}

	:global(.endScroll .trigger-menu-wrapperx) {
		transition: transform 0.4s, background 0.3s;
	}

	:global(.userScroll .trigger-menu-wrapperx) {
		transition: background 0.3s;
	}

	
	:global(.scroll-down .trigger-menu-wrapperx) {
		background-color:var(--bg-stickyHeader);
	}
	
	:global(.endScroll.scroll-down .trigger-menu-wrapperx) {
		transform: translate3d(0, -60px, 0) !important;
	}
	
	:global(.endScroll.scroll-down .trigger-menu-wrapperx) {
		transform: translate3d(0, -60px, 0) !important;
	}
	:global(.Desktop.endScroll.scroll-down .trigger-menu-wrapperx) {
		transform: translate3d(0, -70px, 0) !important;
	}
	
	:global(.userScroll.scroll-down .trigger-menu-wrapperx),
	:global(.userScroll.scroll-up .trigger-menu-wrapperx) {
		transform: none;
	}

	:global(.scroll-up .trigger-menu-wrapperx) {
		background-color:var(--bg-stickyHeader);
	}

	:global(.endScroll.scroll-up .trigger-menu-wrapperx) {
		transform: translate3d(0, 0px, 0) !important;
	}
	:global(.shadow .trigger-menu-wrapperx.hideShadow) {
		background:var(--bg-stickyHeader);
	}
	
	:global(.shadow .trigger-menu-wrapperx::after) {
		opacity:1;
	}

	
	:global(#M-siteWrapper.showProfilePanel #M-site .overlay) {
	    margin-left: -100%;
	}
	
	:global([dir="rtl"]#M-siteWrapper.showProfilePanel #M-site .overlay) {
	    margin-right:-100%;
		margin-left:0%;
	}
	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		
		:global(#M-siteWrapper.showProfilePanel #M-site .overlay) {
			margin-left: -70%;
		}
		:global([dir="rtl"]#M-siteWrapper.showProfilePanel #M-site .overlay) {
			margin-left:0%;
			margin-right:-70%;
		}
	}
	
@media only screen and (min-width: 769px) {
	.trigger-menu-wrapperx {
		right: 17px;
	}
	:global([dir="rtl"] .trigger-menu-wrapperx) {
		right:0px !important;
		left:17px;
	}

}

</style>

<!--<div class="mobileHead {headerType}"></div>-->
<div class="overlay {headerType}">
	<header class="trigger-menu-wrapperx hideShadow gpu_acc" class:transparent="{headerNavTransparent}">
		<slot></slot>
	</header>
</div>
