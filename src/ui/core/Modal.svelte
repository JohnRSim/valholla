<script>
	//svelte
  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  
  
	import {
		Button,
		ButtonConfig
  } from 'fb-atlas-components';

  
    import 'dialog-polyfill/dist/dialog-polyfill.css';
  
	const { authBtnx } = ButtonConfig;


  export let show = 'false';
  export let header = false;
  export let classes = '';
  export let tpl;
  export let buttons = [];
  export let htmlText = '';
  export let buttonLayout = 'vertical';
  export let title = '';
  //export let description;

  const dispatch = createEventDispatcher();

  let modalDom;
  let isMounted = false;
  let hideModal = false;
  let loading = false;

  $: if ((isMounted) && (show)) {
    if ((show === 'true') && (modalDom) && (modalDom.showModal)) {
        modalDom.showModal();
    } else {
      closeModel();
    }
  }

  onMount(async () => {
    console.info('[Modal][Mount]');
    const dialogPolyfill = await import('dialog-polyfill');//fixes firefox
    //console.log(dialogPolyfill);
    dialogPolyfill.default.registerDialog(modalDom);
    isMounted = true;
    
  });


  onDestroy(() => {
    if (process.browser) {
      console.info('[Modal][Destroy]');

      //const modal = document.querySelector('#modal');
      if ((modalDom) && (modalDom.open)) {
        modalDom.close();
      }
    }
  });

  /**
   * closeModel
   **/
  function closeModel() {
    console.info('[Modal][Close]');

    //const modal = document.querySelector('#modal');
    if ((modalDom) && (modalDom.open)) {
      hideModal = true;
      loading = false;
      const hideTheModal = function() {
          hideModal = false;
          modalDom.close();
          dispatchEvent('reset');
          modalDom.removeEventListener('webkitAnimationEnd', hideTheModal, false);
      }
      modalDom.addEventListener('webkitAnimationEnd', hideTheModal, false);
    }
  }

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
dialog::backdrop,
dialog + .backdrop {
  overflow:hidden;
  backdrop-filter: blur(2px);
  opacity:0;
}
:global(dialog + .backdrop) {
  background: rgba(0,0,0,0.6) !important;
}
:global(
  dialog[open]::backdrop,
  dialog[open] + .backdrop
) {
  animation-name: showBackdrop;
  animation-duration: 0.6s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  opacity:0;
}

@keyframes showBackdrop {
  0% {opacity: 0}
  1% {opacity: 0}
  to {opacity: 1}
}
@keyframes hideBackdrop {
  0% {opacity: 1}
  to {opacity: 0}
}

:global(
  dialog[open].hide::backdrop,
  dialog[open].hide + .backdrop
) {
  animation-name: hideBackdrop;
  animation-duration: 0.6s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  opacity: 1;
}
dialog {
  left: 40px;
  right: 40px;
  top:auto;
  opacity:0;
	background:#fff;
  width: auto;
  border-radius: 16px 16px 28px 28px;
  border: 0px;
  transition: bottom 0.2s;
  padding:0px;
  position: fixed;
  will-change:transform, opacity;
  bottom:0px;
}

#modelWrapper {
  /*min-height:200px;*/
  position: relative;
  display: flex;
  flex-direction: column;
  text-align:center;
}

#headerAnim {
  margin-top: -10px;
  border-radius: 100px;
  overflow: hidden;
  width: 80px;
  height: 80px;
  margin: -30px auto;
	background:#fff;
  position: relative;
}

header {
  /*padding:10px;*/
  min-height:50px;
}

main {
  flex:1;
  padding:10px;
  color:#666;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  /* align-self: center; */
  align-items: center;

}

footer {
  display: flex;
}

h2 {
  line-height:1.4;
  margin:0px;
}

.clear {
    background:transparent;
    /*border: 0.1px solid #F1F1F1;*/
    color:var(--color-core);
}
footer.vertical {
  flex-direction: column;
	padding:0px 5px;
}

:global(.error .button.primary) {
  background:#ee4238;
}

:global(.warning .button.primary) {
  background:#ffb800;
}

:global(dialog[open]) {
  animation-name: showmodal;
  animation-duration: 0.6s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  opacity:0;
  transform:translate3d(0%, 100%, 0px);
}

:global(dialog[open].hide) {
  animation-name: hidemodal;
  animation-duration: 0.6s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  opacity:1;
  transform:translate3d(0%, -10%, 0px);
  /*bottom: 20px;*/
}

@keyframes showmodal {
  0% {transform:translate3d(0%, 100%, 0px); opacity: 0}
  1% {opacity: 1}
  to {transform:translate3d(0%, -10%, 0px); opacity: 1}
}

