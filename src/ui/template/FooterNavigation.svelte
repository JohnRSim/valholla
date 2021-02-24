<script>
	//svelte
  import { createEventDispatcher } from 'svelte';


	// components
	import FooterNavLink from './slots/FooterNavLink.svelte';

  
  const dispatch = createEventDispatcher();

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
  }
    
 
  export let classes = '';
  export let activeLink = 'Feeds';
  export let footerNavItems = [{
    classes: 'feeds',
    name: 'Feeds',
  },{
    classes: 'media',
    name: 'Media',
  },{
    classes: 'people',
    name: 'People',
  },{
    classes: 'chat',
    name: 'Chat',
  },{
    classes: 'more',
    name: 'More',
  }];

  $: updatedFooterNavItems = footerNavItems;

  function callFeed(navItem) {
    dispatchEvent({action:'selectLink',name:navItem.path});
  }
</script>

<style>
  nav {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    /*padding:12px 0px 4px 0px;*/
	  background:#000;
    z-index:11;
  }

  ul {
    margin:0px;
    padding:0px 5px;
    display: flex;
  }
    li {
    list-style: none;
    flex:1px;
    padding:0px 5px;
    text-align:center;
    min-height:58px;
    color:#B5B5B5;
    display: flex;
    justify-content: baseline;
    align-items: flex-end;
    justify-content: center;
    font-size:0.625em;
    letter-spacing: 1px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 18px;
    cursor: pointer;
    background-repeat: no-repeat;
    flex-direction: column;
  }

  li.active,
  li:hover {
    color: #fff;
  }
  
  li.active span {
    font-weight: bold;
  }

  li span {
    display: block;
    width: 100%;
    transition: color 0.2s;
  }

  
  li.active.custom span.ico {
    background-color: unset;
  }

  li span.ico {
    height:38px;
    background:#848484;
    -webkit-mask-size: 24px;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
  }
  
  li.active span.ico,
  li:hover span.ico {
    background:#fff;
  }

  .home span.ico {
    -webkit-mask-image: url("/img/ico_home-outline.svg");
  }

  .updates span.ico {
    -webkit-mask-image: url("/img/ico_activity-outline.svg");
  }

  .projects span.ico {
    -webkit-mask-image: url("/img/ico_heart-outline.svg");
  }
  

</style>

<svelte:head>
</svelte:head>

<nav class="{classes}">
  <ul>
	{#each updatedFooterNavItems as navItem, i}
    <li 
      class="{navItem.classes}" 
      class:active="{(navItem.active)}" 
      on:click="{() => { callFeed(navItem); }}">
      
      <span class="ico"></span>
      <div style="width:100%">{navItem.name}</div>
    </li>
  {/each}
  </ul>
</nav>