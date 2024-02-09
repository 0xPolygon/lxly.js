export interface IContractInitParam {
    address: string;
    networkId: number;
    bridgeAdapterAddress?: string;
    /**
     * used to get the predicate
     *
     * @type {string}
     * @memberof IContractInitParam
     */
    name: string;
}
