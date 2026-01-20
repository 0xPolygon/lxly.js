import { Converter, Web3SideChainClient } from "../utils";
import {
    IBaseClientConfig, ITransactionOption,
    IContracts
} from "../interfaces";
import { Token } from "./token";
import { IClaimPayload } from "..";
import { TYPE_AMOUNT } from "../types";

export class VaultBridge extends Token {
    constructor(
        address: string,
        networkId: number,
        client: Web3SideChainClient<IBaseClientConfig>,
        getContracts: (networkId: number) => IContracts
    ) {
        super({
            address: address,
            name: 'GenericVaultBridgeToken',
            networkId: networkId
        }, client, getContracts);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    depositAndBridge(
        asset: TYPE_AMOUNT,
        receiver: string,
        destinationNetworkId: number,
        forceUpdateGlobalExitRoot: boolean,
        option?: ITransactionOption
    ) {
        return this.method(
            "depositAndBridge",
            asset,
            receiver,
            destinationNetworkId,
            forceUpdateGlobalExitRoot
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    depositGasTokenAndBridge(
        asset: TYPE_AMOUNT,
        receiver: string,
        destinationNetworkId: number,
        forceUpdateGlobalExitRoot: boolean,
        option?: ITransactionOption
    ) {
        option.value = Converter.toHex(asset);

        return this.method(
            "depositGasTokenAndBridge",
            receiver,
            destinationNetworkId,
            forceUpdateGlobalExitRoot
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    claimAndRedeem(
        transactionHash: string,
        sourceNetworkId: number,
        option?: ITransactionOption
    ) {
        return this.bridgeUtil.buildPayloadForClaim(
            transactionHash, sourceNetworkId, option.bridgeIndex || 0
        ).then((payload: IClaimPayload) => {
            return this.method(
                "claimAndRedeem",
                payload.smtProof,
                payload.smtProofRollup,
                payload.globalIndex,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.destinationAddress,
                payload.amount,
                payload.destinationAddress,
                payload.metadata
            ).then(method => {
                return this.processWrite(method, option);
            });
        });
    }

    claimAndRedeemWithBridgeDetails(
        sourceNetworkId: number,
        depositCount: number,
        originTokenNetwork: number,
        originTokenAddress: string,
        destinationNetwork: number,
        destinationAddress: string,
        amount: string,
        metadata: string,
        option?: ITransactionOption
    ) {
        return this.bridgeUtil.buildPayloadForClaimWithBridgeDetails(
            sourceNetworkId,
            depositCount,
            originTokenNetwork,
            originTokenAddress,
            destinationNetwork,
            destinationAddress,
            amount,
            metadata
        ).then((payload: IClaimPayload) => {
            return this.method(
                "claimAndRedeem",
                payload.smtProof,
                payload.smtProofRollup,
                payload.globalIndex,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.destinationAddress,
                payload.amount,
                payload.destinationAddress,
                payload.metadata
            ).then(method => {
                return this.processWrite(method, option);
            });
        });
    }
}
