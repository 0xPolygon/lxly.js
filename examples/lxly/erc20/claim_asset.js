const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');

const execute = async () => {
    const bridgeTransactionHash = "0x89e43e85eae56d42ae09a23f1c89c47e9815b7f88d05d4a9427ee13b4772e652";
    const client = await getLxLyClient('testnet');

    const token = client.erc20(tokens[0].ether, 0);
    const sourceNetworkId = 1;

    const result = await token.claimAsset(bridgeTransactionHash, sourceNetworkId, {returnTransaction: true});
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
