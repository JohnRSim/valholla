<script>
	//svelte
	import { onMount, createEventDispatcher, tick } from 'svelte';

	// i18n.js
	import { locale, _ } from 'svelte-i18n';

	export let activeWallet = 'sollet.io';

	const dispatch = createEventDispatcher();
	
    let isMounted = false;
	let showWallets = false;


	onMount(() => {
		isMounted = true;
		//console.log(activeTabDOM,tabHighlightLeft,tabHighlightWidth)
	});

	/**
	 * dispatchEvent
	 * Dispatch event passing option data
	 **/
	function dispatchEvent(options) {
		console.log(`[Dispatch Event][${options.action}]`,options);

		dispatch(options.action, options);
    }
	
	/**
	 * updateWallet
	 **/
	function updateWallet(walletName) {
		activeWallet = walletName;
		showWallets = false;
		dispatchEvent({action:'updateWallet',name:walletName});
	}
</script>

<style>
.login {
	display: flex;	
	background:#0f1211;
	display: flex;
}

button {
	flex:1;
	border:0px;
	border-radius: 0px 6px 6px 0px;
	text-align: center;
	padding:10px 20px;
	font-family:inherit;
	font-size:1em;
}
.signIn {
	background:#1dd79b;
	color:#1b4e3f;
}
.connectToWalletPanel {
	display: flex;
	flex:1;
	border-radius: 6px;
	margin:11px 20px;
}
ul {
	margin:0px;
	padding:0px;
}
li {
	list-style: none;
}
.selectWallet {
	position: relative;
	flex:1;
	border-radius: 6px 0px 0px 6px;
	background: #fff;
	color:#000;
}


.selectWallet.show {
	border-radius: 80px 0px 0px 0px;
}

.selectWallet nav {
	position: absolute;
	top:100%;
	left:0px;
	right:0px;
	background-color:#fff;
	border-radius:0px 0px 8px 8px;
	display:none;
	overflow: hidden;
}
.selectWallet nav li {
	padding:10px 20px;
}

.selectWallet.show nav {
	display:block;
}

.activeWallet {
	height: 100%;
	display: flex;
    align-items: center;
	padding-left:20px;
	background-image:url("/img/ico_caret_down.svg");
	background-position: right 16px center;
	background-repeat:no-repeat;
	background-size:10px;
}

li.active {
	background:#eee;
}
</style>

<svelte:head>
</svelte:head>



<!-- Tablist -->
<div class="login">
	<div class="connectToWalletPanel">
		<div class="selectWallet" class:show="{showWallets}">
			<div class="activeWallet" on:click="{() => { showWallets = !showWallets; }}">
				{#if (showWallets)}
					Select a Wallet 
				{:else}
					{activeWallet}
				{/if}
			</div>
			<nav>
				<ul>
					<li class:active="{(activeWallet==='Bonfida')}" on:click="{() => { updateWallet('Bonfida'); }}">Bonfida</li>
					<li class:active="{(activeWallet==='sollet.io')}" on:click="{() => { updateWallet('sollet.io'); }}">sollet.io</li>
				</ul>
			</nav>
		</div>
		<div>
			<button class="signIn" on:click="{() => {dispatchEvent({action:'signin'}); }}">Connect</button>
		</div>
	</div>
</div>
<!-- xTablist -->