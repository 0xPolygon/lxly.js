import { isHexString } from '@ethereumjs/util';
import { ITransactionOption } from "../interfaces";
import { Converter, Web3SideChainClient, promiseAny } from "../utils";
import { Token } from "./token";
import { TYPE_AMOUNT } from "../types";
import { BaseContractMethod } from "../abstracts";
import {
    MAX_AMOUNT,
    ADDRESS_ZERO,
    DAI_PERMIT_TYPEHASH,
    EIP_2612_PERMIT_TYPEHASH,
    UNISWAP_DOMAIN_TYPEHASH,
    EIP_2612_DOMAIN_TYPEHASH,
    Permit,
    BaseContract,
    BaseWeb3Client,
    IClaimPayload,
    ICargo,
    GassetSource,
    IConversionAuthorization,
} from '..';
import {
    IAllowanceTransactionOption,
    IApproveTransactionOption,
    IBridgeTransactionOption,
    IBaseClientConfig,
    IContracts
} from "../interfaces";
import { BridgeAdapter } from './bridge_adapter';

export class ERC20 extends Token {
    private bridgeAdapter: BridgeAdapter;
    constructor(
        tokenAddress: string,
        networkId: number,
        bridgeAdapterAddress,
        client: Web3SideChainClient<IBaseClientConfig>,
        getContracts: (networkId: number) => IContracts
    ) {
        super({
            networkId,
            address: tokenAddress,
            bridgeAdapterAddress,
            name: 'ERC20',
        }, client, getContracts);
        if (bridgeAdapterAddress) {
            this.bridgeAdapter = new BridgeAdapter(
                this.client,
                bridgeAdapterAddress,
                networkId
            );
        }
    }

    /**
     * get bridge for that token
     *
     * @returns
     * @memberof ERC20
     */
    getBridgeAddress() {
        return this.bridge.contractAddress;
    }

    isEtherToken() {
        return this.contractParam.address === ADDRESS_ZERO;
    }

    /**
     * get token balance of user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    getBalance(userAddress: string, option?: ITransactionOption) {
        if (this.isEtherToken()) {
            const client = this.client.providers[this.contractParam.networkId].provider;
            return client.getBalance(userAddress);
        } else {
            return this.getContract().then(contract => {
                const method = contract.method(
                    "balanceOf",
                    userAddress
                );
                return this.processRead<string>(method, option);
            });
        }
    }

    /**
     * is Approval needed to bridge tokens to other chains
     *
     * @returns
     * @memberof ERC20
     */
    isApprovalNeeded() {
        if (this.isEtherToken()) {
            return false;
        }

        return this.bridge.getOriginTokenInfo(this.contractParam.address)
            .then(tokenInfo => {
                return tokenInfo[1] === ADDRESS_ZERO;
            });
    }

