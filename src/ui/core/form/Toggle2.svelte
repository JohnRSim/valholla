<script>
	//svelte
  	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  
	export let inputname = 'field';
	export let inputVal = false;
	export let disableClick = true;

	  const dispatch = createEventDispatcher();
	  
	const labelOff = 'OFF';
	const labelOn = 'ON';

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	const dispatchEvent = (options) => {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
	}
</script>

<style>
.toggleWrapper input{
	opacity: 0;
	pointer-events: none;
	position: absolute;
}

.toggle{
	cursor: pointer;
	display: inline-block;
	position: relative;
	width: 120px;
	height: 50px;
	background: var(--bg-input-login);
	border-radius: 5px;
	-webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle:before, .toggle:after {
	position: absolute;
	line-height: 50px;
	font-size: 14px;
	z-index: 2;
	-webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle:before {
	content: attr(data-before);
	left: 20px;
	color: #999;
	text-transform: uppercase;
}

.toggle:after{
	content: attr(data-after);
	right: 20px;
	color: #afafaf;
	text-transform: uppercase;
}

.toggle__handler{
	display: inline-block;
	position: relative;
	z-index: 1;
	background: #fff;
	width: 65px;
	height: 44px;
	border-radius: 3px;
	top: 3px;
	left: 3px;
	-webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	-webkit-transform: translateX(0px);
	transform: translateX(0px);
}

:global([dir="rtl"] .toggle__handler) {
	transform: translateX(-55px) !important;
}

input:checked + .toggle{
	background: #66b317;
}

input:checked + .toggle:before{
	color: #fff;
}

input:checked + .toggle:after{
	color: #66b317;
}

input:checked + .toggle .toggle__handler{
	width: 54px;
	-webkit-transform: translateX(60px);
	transform: translateX(60px);
	border-color: #fff;
}
[dir="rtl"] input:checked + .toggle .toggle__handler {
	width: 54px;
	-webkit-transform: translateX(-6px) !important;
	transform: translateX(-6px) !important;
}
</style>

<div class="toggleWrapper" id="{inputname}" on:click="{() => { dispatchEvent({action:'toggle',val:!inputVal}); }}">
	<input type="checkbox" id="{inputname}_toggle" bind:checked="{inputVal}" class="{inputname}" />
	<label for="{disableClick ? undefined : `${inputname}_toggle`}" class="toggle" data-before="{labelOff}" data-after="{labelOn}"><span class="toggle__handler"></span></label>
</div>