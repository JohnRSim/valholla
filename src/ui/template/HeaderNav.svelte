<script>
  //sapper
  import { stores, goto, prefetchRoutes } from '@sapper/app';

  //svelte
  import { createEventDispatcher, onMount } from 'svelte';

	//i18n.js
  //import { locale, _ } from 'svelte-i18n';
	//stores
	import { app as sApp } from '../../stores/app.js';
  

	//tpl
  import HeaderLogin from './HeaderLogin.svelte';

  
	//utils
  import { navTo } from '../../routes/route.js';
  
	// i18n.js
	import { locale, _ } from 'svelte-i18n';
  
  export let hasTabs = [];
  export let activeTab = 'For You';
  export let showBurger = false;
  export let showChat = false;
  export let showBack = false;
  export let showEditProfile = false;
  export let showSaveProfile = false;
  export let headerTheme = 'light';
  export let showCancelSaveProfile = false;
  export let showClose = false;
  export let pageTitle = false;
  export let leftSpacer = false;
  export let rightSpacer = false;
  export let hasSocialPost = false;
  export let showCloseSocial = false;
  export let showPost = false;
  export let socialPlaceholderText = false;
  export let showContentPageTitle = false;
  export let showLibrary = false;
  export let showReport = false;
  export let showInitiativeHeader = false;
  export let headerIconImg = false;
  export let contentUpdated = false;
  export let enableSearch = false;
  export let expandSearch = false;
  export let showCancelSearch = false;
  export let searchVal = '';
  export let showTabsInHeader = true;
  export let hasBreadCrumbs = false;
  export let initiativeTitle = false;
  export let initiativeID = false;
  export let baseCrumb = 'Home';
  export let showLogo = false;
  export let isAuthenticated = false;
  export let showSearch = false;
  export let activeroute = false;

  let oldRoute = '';
  $: if (activeroute) {
    //forceSearch = false;
    if ((activeroute !== 'oldRoute') && (activeroute !== '/search')) {
      forceSearch=false;
      expandSearch=false;
    }
    oldRoute = activeroute;
  }
  const dispatch = createEventDispatcher();

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
  }


  /**
   * scrollStart
   **/
  function scrollStart() {
      dispatchEvent({ action:'scrollStart' });
  }
  
  /**
   * scrollStart
   **/
  function scrollEnd() {
      dispatchEvent({ action:'scrollEnd' });
  }

  let forceSearch = false;
  function search() {
    if (forceSearch === true) {
      dispatchEvent({action:'search', value:searchVal });
    }
    forceSearch = true;
    expandSearch = true;
  }
</script>

