import { ERC20 } from "./erc20";
import { Contract } from "./contract";
import { Bridge } from "./bridge";
import { BridgeUtil } from "./bridge_util";
import { BridgeClient, setProofApi } from "../utils";
import { IBaseClientConfig, IContracts, IWrappers, IGasPorters } from "../interfaces";
import { config as urlConfig } from "../config";
import { service } from "../services";
import { Wrapper } from "./wrapper";
import { AbiItem } from "../types";
import { GasPorter } from "./gas_porter";

export * from "./bridge";
export * from "./bridge_util";
export * from "./wrapper";
export * from "./gas_porter";

export class LxLyClient extends BridgeClient {

    wrappers: IWrappers = {};
    gasPorters: IGasPorters = {};

    init(config: IBaseClientConfig) {
        const client = this.client;
        return client.init(config).then(_ => {
            for (const [key, value] of Object.entries(config.providers)) {
                if (value.configuration.bridgeAddress) {
                    this.bridges[key] = new Bridge(
                        this.client,
                        value.configuration.bridgeAddress,
                        Number(key)
                    );
                }

                if (value.configuration.wrapperAddress) {
                    this.wrappers[key] = new Wrapper(
                        this.client,
                        value.configuration.wrapperAddress,
                        Number(key)
                    );
                }

                if (value.configuration.gasPorterAddress) {
                    this.gasPorters[key] = new GasPorter(
                        this.client,
                        value.configuration.gasPorterAddress,
                        Number(key)
                    );
                }
            }

            if (!service.network) {
                setProofApi(urlConfig.BridgeService[config.network]);
            }

            this.bridgeUtil = new BridgeUtil(
                this.client
            );

            return this;
        });
    }

    /**
     * creates instance of ERC20 token
     *
     * @param {string} tokenAddress
     * @param {boolean} isParent
     *
     * @param bridgeAdapterAddress Needed if a custom erc20 token is being bridged
     * @returns
     * @memberof ERC20
     */
    erc20(tokenAddress: string, networkId: number, bridgeAdapterAddress?: string) {
        return new ERC20(
            tokenAddress,
            networkId,
            bridgeAdapterAddress,
            this.client,
            this.getContracts_.bind(this)
        );
    }

    /**
     * creates instance of ERC20 token
     *
     * @param {AbiItem[]} abi
     * @param {string} tokenAddress
     * @param {number} networkId
     *
     * @returns
     * @memberof Contract
     */
    contract(abi: AbiItem[], tokenAddress: string, networkId: number) {
        return new Contract(
            abi,
            tokenAddress,
            networkId,
            this.client,
        );
    }

    private getContracts_(networkId) {
        return {
            bridge: this.bridges[networkId],
            bridgeUtil: this.bridgeUtil,
            wrapper: this.wrappers[networkId],
            gasPorter: this.gasPorters[networkId]
        } as IContracts;
    }
}
