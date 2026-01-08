# LxLy SDK

[![GitHub version](https://badge.fury.io/gh/0xpolygon%2Flxly.js.svg)](https://badge.fury.io/gh/0xpolygon%2Flxly.js)
[![Build Status](https://github.com/0xPolygon/lxly.js/actions/workflows/ci.yml/badge.svg)](https://github.com/0xPolygon/lxly.js/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%400xpolygon%2Flxlyjs.svg)](https://badge.fury.io/js/%40maticnetwork%2Flxlyjs)
[![GitHub](https://img.shields.io/github/license/0xpolygon/lxly.js)](https://github.com/0xPolygon/lxly.js/blob/main/LICENSE)

This repository contains the `lxlyjs` client library. `lxlyjs` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Polygon LxLy Aggregator bridge.

This library will help developers to move assets between Ethereum chain and Polygon CDK chains.

## Installation

You can install the package using [NPM](https://www.npmjs.com/package/@maticnetwork/lxlyjs)

### Using NPM

```bash
npm install @maticnetwork/lxlyjs
```

## Usage

### Import lxly.js module

```typescript
// Use web3 client
const { LxLyClient, use } = require("@maticnetwork/lxlyjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
use(Web3ClientPlugin);
```

```typescript
// Use ethers client
const { LxLyClient, use } = require("@maticnetwork/lxlyjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
use(Web3ClientPlugin);
```

### Client Initialization

```typescript
const client = new LxLyClient();
await client.init({
  log: true,
  network: "mainnet", // "testnet" from testnet chains
  providers: {
    0: {
      provider: // Provider for network 0 chain ,
      configuration: {
        bridgeAddress: // Bridge Address on 0 network,
        wrapperAddress: // Wrapper Address on 0 network,
        isEIP1559Supported: true
      },
      defaultConfig: {
        from
      }
    },
    1: {
      provider: // Provider for network 1 chain ,
      configuration: {
        bridgeAddress: // Bridge Address on 1 network,
        wrapperAddress: // Wrapper Address on 0 network,
        isEIP1559Supported: false
      },
      defaultConfig: {
        from
      }
    }
  }
});
```

Configuration details can be found here for [Mainnet](./configuration//MAINNET.json) and [Testnet](./configuration//TESTNET.json)

### Custom Network

Custom networks can also be integrated into the client.

It's worth noting that the lxly.js library might not inherently support the merkle-proof API for custom networks. To address this, users can provide a custom Proof API by utilizing the ```setProofApi``` function call. This allows for seamless integration and support of merkle-proof functionalities within the custom network setup. Further details on the format for Proof Generation API can be found [here](https://github.com/maticnetwork/proof-generation-api).

```typescript
const { LxLyClient, use, setProofApi } = require("@maticnetwork/lxlyjs");

const client = new LxLyClient();
await client.init({
  log: true,
  network: "mainnet", // "testnet" from testnet chains
  providers: {
    <CustomNetworkId>: {
      provider: // Provider for custom network Chain ,
      configuration: {
        bridgeAddress: // Bridge Address on custom network,
        wrapperAddress: // Wrapper Address on custom network,
        isEIP1559Supported: // is EIP1559 Supported on custom network
      },
      defaultConfig: {
        from
      }
    }
  }
});

setProofApi(url)
```

### ERC20 Token initialization
```typescript
// Initialize ERC20 token with the token address and network ID
const erc20 = new client.erc20(tokenAddress, networkId);

// Example usage: get the balance of a specific address
const balance = erc20.getBalance(address);
```

### Custom Contracts

```typescript
// Initialize Custom contract
const customContract = new client.contract(abi, tokenAddress, networkId);

// read contract
await customContract.read(methodName, ...args);

// write contract
await customContract.write(transactionOptions = {}, methodName, ...args);
```

For the complete function implementation, please refer to the example [here](./test/debug_web3.js) or codebase available [here](./src/lxly/index.ts).

## Support

Our [Discord](https://discord.com/invite/0xpolygonrnd) is the best way to reach us ✨.

## Contributors

You are very welcome to contribute, please see contributing guidelines - [[Contribute](CONTRIBUTING.md)].

Thank you to all the people who already contributed to lxly.js!

<a href="https://github.com/0xpolygon/lxly.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=0xpolygon/lxly.js" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Development

**Setup**

```bash
npm ci
```

**How to debug**

Write your code inside file `test/debug_web3.js` and run below code

```bash
npm run debug
```

Above command will build the source code & install the built version into test folder, which will be used by `debug_web3.js`.

**Lint**

```bash
# To check lint errors
npm run lint

# To fix most common lint errors
# Note that it might not fix all errors, some need manual intervention
npm run lint:fix
```

**Build code**

```bash
npm run build
```

**Generate distribution files**

```bash
npm run deploy
```

**NPM publish**

Before running publish script, make sure you have updated version properly.

Note that `prepublishOnly` script will be automatically called while publishing. It will check lint, clean dist/lib folders and build fresh distribution files before it executes `npm publish`.

```bash
npm publish
```

### License

MIT
