const config = require('../../../config');
const IpfsAdapter = require('../index');

describe('IpfsAdapter', () => {
  it('healthy', async () => {
    let tia = new IpfsAdapter({
      ...config.ipfsConfig
    });
    let health = await tia.healthy();
    // console.log(health);
  });

  it('writeObject', async () => {
    let tia = new IpfsAdapter(config.ipfsConfig);
    let dagNode = await tia.writeObject({
      hello: 'world'
    });
    expect(dagNode._json.multihash).toBeDefined();
  });

  it('readObject', async () => {
    let tia = new IpfsAdapter(config.ipfsConfig);
    let dagNode = await tia.readObject(
      'QmS8NCThLouhUyomKpWaRoPZtu72qRh1myD3DUBAqz8qrX'
    );
    expect(dagNode).toBeDefined();
  });
});
