import { BaseToken, Web3SideChainClient, Converter, promiseResolve } from "../utils";
import { IBaseClientConfig, ITransactionOption } from "../interfaces";
import { TYPE_AMOUNT } from "../types";
import {
    ADDRESS_ZERO
} from '..';

export class BridgeExtension extends BaseToken<IBaseClientConfig> {

    networkID_: number;

    constructor(client_: Web3SideChainClient<IBaseClientConfig>, address: string, networkId: number) {
        super({
            address: address,
            name: 'BridgeExtension',
            networkId: networkId
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    isEtherToken() {
        return this.contractParam.address === ADDRESS_ZERO;
    }

    /**
     * bridge function to be called on that network from where token is to be transferred to a different network
     *
     * @param {string} token Token address
     * @param {TYPE_AMOUNT} amount amount of tokens
     * @param {number} destinationNetwork Network at which tokens will be bridged
     * @param {string} callAddress Address to which tokens will be bridged
     * @param {string} fallbackAddress Address to which tokens will be bridged if the execution fails.
     * @param {string} callData Encoded function data of the smart contract at target callAddress
     * @param {forceUpdateGlobalExitRoot} boolean boolean to force update global exit root
     * @param {string} permitData Permit data to avoid approve call
     * @param {ITransactionOption} [option] 
     * 
     * @returns
     * @memberof BridgeExtension
     */
    bridgeAndCall(
        token: string,
        amount: TYPE_AMOUNT,
        destinationNetwork: number,
        callAddress: string,
        fallbackAddress: string,
        calldata: string,
        forceUpdateGlobalExitRoot: boolean,
        permitData?: string,
        option?: ITransactionOption,
    ) {
        if (this.isEtherToken()) {
            option.value = Converter.toHex(amount);
        }

        if (permitData === undefined) {
            return this.method(
                "bridgeAndCall",
                token,
                Converter.toHex(amount),
                destinationNetwork,
                callAddress,
                fallbackAddress,
                calldata,
                forceUpdateGlobalExitRoot
            ).then(method => {
                return this.processWrite(method, option);
            });
        } else {
            return this.method(
                "bridgeAndCall",
                token,
                Converter.toHex(amount),
                permitData,
                destinationNetwork,
                callAddress,
                fallbackAddress,
                calldata,
                forceUpdateGlobalExitRoot
            ).then(method => {
                return this.processWrite(method, option);
            });
        }
    }
}