<style>
  #appHeaderPanel {
    margin: 0px;
    padding:0px;
    min-height:50px;
    display: flex;
  }

  li {
    list-style: none;
  }
  
  li i.ico {
    background-color: var(--maskColor-ico);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 36px;
    height:36px;
    display: block;
  }

  .hamburger {
    padding:12px 15px;
  }
  .dark .ico {
    background:#fff;
  }
  .hamburger .ico {
    -webkit-mask-image: url("/img/ico_hamburger.svg");
    width:36px;
  }

  .back {
    min-width: 60px;
  }
  .back .ico {
    background-color: var(--maskColor-ico);
    -webkit-mask-image: var(--img-icon-back);
    width:36px;
    height:100%;
    /*margin-left:8px;*/
    margin-left:10px;
    transition: background 0.2s;
  }
  :global([dir="rtl"] .back .ico) {
    margin-left:0px !important;
    margin-right: 8px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .close .ico {
    background-color: #323232;
    -webkit-mask-image: url("/img/ico_close.svg");
    width:36px;
    height:100%;
    /*margin-left:8px;*/
    margin-left:10px;
    transition: background 0.2s;
  }
  .close {
    padding: 12px 15px;
  }

  :global(.trigger-menu-wrapperx.transparent .library .ico, .trigger-menu-wrapperx.transparent .report .ico) {
    opacity: 0;
  }
  :global(.trigger-menu-wrapperx.transparent .pageTitle header) {
    opacity: 0;
  }
  
  :global(.shadow .trigger-menu-wrapperx.hideShadow .library .ico, .shadow .trigger-menu-wrapperx.hideShadow .report .ico) {
    opacity: 1
  }
  :global(.shadow .trigger-menu-wrapperx.hideShadow .pageTitle header) {
    opacity: 1;
  }

  :global(.shadow .trigger-menu-wrapperx.hideShadow .back .ico) {
    /*background-image: url("/img/ico_back.svg");*/
    background-position: 3px 0px;
    margin-left:10px;
    box-shadow:none;
  }
  :global([dir="rtl"] .shadow .trigger-menu-wrapperx.hideShadow .back .ico) {
    margin-left:0px !important;  
    margin-right:10px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  
  :global(.trigger-menu-wrapperx.transparent .back) {
    align-self: center;
  }
  :global(.trigger-menu-wrapperx.transparent .back .ico) {
    -webkit-mask-image:unset;
    background-image: var(--img-icon-back);
    margin-left:10px;
    background-position: 3px 0px;
    width:36px;
    height:36px;
    border-radius: 72px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.25);
  }
  :global([dir="rtl"] .trigger-menu-wrapperx.transparent .back .ico) {
    margin-left:0px !important;  
    margin-right:10px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		#appHeaderPanel {
			display: none;
		}
	}
  .pageTitle {
    text-align: center;
    /* justify-content: center; */
    /* align-items: center; */
    align-self: center;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spacer {
    padding: 12px 15px;
    width: 60px;
  }

  .ellipse {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .hamburger {
    transition: width 0.2s, padding 0.2s;
    overflow:hidden;
  }
  .hamburger .ico {
    opacity:1;
    transition: opacity 0.2s;
  }
  .hamburger.expandSearch {
    padding-right:0px;
    width:0px;
  }
  .hamburger.expandSearch .ico {
    opacity:0;
  }
  .headerTitle {
    color:var(--color-headerTitle);
  }

</style>
<svelte:head>
	<link rel="preload" href="/img/ico_hamburger.svg" as="image" />
	<link rel="preload" href="/img/ico_close.svg" as="image" />
</svelte:head>

<ul id="appHeaderPanel" class="{headerTheme}">
  <!-- Left -->
  {#if (leftSpacer)}
  <li class="spacer"></li>
  {/if}
  {#if (showBurger)}
  <li class="hamburger" class:expandSearch="{((expandSearch) && (searchVal !== 'clearSearchField'))}" on:click="{() => { dispatchEvent({action:'nav'}); }}">
    <i class="ico mask"></i>
  </li>
  {/if} 
  {#if (showBack)}
  <li class="back" on:click="{() => { dispatchEvent({action:'goBack'}); }}">
    <i class="ico mask"></i>
  </li>
  {/if}
  <!-- Left -->

  <!-- Center -->
  <li style="flex:1;" class="pageTitle" on:click="{() => { dispatchEvent({action:'titleSelected'}); }}">
      {#if (pageTitle)}
      {$_(`global.page_title.${pageTitle}`)}
      {/if}
      {#if ((!pageTitle) && (showLogo))}
        <img src="/img/valholla.svg" alt="" style="margin: 0px auto;" />
      {/if}
  </li>
  <!-- xCenter -->

  <!-- Right -->
  {#if (showClose)}
  <li class="close"on:click="{() => { dispatchEvent({action:'goBack'}); }}">
    <i class="ico "></i>
  </li>
  {/if}
  {#if (rightSpacer)}
  <li class="spacer"></li>
  {/if}
  <!-- xRight -->
</ul>

{#if (!isAuthenticated)}
<HeaderLogin 
  on:signin="{() => { dispatchEvent({action:'signin'}); }}"
  on:updateWallet="{(e) => { dispatchEvent(e.detail); }}"
  />
{/if}