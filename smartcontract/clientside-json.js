
const solanaWeb3 = require('@solana/web3.js');
const BufferLayout = require('buffer-layout');
const connection = new solanaWeb3.Connection('https://testnet.solana.com');

// John this is the private key of the person paying the transaction. We probably need to use Sollet.io to sort this.
// If you need some SOL there's an airdrop function in smartcontract/test/exp.js line 24
const payerAccount = new solanaWeb3.Account([1,185,72,49,215,81,171,50,85,54,122,53,24,248,3,221,42,85,82,43,128,80,215,127,68,99,172,141,116,237,232,85,185,31,141,73,173,222,173,174,4,212,0,104,157,80,63,147,21,81,140,201,113,76,156,161,154,92,70,67,163,52,219,72]);

// Smart Contract Details
const programId = new solanaWeb3.PublicKey(`BTPACSiAUgkMV8WmrRn57gSZGjC4Nfe95ECPQFtrDkbL`);
const appPubKey = new solanaWeb3.PublicKey(`3hRYDsk1UkjztabWnhx5U9FipQteJ1zRtgojy23V7ztQ`);
const dataLayout = BufferLayout.struct([ BufferLayout.blob(1000,'txt') ]);

const pushJSON = async (jsonString) => {
  if (jsonString.length > 996) throw new Error({'e':'jsonString length greater than 996 chars'});
	const paddedMsg = jsonString.padEnd(1000);
	const buffer = Buffer.from(paddedMsg, 'utf8');
	const instruction = new solanaWeb3.TransactionInstruction({
		keys: [{pubkey: appPubKey, isSigner: false, isWritable: true}],
		programId,
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
	return confirmation;
}

const pullJSON = async () => {
	const accountInfo = await connection.getAccountInfo(appPubKey);
	const info = dataLayout.decode(Buffer.from(accountInfo.data));
  const json = info.txt.toString().substr(4,1000).trim();
  return json;
}

const demo = async () => {
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
demo();