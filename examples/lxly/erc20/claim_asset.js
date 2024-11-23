const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');

const execute = async () => {
    const bridgeTransactionHash = "0x1fc6858b20c75189a9fa8f3ae60c2a255cc3c41a058781f33daa57fc0f80b81a";
    const client = await getLxLyClient('testnet');

    const token = client.erc20(tokens[0].ether, 1);

    const result = await token.claimAsset(bridgeTransactionHash, 1, {returnTransaction: true});
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
