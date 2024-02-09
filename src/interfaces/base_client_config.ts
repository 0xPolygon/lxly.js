export interface IProviderConfig {
    provider: any;
    configuration?: {
        bridgeAddress?: string,
        wrapperAddress?: string,
        isEIP1559Seupported?: boolean,
    };
    defaultConfig?: {
        from?: string;
    };
}

export interface IProviders {
    [key: number]: IProviderConfig;
}

export interface IBaseClientConfig {
    network: string;
    providers: IProviders;
    log?: boolean;
    requestConcurrency?: number;

}
