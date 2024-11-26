const { network, configuration, user1, user2, tokens } = require("./config");

const { LxLyClient, use, Converter } = require("@maticnetwork/lxlyjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { GassetType } = require("@maticnetwork/lxlyjs");

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
        provider: new HDWalletProvider([user1.privateKey], configuration[0].rpc),
        configuration: {
          bridgeAddress: configuration[0].bridgeAddress,
          wrapperAddress: configuration[0].wrapperAddress,
          gasPorterAddress: "0x17B8Ee96E3bcB3b04b3e8334de4524520C51caB4",
          isEIP1559Supported: false
        },
        defaultConfig: {
          from
        }
      },
      1: {
        provider: new HDWalletProvider([user1.privateKey], configuration[1].rpc),
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

  console.log(
    "determineGasset", await client.gasPorters[0].determineGasset(
      0, "0x0000000000000000000000000000000000000000", GassetType.NATIVE_TOKEN
    )
  )

  console.log(
    "determineConversion", await client.gasPorters[0].determineConversion(
      0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"
    )
  )

  const tokenWithGas = client.erc20('0x44499312f493F62f2DFd3C6435Ca3603EbFCeeBa', 0);

  console.log(
    "plotRoute", await tokenWithGas.getPlotRoute({
      msgValue: '100',
      destinationNetwork: 1,
      destinationNetworkGasTokenNetwork: 0,
      destinationNetworkGasTokenAddress: '0x0000000000000000000000000000000000000000',
      destinationAddress: '0x222112d597336CB201221Bf3acC0a6230475aF99',
      destinationGasPorterDex: '0x0000000000000000000000000000000000000000',
      gassetType: 0,
      gassetSource: 0,
      gassetAmount: '100',
      token: '0x44499312f493F62f2DFd3C6435Ca3603EbFCeeBa',
      tokenAmount: '10000',
      gassetPermitData: '0x',
      swapCalldata: '0x',
      tokenPermitData: '0x',
      forceUpdateGlobalExitRoot: true
    })
  )

  const N0ERC20Token = client.erc20(tokens[0].erc20, 0);
  const N0EtherToken = client.erc20(tokens[0].ether, 0);

  const N1ERC20Token = client.erc20(tokens[1].erc20, 1);
  const N1EtherToken = client.erc20(tokens[1].ether, 1);

  // // getBalance on network 0
  // console.log('balance of N0ERC20Token is', await N0ERC20Token.getBalance(from));

  // getEtherBalance on network 0
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

  // // isBridgeClaimable
  // var result = await client.isBridgeClaimable('0x15f028fc6b2e9aff6ada9fc557c9666b99c238ae9b24739770cab3ec532292e2', 1);
  // return console.log('result', result);

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

  // // CUSTOM CONTRACT
  // let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"addValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"addValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"drain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"randomValueByNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"stateMutability":"payable","type":"receive"}]

  // const customContract = client.contract(abi, "0xbe264257Be052BF867524D2640F6d5305d4263C8", 0);

  // console.log('claimableAmount', await customContract.read('claimableAmount'))

  // console.log('owner', await customContract.read('owner'))

  // console.log('random value', await customContract.read('randomValue'))

  // console.log('random value by number', await customContract.read('randomValueByNumber', 4))

  // const tx = await customContract.write({returnTransaction: false}, 'addValue');
  // console.log('addValue', await tx.getTransactionHash());

  // const tx = await customContract.write({returnTransaction: false}, 'addValue', 3);
  // // console.log('addValue', tx);
  // console.log('addValue', await tx.getTransactionHash());
}

execute().then(_ => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(0);
})
