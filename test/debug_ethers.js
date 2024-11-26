const { LxLyClient, use, Converter } = require("@maticnetwork/lxlyjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");

const { providers, Wallet } = require("ethers");

const { network, configuration, user1, user2, tokens } = require("./config");
use(Web3ClientPlugin);

const execute = async () => {
  console.log("start executing");
  const from = user1.address;
  const to = user2.address;

  const client = new LxLyClient();
  await client.init({
    log: true,
    network: network,
    providers: {
      0: {
        provider: new Wallet(user1.privateKey, new providers.JsonRpcProvider(configuration[0].rpc)),
        configuration: {
          bridgeAddress: configuration[0].bridgeAddress,
          wrapperAddress: configuration[0].wrapperAddress,
          isEIP1559Supported: false
        },
        defaultConfig: {
          from
        }
      },
      1: {
        provider: new Wallet(user1.privateKey, new providers.JsonRpcProvider(configuration[1].rpc)),
        configuration: {
          bridgeAddress: configuration[1].bridgeAddress,
          isEIP1559Supported: false
        },
        defaultConfig: {
          from
        }
      }
    }
  });

  const N0ERC20Token = client.erc20(tokens[0].erc20, 0);
  const N0EtherToken = client.erc20(tokens[0].ether, 0);

  const N1ERC20Token = client.erc20(tokens[1].erc20, 1);
  const N1EtherToken = client.erc20(tokens[1].ether, 1);

  // // getBalance on network 0
  // console.log('balance of N0ERC20Token is', await N0ERC20Token.getBalance(from));

  // // getEtherBalance on network 0
  // console.log('balance of N0EtherToken is', await N0EtherToken.getBalance(from));

  // // getBalance on network 1
  // console.log('balance of N1ERC20Token is', await N1ERC20Token.getBalance(from));

  // // getEtherBalance on network 1
  // console.log('balance of N1EtherToken is', await N1EtherToken.getBalance(from));

  // // Allowance ERC20 for 0
  // var allowance = await N0ERC20Token.getAllowance(from);
  // return console.log("allowance", allowance);

  // // approve ERC20 for 0
  // var tx = await N0ERC20Token.approve("100000000000000000000", {spenderAddress:"0x0f04f8434bac2e1db8fca8a34d3e177b6c7ccaba"});
  // return console.log("approve txHash", await tx.getTransactionHash());

  // // Bridge Ether from 0 to 1
  // var tx = await N0EtherToken.bridgeAsset("100000000000000000", from, 1, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());

  // // Bridge ERC20 from 0 to 1
  // var tx = await N0ERC20Token.bridgeAsset("10000000000000000000", from, 1, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());

  // isBridgeClaimable
  var result = await client.isBridgeClaimable('0x15f028fc6b2e9aff6ada9fc557c9666b99c238ae9b24739770cab3ec532292e2', 1);
  return console.log('result', result);

  // // isBridgeClaimed
  // var result = await client.isBridged('0xdb4147ed0db73a52099b4136e39b9df4de92d74b5ecb864f367446baddbacdae', 0, 1);
  // return console.log('result', result);

  // // claim ETHER from 0 to 1
  // var tx = await N1EtherToken.claimAsset('0xdb4147ed0db73a52099b4136e39b9df4de92d74b5ecb864f367446baddbacdae', 0, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());

  // // Bridge ERC20 from 0 to 1 with gas
  // var tx = await N0ERC20Token.bridgeAssetWithGas("10000000000000000000", from, '100000000000000000', 1, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());
  
  // // Bridge Ether from 1 to 0
  // var tx = await N1EtherToken.bridgeAsset("1000000000000000", from, 0, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());

  // // claim ETHER from 1 to 0
  // var tx = await N0EtherToken.claimAsset('0x15f028fc6b2e9aff6ada9fc557c9666b99c238ae9b24739770cab3ec532292e2', 1, {returnTransaction: false});
  // return console.log("hash", await tx.getTransactionHash());

  // // transfer ERC20
  // var tx = await N0ERC20Token.transfer("1", to);
  // return console.log("hash",  await tx.getTransactionHash());

  // // transfer Ether
  // var tx = await N0EtherToken.transfer("1", to);
  // return console.log("hash",  await tx.getTransactionHash());

  // // Get Permit Data
  // var tx = await N0ERC20Token.getPermitData('2000000000000000000', {returnTransaction: false});
  // return console.log("hash", tx);

  // // bridge with Permit
  // var tx = await N0ERC20Token.bridgeAssetWithPermit("10", from, 1, {returnTransaction: true});
  // return console.log("hash", tx);
}

execute().then(_ => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(0);
})
