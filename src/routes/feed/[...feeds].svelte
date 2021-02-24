<script context="module">
	export async function preload(page, session) {
		const [ feeds ] = page.params.feeds;
		let { tab } = page.query;
		tab = (typeof(tab) !== 'undefined')?tab: '';
		return { feeds, tab };
	}
</script>

<script>
	//sapper
	import { goto } from '@sapper/app';

	// svelte
	import { onMount, tick } from 'svelte';

	//i18n
	import { _ } from 'svelte-i18n';

	//utils
	import { navTo } from '../route.js';

	//ipfs
	import { initIpfs } from '../../utils/ipfs.js';


	//chain
	import { 
		Account,
		Connection,
		PublicKey,
		Transaction,
		TransactionInstruction,
		sendAndConfirmTransaction
	} from '@solana/web3.js';
	
	import {Buffer} from 'buffer';
	import * as BufferLayout from '../../utils/Layout.js';
	//transitions
	//import { send, receive } from '../../transition/crossfade';
	import { fade } from 'svelte/transition';
	
	//Nav
	export let feeds = 'Home';
	export let tab = '';
	
	//console
	const Inf = 'background-color: #f8ffff; color: #276f86';
	
	if (tab) {
		console.info('%c[==========]',Inf);
		console.info(`%c[Tab][${tab}]`,Inf);
		console.info('%c[==========]',Inf);
	}


	let isMounted = false;

	//chain
	let connection = new Connection('https://testnet.solana.com');
	let dataLayout = BufferLayout.struct([ BufferLayout.blob(1000,'txt') ]);
	//tmp
	const payerAccount = new Account([1,185,72,49,215,81,171,50,85,54,122,53,24,248,3,221,42,85,82,43,128,80,215,127,68,99,172,141,116,237,232,85,185,31,141,73,173,222,173,174,4,212,0,104,157,80,63,147,21,81,140,201,113,76,156,161,154,92,70,67,163,52,219,72]);
	const programId = new PublicKey(`BTPACSiAUgkMV8WmrRn57gSZGjC4Nfe95ECPQFtrDkbL`);
	const appPubKey = new PublicKey(`3hRYDsk1UkjztabWnhx5U9FipQteJ1zRtgojy23V7ztQ`);

	onMount(async () => {
		isMounted = true;

		demo();
		launchIPFS();
	});

	/**
	 * initIpfs
	 **/
	async function launchIPFS() {
		initIpfs()
	}

	/**
	 * pushJSON 
	 **/
	async function pushJSON(jsonString) {
		if (jsonString.length > 996) {
			throw new Error({'e':'jsonString length greater than 996 chars'});
		}

		const paddedMsg = jsonString.padEnd(1000);
		const buffer = Buffer.from(paddedMsg, 'utf8');
		const instruction = new TransactionInstruction({
			keys: [{pubkey: appPubKey, isSigner: false, isWritable: true}],
			programId,
			data: buffer,
		});
		
		const confirmation = await sendAndConfirmTransaction(
			connection,
			new Transaction().add(instruction),
			[payerAccount],
			{
				commitment: 'singleGossip',
				preflightCommitment: 'singleGossip',
			},
		);

		return confirmation;
	}

	/**
	 * pullJSON
	 **/
	async function pullJSON() {
		const accountInfo = await connection.getAccountInfo(appPubKey);
		const info = dataLayout.decode(Buffer.from(accountInfo.data));
		const json = info.txt.toString().substr(4,1000).trim();

		return json;
	}
	
	async function demo() {
		const obj = { abc: 1, def: 'yo' };
		const jsonString = JSON.stringify(obj);
		console.log('Uploading Data: ',jsonString);

		const confirmationReceipt = await pushJSON(jsonString);

		console.log('TX:',confirmationReceipt);
		console.log('Sleep 5 secs to wait for blockchain');

		await new Promise(r => setTimeout(r, 5000));

		const newJSON = await pullJSON();
		console.log('Blockchain data received',newJSON);

		const newObj = JSON.parse(newJSON);
		console.log(`All Done! ${newObj.def}`);
	}

</script>

<style>

</style>

<svelte:head>
	<title>{feeds}:: Feed:: Val-hölla</title>
</svelte:head>

{#if (isMounted)}
<section>
	Hello World..
</section>
{/if}