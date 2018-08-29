# EventStore Ethereum

EventStore Ethereum converts javascript objects to ipfs hashes, and stores them on Ethereum smart contracts.

It is meant to be a building block for decentralized applications that are built on immutable event logs.

It also supports some Redux like functionality which makes building models from event streams easy. These models can then be saved to document databases for querying and indexing.

The environment used can easily be configured in `./src/config/env.json`.

### Getting Started With Docker

#### Setup

```
docker-compose up
```

#### Testing

```
npm i
npm run truffle:test
npm run truffle:migrate
npm run test
```


