require('dotenv').config();

const sleep = require('sleep');
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

let moreMock = [];
let chainId;

async function buyEntryCredits(fSk, ecPk) {
  const transaction = await cli.createEntryCreditPurchaseTransaction(fSk, ecPk, 1000);
  await cli.sendTransaction(transaction);
}

async function addChain(ecSk, entry) {
  // Need an entry to create a chain
  let chain = new Chain(entry);
  chainId = chain.id.toString('hex');

  await cli.add(chain, ecSk, { commitTimeout: 60, revealTimeout: 60 });
}

async function addEntries(ecSk, mockData, chainId) {
  mockData.forEach(async mock => {
    let e = await createEntry(mock, chainId);
    await cli.add(e, ecSk, { commitTimeout: 60, revealTimeout: 60 });
  });
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

async function getEntry(hash) {
  return cli.getEntry(hash);
}

async function getEntries() {
  moreMock.slice(25).forEach(async mock => {
    let e = await getEntry(mock.hash);
    console.log('e: ', e);
  })
}

async function generateMockHashes() {
  await mockData.forEach(async mock => {
    let e = await createEntry(mock, 'bf5d3affb73efd2ec6c36ad3112dd933efed63c4e1cbffcfa88e2759c144f2d8');
    mock.hash = e.hash().toString('hex');
    moreMock.push(mock);
  });
}

async function bootstrap() {
  console.log('buyEntryCredits');
  await buyEntryCredits(fSk, ecPk);
  console.log('addChain');
  await addChain(ecSk, await createEntry(mockData[0], null));
  console.log('addEntries');
  await addEntries(ecSk, mockData.slice(25), chainId);
  console.log('generateMockHashes');
  await generateMockHashes();
  sleep.sleep(60);
  console.log('getEntries');
  await getEntries();
}

bootstrap();