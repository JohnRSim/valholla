<script>
	//svelte
  import { createEventDispatcher } from 'svelte';

  export let classes = '';
  export let name = 'Feed';
  export let active = false;


  const dispatch = createEventDispatcher();

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

    dispatch(options.action, options);
  }
</script>
<style>
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

  li.active span.ico {
    background-color: #ffcc00;
  }
  
  li.active.custom span.ico {
    background-color: unset;
  }

  li span.ico {
    background-color: #808080;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 38px;
    height:38px;
  }

  .feeds span.ico {
    -webkit-mask-image: url("/layout.svg");
    /*mask-image: url("/layout.svg");*/
  }

  .media span.ico {
    -webkit-mask-image: url("/image.svg");
  }

  .people span.ico {
    -webkit-mask-image: url("/users.svg");
  }

  .chat span.ico {
    -webkit-mask-image: url("/message-square.svg");
  }

  .more span.ico {
    -webkit-mask-image: url("/more-horizontal.svg");
    -webkit-mask-position: center 8px;
  }
  
  .home span.ico {
    -webkit-mask-image: url("/img/ico_home.svg");
    /*mask-image: url("/layout.svg");*/
  }
  .home.active span.ico {
    background-image: url("/img/ico_home.svg");
    background-repeat: no-repeat;
    background-position:center;
    /*mask-image: url("/layout.svg");*/
    -webkit-mask-image: unset;
  }
  .home span.ico {
    background-image: unset;
    -webkit-mask-image: url("/img/ico_home.svg");
    -webkit-mask-size: 38px;
    background-size:38px;
    height:38px;
    /*mask-image: url("/layout.svg");*/
  }
  .cis span.ico {
    -webkit-mask-image: url("/img/ico_cis.svg");
    -webkit-mask-size: 30px;
    /*mask-image: url("/layout.svg");*/
  }
  .cis.active span.ico {
    -webkit-mask-image: url("/img/ico_cis_active.svg");
    -webkit-mask-size: 44px;
    -webkit-mask-position: center top;
    /*mask-image: url("/layout.svg");*/
  }


</style>

<li class="{classes}" class:active="{active}" on:click="{() => { dispatchEvent({action:'selectLink',name:name}); }}">
  <span class="ico"></span>
  <span>{name}</span>
</li>