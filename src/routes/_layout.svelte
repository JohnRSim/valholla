<script context="module">
  import { isLoading, waitLocale } from 'svelte-i18n';
  export async function preload(page) {
    return waitLocale();
  }
</script>

<script>
	//sapper
	import { stores } from '@sapper/app';

	//svelte
	import { onDestroy, onMount, tick } from 'svelte';

	//Wallet
	import Wallet from '@project-serum/sol-wallet-adapter';
	
	//Web3
	import {
		Connection,
		//clusterApiUrl,
		Account,
	} from '@solana/web3.js';

	//stores
	import { app as sApp } from '../stores/app.js';
	import { route as sRoute } from '../stores/routes.js';

	//utils
	import { navTo, goBack } from './route.js';
	
	//machine learning sentament analysis
	//import * as toxicity from '@tensorflow-models/toxicity';
	//import '@tensorflow/tfjs-backend-webgl';

	// i18n.js
	import { locale, _ } from 'svelte-i18n';

	//core
	import Avatar from '../ui/core/Avatar.svelte';


	//base path
	export let segment;
	
	//console
	const Inf = 'background-color: #f8ffff; color: #276f86';

	if (segment) {
		console.info('%c[==========]',Inf);
		console.info(`%c[Segment][${segment}]`,Inf);
		console.info('%c[==========]',Inf);
	}

	//grab app core stores
	const { preloading, page, session } = stores();


	//defaults
	let isMounted = false;
	let profilePhoto = '/img/profile-option1.svg';
	

	//bind 
	let drawerMenu;
	let chatview;
	let navMaskEle;

	//route
	let activeTab = false;
	let scrolltarget;
	let scrollBody = '.scrollable';
	let routeCheck = {};
	let displayNav = false;
	let hasTabs = false;
	let activePageLayout = '';
	let showLeftPanel = false;
	let showRightPanel = false;

	//solana
	let connection;
	let defaultNetwork = 'testnet'; //[testnet,api.mainnet-beta,localhost]
	let providerUrl;
	let LAMPORTS_PER_SOL = 0;
	
	//on mount set defaults
	onMount(async() => {
		console.info('%c[Layout][Mount]',Inf);

		isMounted = true;
		
		//setup provider url
		providerUrl = `https://www.sollet.io/#origin=${window.location.origin}&network=${defaultNetwork.replace(/api.mainnet-beta/g,'mainnet')}`;
		console.log(providerUrl)
		
		//connect to network
		/*
		await establishConnection(defaultNetwork).catch((err) => {
			console.warn(`[Network Connection Error]`,err);
		});
		
		//connect to wallet
		connectWallet().then((status) => {
			if (status){
				console.info(`%c[Wallet Connected]`,Inf);
			} else {
				console.warn(`[Wallet Connection Issue]`);
			}
		}).catch(() => {
			console.warn(`[Wallet Connection Error]`,err);
		});
		*/

		//subscribe to page loads
		page.subscribe(async(value) => {
			console.info('%c[Layout][Page Changed]',Inf,value);
			
			const urlParams = new URLSearchParams(window.location.search);
			activeTab = urlParams.get('tab');
			
			const pathArr = value.path.split('/');

			//setup global defaults
			scrolltarget = $sRoute.global.scrolltarget;
			scrollBody = $sRoute.global.scrollBody;
			displayNav = $sRoute.global.displayNav;

			//update globals based off define route vars
			let updateCheck = value.path;
			routeCheck = $sRoute.path[`${updateCheck}`];

			//if route not found check dynamic routes
			if (typeof(routeCheck) === 'undefined') {
				const route = pathArr.slice(0);
				sRoute.updateVal('activeID',route[route.length-1]);
				route.pop();
				
				updateCheck = `${route.join('/')}/*`;
				routeCheck = $sRoute.path[updateCheck];
			} else {
				sRoute.updateVal('activeID',null);
			}
			
			//check active route can be found
			if (typeof(routeCheck) !== 'undefined') {
				//console.log('updating route values...',routeCheck);
				sRoute.updateVal('activeroute',updateCheck);
				
				scrolltarget = (typeof(routeCheck.scrollTarget) !== 'undefined')?routeCheck.scrollTarget: scrolltarget;
				scrollBody = (typeof(routeCheck.scrollBody) !== 'undefined')?routeCheck.scrollBody: scrollBody;
				displayNav = (typeof(routeCheck.displayNav) !== 'undefined')?routeCheck.displayNav: displayNav;

				if (hasTabs) {
					const currentPath = `${window.location.pathname}${window.location.search}`;
					let tabPos = 0;
					hasTabs.forEach((tab, i) => {
						if (tab.path === currentPath) {
							tabPos = i;
						}
					});
				}

				//update active tab if available
				if ((typeof(activeTab) !== 'string') && (typeof(routeCheck.hasTabs) !== 'undefined')) {
					if (routeCheck.hasTabs.length > 0) {
						activeTab = routeCheck.hasTabs[0].name;
					}
				}
			}
		});
	});

	/**
	* Connect to a Solana network clusters
	* @param {string} network name to connect to [testnet, api.mainnet-beta, local]
	*/
	async function establishConnection(network) {
		let urlRoot;

		//set network url
		switch(network) {
			case 'testnet':
				urlRoot = 'https://testnet.solana.com/';
				break;
			case 'api.mainnet-beta':
				//urlRoot = 'https://api.mainnet-beta.solana.com/';
				urlRoot = 'https://solana-api.projectserum.com';
				break;
			//localhost
			default:
				urlRoot = 'http://localhost:8899';
		}

		//connect to network
		connection = new Connection(urlRoot, 'singleGossip');

		//get node version
		const version = await connection.getVersion();

		console.info('%c[Connection to Solana cluster established]', Inf, urlRoot, version);
	}

	/**
	* Connect to Solana wallet using sollet wallet adapter
	* @return {Promise} Resolve to boolean
	*/	
	function connectWallet(){
		return new Promise((resolve,reject) => {
			let wallet = new Wallet(providerUrl);
			
			wallet.on('connect', (publicKey) => {
				console.info(`%c[Connected to sollet.io][${publicKey.toBase58()}][${defaultNetwork}]`,Inf);
				return resolve(true);
			});

			wallet.on('error', (err) => {
				console.error('[Wallet Error]',err);
				return reject();
			});

			wallet.on('disconnect', () => {
				console.warn('Wallet Disconnected');
			});

			wallet.connect();
		});
	}
	
	/**
	* Create new Solana Account
	*/	
	function createSolanaAccount(){
		let localAccount = new Account();
		let b64 = Buffer(localAccount._keypair.secretKey).toString('base64');
		importKey(b64);
	}	
	
	
	/**
	* Get balance of the connected sollet wallet
	* @param {string} account id
	*/			
	async function getBalance(account){
		let balance = 0;
		balance	= await connection.getBalance(account);
		
		return balance;
	}



	/**
	* Retrieve window.crypto.subtle RSA keys from localStorage
	* @return {Promise} resolves to window.crypto.subtle key pair
	*/
	async function getRSAKeys(){
		if (!window.crypto.subtle){return {}}
		let rsaKeyPair = window.localStorage.getItem('rsaKeys');	
		if (rsaKeyPair){
			rsaKeyPair = JSON.parse(rsaKeyPair);
			rsaKeyPair.publicKey = await importPublicKey(rsaKeyPair.publicKey);
			rsaKeyPair.privateKey = await importPrivateKey(rsaKeyPair.privateKey);
		} else{
			rsaKeyPair = {};
		}
		return rsaKeyPair;
	}
	

	/**
	* Create local RSA key pair
	*/	
	async function createRSAKeyPair(){
		if(!rsaKeyPair){
			let rsaKeyPair = await generateRSAKeyPair();
			let exportedKeys= {
				publicKey:await crypto.subtle.exportKey('jwk',rsaKeyPair.publicKey),
				privateKey:await crypto.subtle.exportKey('jwk',rsaKeyPair.privateKey)
			}
			window.localStorage.setItem('rsaKeys',JSON.stringify(exportedKeys));
		}
	}
	
	/**
	* Use window.crypto.subtle to encrypt a message
	* @return {Promise} resolves to a window.crypto.subtle RSA key pair
	*/
	function generateRSAKeyPair(){
		return window.crypto.subtle.generateKey({
			name: 'RSA-OAEP',
			modulusLength: 4096,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: 'SHA-256'
		},
		true,
		['encrypt','decrypt']
		);
	}

	/**
	* Convert JWK to window.crypto.subtle public key
	* @param {Object} JSON Web Public Key
	* @return {Promise} Should resolve to window.crypto.subtle public key
	*/
	function importPublicKey(jwk) {
		return window.crypto.subtle.importKey(
			'jwk',
			jwk,
			{
				name: 'RSA-OAEP',
				modulusLength: 4096,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: 'SHA-256'
			},
			true,
			['encrypt']
		);
	}
	
	/**
	* Convert JWK to window.crypto.subtle private key
	* @param {Object} JSON Web Private Key
	* @return {Promise} Should resolve to window.crypto.subtle private key
	*/
	function importPrivateKey(jwk) {
		return window.crypto.subtle.importKey(
			'jwk',
			jwk,
			{
				name: 'RSA-OAEP',
				modulusLength: 4096,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: 'SHA-256'
			},
			true,
			['decrypt']
		);
	}

	/**
	* Send Sol to a contact
	* @param {String} Solana Public address
	* @param {Number} Amount of Sol to send
	* @return {Promise} Resolve to the transaction id
	*/	
	async function sendSol(solanaPublicKey,solAmount){
		let instruction = SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey:new PublicKey(solanaPublicKey),
			lamports:Math.ceil(solAmount * LAMPORTS_PER_SOL),
		});

		let transaction = new Transaction().add(instruction);
		let txid;

		try {
			txid = await sendAndConfirmTransaction(
				'sendSol',
				connection,
				transaction,
				localPayerAccount,
			);

			saveTransaction(txid,defaultNetwork,'sendSol').catch(console.warn);
		} catch(e){
			console.error(e);
			return null;
		}

		return txid;
	}

	let windowSizeTimer = null;
	let updateScrollerTarget = false;
	/**
	 * windowResize
	 **/
	function windowResize(e) {
		//console.log('-------------windowResize',e);
		clearTimeout(windowSizeTimer);
		//document.body.classList.add('hideScoll');
		windowSizeTimer = setTimeout(() => {
			//document.body.classList.remove('hideScoll');
			let screenType = 'Mobile';
			if (e.target.innerWidth <= 768) {
				screenType = 'Mobile';
			} else {
				screenType = 'Desktop';
			}
				
			document.body.classList.remove('Mobile', 'Desktop');
			document.body.classList.add(screenType);
		},500);
	}
	
	let blur = false;
	let enableAutoTransitions = true;
	let currentX = 0;
	let currentY = 0;
	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;
	let screenWidth;
	let startOpacity = 0;
	let initDirectionSet = false;
	let scrollHorizontal = false;
	let scrollVertical = false;
	let menuPos = 0;
	let scrollChangeDirPos = 0;
	let direction;
	let finalDirection;

	/**
	 * scrollStart
	 **/
	function scrollStart(e) {

		if (
			(e.targetTouches.length >= 2) || 
			(e.changedTouches.length >= 2)
		) {
			resetToContentView();
			// prevent swipe to navigate back gesture
			//e.preventDefault();
			return;
		}
		blur = false;
		enableAutoTransitions = false;
		startX = Math.round(e.touches[0].clientX);
		endX = Math.round(e.touches[0].clientX);
		startY = Math.round(e.touches[0].clientY);
		screenWidth = window.innerWidth;
		startOpacity = opacityVal;


    	// is not near edge of view, exit
    	if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;
		// prevent swipe to navigate back gesture
		//e.preventDefault();
  		
	}


	/**
	 * scrollEnd
	 **/
	function scrollEnd(e) {
		if (
			(e.targetTouches.length >= 2) || 
			(e.changedTouches.length >= 2)
		) {
			resetToContentView();
			return;
		}

		if ((scrollHorizontal) && ($sRoute.activeroute !== '/*')) {
			//console.log(direction,finalDirection,activeLayout)
			//on home return to home display
			if ((direction === 'left') && (finalDirection === 'right') && (activeLayout === 'home')) {
				updateDisplay('home');
			} else

			//on home show sidebar
			if ((direction === 'left') && (finalDirection === 'left') && (activeLayout === 'home')) {
				//show chat
				if (langDirection === 'ltr') {
					updateDisplay('chat');
				//show nav
				} else {
					updateDisplay('nav');
				}
			} else

			//on home show sidebar
			if ((direction === 'right') && (finalDirection === 'right') && (activeLayout === 'home')) {
				//show nav
				if (langDirection === 'ltr') {
					updateDisplay('nav');
				//show chat
				} else {
					updateDisplay('chat');
				}
			} else

			//on home return to home display
			if ((direction === 'right') && (finalDirection === 'left') && (activeLayout === 'home')) {
				updateDisplay('home');
			} else

			//on chat
			if ((direction === 'right') && (finalDirection === 'right') && (activeLayout === 'chat')) {
				//return to home
				if (langDirection === 'ltr') {
					updateDisplay('home');
				//stay on chat
				} else {
					chatMenuPos = '0%';
				}
			} else

			//on chat
			if ((direction === 'left') && (finalDirection === 'left') && (activeLayout === 'chat')) {
				//stay on chat
				if (langDirection === 'ltr') {
					chatMenuPos = '0%';
				//return to home
				} else {
					updateDisplay('home');
				}
			} else

			//on chat
			if ((direction === 'left') && (finalDirection === 'right') && (activeLayout === 'chat')) {
				//return to home
				if (langDirection === 'ltr') {
					updateDisplay('home');
				//stay on chat
				} else {
					chatMenuPos = '0%';
				}
			} else

			//on chat
			if ((direction === 'right') && (finalDirection === 'left') && (activeLayout === 'chat')) {
				//stay on chat
				if (langDirection === 'ltr') {
					chatMenuPos = '0%';
				//return to home
				} else {
					updateDisplay('home');
				}
			} else

			//on nav
			if ((direction === 'right') && (finalDirection === 'right') && (activeLayout === 'nav')) {
				//stay on nav
				if (langDirection === 'ltr') {
					drawerMenuPos = `0%`;
				//return to home
				} else { 
					updateDisplay('home');
				}
			} else

			//on nav
			if ((direction === 'left') && (finalDirection === 'left') && (activeLayout === 'nav')) {
				//return to home
				if (langDirection === 'ltr') {
					updateDisplay('home');
				//stay on nav
				} else { 
					drawerMenuPos = `0%`;
				}
			} else

			//on nav
			if ((direction === 'left') && (finalDirection === 'right') && (activeLayout === 'nav')) {
				//stay on nav
				if (langDirection === 'ltr') {
					drawerMenuPos = `0%`;
				//return to home
				} else { 
					updateDisplay('home');
				}
			} else

			//on nav
			if ((direction === 'right') && (finalDirection === 'left') && (activeLayout === 'nav')) {
				//return to home
				if (langDirection === 'ltr') {
					updateDisplay('home');
				//stay on nav
				} else { 
					drawerMenuPos = `0%`;
				}
			}
		}

		initDirectionSet = false; 
		scrollHorizontal = false;
		enableAutoTransitions = true;
	}

	
	let activeLayout = 'home';
	let maskTimer;
	let blurTimer;
	let showNavMask = false;
	let opacityVal = 0;
	let langDirection = 'ltr';
	let drawerMenuPos = (langDirection === 'ltr')?'-100%':'100%';
	let chatMenuPos = (langDirection === 'ltr')?'100%':'-100%';
	let enableInset = false;
	let enableOutset = false;
	
	/**
	 * updateDisplay
	 **/
	function updateDisplay(updateLayout) {
		//BUG - this is running multiple times..
		console.log('?',updateLayout)
		activeLayout = updateLayout;//($sRoute.activeroute === '/*')?'home':updateLayout;
		
		clearTimeout(maskTimer);
		clearTimeout(blurTimer);

		blur = false;
		switch (activeLayout) {
			case 'nav':
				showNavMask = true;
				opacityVal = 0.75;
				drawerMenuPos = '0%';
				if (langDirection === 'ltr') {
					enableInset = false;
					enableOutset = true;
				} else {
					enableInset = true;
					enableOutset = false;
				}
				
				//blurs bg mask display
				blurTimer = setTimeout(() => {
					blur = true;
				}, 300);
				break;
			case 'chat':
				showNavMask = true;
				opacityVal = 0.75;
				chatMenuPos = '0%';
				if (langDirection === 'ltr') {
					enableInset = true;
					enableOutset = false;
				} else {
					enableInset = false;
					enableOutset = true;
				}
				break;
			//home
			default:
				opacityVal = 0;
				enableInset = false;
				enableOutset = false;
				if (langDirection === 'ltr') {
					chatMenuPos = '100%';
					drawerMenuPos = '-100%';
				} else {
					chatMenuPos = '-100%';
					drawerMenuPos = '100%';
				}
				maskTimer = setTimeout(() => {
					showNavMask = false;
				},300);
		}

	}/**
	 * checkDirection
	 **/
	function checkScrollDirection(e) {
		//if anonymous or disabled touch or touches more than 1 finger press disable.
		if (
			(e.targetTouches.length >= 2) || 
			(e.changedTouches.length >= 2)
		) {
			resetToContentView();
			return;
		}
		//get current touch position
		currentX = Math.round(e.touches[0].clientX);
		currentY = Math.round(e.touches[0].clientY);

		//has initialdirection been set if not get direction
		if (!initDirectionSet) {
			//console.log(currentX,startX);
			//console.log(currentY,startY);
			scrollHorizontal = false;
			scrollVertical = false;
			if ($sApp.lockScroll) {
				sApp.updateVal('lockScroll',false);
			}
			if ($sApp.disablePullToRefresh) {
				sApp.updateVal('disablePullToRefresh', false);
			}
			//console.log(currentY,startY)
			if ((currentY < (startY-5)) || (currentY > (startY+5))) {
				if ((currentY > startY) || (currentY < startY)) {
					initDirectionSet = true;
					scrollVertical = true;
					endY = currentY;
					scrollChangeDirPos = startY;
				}
			} else {
				if (currentX < startX) {
					// Left
					//console.log('left');
					
					scrollHorizontal = true;
					initDirectionSet = true;
					direction='left';
				} else if(currentX > startX){
					// Right
					//console.log('right');
					scrollHorizontal = true;
					initDirectionSet = true;
					direction='right';
				}
			}
		}

		//header scroll logic
		if (scrollVertical) {
			
		}

		//enable side panel swipe logic
		if (scrollHorizontal) {
			clearTimeout(maskTimer);
			showNavMask = true;

			let maxOpacity = 0.75;
			let calcDistance = Math.round(100/screenWidth * (currentX-startX))/100;
			let calcOpacity = startOpacity + calcDistance;
			let contentAlignment = Math.round(100/screenWidth * (currentX-startX))
			//console.log(startOpacity + calcDistance);
			//setPos = ((contentAlignment < 10) && (contentAlignment > -10))?`${contentAlignment}%`:(contentAlignment<0)?'-10%':'10%';
			//console.log(direction,activeLayout);
			
			menuPos = ((currentX-startX) < -screenWidth)?-screenWidth: currentX-startX;

			//show chat
			if ((direction === 'left') && (activeLayout === 'home')) {
				//
				opacityVal = (-calcOpacity > maxOpacity)?maxOpacity:-calcOpacity;

				if (langDirection === 'ltr') {
					chatMenuPos = `calc(100% + ${menuPos}px)`;
				} else {
					drawerMenuPos = `calc(100% + ${menuPos}px)`;
				}
				if (!$sApp.lockScroll) {
					sApp.updateVal('lockScroll',true);
				}
				if (!$sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', true);
				}
			} else

			//show nav drawer
			if ((direction === 'right') && (activeLayout === 'home')) {
				//
				opacityVal = (calcOpacity > maxOpacity)?maxOpacity:calcOpacity;

				if (langDirection === 'ltr') {
					menuPos = (menuPos < screenWidth)?menuPos:screenWidth;
					drawerMenuPos = `calc(-100% + ${menuPos}px)`;
				} else {
					chatMenuPos = `calc(-100% + ${menuPos}px)`;
				}
				if (!$sApp.lockScroll) {
					sApp.updateVal('lockScroll',true);
				}
				if (!$sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', true);
				}
			} else

			//hide chat
			if ((direction === 'right') && (activeLayout === 'chat')) {

				if (langDirection === 'ltr') {
					menuPos = (menuPos < 0)?0:menuPos;
					chatMenuPos = `calc(0% + ${menuPos}px)`;
				} else {
					//chatMenuPos = `calc(0% + ${menuPos}px)`;
				}
				
				if ($sApp.lockScroll) {
					sApp.updateVal('lockScroll',false);
				}
				if ($sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', false);
				}
			} else

			//hide chat
			if ((direction === 'left') && (activeLayout === 'chat')) {
				if (langDirection === 'ltr') {
					//chatMenuPos = `calc(0% + ${menuPos}px)`;
				} else {
					//menuPos = (menuPos > 0)?0:menuPos;
					chatMenuPos = `calc(0% + ${menuPos}px)`;
				}
				
				if ($sApp.lockScroll) {
					sApp.updateVal('lockScroll',false);
				}
				if ($sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', false);
				}
			} else

			//hide nav
			if ((direction === 'right') && (activeLayout === 'nav')) {
				calcOpacity = startOpacity - calcDistance;
				//console.log(calcOpacity,maxOpacity)
				//
				opacityVal = (calcOpacity > maxOpacity)?maxOpacity:calcOpacity;
				
				if (langDirection === 'ltr') {
					opacityVal = maxOpacity;
					//drawerMenuPos = `calc(0% + ${menuPos}px)`;
				} else {
					menuPos = (menuPos < 0)?0:menuPos;
					drawerMenuPos = `calc(0% + ${menuPos}px)`;
				}
				if ($sApp.lockScroll) {
					sApp.updateVal('lockScroll',false);
				}
				if ($sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', false);
				}
			}

			//hide nav
			if ((direction === 'left') && (activeLayout === 'nav')) {
				//
				opacityVal = (calcOpacity > maxOpacity)?maxOpacity:calcOpacity;
				
				if (langDirection === 'ltr') {
					menuPos = (menuPos > 0)?0:menuPos;
					drawerMenuPos = `calc(0% + ${menuPos}px)`;
				} else {
					opacityVal = maxOpacity;
					//drawerMenuPos = `calc(0% + ${menuPos}px)`;
				}
				if ($sApp.lockScroll) {
					sApp.updateVal('lockScroll',false);
				}
				if ($sApp.disablePullToRefresh) {
					sApp.updateVal('disablePullToRefresh', false);
				}
			}

			//calc final finger dir
			if (endX < currentX) {
				finalDirection = 'right';
			} else {
				finalDirection = 'left';
			}

			//store end pos for next pos to calculate final direction
			endX = currentX;
		}
	}

	/**
	 * resetToContentView
	 **/
	function resetToContentView(update) {
		//updateDisplay('home');
		const updateView = update || activeLayout;
		if (activeLayout !== updateView) {
			updateDisplay(updateView);
		}
	}

