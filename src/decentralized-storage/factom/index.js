/**
 * A module for writing and verifying objects with factom
 * @module src/decentralized-storage
 */

require('dotenv').config();
const hash = require('object-hash');
const { FactomCli, Entry, Chain } = require('factom');

/** @class FactomAdapter */
module.exports = class FactomAdapter {
  /**
   * Creates a new FactomAdapter
   * @constructor
   * @memberof FactomAdapter
   * @param {Object} config Config object requiring factomd and walletd object
   */
  constructor(config) {
    this.cli = new FactomCli(config);
  }

  /**
   * Returns factomd version information
   * @function
   * @memberof FactomAdapter
   * @name version
   * @returns {Object} Factomd version object
   */
  version() {
    return await this.cli.factomdApi('properties');
  }

  /**
   * Buys EntryCredits with Factom wallet
   * @function
   * @memberof FactomAdapter
   * @name buyEntryCredits
   * @param {String} fSk Factom private key
   * @param {String} ecPk EntryCredits public key
   * @param {number} amount EntryCredit purchase amount
   * @returns {String} Transaction ID
   */
  async buyEntryCredits(fSk, ecPk, amount) {
    const transaction = await cli.createEntryCreditPurchaseTransaction(fSk, ecPk, amount);
    return await cli.sendTransaction(transaction);
  }

  /**
   * Creates new Chain with one Entry
   * @function
   * @memberof FactomAdapter
   * @name addChain
   * @param {String} ecSk EntryCredits private key
   * @param {Object} entry First Entry in new Chain
   * @returns {String} Chain identifier
   */
  async addChain(ecSk, entry) {
    let chain = new Chain(entry);
    await cli.add(chain, ecSk);
    return chain.id.toString('hex');
  }

  /**
   * Creates a new Entry
   * @function
   * @memberof FactomAdapter
   * @name createEntry
   * @param {Object} obj Object to be converted into Entry
   * @param {String} chainId Chain identifier
   * @returns {Object} Entry object
   */
  async createEntry(obj, chainId) {
    let e;
    if (chainId !== null) {
      e = Entry.builder()
        .chainId(chainId)
        .extId(hash(obj), 'hex')
        .content(obj, 'utf8')
        .build();
    } else {
      e = Entry.builder()
        .extId(hash(obj), 'hex')
        .content(obj, 'utf8')
        .build();
    }
    return e;
  }

  /**
   * Creates an array of Entries
   * @function
   * @memberof FactomAdapter
   * @name createEntries
   * @param {Array.<Object>} objs Objects to be converted into Entry array
   * @param {String} chainId Chain identifier
   * @returns {Array.<Object>} Array of Entry objects
   */
  async createEntries(objs, chainId) {
    return await Promise.all(
      objs.map(async obj => {
        return await createEntry(obj, chainId);
      })
    );
  }

  /**
   * Adds an Entry to Factom
   * @function
   * @memberof FactomAdapter
   * @name addEntry
   * @param {String} ecSk EntryCredits private key
   * @param {Object} entry Entry being written
   * @returns {String} Factom hash of object
   */
  async addEntry(ecSk, entry) {
    await cli.add(entry, ecSk);
    return entry.hash().toString('hex');
  }

  /**
   * Adds an array of Entries to Factom
   * @function
   * @memberof FactomAdapter
   * @name addEntries
   * @param {String} ecSk EntryCredits private key
   * @param {Array.<Object>} entries Array of Entries being written
   * @returns {Array.<String>} Array of Factom Entry hashes
   */
  async addEntries(ecSk, entries) {
    return await Promise.all(
      entries.map(async entry => {
        return await addEntry(ecSk, entry);
      })
    );
  }

  /**
   * Retrieves Entry from Factom
   * @function
   * @memberof FactomAdapter
   * @name getEntry
   * @param {String} hash Factom hash of Entry
   * @returns {Object} Factom Entry object
   */
  async getEntry(hash) {
    return await cli.getEntry(hash);
  }

  /**
   * Retrieves Entry Array from Factom
   * @function
   * @memberof FactomAdapter
   * @name getEntries
   * @param {Array.<String>} hashes Factom hash array of Entries
   * @returns {Object} Array of Factom Entry objects
   */
  async getEntries(hashes) {
    return await Promise.all(
      hashes.map(async hash => {
        return await getEntry(hash);
      })
    );
  }
};
