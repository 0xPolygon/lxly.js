import { BaseToken, Web3SideChainClient } from "../utils";
import { IBaseClientConfig, ITransactionOption } from "../interfaces";

export class Wrapper extends BaseToken<IBaseClientConfig> {

    constructor(client_: Web3SideChainClient<IBaseClientConfig>, address: string, networkId: number) {
        super({
            address: address,
            name: 'ZkEVMWrapper',
            networkId: networkId
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    depositWithGas(
        tokenAddress: string,
        destinationNetwork: number,
        userAddress: string,
        depositAmount: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "deposit",
            tokenAddress,
            destinationNetwork,
            userAddress,
            depositAmount
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    depositPermitWithGas(
        tokenAddress: string,
        destinationNetwork: number,
        userAddress: string,
        depositAmount: string,
        deadline: string,
        v: number,
        r: string,
        s: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "deposit",
            tokenAddress,
            destinationNetwork,
            userAddress,
            depositAmount,
            deadline,
            v,
            r,
            s
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

}
