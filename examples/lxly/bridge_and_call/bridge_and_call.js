const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');
const { encodeFunctionData } = require('viem');

// counter example smart contract on destination network.
const Counter = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "originAddress",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "originNetwork",
				"type": "uint32"
			},
			{
				"internalType": "bytes",
				"name": "metadata",
				"type": "bytes"
			}
		],
		"name": "onMessageReceived",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

const execute = async () => {
    const client = await getLxLyClient();

    // set token as `eth`.
    const token = "0x0000000000000000000000000000000000000000";
    // not bridging any token this time
    const amount = "0x0";
    // because we are bridging from cardona.
    const sourceNetwork = 1; 
    // sending to zkyoto
    const destinationNetwork = 0;
    // prepare the call data for the counter smart contract on destination chain.
    const callData = encodeFunctionData({
        abi: Counter,
        functionName: "increment",
        args: ["0x4"]
    })
    // change it to the counter smart contract deployed on destination network.
    const callAddress = "0x43854F7B2a37fA13182BBEA76E50FC8e3D298CF1";
    // if transaction fails, then the funds will be sent back to user's address on destination network.
    const fallbackAddress = from;
    // if true, then the global exit root will be updated.
    const forceUpdateGlobalExitRoot = true;
    // Call bridgeAndCall function.
    const result = await client.bridgeExtensions[sourceNetwork].bridgeAndCall(
        token,
        amount,
        destinationNetwork,
        callAddress,
        fallbackAddress,
        callData,
        forceUpdateGlobalExitRoot,
    )

    console.log("result", result);
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt); 
}

execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
});
