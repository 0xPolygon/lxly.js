const { getLxLyClient, tokens, configuration, from } = require('../../utils_lxly');

const execute = async () => {
    const bridgeTransactionHash = "0x66f0e813ee4eead3709b2db5478e710e74f5d7460a0008d0022dbc7680e5d5ad";
    const client = await getLxLyClient('mainnet');

    const token = client.erc20("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", 0);

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
