import { BaseToken, Web3SideChainClient } from "../utils";
import { IBaseClientConfig, ITransactionOption, ICargo, GassetSource, GassetType, IConversionAuthorization } from "../interfaces";

export class GasPorter extends BaseToken<IBaseClientConfig> {

    constructor(client_: Web3SideChainClient<IBaseClientConfig>, address: string, networkId: number) {
        super({
            address: address,
            name: 'GasPorter',
            networkId: networkId
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    plotRoute(
        cargo: ICargo,
        option?: ITransactionOption
    ) {
        return this.method(
            "plotRoute",
            cargo
        ).then(method => {
            return this.processRead(method, option);
        });
    }

    bridgeAssetAndGas(
        requestConversion: boolean,
        forceUpdateGlobalExitRoot: boolean,
        destinationNetwork: number,
        destinationAddress: string,
        gasset: string,
        gassetSource: GassetSource,
        gassetPermitData: string,
        gassetAmount: string,
        swapCalldata: string,
        token: string,
        tokenAmount: string,
        tokenPermitData: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "bridgeAssetAndGas",
            requestConversion,
            forceUpdateGlobalExitRoot,
            destinationNetwork,
            destinationAddress,
            gasset,
            gassetSource,
            gassetPermitData,
            gassetAmount,
            swapCalldata,
            token,
            tokenAmount,
            tokenPermitData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    convertGasset(
        data: IConversionAuthorization,
        signature: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "convertGasset",
            data,
            signature
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    determineGasset(
        destinationNetworkGasTokenNetwork: number,
        destinationNetworkGasTokenAddress: string,
        gassetType: GassetType,
        option?: ITransactionOption
    ) {
        return this.method(
            "determineGasset",
            destinationNetworkGasTokenNetwork,
            destinationNetworkGasTokenAddress,
            gassetType
        ).then(method => {
            return this.processRead(method, option);
        });
    }

    determineConversion(
        destinationNetworkGasTokenNetwork: number,
        destinationNetworkGasTokenAddress: string,
        gasset: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "determineConversion",
            destinationNetworkGasTokenNetwork,
            destinationNetworkGasTokenAddress,
            gasset
        ).then(method => {
            return this.processRead(method, option);
        });
    }

}