    /**
     * get allowance of user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    getAllowance(userAddress: string, option: IAllowanceTransactionOption = {}) {
        this.checkForNonNative("getAllowance");
        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getContract().then(contract => {
            const method = contract.method(
                "allowance",
                userAddress,
                spenderAddress,
            );
            return this.processRead<string>(method, option);
        });
    }

    /**
     * Approve given amount of tokens for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {IApproveTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    approve(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        this.checkForNonNative("approve");
        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                spenderAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    /**
     * Approve max amount of tokens for user
     *
     * @param {IApproveTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    approveMax(option: IApproveTransactionOption = {}) {
        this.checkForNonNative("approveMax");
        return this.approve(
            MAX_AMOUNT,
            option
        );
    }

    /**
     * Bridge given amount of token for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {number} destinationNetworkId
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    bridgeAsset(amount: TYPE_AMOUNT, userAddress: string, destinationNetworkId: number, option: IBridgeTransactionOption = {}) {
        const permitData = option.permitData || '0x';
        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        const client = this.client.providers[this.contractParam.networkId].provider;

        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        if (this.isEtherToken()) {
            option.value = Converter.toHex(amount);
        }

        return this.bridge.bridgeAsset(
            destinationNetworkId,
            userAddress,
            amountInABI,
            this.contractParam.address,
            forceUpdateGlobalExitRoot,
            permitData,
            option
        );
    }

    /**
     * Bridge given amount of token for user along with ETH for gas token
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {number} destinationNetworkId
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    bridgeAssetWithGas(
        amount: TYPE_AMOUNT,
        userAddress: string,
        ethGasAmount: TYPE_AMOUNT,
        destinationNetworkId: number,
        option: IBridgeTransactionOption = {}
    ) {
        const client = this.client.providers[this.contractParam.networkId].provider;

        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        option.value = Converter.toHex(ethGasAmount);
        if (option.v && option.r && option.s) {
            return this.wrapper.depositPermitWithGas(
                this.contractParam.address,
                destinationNetworkId,
                userAddress,
                amountInABI,
                Math.floor((Date.now() + 3600000) / 1000).toString(),
                option.v,
                option.r,
                option.s,
                option
            );
        }
        return this.wrapper.depositWithGas(
            this.contractParam.address,
            destinationNetworkId,
            userAddress,
            amountInABI,
            option
        );
    }

    /**
     * Bridge given amount of token for user along with ETH for gas token
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {number} destinationNetworkId
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    bridgeAssetPermitWithGas(
        amount: TYPE_AMOUNT,
        userAddress: string,
        ethGasAmount: TYPE_AMOUNT,
        destinationNetworkId: number,
        option: IBridgeTransactionOption = {}
    ) {
        this.checkForNonNative("getPermitData");

        const client = this.client.providers[this.contractParam.networkId].provider;

        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        option.value = Converter.toHex(ethGasAmount);

        return this.getPermitSignatureParams_(amount, this.wrapper.contractAddress).then(
            signatureParams => {
                return this.wrapper.depositPermitWithGas(
                    this.contractParam.address,
                    destinationNetworkId,
                    userAddress,
                    amountInABI,
                    Math.floor((Date.now() + 3600000) / 1000).toString(),
                    signatureParams.v,
                    signatureParams.r,
                    signatureParams.s,
                    option
                );
            }
        );
    }

    /**
     * Bridge given amount of token for user with permit call
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {number} destinationNetworkId
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    bridgeAssetWithPermit(
        amount: TYPE_AMOUNT,
        userAddress: string,
        destinationNetworkId: number,
        option: IApproveTransactionOption = {}
    ) {
        this.checkForNonNative("depositWithPermit");

        const client = this.client.providers[this.contractParam.networkId].provider;

        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        return this.getPermitData(amountInABI, option).then(permitData => {
            return this.bridge.bridgeAsset(
                destinationNetworkId,
                userAddress,
                amountInABI,
                this.contractParam.address,
                forceUpdateGlobalExitRoot,
                permitData,
                option
            );
        });
    }

    /**
     * Bridge asset to child chain using Custom ERC20 bridge Adapter
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {number} destinationNetworkId
     * @param {boolean} forceUpdateGlobalExitRoot
     * @returns
     * @memberof ERC20
     */
    bridgeCustomERC20(
        amount: TYPE_AMOUNT,
        userAddress: string,
        destinationNetworkId: number,
        forceUpdateGlobalExitRoot = true
    ) {
        // should be allowed to be used only in root chain
        this.checkAdapterPresent("depositCustomERC20");
        // should not be allowed to use for native asset
        this.checkForNonNative("depositCustomERC20");
        return this.bridgeAdapter.bridgeToken(userAddress, amount, destinationNetworkId, forceUpdateGlobalExitRoot);
    }

