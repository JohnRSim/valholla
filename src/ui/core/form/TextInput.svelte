<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';

	//gestures
  import { tap } from '@sveltejs/gestures';
	
	// i18n.js
	import { locale, _ } from 'svelte-i18n';
  
  export let label = false;
  export let value = '';
  export let placeholder = '';
  export let type = 'text';
  export let enterkeyhint = 'next';
  export let readonly = false;
  export let iconEnd = false;
  export let active = false;
  export let selection = [];
  export let translationPath = '';

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
  .inputtxt {
    margin-bottom:15px;
  }
  label {
    font-weight: bold;
    font-size:0.875em;
  }

  .inputWrapper {
    /*box-shadow: inset 0px 0px 0.5px #d1d1d1;;*/
    border:solid 1px #d1d1d1;
    border-radius: 90px;
    margin:5px 0px;
    display: flex;
  }

  input {
    flex:1;
    color:#b5b5b5;
    height:45px;
    padding:0px 20px;
    background:transparent;
    border:0px;
  }
  input.active {
    color:#323232;
  }
  
  .inputWrapper.next {
    padding-right:40px;
    background-image: url("/img/ico_next.svg");
    background-position: right 10px center;
    background-repeat: no-repeat;
    height:100%;
  }
  .inputWrapper.remove {
    padding-right:40px;
    background-image: url("/img/ico_close.svg");
    background-position: right 10px center;
    background-repeat: no-repeat;
    background-size: 30px;
    height:100%;
  }
</style>

<div class="inputtxt" use:tap on:tap>
  {#if (label)}
  <label>{label}</label>
  {/if}
  {#each selection as select}
  <div class="inputWrapper remove" on:click|stopPropagation="{() => { dispatchEvent({action:'removeSelect', value:select}); }}">
    {#if (translationPath === '')}
      <input class="active" readonly type="text" value="{select}" autocorrect="off" autocapitalize="none" />
    {:else}
      <input class="active" readonly type="text" value="{$_(`${translationPath}${select.toUpperCase()}`)}" autocorrect="off" autocapitalize="none" />
    {/if}
  </div>
  {/each}
  <div class="inputWrapper {iconEnd}">
    <input class:active="{active}" readonly="{readonly}" type="{type}" enterkeyhint="{enterkeyhint}" value="{value}" placeholder="{placeholder}" autocorrect="off" autocapitalize="none" />
  </div>
</div>
