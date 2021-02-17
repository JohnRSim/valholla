const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs').promises;
const BufferLayout = require('buffer-layout');
const connection = new solanaWeb3.Connection('https://testnet.solana.com');

const pathToProgram = './target/deploy/valholla.so';

const dataLayout = BufferLayout.struct([
	//BufferLayout.u32('likes'),
	BufferLayout.blob(1000,'txt'),
]);

const payerAccount = new solanaWeb3.Account([1,185,72,49,215,81,171,50,85,54,122,53,24,248,3,221,42,85,82,43,128,80,215,127,68,99,172,141,116,237,232,85,185,31,141,73,173,222,173,174,4,212,0,104,157,80,63,147,21,81,140,201,113,76,156,161,154,92,70,67,163,52,219,72]);

const checkPayer = async () => {
	const res = await connection.requestAirdrop(payerAccount.publicKey, 10000000000); // 1 Sol = 1,000,000,000 LAMPORTS
	const lamports = await connection.getBalance(payerAccount.publicKey);
	console.log(`Payer account ${payerAccount.publicKey.toBase58()} containing ${(lamports / 1000000000).toFixed(2)}SOL`);
}

const loadProgram = async () => {
	// Load the program
	console.log('Loading program...');
	const data = await fs.readFile(pathToProgram);
	const programAccount = new solanaWeb3.Account();
	await solanaWeb3.BpfLoader.load(
		connection,
		payerAccount,
		programAccount,
		data,
		solanaWeb3.BPF_LOADER_PROGRAM_ID,
	);
	programId = programAccount.publicKey;
	console.log('Program loaded to account', programId.toBase58());

	// Create the app account
	const appAccount = new solanaWeb3.Account();
	const appPubkey = appAccount.publicKey;
	console.log('Creating app account', appPubkey.toBase58());
	const space = dataLayout.span;
	const lamports = 10000000000;
	console.log(`Lamports required ${lamports}`);
	const transaction = new solanaWeb3.Transaction().add(
		solanaWeb3.SystemProgram.createAccount({
			fromPubkey: payerAccount.publicKey,
			newAccountPubkey: appPubkey,
			lamports,
			space,
			programId,
		}),
	);
	await solanaWeb3.sendAndConfirmTransaction(
		connection,
		transaction,
		[payerAccount, appAccount],
		{
			commitment: 'singleGossip',
			preflightCommitment: 'singleGossip',
		},
	);
	return { appAccount, programId };
}



const pushData = async (app) => {
	const msg = 'Hello Solana';
	const paddedMsg = msg.padEnd(1000);
	const buffer = Buffer.from(paddedMsg, 'utf8');
	console.log('buffer length:',buffer.length);
	const instruction = new solanaWeb3.TransactionInstruction({
		keys: [{pubkey: app.appAccount.publicKey, isSigner: false, isWritable: true}],
		programId: app.programId,
		data: buffer,
	});
	const confirmation = await solanaWeb3.sendAndConfirmTransaction(
		connection,
		new solanaWeb3.Transaction().add(instruction),
		[payerAccount],
		{
			commitment: 'singleGossip',
			preflightCommitment: 'singleGossip',
		},
	);
	console.log('confirmation',confirmation);
}


const pullData = async (app) => {
	const accountInfo = await connection.getAccountInfo(app.appAccount.publicKey);
	const info = dataLayout.decode(Buffer.from(accountInfo.data));
	console.log('Has it worked?');
	console.log('accountInfo.data',accountInfo.data);
	console.log('Buffer.from(accountInfo.data)',Buffer.from(accountInfo.data));
	console.log('info',info);
}


const deploy = async () => {
	const version = await connection.getVersion();
	console.log('Connection to cluster established:', version);
	await checkPayer();
	const app = await loadProgram();
	console.log('app',app);
	console.log('Sleeping for 20 seconds to let the blockchain catch up');
	await new Promise(r => setTimeout(r, 20000));
	console.log('Testing data push to Solana blockchain');
	await pushData(app);
	console.log('Sleeping for 20 seconds to let the blockchain catch up');
	await new Promise(r => setTimeout(r, 20000));
	console.log('Testing data pull from Solana blockchain');
	await pullData(app);
	await new Promise(r => setTimeout(r, 20000));
	console.log('Testing data push to Solana blockchain');
	await pushData(app);
}
deploy();