    /**
     * Claim asset on child chain bridged using custom bridge adapter
     * @param {string} transactionHash
     * @param {number} sourceNetworkId
     * @param {ITransactionOption} option
     * @returns
     * @memberof ERC20
     */
    claimCustomERC20(transactionHash: string, sourceNetworkId: number, option?: ITransactionOption) {
        return this.bridgeUtil.buildPayloadForClaim(
            transactionHash, sourceNetworkId, option.bridgeIndex || 0
        ).then((payload: IClaimPayload) => {
            return this.bridge.claimMessage(
                payload.smtProof,
                payload.smtProofRollup,
                payload.globalIndex,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            );
        });
    }


    /**
     * Claim Assets after GlobalExitRootManager is synced from source to destination
     *
     * @param {string} transactionHash
     * @param {number} sourceNetworkId
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    claimAsset(transactionHash: string, sourceNetworkId: number, option?: ITransactionOption) {
        return this.bridgeUtil.buildPayloadForClaim(
            transactionHash, sourceNetworkId, option.bridgeIndex || 0
        ).then((payload: IClaimPayload) => {
            return this.bridge.claimAsset(
                payload.smtProof,
                payload.smtProofRollup,
                payload.globalIndex,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            );
        });
    }

    /**
     * Claim Assets after GlobalExitRootManager is synced from source to destination
     *
     * @param {string[]} smtProof Merkle Proof
     * @param {string[]} smtProofRollup Roll up Merkle Proof
     * @param {string} globalIndex Global Index
     * @param {string} mainnetExitRoot Mainnet Exit Root
     * @param {string} rollupExitRoot RollUP Exit Root
     * @param {number} originNetwork Network at which token was initially deployed
     * @param {string} originTokenAddress Address of token at network where token was initially deployed
     * @param {string} destinationAddress Address to which tokens will be bridged
     * @param {TYPE_AMOUNT} amount amount of tokens
     * @param {string} metadata Metadata of token
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    claimAssetRaw(
        smtProof: string[],
        smtProofRollup: string[],
        globalIndex: string,
        mainnetExitRoot: string,
        rollupExitRoot: string,
        originNetwork: number,
        originTokenAddress: string,
        destinationNetwork: number,
        destinationAddress: string,
        amount: TYPE_AMOUNT,
        metadata: string,
        option?: ITransactionOption
    ) {
        return this.bridge.claimAsset(
            smtProof,
            smtProofRollup,
            globalIndex,
            mainnetExitRoot,
            rollupExitRoot,
            originNetwork,
            originTokenAddress,
            destinationNetwork,
            destinationAddress,
            amount,
            metadata,
            option
        );
    }

    /**
     * transfer amount to another user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} to
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    transfer(amount: TYPE_AMOUNT, to: string, option: ITransactionOption = {}) {
        if (this.contractParam.address === ADDRESS_ZERO) {
            option.to = to;
            option.value = Converter.toHex(amount);
            return this.sendTransaction(option);
        }
        return this.transferERC20(to, amount, option);
    }

    /**
     * get permitType of the token
     *
     * @returns
     * @memberof ERC20
     */
    private getPermit() {
        let contract: BaseContract;
        return this.getContract().then(contractInstance => {
            contract = contractInstance;
            const method = contract.method(
                "PERMIT_TYPEHASH",
            );
            return this.processRead<string>(method);
        }).then(permitTypehash => {
            switch (permitTypehash) {
                case DAI_PERMIT_TYPEHASH: {
                    return Permit.DAI;
                }
                case EIP_2612_PERMIT_TYPEHASH: {
                    const DOMAIN_TYPEHASH = contract.method("DOMAIN_TYPEHASH");
                    const EIP712DOMAIN_HASH = contract.method("EIP712DOMAIN_HASH");
                    return promiseAny([this.processRead<string>(DOMAIN_TYPEHASH), this.processRead<string>(EIP712DOMAIN_HASH)]).then(
                        (domainTypehash) => {
                            switch (domainTypehash) {
                                case EIP_2612_DOMAIN_TYPEHASH: {
                                    return Permit.EIP_2612;
                                }
                                case UNISWAP_DOMAIN_TYPEHASH: {
                                    return Permit.UNISWAP;
                                }
                                default: {
                                    return Promise.reject(new Error(`Unsupported domain typehash: ${domainTypehash}`));
                                }
                            }
                        }
                    );
                }
                default: {
                    return Promise.reject(new Error(`Unsupported permit typehash: ${permitTypehash}`));
                }
            }
        });
    }

