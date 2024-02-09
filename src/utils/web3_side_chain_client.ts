import { IBaseClientConfig, IProviders } from "../interfaces";
import { ABIService } from "../services";
import { Logger } from "./logger";
import { utils } from "..";

export class Web3SideChainClient<T_CONFIG> {
    providers: IProviders;

    config: T_CONFIG;

    abiManager: ABIService;

    network: string;
    logger = new Logger();
    resolution: {};

    init(config: IBaseClientConfig) {
        config = config || {} as any;
        this.config = config as any;

        // tslint:disable-next-line
        const Web3Client = utils.Web3Client;

        if (!Web3Client) {
            throw new Error("Web3Client is not set");
        }

        if (utils.UnstoppableDomains) {
            this.resolution = utils.UnstoppableDomains;
        }

        this.providers = config.providers;

        for (const [key, value] of Object.entries(this.providers)) {
            this.providers[key].defaultConfig = value.defaultConfig || {} as any;
            this.providers[key].provider = new (Web3Client as any)(value.provider, this.logger);
        }

        this.logger.enableLog(config.log);

        this.network = config.network;
        this.abiManager = new ABIService(this.network);
        return Promise.resolve(this.network);
    }

    getDefaultConfig(networkId: number) {
        return this.providers[networkId].defaultConfig;
    }

    getConfiguration(networkId: number) {
        return this.providers[networkId].configuration;
    }

}
