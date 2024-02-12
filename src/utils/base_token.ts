import { Web3SideChainClient } from "./web3_side_chain_client";
import { ITransactionRequestConfig, ITransactionOption, IContractInitParam, IBaseClientConfig, ITransactionWriteResult } from "../interfaces";
import { BaseContractMethod, BaseContract } from "../abstracts";
import { Converter, merge, utils } from "../utils";
import { promiseResolve } from "./promise_resolve";
import { ERROR_TYPE } from "../enums";
import { TYPE_AMOUNT } from "../types";
import { ErrorHelper } from "./error_helper";
import { ADDRESS_ZERO } from '../constant';

export interface ITransactionConfigParam {
    txConfig: ITransactionRequestConfig;
    method?: BaseContractMethod;
    isWrite?: boolean;
    networkId: number;
}

export class BaseToken<T_CLIENT_CONFIG> {

    private contract_: BaseContract;
    private chainId_: number;

    constructor(
        protected contractParam: IContractInitParam,
        protected client: Web3SideChainClient<T_CLIENT_CONFIG>,
    ) {
    }

    get contractAddress() {
        return this.contractParam.address;
    }

    getContract(): Promise<BaseContract> {
        if (this.contract_) {
            return promiseResolve<BaseContract>(this.contract_ as any);
        }
        const contractParam = this.contractParam;
        const abi = this.client.abiManager.getABI(contractParam.name);
        this.contract_ = this.getContract_({
            abi,
            networkId: contractParam.networkId,
            tokenAddress: contractParam.address
        });
        return Promise.resolve(this.contract_);
    }

    getChainId(): Promise<number> {
        if (this.chainId_) {
            return promiseResolve<number>(this.chainId_ as any);
        }
        const client = this.getClient(this.contractParam.networkId);
        return client.getChainId().then(chainId => {
            this.chainId_ = chainId;
            return this.chainId_;
        });
    }

    protected processWrite(method: BaseContractMethod, option: ITransactionOption = {}): Promise<ITransactionWriteResult> {
        this.validateTxOption_(option);

        this.client.logger.log("process write");
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method,
                networkId: this.contractParam.networkId
            }).then(config => {
                this.client.logger.log("process write config");
                if (option.returnTransaction) {
                    return merge(config, {
                        data: method.encodeABI(),
                        to: method.address
                    } as ITransactionRequestConfig);
                }
                const methodResult = method.write(
                    config,
                );
                return methodResult;
            });
    }

    protected sendTransaction(option: ITransactionOption = {}): Promise<ITransactionWriteResult> {
        this.validateTxOption_(option);

        const networkId = this.contractParam.networkId;
        const client = this.getClient(networkId);
        client.logger.log("process write");

        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method: null as any,
                networkId: networkId
            }).then(config => {
                client.logger.log("process write config");
                if (option.returnTransaction) {
                    return config as any;
                }
                const methodResult = client.write(
                    config,
                );
                return methodResult;
            });
    }

    protected readTransaction(option: ITransactionOption = {}): Promise<ITransactionWriteResult> {
        this.validateTxOption_(option);
        const networkId = this.contractParam.networkId;
        const client = this.getClient(networkId);
        client.logger.log("process read");
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method: null as any,
                networkId: networkId
            }).then(config => {
                client.logger.log("write tx config created");
                if (option.returnTransaction) {
                    return config as any;
                }
                return client.read(
                    config,
                );
            });
    }

    private validateTxOption_(option: ITransactionOption) {
        if (typeof option !== 'object' || Array.isArray(option)) {
            new ErrorHelper(ERROR_TYPE.TransactionOptionNotObject).throw();
        }
    }

    protected processRead<T>(method: BaseContractMethod, option: ITransactionOption = {}): Promise<T> {
        this.validateTxOption_(option);
        this.client.logger.log("process read");
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: false,
                method,
                networkId: this.contractParam.networkId
            }).then(config => {
                this.client.logger.log("read tx config created");
                if (option.returnTransaction) {
                    return merge(config, {
                        data: method.encodeABI(),
                        to: this.contract_.address
                    } as ITransactionRequestConfig);
                }
                return method.read(
                    config,
                );
            });
    }

    protected getClient(networkId) {
        return this.client.providers[networkId].provider;
    }

    private getContract_({ networkId, tokenAddress, abi }) {
        const client = this.getClient(networkId);
        return client.getContract(tokenAddress, abi);
    }

    protected createTransactionConfig({ txConfig, method, networkId, isWrite }: ITransactionConfigParam) {
        const defaultConfig = this.client.providers[networkId].defaultConfig;
        txConfig = merge(defaultConfig, (txConfig || {}));
        const client = this.client.providers[networkId].provider;
        client.logger.log("txConfig", txConfig, "onNetwork", networkId, "isWrite", isWrite);
        const estimateGas = async (config: ITransactionRequestConfig) => {
            const result = method ? await method.estimateGas(config) : await client.estimateGas(config);
            return new utils.BN(Math.trunc(Number(result) * 1.15)).toString();
        };
        // txConfig.chainId = Converter.toHex(txConfig.chainId) as any;
        if (isWrite) {
            return this.getChainId().then(clientChainId => {
                const { maxFeePerGas, maxPriorityFeePerGas } = txConfig;

                const isEIP1559Supported = this.client.getConfiguration(networkId).isEIP1559Supported || false;
                const isMaxFeeProvided = (maxFeePerGas || maxPriorityFeePerGas);
                txConfig.chainId = txConfig.chainId || clientChainId;

                if (!isEIP1559Supported && isMaxFeeProvided) {
                    client.logger.error(ERROR_TYPE.EIP1559NotSupported, networkId).throw();
                }
                // const [gasLimit, nonce] = 
                return Promise.all([
                    !(txConfig.gasLimit)
                        ? estimateGas({
                            from: txConfig.from, value: txConfig.value, to: txConfig.to
                        })
                        : txConfig.gasLimit,
                    !txConfig.nonce ?
                        client.getTransactionCount(txConfig.from, 'pending')
                        : txConfig.nonce
                ]).then(result => {
                    const [gasLimit, nonce] = result;
                    client.logger.log("options filled");

                    txConfig.gasLimit = Number(gasLimit);
                    txConfig.nonce = nonce;
                    return txConfig;
                });
            });
        }
        return promiseResolve<ITransactionRequestConfig>(txConfig);
    }

    protected transferERC20(to: string, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "transfer",
                to,
                Converter.toHex(amount)
            );
            return this.processWrite(
                method, option
            );
        });
    }

    protected checkForNonNative(methodName) {
        if (this.contractParam.address === ADDRESS_ZERO) {
            this.client.logger.error(ERROR_TYPE.AllowedOnNonNativeTokens, methodName).throw();
        }
    }

    protected checkForEthereum(methodName) {
        if (this.contractParam.networkId !== 0) {
            this.client.logger.error(ERROR_TYPE.AllowedOnEthereum, methodName).throw();
        }
    }

    protected checkAdapterPresent(methodName) {
        if (!this.contractParam.bridgeAdapterAddress) {
            this.client.logger.error(ERROR_TYPE.BridgeAdapterNotFound, methodName).throw();
        }
    }

}