    /**
     * get typedData for signing
     * @param {string} permitType
     * @param {string} account
     * @param {number} chainId
     * @param {string} name
     * @param {string} nonce
     * @param {string} spenderAddress
     * @param {string} amount
     * 
     * @returns
     * @memberof ERC20
     */
    private getTypedData_(permitType: string, account: string, chainId: number, name: string, nonce: string, spenderAddress: string, amount: string) {
        const typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' }
                ],
                Permit: []
            },
            primaryType: "Permit",
            domain: {
                name,
                version: "1",
                chainId,
                verifyingContract: this.contractParam.address,
            },
            message: {}
        };
        switch (permitType) {
            case Permit.DAI:
                typedData.types.Permit = [
                    { name: "holder", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "nonce", type: "uint256" },
                    { name: "expiry", type: "uint256" },
                    { name: "allowed", type: "bool" },
                ];
                typedData.message = {
                    holder: account,
                    spender: spenderAddress,
                    nonce,
                    expiry: Math.floor((Date.now() + 3600000) / 1000),
                    allowed: true,
                };
            case Permit.EIP_2612:
            case Permit.UNISWAP:

                if (permitType === Permit.UNISWAP) {
                    typedData.types.EIP712Domain = [
                        { name: 'name', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' }
                    ];
                    delete typedData.domain.version;
                }
                typedData.types.Permit = [
                    { name: 'owner', type: 'address' },
                    { name: 'spender', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'nonce', type: 'uint256' },
                    { name: 'deadline', type: 'uint256' }
                ];
                typedData.message = {
                    owner: account,
                    spender: spenderAddress,
                    value: amount,
                    nonce: nonce,
                    deadline: Math.floor((Date.now() + 3600000) / 1000),
                };
        }
        return typedData;
    }

    /**
     * get {r, s, v} from signature
     * @param {BaseWeb3Client} client
     * @param {string} signature
     * 
     * @returns
     * @memberof ERC20
     */
    private getSignatureParameters_(client: BaseWeb3Client, signature: string) {
        if (!isHexString(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.'),
            );
        }

        if (signature.slice(0, 2) !== '0x') {
            signature = '0x'.concat(signature);
        }

        const r = signature.slice(0, 66);
        const s = '0x'.concat(signature.slice(66, 130));
        let v = client.hexToNumber('0x'.concat(signature.slice(130, 132)));
        if (![27, 28].includes(v as any)) {
            v += 27;
        }
        return {
            r: r,
            s: s,
            v: v,
        };
    }

    /**
     * encode permit function data
     * @param {BaseContract} contract
     * @param {string} permitType
     * @param {any} signatureParams
     * @param {string} spenderAddress
     * @param {string} account
     * @param {string} nonce
     * @param {string} amount
     * 
     * @returns
     * @memberof ERC20
     */
    private encodePermitFunctionData_(contract: BaseContract, permitType: string, signatureParams: any, spenderAddress: string, account: string, nonce: string, amount: string) {
        const { r, s, v } = signatureParams;
        let method: BaseContractMethod;
        switch (permitType) {
            case Permit.DAI:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    nonce,
                    Math.floor((Date.now() + 3600000) / 1000),
                    true,
                    v,
                    r,
                    s,
                );
                break;

            case Permit.EIP_2612:
            case Permit.UNISWAP:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    amount,
                    Math.floor((Date.now() + 3600000) / 1000),
                    v,
                    r,
                    s,
                );
                break;
        }
        return method.encodeABI();
    }

    private getPermitSignatureParams_(amount: TYPE_AMOUNT, spenderAddress: string) {
        const client = this.client.providers[this.contractParam.networkId].provider;
        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        let account: string;
        let chainId: number;
        let permitType: string;
        let contract: BaseContract;
        let nonce: string;

        return Promise.all([client.name === 'WEB3' ? client.getAccountsUsingRPC_() : client.getAccounts(), this.getContract(), client.getChainId(), this.getPermit()]).then(result => {
            account = result[0][0];
            contract = result[1];
            chainId = result[2];
            permitType = result[3];
            const nameMethod = contract.method("name");
            const nonceMethod = contract.method("nonces", account);
            return Promise.all([this.processRead<string>(nameMethod), this.processRead<string>(nonceMethod)]);
        }).then(data => {
            const name = data[0];
            nonce = data[1];
            return this.getTypedData_(permitType, account, chainId, name, nonce, spenderAddress, amountInABI);
        }).then(typedData => {
            return client.signTypedData(account, typedData);
        }).then(signature => {
            return this.getSignatureParameters_(client, signature);
        });
    }

    /**
     * Get permit data for given spender for given amount
     * @param {TYPE_AMOUNT} amount
     * @param {string} spenderAddress
     * 
     * @returns
     * @memberof ERC20
     */
    private getPermitData_(amount: TYPE_AMOUNT, spenderAddress: string) {
        const client = this.client.providers[this.contractParam.networkId].provider;
        const amountInABI = client.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        let account: string;
        let chainId: number;
        let permitType: string;
        let contract: BaseContract;
        let nonce: string;

        return Promise.all([client.name === 'WEB3' ? client.getAccountsUsingRPC_() : client.getAccounts(), this.getContract(), client.getChainId(), this.getPermit()]).then(result => {
            account = result[0][0];
            contract = result[1];
            chainId = result[2];
            permitType = result[3];
            const nameMethod = contract.method("name");
            const nonceMethod = contract.method("nonces", account);
            return Promise.all([this.processRead<string>(nameMethod), this.processRead<string>(nonceMethod)]);
        }).then(data => {
            const name = data[0];
            nonce = data[1];
            return this.getTypedData_(permitType, account, chainId, name, nonce, spenderAddress, amountInABI);
        }).then(typedData => {
            return client.signTypedData(account, typedData);
        }).then(signature => {
            const signatureParameters = this.getSignatureParameters_(client, signature);
            return this.encodePermitFunctionData_(
                contract, permitType, signatureParameters, spenderAddress, account, nonce, amountInABI
            );
        });
    }

    /**
     * Get permit data for given amount
     * @param {TYPE_AMOUNT} amount
     * @param {IApproveTransactionOption} option
     * 
     * @returns
     * @memberof ERC20
     */
    getPermitData(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        this.checkForNonNative("getPermitData");

        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getPermitData_(amount, spenderAddress);
    }

    /**
     * Get the plot route call data for bridge asset and gas
     * @param {ICargo} cargo
     * @param {ITransactionOption} option
     * 
     * @returns
     * @memberof ERC20
     */
    getPlotRoute(cargo: ICargo, option?: ITransactionOption) {
        const client = this.client.providers[this.contractParam.networkId].provider;
        return this.gasPorter.plotRoute(cargo, option).then((data: any) => {
            const callDataParams = client.decodeParameters(
                `0x${data.callData.slice(10)}`,
                [
                    'bool',
                    'bool',
                    'uint32',
                    'address',
                    'address',
                    'uint32',
                    'bytes',
                    'uint256',
                    'bytes',
                    'address',
                    'uint256',
                    'bytes'
                ]
            );
            return {
                bridgeAssetAndGas: {
                    requestConversion: callDataParams[0],
                    forceUpdateGlobalExitRoot: callDataParams[1],
                    destinationNetwork: callDataParams[2],
                    destinationAddress: callDataParams[3],
                    gasset: callDataParams[4],
                    gassetSource: callDataParams[5],
                    gassetPermitData: callDataParams[6] || '0x',
                    gassetAmount: callDataParams[7],
                    swapCalldata: callDataParams[8] || '0x',
                    token: callDataParams[9],
                    tokenAmount: callDataParams[10],
                    tokenPermitData: callDataParams[11] || '0x'
                },
                callData: data.callData,
                msgValue: data.msgValue
            };
        });
    }

    /**
     * bridge asset and gas function
     * @param {boolean} requestConversion - It tells if the conversion is required on destination chain or not
     * @param {boolean} forceUpdateGlobalExitRoot
     * @param {number} destinationNetwork - the network on which the funds needs to be bridged
     * @param {string} destinationAddress - the address to which funds will be deposited
     * @param {string} gasset - address of the gas token
     * @param {GassetSource} gassetSource - the source of the gas token amount. it can be directly msg value, or dex swap or if user already has the ERC20 token then erc20.
     * @param {string} gassetPermitData - Permit data required to give permit to gasPorter for the gas token.
     * @param {string} gassetAmount - amount of gas token to be bridged
     * @param {string} swapCalldata - swap call data if swapping is required on the source chain
     * @param {string} token - token to be bridged
     * @param {string} tokenAmount - amount of token to be bridged
     * @param {string} tokenPermitData - Permit data required to give permit to gasPorter for the token to be bridged.
     * @param {ITransactionOption} option
     * 
     * @returns
     * @memberof ERC20
     */
    bridgeAssetAndGas(
        requestConversion: boolean,
        forceUpdateGlobalExitRoot: boolean,
        destinationNetwork: number,
        destinationAddress: string,
        gasset: string,
        gassetSource: GassetSource,
        gassetPermitData: string,
        gassetAmount: string,
        swapCalldata: string,
        token: string,
        tokenAmount: string,
        tokenPermitData: string,
        option?: ITransactionOption
    ) {
        return this.gasPorter.bridgeAssetAndGas(
            requestConversion,
            forceUpdateGlobalExitRoot,
            destinationNetwork,
            destinationAddress,
            gasset,
            gassetSource,
            gassetPermitData,
            gassetAmount,
            swapCalldata,
            token,
            tokenAmount,
            tokenPermitData,
            option
        );
    }

    /**
     * Get the plot route call data for bridge asset and gas and then do the bridgeAssetAndGas transaction
     * @param {ICargo} cargo
     * @param {ITransactionOption} option
     * 
     * @returns
     * @memberof ERC20
     */
    bridgeAssetAndGasWithPlotRoute(cargo: ICargo, option?: ITransactionOption) {
        return this.getPlotRoute(cargo, option).then(data => {
            return this.gasPorter.bridgeAssetAndGas(
                data.bridgeAssetAndGas.requestConversion,
                data.bridgeAssetAndGas.forceUpdateGlobalExitRoot,
                data.bridgeAssetAndGas.destinationNetwork,
                data.bridgeAssetAndGas.destinationAddress,
                data.bridgeAssetAndGas.gasset,
                data.bridgeAssetAndGas.gassetSource,
                data.bridgeAssetAndGas.gassetPermitData,
                data.bridgeAssetAndGas.gassetAmount,
                data.bridgeAssetAndGas.swapCalldata,
                data.bridgeAssetAndGas.token,
                data.bridgeAssetAndGas.tokenAmount,
                data.bridgeAssetAndGas.tokenPermitData,
                {
                    value: data.msgValue
                }
            );
        });
    }

    convertGasset(
        data: IConversionAuthorization,
        signature: string,
        option?: ITransactionOption
    ) {
        return this.gasPorter.convertGasset(data, signature, option);
    }
}
