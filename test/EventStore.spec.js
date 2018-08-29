const EventStore = artifacts.require('./EventStore.sol');

contract('EventStore', accounts => {
  it('constructor works', async () => {
    const storage = await EventStore.deployed();
    assert(accounts[0] === (await storage.owner()));
  });
});
