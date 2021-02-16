const solanaWeb3 = require('@solana/web3.js');
const bip39 = require('bip39');
const { register } = require('ts-node');
const nacl = require('tweetnacl');

const connection = new solanaWeb3.Connection('https://testnet.solana.com');

const newAccount = async () => {
  const mnemonic = bip39.generateMnemonic();
  console.log('mnemonic',mnemonic);
  const account = await loadAccount(mnemonic);
  return account;
}

const loadAccount = async (keywords) => {
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(keywords);
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
  const account = new solanaWeb3.Account(keyPair.secretKey);
  console.log(account);
  return account;
}

const fundAccount = async (account) => {
  const res = await connection.requestAirdrop(account.publicKey, 1000000000); // 1 Sol = 1,000,000,000 LAMPORTS
  await new Promise(r => setTimeout(r, 10000)); // wait for block 10secs?
  const balance = await getBalance(account);
  return balance;
}

const getBalance = async (account) => {
  const balance = await connection.getBalance(account.publicKey);
  return balance
}

const registerAccount = async (payerAccount) => {
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.createAccount({
      fromPubkey: payerAccount.publicKey,
      newAccountPubkey: payerAccount.publicKey,
      lamports: 1000000000,
      space: 256000,
      programId: '87FYFEtzgPGX6Dn5pzTRdbmWsxZbZdmrwVNyE9nJs2Po',
    }),
  );
  await sendAndConfirmTransaction(
    connection,
    transaction,
    [payerAccount, greetedAccount],
    {
      commitment: 'singleGossip',
      preflightCommitment: 'singleGossip',
    },
  );
}
/*
const sendTransaction = (recipientPublicKey, recipientAmount)  => {
  const transaction = new web3.Transaction().add(web3.SystemProgram.transfer({
    fromPubkey: account.publicKey,
    toPubkey: new web3.PublicKey(recipientPublicKey),
    lamports: recipientAmount,
  }));

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [account]
  );
}

const getHistory = (publicKey, options = { limit: 20 }) => {
  return connection.getConfirmedSignaturesForAddress2.getBalance(publicKey, options);
}
*/

const run = async () => {
  const account = await loadAccount('verify oxygen code federal odor under draft reveal virus produce anchor outer');
  const balance = await fundAccount(account);
  console.log(balance);
  const reg = await registerAccount(account);
}

run();