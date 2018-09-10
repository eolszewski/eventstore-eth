const EventStoreLib = artifacts.require('./EventStoreLib.sol');
const EventStore = artifacts.require('./EventStore.sol');
const EventStoreFactory = artifacts.require('./EventStoreFactory.sol');

const EventStoreLib64 = artifacts.require('./64/EventStoreLib64.sol');
const EventStore64 = artifacts.require('./64/EventStore64.sol');
const EventStoreFactory64 = artifacts.require('./64/EventStoreFactory64.sol');

module.exports = deployer => {
  deployer.deploy(EventStoreLib);
  deployer.link(EventStoreLib, EventStore);
  deployer.deploy(EventStore);
  deployer.link(EventStoreLib, EventStoreFactory);
  deployer.link(EventStore, EventStoreFactory);
  deployer.deploy(EventStoreFactory);

  deployer.deploy(EventStoreLib64);
  deployer.link(EventStoreLib64, EventStore64);
  deployer.deploy(EventStore64);
  deployer.link(EventStoreLib64, EventStoreFactory64);
  deployer.link(EventStore64, EventStoreFactory64);
  deployer.deploy(EventStoreFactory64);
};