</script>

<style>
	#V-siteWrapper {
		display: flex;
		height:100%;
		flex:1;
		min-width: 360px;
		/*transition: background 0.2s;*/
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color:var(--bg-baseWrap);
	}

	#V-site {
		position: relative;
		flex:1;
		display:flex;
		flex-direction:column;
		/*overflow-y: scroll;*/
    	overflow-y: hidden;
    	overflow-x: hidden;
		transition: margin 0.3s;
		/*-webkit-overflow-scrolling: touch;
		overscroll-behavior-y: none;*/
   		height: 99.9%;
	}

	#S-drawerMenu {
		will-change:transform;
		position: fixed;
		top: 0;
		bottom:0px;
		left:0px;
		right:0px;
		z-index: 20;
		display: flex;
	}

	[dir="ltr"] #S-drawerMenu {
		transform: translate3d(-100%,0,0);
	}

	[dir="rtl"] #S-drawerMenu {
		transform: translate3d(100%,0,0);
	}

	#S-chatView {
		position: fixed;
		top: 0;
		bottom:0px;
		left:0px;
		right:0px;
		z-index: 20;
		background:#000;
	}

	[dir="ltr"] #S-chatView {
		transform: translate3d(100%,0,0);
	}

	[dir="rtl"] #S-chatView {
		transform: translate3d(-100%,0,0);
	}

	#S-navPanel {
		background:#fff;
		flex:1;
		color:#323232;
		display: flex;
		flex-direction: column;
	}

	#S-navPanel header {
		padding:15px;
    	border-bottom: 1px solid #f2f2f2
	}

	#S-navPanel header h1 {
		/*font-size:1.125em;*/
		font-size:1em;
		line-height: 1.38;
		margin-bottom:0px;
   		/*margin-bottom: 2px;*/
	}

	#S-navPanel header h2 {
		font-size:0.875em;
		font-weight: normal;
		margin:0px;
	}

	nav {
		flex:1;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	nav ul {
		margin:0px;
		padding:15px 0px;
	}

	nav ul li {
		list-style: none;
		padding:8px 15px;
	}

	
	#S-navPanel footer {
		background: #000;
		color:#fff;
		font-size:0.875em;
		line-height: 1.36;
		
	}
	#S-navPanel footer ul {
		padding-bottom:0px;
	}
	
	#S-version {
		padding: 0px 15px 7px;
		text-align: right;
		font-size: 0.625em;
		line-height: 1.5;
		opacity: 0.4;
	}
	[dir="rtl"] #S-version {
		text-align: left;
	}

	#followingPanel {
    	font-size: 0.95em;
    	padding: 15px 15px 15px 15px;
   		border-bottom: 1px solid #f2f2f2;
	}
	#followingPanel span {
		margin-right:8px;
		background: rgba(242, 242, 242, 0.6);
		border-radius: 40px;
		padding: 4px 8px;
    	display: inline-block;
	}
	
	[dir="rtl"] #followingPanel span {
		margin-right:0px !important;
		margin-left:8px;
	}
	
	#S-mainContent {
		will-change:transform, opacity;
		flex:1;
		transform: translate3d(0%,0,0);
		opacity:1;
		display: flex;
		z-index: 10;
		transition: transform 0.3s, opacity 0.3s;
	}

	#S-mainContent main {
		display: flex;
		flex-direction: column;
		
		max-width: 966px;
		min-width: 360px;
		/* margin: 0px auto; */
		
    	margin: 0px auto;
		width: 100%;
		position: relative;
		flex: 2;
	}

	#S-mainContent.inset {
   		transform: translate3d(-10%,0,0);
	}

	#S-mainContent.outset {
   		transform: translate3d(+10%,0,0);
	}

	#S-mask {
		position: fixed;
		top:0px;
		left:0px;
		right:0px;
		bottom:0px;
		z-index:15; 
		pointer-events: none;
    	backdrop-filter: blur(2.6px) opacity(0);
  		transition: backdrop-filter 0.2s;
		will-change:opacity;
	}
	
	#S-mask.blur {
   		background: rgba(0,0,0,0.01);
    	backdrop-filter: blur(2.6px) opacity(1);
	}

	.maskBlur {
		opacity: 0;
		position: fixed;
		top:0px;
		left:0px;
		right:0px;
		bottom:0px;
		background-color: rgb(0, 0, 0);
		will-change:opacity;
		pointer-events: none;
	}
