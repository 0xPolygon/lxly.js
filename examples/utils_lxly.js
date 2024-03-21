const { LxLyClient, use } = require('@maticnetwork/lxlyjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const bn = require('bn.js');
const config = require('./config');

const SCALING_FACTOR = new bn(10).pow(new bn(18));

use(Web3ClientPlugin)

const getLxLyClient = async (network = 'testnet') => {
  const lxLyClient = new LxLyClient();
  return await lxLyClient.init({
    log: true,
    network: network,
    providers: {
      0: {
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[0].rpc),
        configuration: {
          bridgeAddress: config.configuration[0].bridgeAddress,
          wrapperAddress: config.configuration[0].wrapperAddress,
          isEIP1559Supported: true
        },
        defaultConfig: {
          from: config.user1.address
        }
      },
      1: {
        provider: new HDWalletProvider([config.user1.privateKey], config.configuration[1].rpc),
        configuration: {
          bridgeAddress: config.configuration[1].bridgeAddress,
          isEIP1559Supported: false
        },
        defaultConfig: {
          from: config.user1.address
        }
      }
    }
  });
}

module.exports = {
  SCALING_FACTOR,
  getLxLyClient: getLxLyClient,
  configuration: config.configuration,
  tokens: config.tokens,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
}
