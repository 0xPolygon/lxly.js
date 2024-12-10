export default [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "lxlyBridge_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "dex_",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "settlementToken_",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "WETHToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "bridgeAssetAndGas",
        "inputs": [
            {
                "name": "requestConversion",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "forceUpdateGlobalExitRoot",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "destinationNetwork",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "destinationAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "trackingNumber",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "gasset",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "gassetSource",
                "type": "uint8",
                "internalType": "enum GasPorter.GassetSource"
            },
            {
                "name": "gassetPermitData",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "gassetAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "swapCalldata",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "token",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "tokenAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "tokenPermitData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "conversionNonce",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "originNetworkID",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "convertGasset",
        "inputs": [
            {
                "name": "authorization",
                "type": "tuple",
                "internalType": "struct GasPorter.ConversionAuthorization",
                "components": [
                    {
                        "name": "data",
                        "type": "tuple",
                        "internalType": "struct GasPorter.ConversionAuthorizationData",
                        "components": [
                            {
                                "name": "originNetworkID",
                                "type": "uint32",
                                "internalType": "uint32"
                            },
                            {
                                "name": "trackingNumber",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "signer",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "conversionNonce",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "gassetDestinationAddress",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "gassetDestinationPermitData",
                                "type": "bytes",
                                "internalType": "bytes"
                            },
                            {
                                "name": "gassetDestinationAmount",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "destinationNativeTokenMinimumAmountFromDex",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "destinationNativeTokenMinimumAmountFromMsg",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "deadline",
                                "type": "uint256",
                                "internalType": "uint256"
                            }
                        ]
                    },
                    {
                        "name": "signature",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            },
            {
                "name": "swapCalldata",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "convertGasset_",
        "inputs": [
            {
                "name": "authorizationData",
                "type": "tuple",
                "internalType": "struct GasPorter.ConversionAuthorizationData",
                "components": [
                    {
                        "name": "originNetworkID",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "trackingNumber",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "signer",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "conversionNonce",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gassetDestinationAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "gassetDestinationPermitData",
                        "type": "bytes",
                        "internalType": "bytes"
                    },
                    {
                        "name": "gassetDestinationAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "destinationNativeTokenMinimumAmountFromDex",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "destinationNativeTokenMinimumAmountFromMsg",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            },
            {
                "name": "signer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "swapCalldata",
                "type": "bytes",
                "internalType": "bytes"
            },
            {
                "name": "useDex",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "determineConversion",
        "inputs": [
            {
                "name": "destinationNetworkGasTokenNetwork",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "destinationNetworkGasTokenAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "gasset",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "conversionRequired",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "determineGasset",
        "inputs": [
            {
                "name": "destinationNetworkGasTokenNetwork",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "destinationNetworkGasTokenAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "gassetType",
                "type": "uint8",
                "internalType": "enum GasPorter.GassetType"
            }
        ],
        "outputs": [
            {
                "name": "gasset",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "dex",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "eip712Domain",
        "inputs": [],
        "outputs": [
            {
                "name": "fields",
                "type": "bytes1",
                "internalType": "bytes1"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "version",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "chainId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "extensions",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "gasTokenAddress",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "gasTokenNetwork",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "invalidateConversionNonce",
        "inputs": [
            {
                "name": "originNetworkID",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "lxlyBridge",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ILxlyBridge"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "networkID",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "plotRoute",
        "inputs": [
            {
                "name": "cargo",
                "type": "tuple",
                "internalType": "struct GasPorter.Cargo",
                "components": [
                    {
                        "name": "msgValue",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "destinationNetwork",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "destinationNetworkGasTokenNetwork",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "destinationNetworkGasTokenAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "destinationAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "destinationGasPorterDex",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "gassetType",
                        "type": "uint8",
                        "internalType": "enum GasPorter.GassetType"
                    },
                    {
                        "name": "gassetSource",
                        "type": "uint8",
                        "internalType": "enum GasPorter.GassetSource"
                    },
                    {
                        "name": "gassetAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "tokenAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "gassetPermitData",
                        "type": "bytes",
                        "internalType": "bytes"
                    },
                    {
                        "name": "swapCalldata",
                        "type": "bytes",
                        "internalType": "bytes"
                    },
                    {
                        "name": "tokenPermitData",
                        "type": "bytes",
                        "internalType": "bytes"
                    },
                    {
                        "name": "forceUpdateGlobalExitRoot",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "trackingNumber",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "msgValue",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "callData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "settlementToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "settlementTokenIsNativeToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "version",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "event",
        "name": "ConversionFailed",
        "inputs": [
            {
                "name": "originNetworkID",
                "type": "uint32",
                "indexed": true,
                "internalType": "uint32"
            },
            {
                "name": "trackingNumber",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "signer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "msgSender",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "reason",
                "type": "bytes",
                "indexed": false,
                "internalType": "bytes"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ConversionRequested",
        "inputs": [
            {
                "name": "trackingNumber",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "destinationNetwork",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            },
            {
                "name": "destinationAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "gasset",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "bridgedGassetAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EIP712DomainChanged",
        "inputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GassetConverted",
        "inputs": [
            {
                "name": "originNetworkID",
                "type": "uint32",
                "indexed": true,
                "internalType": "uint32"
            },
            {
                "name": "trackingNumber",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "signer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AuthorizationExpired",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotDeliverNativeTokenToRecipient",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotDetermineConversionBecauseWrappedTokenDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotDetermineGassetBecauseWrappedTokenDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotDetermineGassetMakeSureDestinationNetworkParametersAreCorrect",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotReturnExcessiveMessageValueToYou",
        "inputs": []
    },
    {
        "type": "error",
        "name": "CannotReturnNativeTokenToCaller",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ConversionFailedBecauseRecipientWouldNotReceiveMinimumAmountOfNativeToken",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "DestinationAddressCannotBeAddressZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DestinationNetworkCannotBeCurrentNetwork",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignature",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureLength",
        "inputs": [
            {
                "name": "length",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureS",
        "inputs": [
            {
                "name": "s",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "GasPorterOnCurrentNetworkDoesNotSupportDexSwapAsGassetSourceYet",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GasPorterOnCurrentNetworkDoesNotSupportGassetConversionYet",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GasPorterOnDestinationNetworkDoesNotSupportGassetConversionViaDexYet",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetAmountCannotBeZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetCannotBeDolphinAddressDidYouMeanAddressZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetConversionViaMessageIsDisabledInAuthorization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetPermitDataMustBeEmptyWhenGassetIsNativeToken",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetTypeCannotBeERC20TokenWhenNativeTokensAreTheSame",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GassetTypeCannotBeNativeTokenWhenNativeTokensAreDifferent",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientAmountInERC20Permit",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "minimumAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "InsufficientMessageValue",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "minimumAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "InvalidConversionNonce",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidGassetTypeAndGassetSourceCombination",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidInitialization",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidToken",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotInitializing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OriginNetworkCannotBeCurrentNetwork",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SignerInAuthorizationDataAndActualSignerDoNotMatch",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SwapCalldataCannotBeEmptyWhenGassetSourceIsDexSwap",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SwapCalldataCannotBeProvidedWhenMessageValueIsProvided",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SwapCalldataMustBeEmptyWhenGassetSourceIsNotDexSwap",
        "inputs": []
    },
    {
        "type": "error",
        "name": "SwapFailedBecauseDexGaveInsufficientAmount",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "SwapFailedBecauseDexRevertedWithoutExplanation",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ThisFunctionCanOnlyBeCalledByGasPorter",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenAmountCannotBeZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenPermitDataMustBeEmptyWhenAssetAndGassetAreTheSameAndGassetPermitDataIsProvided",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TokenPermitDataMustBeEmptyWhenAssetIsNativeToken",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UnknownFunctionSelectorInERC20Permit",
        "inputs": []
    }
]
