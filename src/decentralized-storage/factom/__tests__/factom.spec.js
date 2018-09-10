require('dotenv').config();
const config = require('../../../config');
const FactomAdapter = require('../index');

describe('FactomAdapter', () => {
  let factom;
  let chainId;
  let hash;

  beforeAll(async () => {
    factom = new FactomAdapter({
      ...config.factomConfig
    });
  });

  it('version', async () => {
    let version = await factom.version();
    console.log('version: ', version);
    expect(version).toBeDefined();
  });

  it('buyEntryCredits', async () => {
    let txId = await factom.buyEntryCredits(process.env.FACTOM_SK, process.env.EC_PK, 1000);
    expect(txId).toBeDefined();
  });

  // it('addChain', async () => {
  //   chainId = await factom.addChain(process.env.EC_SK, 
  //     await factom.createEntry({
  //       hello: 'world'
  //     },
  //     null
  //     ));
  //   expect(chainId).toBeDefined();
  // });

  // it('addEntry', async () => {
  //   hash = await factom.addEntry(process.env.EC_SK, 
  //     await factom.createEntry({
  //       first: 'entry'
  //     }, 
  //     chainId
  //   ));
  //   expect(hash).toBeDefined();
  // });

  // it('getEntry', async () => {
  //   let entry = await factom.getEntry(hash);
  //   console.log('entry: ', entry);
  //   expect(entry).toBeDefined();
  // });
});
