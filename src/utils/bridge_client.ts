import { Web3SideChainClient } from ".";
import { BridgeUtil } from "../lxly";
import { service } from "../services";
import { IBaseClientConfig } from "..";
import { IBridges } from "../interfaces";

export class BridgeClient {

    client: Web3SideChainClient<IBaseClientConfig> = new Web3SideChainClient();
    bridgeUtil: BridgeUtil;
    bridges: IBridges = {};

    /**
     * check if the bridge is claimable
     *
     * @param {string} txHash
     * @returns
     * @memberof BridgeClient
     */
    isBridgeClaimable(txHash: string, sourceNetwork: number) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, sourceNetwork
        ).then(result => {
            return service.network.getBridgeTransactionDetails(
                sourceNetwork,
                result.depositCount
            );
        }).then(details => {
            return details.ready_for_claim;
        });
    }

    /**
     * check whether deposit is completed
     *
     * @param {string} txHash
     * @returns
     * @memberof BridgeClient
     */
    isBridged(txHash: string, sourceNetowrk: number, destinationNetwork: number) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, sourceNetowrk
        ).then(result => {
            return this.bridges[destinationNetwork].isClaimed(result.depositCount, sourceNetowrk);
        });
    }

}
