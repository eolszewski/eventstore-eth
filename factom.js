require('dotenv').config();

const { FactomCli, Entry, Chain } = require('factom');

const cli = new FactomCli({
  factomd: {
    host: 'localhost',
    port: 8088
  },
  walletd: {
    host: 'localhost',
    port: 8089
  }
});

const ecPk = process.env.EC_PK;
const ecSk = process.env.EC_SK;
const fPk = process.env.FACTOM_PK;
const fSk = process.env.FACTOM_SK;

const mockData = [
  { extId: 'a', content: '1' },
  { extId: 'b', content: '2' },
  { extId: 'c', content: '3' },
  { extId: 'd', content: '4' },
  { extId: 'e', content: '5' },
  { extId: 'f', content: '6' },
  { extId: 'g', content: '7' },
  { extId: 'h', content: '8' },
  { extId: 'i', content: '9' },
  { extId: 'j', content: '10' },
  { extId: 'k', content: '11' },
  { extId: 'l', content: '12' },
  { extId: 'm', content: '13' },
  { extId: 'n', content: '14' },
  { extId: 'o', content: '15' },
  { extId: 'p', content: '16' },
  { extId: 'q', content: '17' },
  { extId: 'r', content: '18' },
  { extId: 's', content: '19' },
  { extId: 't', content: '20' },
  { extId: 'u', content: '21' },
  { extId: 'v', content: '22' },
  { extId: 'w', content: '23' },
  { extId: 'x', content: '24' },
  { extId: 'y', content: '25' },
  { extId: 'z', content: '26' }
];

let chainId;

async function buyEntryCredits(fSk, ecPk, amount) {
  console.log('fSk: ', fSk);
  console.log('ecPk: ', ecPk);
  console.log('amount: ', amount);
  console.log('cli: ', cli.factomd.httpCli.defaults.baseURL);
  const transaction = await cli.createEntryCreditPurchaseTransaction(fSk, ecPk, amount);
  await cli.sendTransaction(transaction);
}

async function addChain(ecSk, entry) {
  // Need an entry to create a chain
  let chain = new Chain(entry);
  chainId = chain.id.toString('hex');

  await cli.add(chain, ecSk, { commitTimeout: 60, revealTimeout: 60 });
}

async function createEntry(data, chainId) {
  let e;
  if (chainId !== null) {
    e = Entry.builder()
      .chainId(chainId)
      .extId(data.extId, 'utf8')
      .content(data.content, 'utf8')
      .build();
  } else {
    e = Entry.builder()
      .extId(data.extId, 'utf8')
      .content(data.content, 'utf8')
      .build();
  }
  return e;
}

async function addEntry(ecSk, data, chainId) {
  let entry = await createEntry(data, chainId);
  await cli.add(entry, ecSk, { commitTimeout: 60, revealTimeout: 60 });
  return entry.hash().toString('hex');
}

async function addEntries(ecSk, mockData, chainId) {
  return await Promise.all(
    mockData.map(async mock => {
      return await addEntry(ecSk, mock, chainId);
    })
  );
}

async function getEntry(hash) {
  return await cli.getEntry(hash);
}

async function getEntries(hashes) {
  return await Promise.all(
    hashes.map(async hash => {
      return await getEntry(hash);
    })
  );
}

async function bootstrap() {
  console.log('cli: ', await cli.factomdApi('properties'));
  console.log('\n\nbuyEntryCredits');
  await buyEntryCredits(fSk, ecPk, 1000);
  // console.log('\n\naddChain');
  // await addChain(ecSk, await createEntry(mockData[0], null));
  // console.log('\n\naddEntry');
  // await addEntry(ecSk, mockData[1], chainId);
  // console.log('\n\naddEntries');
  // let hashes = await addEntries(ecSk, mockData.slice(1), chainId);
  // console.log('hashes: ', hashes);
  // console.log('\n\ngetEntries');
  // let entries = await getEntries(hashes.slice(1));
  // console.log('entries: ', entries);
  // console.log('\n\ngetEntry');
  // let entry = await getEntry(hashes[1].hash);
  // console.log('entry: ', entry);
}

bootstrap();