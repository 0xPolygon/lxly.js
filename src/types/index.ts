import { BaseBigNumber } from "../abstracts";

export type TYPE_AMOUNT = BaseBigNumber | string | number;

export type AbiInput = {
    name: string;
    type: string;
    internalType?: string;
    indexed?: boolean;
};

export type AbiOutput = {
    name: string;
    type: string;
    internalType?: string;
};

export type AbiItem = {
    name?: string;
    type: string;
    constant?: boolean;
    payable?: boolean;
    stateMutability?: string;
    gas?: number;
    target?: string;
    signature?: string;
    inputs?: AbiInput[];
    outputs?: AbiOutput[];
    anonymous?: boolean;
};
