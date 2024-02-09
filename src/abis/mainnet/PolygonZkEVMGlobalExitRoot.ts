export default [{ "inputs": [{ "internalType": "address", "name": "_rollupAddress", "type": "address" }, { "internalType": "address", "name": "_bridgeAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "OnlyAllowedContracts", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "mainnetExitRoot", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "rollupExitRoot", "type": "bytes32" }], "name": "UpdateGlobalExitRoot", "type": "event" }, { "inputs": [], "name": "bridgeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLastGlobalExitRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "globalExitRootMap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastMainnetExitRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRollupExitRoot", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rollupAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "newRoot", "type": "bytes32" }], "name": "updateExitRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