</style>

<svelte:window on:resize={windowResize} on:touchstart="{scrollStart}" on:touchmove="{checkScrollDirection}" on:touchend="{scrollEnd}"/>



{#if $isLoading}
  <div class="loading">Loading...</div>
{:else}
<!-- valholla Site Wrapper -->
<div id="V-siteWrapper" class="gpu_acc {activePageLayout}" dir="{langDirection}">
	<div id="V-site">
		{#if ($sRoute.activeroute !== '/*')}
			<!-- Drawer Menu -->
			<aside id="S-drawerMenu" bind:this="{drawerMenu}" class="gpu_accx" class:autoTransition="{enableAutoTransitions}" style="transform: translate3d({drawerMenuPos}, 0px, 0px);">
				<div id="S-navPanel">
					<header class="main" on:click="{() => { setTimeout(() => { resetToContentView('home'); },200); navTo(`/profile/${userID}`); }}">
						<Avatar size="thumbnail" profileImg="{profilePhoto}" />
						<h1 style="margin-top:15px;">
							Anonymous
						</h1>
					</header>
					<div id="followingPanel" class="underlay">
						<span on:click="{() => { resetToContentView('home'); navTo(`/following/16001`)} }"><b>0</b> Following</span> 
						<span on:click="{() => { resetToContentView('home'); navTo(`/followers/16001`)} }"><b>0</b> Followers</span> 
					</div>
					<nav>
						<ul style="padding:5px 0px;">
							<li on:click="{() => { setTimeout(() => { resetToContentView('home'); },200); navTo('/feed/Home'); }}">{$_('template.side_nav.home')}</li>
							<li on:click="{() => { setTimeout(() => { resetToContentView('home'); },200); navTo('/feed/Apps'); }}">My Apps</li>
							
						</ul>
					</nav>
					<footer>
						<nav>
							<ul>
							</ul>
						</nav>
						<div id="S-version">
							Version No. {$sApp.version}-{$sApp.environment}
						</div>
					</footer>
				</div>
				<div style="min-width:20%" on:click="{() => { setTimeout(() => { resetToContentView('home'); },200); }}"></div>
			</aside>
			<!-- xDrawer Menu -->

			<!-- Chat Menu -->
			<aside id="S-chatView" bind:this="{chatview}" class="gpu_accx" class:autoTransition="{enableAutoTransitions}" style="transform: translate3d({chatMenuPos}, 0px, 0px);">
				<div on:click="{() => { setTimeout(() => { sApp.updateVal('updateActiveLayout','home'); },10); }}">Close Chat</div>
			</aside>
			<!-- xChat Menu -->
			
			
			<!-- class:blur="{((enableInset || enableOutset) && !(scrollHorizontal))}"-->
			<div class="gpu_accx" class:blur="{blur}" bind:this="{navMaskEle}" id="S-mask"><div class="maskBlur" style="opacity:{opacityVal};"></div></div>
		{/if}

		
		<!-- Page Content -->
		<div id="S-mainContent" class="gpu_acc" class:inset="{enableInset}" class:outset="{enableOutset}">
			<main>
				<slot></slot>
			</main>
		</div>
		<!-- xPage Content -->
	</div>

</div>
{/if}
<!-- valholla Site Wrapper -->