@keyframes hidemodal {
  0% {transform:translate3d(0%, -10%, 0px); opacity: 1}
  to {transform:translate3d(0%, 100%, 0px);opacity: 0}
}
/*
@keyframes showmodal {
  0% {bottom: 0px; opacity: 0}
  1% {bottom:-200px; opacity: 1}
  to {bottom:20px; opacity: 1}
}

@keyframes hidemodal {
  0% {bottom: 20px; opacity: 1}
  to {bottom:-200px; opacity: 0}
}
*/
.container {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  zoom:0.2;
}

.item {
  width: 100px;
  height: 100px;
  position: absolute;
}

.item-1 {
  background-color: #FA5667;
  top: 0;
  left: 0;
  z-index: 1;
  animation: item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-2 {
  background-color: #7A45E5;
  top: 0;
  right: 0;
  animation: item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-3 {
  background-color: #1B91F7;
  bottom: 0;
  right: 0;
  z-index: 1;
  animation: item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-4 {
  background-color: #FAC24C;
  bottom: 0;
  left: 0;
  animation: item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

@keyframes item-1_move {
  0%, 100% {transform: translate(0, 0)} 
  25% {transform: translate(0, 100px)} 
  50% {transform: translate(100px, 100px)} 
  75% {transform: translate(100px, 0)} 
}

@keyframes item-2_move {
  0%, 100% {transform: translate(0, 0)} 
  25% {transform: translate(-100px, 0)} 
  50% {transform: translate(-100px, 100px)} 
  75% {transform: translate(0, 100px)} 
}

@keyframes item-3_move {
  0%, 100% {transform: translate(0, 0)} 
  25% {transform: translate(0, -100px)} 
  50% {transform: translate(-100px, -100px)} 
  75% {transform: translate(-100px, 0)} 
}

@keyframes item-4_move {
  0%, 100% {transform: translate(0, 0)} 
  25% {transform: translate(100px, 0)} 
  50% {transform: translate(100px, -100px)} 
  75% {transform: translate(0, -100px)} 
}

:global(#modal button) {
    margin: 10px;
    min-height: 40px;
}
</style>

<dialog id="modal" class="{classes}" class:hide="{hideModal}" bind:this="{modalDom}">
  <div id="modelWrapper">
    {#if header}
    <!-- Header -->
    <header>
      <div id="headerAnim">
        {#if tpl === 'processing'}
          <div class="container">
            <div class="item item-1"></div>
            <div class="item item-2"></div>
            <div class="item item-3"></div>
            <div class="item item-4"></div>
          </div>
        {/if}
      </div>
    </header>
    <!-- xHeader -->
    {/if}

    <main>
    {#if tpl}
      <!-- Info -->
      {#if tpl === 'uploadError'}
          <div>
            <h2>Unable to upload file(s)</h2>

            {@html htmlText}
          </div>
      {:else if tpl === 'uploadSuccess'}
          <div>
            <h2>File(s) uploaded Successfully</h2>

            {@html htmlText}
          </div>
      {:else if tpl === 'unknownError'}
          <div>
            <h2>Unknown Error</h2>
            <p>
              An unknow error has occured.<br /> 
              - Please review and try again.
            </p>
          </div>
      {:else if tpl === 'processing'}
          <div>
            <h2>Generating Article</h2>
            <p>
              We are processing your article.<br />
              This will be complete soon....
            </p>
          </div>
      {/if}
      <!-- xInfo -->
    {:else}
      <div>
        {#if (title)}
        <h2>{title}</h2>
        {/if}

        {@html htmlText}
      </div>
    {/if}
    </main>
    
    {#if (buttons)}
    <!-- Footer -->
    <footer class="{buttonLayout}">
		  {#each buttons as button}
        {#if (button.enableUpload)}
          &nbsp;
        {:else}
        
          <Button 
            {...authBtnx} 
            cssName="{(loading)?'loading':''}"
            on:tap="{() => { 
              console.log('?xx')
              if (!loading) {
                if (button.action) {
                  dispatchEvent({action:button.action});
                }
                if (button.method) {
                  button.method();
                }
              }
              loading = true;
            }}">
            {#if (!loading)}
              {button.text}
            {/if}
          </Button>
          <!--<button on:click="{() => { 
            if (button.action) {
              dispatchEvent({action:button.action});
            }
            if (button.method) {
              button.method();
            }
           }}" class="button {button.type}">{button.text}</button>-->
        {/if}
      {/each}
    </footer>
    <!-- xFooter -->
    {/if}
  </div>
</dialog>