import { lxLyClient, lxLyClientForTo } from "./client";
import { expect } from 'chai'
import BN from "bn.js";
import { providers, Wallet } from "ethers";
import { network, configuration, user1, user2, tokens } from "../../config";

const from  = user1.publicKey;
const to  = user2.publicKey

describe('ERC20', () => {
    let N0ERC20Token = lxLyClient.erc20(tokens[0].erc20, 0);
    let N0EtherToken = lxLyClient.erc20(tokens[0].ether, 0);
    let N1ERC20Token = lxLyClient.erc20(tokens[1].erc20, 1);
    let N1EtherToken = lxLyClient.erc20(tokens[1].ether, 1);

    before(() => {
        return Promise.all([
            lxLyClient.init({
                log: true,
                network: network,
                providers: {
                    0: {
                        provider: new Wallet(user1.privateKey, new providers.JsonRpcProvider(configuration[0].rpc)),
                        configuration: {
                            bridgeAddress: configuration[0].bridgeAddress,
                            wrapperAddress: configuration[0].wrapperAddress,
                            isEIP1559Seupported: false
                        },
                        defaultConfig: {
                            from: user1.publicKey
                        }
                    },
                    1: {
                        provider: new Wallet(user1.privateKey, new providers.JsonRpcProvider(configuration[1].rpc)),
                        configuration: {
                            bridgeAddress: configuration[1].bridgeAddress,
                            isEIP1559Seupported: false
                        },
                        defaultConfig: {
                            from: user1.publicKey
                        }
                    }
                }
            }),
            lxLyClientForTo.init({
                log: true,
                network: network,
                providers: {
                    0: {
                        provider: new Wallet(user2.privateKey, new providers.JsonRpcProvider(configuration[0].rpc)),
                        configuration: {
                            bridgeAddress: configuration[0].bridgeAddress,
                            wrapperAddress: configuration[0].wrapperAddress,
                            isEIP1559Seupported: false
                        },
                        defaultConfig: {
                            from: user2.publicKey
                        }
                    },
                    1: {
                        provider: new Wallet(user2.privateKey, new providers.JsonRpcProvider(configuration[1].rpc)),
                        configuration: {
                            bridgeAddress: configuration[1].bridgeAddress,
                            isEIP1559Seupported: false
                        },
                        defaultConfig: {
                            from: user2.publicKey
                        }
                    }
                }
            }),
        ]);
    });

    // BALANCE
    it('get erc20 balance N1ERC20Token', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        const balance = await N1ERC20Token.getBalance(from);
        console.log('ERC20 balance child', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get erc20 balance N0ERC20Token', async () => {
        const balance = await N0ERC20Token.getBalance(from);
        console.log('ERC20 balance parent', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get ether balance N1EtherToken', async () => {
        const balance = await N1EtherToken.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get ether balance N0EtherToken', async () => {
        const balance = await N0EtherToken.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    // ALLOWANCE
    it('get allowance parent', async () => {
        const allowance = await N0ERC20Token.getAllowance(from);
        console.log('allowance', allowance);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).gte(0);
    })

    // TRANSFER
    it('N1ERC20Token transfer returnTransaction with eip1159', async () => {
        const amount = 10;
        try {
            const result = await N1ERC20Token.transfer(amount, to, {
                maxFeePerGas: 10,
                maxPriorityFeePerGas: 10,
                returnTransaction: true
            });
            console.log('result', result);
        } catch (error) {
            console.log('error', error);
            expect(error).deep.equal({
                message: `chain doesn't support eip-1559`,
                type: 'eip-1559_not_supported'
            })
        }
    });

    it('N1ERC20Token transfer returnTransaction', async () => {
        const amount = 10;
        const result = await N1ERC20Token.transfer(amount, to, {
            returnTransaction: true
        });
        expect(result).to.have.not.property('maxFeePerGas')
        expect(result).to.have.not.property('maxPriorityFeePerGas')
        expect(result).to.have.property('chainId', 1442);
        expect(result['chainId']).to.be.an('number');
    });

    it('N0ERC20Token transfer returnTransaction with eip1159', async () => {
        const amount = 10;
        const result = await N0ERC20Token.transfer(amount, to, {
            maxFeePerGas: 20,
            maxPriorityFeePerGas: 20,
            returnTransaction: true
        });

        expect(result).to.have.property('maxFeePerGas', 20)
        expect(result).to.have.property('maxPriorityFeePerGas', 20)
        expect(result).to.have.not.property('gasPrice')
        expect(result).to.have.property('chainId', 5);

    });

    // APPROVE
    it('approval needed', async () => {
        const isApprovalNeeded = await N0ERC20Token.isApprovalNeeded();
        console.log('isApprovalNeeded', isApprovalNeeded);
        expect(isApprovalNeeded).to.be.an('boolean').equal(true);
    });

    it('approve N0ERC20Token return tx', async () => {
        const result = await N0ERC20Token.approve('10000', {
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(tokens[0].erc20.toLowerCase());
        expect(result).to.have.property('data')
    });

    it('approve N0ERC20Token return tx with spender address', async () => {
        const spenderAddress = await N0ERC20Token.getBridgeAddress();
        const result = await N0ERC20Token.approve('10', {
            spenderAddress: spenderAddress,
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(tokens[0].erc20.toLowerCase());
        expect(result).to.have.property('data')
    });

    // Bridge
    it('bridge ether return tx', async () => {
        const result = await N0EtherToken.bridgeAsset(10, from, 1, {
            returnTransaction: true
        });

        expect(Number(result['value'])).eq(10);
        expect(result).to.have.property('data');
    });

    it('bridge erc20 return tx', async () => {
        const result = await N0ERC20Token.bridgeAsset(1, from, 1, {
            returnTransaction: true
        });

        expect(result).to.have.property('data');
    });

    it('claim erc20 return tx', async () => {
        const result = await N1ERC20Token.claimAsset('0x27bbd4d96fc73c344bc1560ade28de1c4805802738beb772b995e14f41625623', 0, {
            returnTransaction: true
        });
        expect(result).to.have.property('data');
    });

    // // CHILD TRANSFER FLOW
    // it('child transfer', async () => {
    //     const oldBalance = await N1ERC20Token.getBalance(to);
    //     console.log('oldBalance', oldBalance);
    //     const amount = 9;
    //     let result = await N1ERC20Token.transfer(amount, to);
    //     let txHash = await result.getTransactionHash();
    //     expect(txHash).to.be.an('string');
    //     // console.log('txHash', txHash);
    //     let txReceipt = await result.getReceipt();
    //     // console.log("txReceipt", txReceipt);

    //     expect(txReceipt.transactionHash).equal(txHash);
    //     expect(txReceipt).to.be.an('object');
    //     expect(txReceipt.from.toLowerCase()).equal(from.toLowerCase());
    //     expect(txReceipt.to.toLowerCase()).equal((tokens[1].erc20.toLowerCase());
    //     expect(txReceipt.type).equal(0);
    //     expect(txReceipt.gasUsed).to.be.an('number').gt(0);
    //     expect(txReceipt.cumulativeGasUsed).to.be.an('number').gt(0);

    //     expect(txReceipt).to.have.property('blockHash')
    //     expect(txReceipt).to.have.property('blockNumber');
    //     expect(txReceipt).to.have.property('events');
    //     // expect(txReceipt).to.have.property('logs');
    //     expect(txReceipt).to.have.property('logsBloom');
    //     expect(txReceipt).to.have.property('status');
    //     expect(txReceipt).to.have.property('transactionIndex');

    //     const newBalance = await N1ERC20Token.getBalance(to);
    //     console.log('newBalance', newBalance);

    //     const oldBalanceBig = new BN(oldBalance);
    //     const newBalanceBig = new BN(newBalance);

    //     expect(newBalanceBig.toString()).equal(
    //         oldBalanceBig.add(new BN(amount)).toString()
    //     )

    //     //transfer money back to user
    //     const erc20Token = lxLyClientForTo.erc20(tokens[1].erc20, 1);

    //     result = await erc20Token.transfer(amount, from);
    //     txHash = await result.getTransactionHash();
    //     txReceipt = await result.getReceipt();
    // });

    // // BRIDGE FLOW
    // it('bridge', async () => {
    //     const amount = '1';
    //     const spenderAddress = await N0ERC20Token.getBridgeAddress();
    //     const oldBalanceforUser = await N0ERC20Token.getBalance(from);
    //     console.log('oldBalanceforUser', oldBalanceforUser);

    //     const oldBalanceforBridge = await N0ERC20Token.getBalance(spenderAddress);
    //     console.log('oldBalanceforBridge', oldBalanceforBridge);

    //     const result = await N0ERC20Token.bridgeAsset(amount, from, 1);

    //     const txHash = await result.getTransactionHash();
    //     expect(txHash).to.be.an('string');

    //     const txReceipt = await result.getReceipt();
    //     expect(txReceipt).to.be.an('object');

    //     const newBalanceforUser = await N0ERC20Token.getBalance(from);
    //     console.log('newBalanceforUser', newBalanceforUser);

    //     const newBalanceforBridge = await N0ERC20Token.getBalance(spenderAddress);
    //     console.log('newBalanceforBridge', newBalanceforBridge);

    //     expect(oldBalanceforUser.toString()).equal(
    //         new BN(newBalanceforUser).add(new BN(amount)).toString()
    //     )

    //     expect(newBalanceforBridge.toString()).equal(
    //         new BN(oldBalanceforBridge).add(new BN(amount)).toString()
    //     )
    // });

});
