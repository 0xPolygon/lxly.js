import { Web3SideChainClient } from ".";
import { BridgeUtil } from "../lxly";
import { service } from "../services";
import { IBaseClientConfig } from "..";
import { IBridges } from "../interfaces";
import { IBridgeExtensions } from "../interfaces/bridge_extension";
import { BridgeExtension } from "../lxly/bridge_extension";

export class BridgeClient {

    client: Web3SideChainClient<IBaseClientConfig> = new Web3SideChainClient();
    bridgeUtil: BridgeUtil;
    bridges: IBridges = {};
    bridgeExtensions: IBridgeExtensions = {};

    /**
     * check if the bridge is claimable
     *
     * @param {string} txHash
     * @param {string} sourceNetwork
     * @param {number} [bridgeIndex=0]
     * @returns
     * @memberof BridgeClient
     */
    isBridgeClaimable(txHash: string, sourceNetwork: number, bridgeIndex = 0) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, sourceNetwork, bridgeIndex
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
     * @param {string} sourceNetwork
     * @param {string} destinationNetwork
     * @param {string} [bridgeIndex=0]
     * @returns
     * @memberof BridgeClient
     */
    isBridged(txHash: string, sourceNetwork: number, destinationNetwork: number, bridgeIndex = 0) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, sourceNetwork, bridgeIndex
        ).then(result => {
            return this.bridges[destinationNetwork].isClaimed(result.depositCount, sourceNetwork);
        });
    }

}
