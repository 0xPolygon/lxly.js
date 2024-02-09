# LxLy SDK

[![GitHub version](https://badge.fury.io/gh/0xpolygon%2Flxly.js.svg)](https://badge.fury.io/gh/0xpolygon%2Flxly.js)
![Build Status](https://github.com/0xpolygon/lxly.js/workflows/CI/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/%400xpolygon%2Flxlyjs.svg)](https://badge.fury.io/js/%400xpolygon%2Flxlyjs)
![GitHub](https://img.shields.io/github/license/0xpolygon/lxly.js)

This repository contains the `lxlyjs` client library. `lxlyjs` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Polygon LxLy Aggregator bridge.

This library will help developers to move assets between Ethereum chain and Polygon CDK chains.

## Support

Our [Discord](https://discord.gg/0xPolygonDevs) is the best way to reach us ✨.

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

Write your code inside file `test/debug.js` and run below code

```bash
npm run debug
```

Above command will build the source code & install the built version into test folder, which will be used by `debug.js`.

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

**Run test**

```bash
npm run test
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
