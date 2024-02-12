import { AbiItem } from "../types";

export interface IContractInitParam {
    address: string;
    networkId: number;
    bridgeAdapterAddress?: string;
    abi?: AbiItem[];
    /**
     * used to get the predicate
     *
     * @type {string}
     * @memberof IContractInitParam
     */
    name: string;
}
