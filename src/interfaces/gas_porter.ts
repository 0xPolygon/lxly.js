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
    msgValue: string;
    // Destination:

    destinationNetwork: number;
    destinationNetworkGasTokenNetwork: number;
    destinationNetworkGasTokenAddress: string;
    destinationAddress: string;
    destinationGasPorterDex: string;
    // Gasset:
    gassetType: GassetType;
    gassetSource: GassetSource;
    gassetAmount: string;
    // Asset:
    token: string;
    tokenAmount: string;
    // Enforced, but not verified:
    gassetPermitData: string;
    swapCalldata: string;
    tokenPermitData: string;
    forceUpdateGlobalExitRoot: boolean;
    // Tracking:
    trackingNumber: string;
}

export interface IConversionAuthorization {
    originNetworkID: number;
    trackingNumber: number;
    signer: string;
    conversionNonce: number;
    gassetDestinationAddress: string;
    gassetDestinationPermitData: string;
    gassetDestinationAmount: string;
    destinationSwapCalldata: string;
    destinationNativeTokenMinimumAmount: string;
    deadline: number;
}
