export enum GassetType {
    NATIVE_TOKEN,
    ERC20_TOKEN,
    SETTLEMENT_TOKEN
}

export enum GassetSource {
    MSG_VALUE,
    ERC20_ALLOWANCE,
    DEX_SWAP
}

export interface ICargo {
    // Call:
    msgValue: number;
    // Destination:

    destinationNetwork: number;
    destinationNetworkGasTokenNetwork: number;
    destinationNetworkGasTokenAddress: string;
    destinationAddress: string;
    destinationGasPorterDex: string;
    // Gasset:
    gassetType: GassetType;
    gassetSource: GassetSource;
    gassetAmount: number;
    // Asset:
    token: string;
    tokenAmount: number;
    // Enforced, but not verified:
    gassetPermitData: string;
    swapCalldata: string;
    tokenPermitData: string;
    forceUpdateGlobalExitRoot: boolean;
}

export interface ConversionAuthorization {
    originNetworkID: number;
    originNetworkTxHash: string;
    conversionNonce: number;
    settlementTokenDestinationAddress: string;
    settlementTokenDestinationPermitData: string;
    settlementTokenDestinationAmount: number;
    destinationSwapCalldata: string;
    destinationNativeTokenMinimumAmount: number;
}
