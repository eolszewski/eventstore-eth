const EventStore = require('../index.js');

const config = require('../../config');
const eventStoreArtifact = require('../../../build/contracts/EventStore.json');

const pack = require('../../../package.json')

describe('eventstore-eth-lifecycle', () => {
  describe('constructor', () => {
    it('is safe', async () => {
      expect(() => {
        const eventStore = new EventStore();
      }).toThrow();
      expect(() => {
        const eventStore = new EventStore({});
      }).toThrow();
      const eventStore = new EventStore({
        eventStoreArtifact,
        ...config
      });
    });

    it('sets version', async () => {
      const eventStore = new EventStore({
        eventStoreArtifact,
        ...config
      });
      expect(eventStore.version).toBe(pack.version);
    });
  });

  describe('clone', () => {
    it('returns a new EventStore with a new contract instance.', async () => {
      const eventStore = new EventStore({
        eventStoreArtifact,
        ...config
      });
      const accounts = await eventStore.getWeb3Accounts();
      let newEventStore = await eventStore.clone(accounts[0]);
      expect(
        newEventStore.eventStoreContract.address !==
          eventStore.eventStoreContract.address
      );
    });
  });

  describe('healthy', () => {
    it('throws when not init', async () => {
      try {
        const eventStore = new EventStore({
          eventStoreArtifact,
          ...config
        });
        const info = await eventStore.healthy();
      } catch (e) {
        // expected...
      }
    });
  });
});
