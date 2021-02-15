<script>
	
	//svelte
	import { onDestroy, onMount, tick } from 'svelte';

	//Wallet
	import Wallet from '@project-serum/sol-wallet-adapter';
	
	//Web3
	import {
		Connection,
		clusterApiUrl,
		Account,
	} from '@solana/web3.js';

	//base path
	export let segment;
	if (segment) {
		console.log(`[path][${segment}]`);
	}

	//console
	const Inf = 'background-color: #f8ffff; color: #276f86';

	//defaults
	let connection;
	let defaultNetwork = 'testnet'; //[testnet,api.mainnet-beta,localhost]
	let providerUrl;
	let LAMPORTS_PER_SOL = 0;
	
	//on mount set defaults
	onMount(async() => {
		console.info('%c[Layout][Mount]',Inf);
		
		//setup provider url
		providerUrl = `https://www.sollet.io/#origin=${window.location.origin}&network=${defaultNetwork.replace(/api.mainnet-beta/g,'mainnet')}`;
		console.log(providerUrl)
		
		//connect to network
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