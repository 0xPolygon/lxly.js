const dotenv = require('dotenv')
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

if (env.error) {
    throw new Error("no env file found");
}

module.exports = {
    network: process.env.NETWORK || 'testnet',
    configuration: {
        0: {
            rpc: process.env.NETWORK_0_RPC || 'https://rpc.sepolia.org',
            bridgeAddress: process.env.NETWORK_0_BRIDGE || '0x528e26b25a34a4A5d0dbDa1d57D318153d2ED582',
            bridgeExtensionAddress: '0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1',
            wrapperAddress: '0x0f04f8434bac2e1db8fca8a34d3e177b6c7ccaba',
            isEIP1559Supported: true
        },
        1: {
            rpc: process.env.NETWORK_1_RPC || 'https://rpc.cardona.zkevm-rpc.com',
            bridgeAddress: process.env.NETWORK_1_BRIDGE || '0x528e26b25a34a4A5d0dbDa1d57D318153d2ED582',
            bridgeExtensionAddress: '0x2311BFA86Ae27FC10E1ad3f805A2F9d22Fc8a6a1',
            isEIP1559Supported: true
        },
    },
    tokens: {
        0: {
            ether: '0x0000000000000000000000000000000000000000',
            erc20: '0x3fd0A53F4Bf853985a95F4Eb3F9C9FDE1F8e2b53' // MATIC
        },
        1: {
            ether: '0x0000000000000000000000000000000000000000',
            erc20: '0x3cc6055f4e88638c46daa9cf5f5fc54a801e5f03' // MATIC
        }
    },
    user1: {
        privateKey: process.env.USER1_PRIVATE_KEY,
        address: process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM,
        privateKey: process.env.USER2_PRIVATE_KEY,
    },
}
