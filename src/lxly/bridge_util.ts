import { Web3SideChainClient } from "../utils";
import { service } from "../services";
import { IBaseClientConfig, _GLOBAL_INDEX_MAINNET_FLAG } from "..";
import { TYPE_AMOUNT } from '../types';

export interface IBridgeEventInfo {
    originNetwork: number;
    originTokenAddress: string;
    destinationNetwork: number;
    destinationAddress: string;
    amount: TYPE_AMOUNT;
    metadata: string;
    depositCount: number;
}

export interface IMerkleProof {
    merkle_proof: string[];
    rollup_merkle_proof?: string[];
    exit_root_num: string;
    l2_exit_root_num: string;
    main_exit_root: string;
    rollup_exit_root: string;
}

export interface IClaimPayload {
    smtProof: string[];
    smtProofRollup?: string[];
    globalIndex: string;
    mainnetExitRoot: string;
    rollupExitRoot: string;
    originNetwork: number;
    originTokenAddress: string;
    destinationNetwork: number;
    destinationAddress: string;
    amount: TYPE_AMOUNT;
    metadata: string;
}

export class BridgeUtil {
    private client_: Web3SideChainClient<IBaseClientConfig>;
    private BRIDGE_TOPIC = "0x501781209a1f8899323b96b4ef08b168df93e0a90c673d1e4cce39366cb62f9b";

    constructor(client: Web3SideChainClient<IBaseClientConfig>) {
        this.client_ = client;
    }

    private decodedBridgeData_(data: string, networkId: number) {
        const client = this.client_.providers[networkId].provider;
        const abi = this.client_.abiManager.getABI('PolygonZkEVMBridge');
        const types = abi.filter(event => event.name === "BridgeEvent");
        if (!types.length) {
            throw new Error("Data not decoded");
        }
        const decodedData = client.decodeParameters(data, types[0].inputs);
        const [leafType, originNetwork, originTokenAddress, destinationNetwork, destinationAddress, amount, metadata, depositCount] = decodedData;
        const result = {
            leafType,
            originNetwork,
            originTokenAddress,
            destinationNetwork,
            destinationAddress,
            amount,
            metadata: metadata || '0x',
            depositCount,
        } as IBridgeEventInfo;
        return Promise.resolve(result);
    }

    private getBridgeLogData_(transactionHash: string, networkId: number, isRefuel: boolean) {
        const client = this.client_.providers[networkId].provider;
        return client.getTransactionReceipt(transactionHash)
            .then(receipt => {
                const logs = receipt.logs.filter(log => log.topics[0].toLowerCase() === this.BRIDGE_TOPIC);
                if (!logs.length) {
                    throw new Error("Log not found in receipt");
                }

                const data = logs[isRefuel ? 1 : 0].data;
                return this.decodedBridgeData_(data, networkId);
            });
    }

    private getProof_(networkId: number, depositCount: number) {
        return service.network.getMerkleProof(
            networkId,
            depositCount,
        ).then(proof => {
            return proof as IMerkleProof;
        }).catch(_ => {
            throw new Error("Error in creating proof");
        });
    }

    getBridgeLogData(transactionHash: string, networkId: number, isRefuel = false) {
        return this.getBridgeLogData_(transactionHash, networkId, isRefuel);
    }

    computeGlobalIndex(indexLocal: number, indexRollup: number, sourceNetworkId: number) {
        if (BigInt(sourceNetworkId) === BigInt(0)) {
            return BigInt(indexLocal) + _GLOBAL_INDEX_MAINNET_FLAG;
        } else {
            return BigInt(indexLocal) + BigInt(indexRollup) * BigInt(2 ** 32);
        }
    }

    buildPayloadForClaim(transactionHash: string, networkId: number, isRefuel = false) {
        return this.getBridgeLogData_(transactionHash, networkId, isRefuel).then((data: IBridgeEventInfo) => {
            const {
                originNetwork,
                originTokenAddress,
                destinationNetwork,
                destinationAddress,
                amount,
                metadata,
                depositCount } = data;
            return this.getProof_(networkId, depositCount).then((proof: IMerkleProof) => {
                const payload = {} as IClaimPayload;
                payload.smtProof = proof.merkle_proof;
                payload.smtProofRollup = proof.rollup_merkle_proof;
                payload.globalIndex = this.computeGlobalIndex(depositCount, destinationNetwork, networkId).toString();
                payload.mainnetExitRoot = proof.main_exit_root;
                payload.rollupExitRoot = proof.rollup_exit_root;
                payload.originNetwork = originNetwork;
                payload.originTokenAddress = originTokenAddress;
                payload.destinationNetwork = destinationNetwork;
                payload.destinationAddress = destinationAddress;
                payload.amount = amount;
                payload.metadata = metadata;
                return payload;
            });
        });
    }
}
