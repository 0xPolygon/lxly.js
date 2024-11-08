import { BaseToken, Web3SideChainClient } from "../utils";
import { IContractInitParam, IBaseClientConfig } from "../interfaces";
import { IContracts } from "../interfaces";

export class Token extends BaseToken<IBaseClientConfig> {

    contracts: IContracts;

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient<IBaseClientConfig>,
        protected getContracts: (networkId: number) => IContracts
    ) {
        super(contractParam, client);
        this.contracts = this.getContracts(contractParam.networkId);
    }

    protected get bridge() {
        return this.contracts.bridge;
    }

    protected get wrapper() {
        return this.contracts.wrapper;
    }

    protected get gasPorter() {
        return this.contracts.gasPorter;
    }

    protected get bridgeUtil() {
        return this.contracts.bridgeUtil;
    }
}
