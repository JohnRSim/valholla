const solanaWeb3 = require('@solana/web3.js');
const borsh = require('borsh');

const connection = new solanaWeb3.Connection('https://testnet.solana.com');

const programId = new solanaWeb3.PublicKey(`87FYFEtzgPGX6Dn5pzTRdbmWsxZbZdmrwVNyE9nJs2Po`);
const fromAccount = new solanaWeb3.Account([1,185,72,49,215,81,171,50,85,54,122,53,24,248,3,221,42,85,82,43,128,80,215,127,68,99,172,141,116,237,232,85,185,31,141,73,173,222,173,174,4,212,0,104,157,80,63,147,21,81,140,201,113,76,156,161,154,92,70,67,163,52,219,72]);
const fromPubkey = fromAccount.publicKey;
console.log('programId', programId.toBase58());
console.log('fromPubkey', fromPubkey.toBase58());

const fundAccount = async (account) => {
  const res = await connection.requestAirdrop(account.publicKey, 1000000000); // 1 Sol = 1,000,000,000 LAMPORTS
  await new Promise(r => setTimeout(r, 10000)); // wait for block 10secs?
  const balance = await getBalance(account);
  return balance;
}

fundAccount(fromAccount);


class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      this[key] = properties[key];
    });
  }
}

class Test extends Assignable { }

const constructData = (likes,msg) => {
  const value = new Test({ likes, msg });
  const schema = new Map([[Test, { kind: 'struct', fields: [['likes', 'u8'], ['msg', 'string']] }]]);
  const buffer = borsh.serialize(schema, value);
  const newValue = borsh.deserialize(schema, Test, buffer);
  console.log(newValue);
  return buffer;
}


const sendTransaction = async () => {
  const buffer = constructData(1,'HELP');
  const instruction = new solanaWeb3.TransactionInstruction({
    keys: [{pubkey: fromPubkey, isSigner: false, isWritable: true}],
    programId,
    data: buffer,
  });
  await solanaWeb3.sendAndConfirmTransaction(
    connection,
    new solanaWeb3.Transaction().add(instruction),
    [fromAccount],
    {
      commitment: 'singleGossip',
      preflightCommitment: 'singleGossip',
    },
  );
}

sendTransaction();

/*
const report = async () => {
  const accountInfo = await connection.getAccountInfo(fromPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the from account';
  }
  const info = fromAccountDataLayout.decode(Buffer.from(accountInfo.data));
  console.log(
    fromPubkey.toBase58(),
    'has been from',
    info.numGreets.toString(),
    'times',
  );
}
*/