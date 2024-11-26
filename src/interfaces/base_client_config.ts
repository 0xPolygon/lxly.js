export interface IProviderConfig {
    provider: any;
    configuration?: {
        bridgeAddress?: string,
        wrapperAddress?: string,
        gasPorterAddress?: string,
        isEIP1559Supported?: boolean,
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
