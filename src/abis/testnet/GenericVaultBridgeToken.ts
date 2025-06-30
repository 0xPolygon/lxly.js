export default [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "neededRole",
                type: "bytes32"
            }
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "availableAssets",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "requestedAssets",
                type: "uint256"
            }
        ],
        name: "AssetsTooLarge",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "requiredAssets",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "receivedAssets",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "assetsInMigrationFund",
                type: "uint256"
            }
        ],
        name: "CannotCompleteMigration",
        type: "error"
    },
    {
        inputs: [],
        name: "CannotRebalanceReserve",
        type: "error"
    },
    {
        inputs: [],
        name: "ContractNotSupportedOnThisNetwork",
        type: "error"
    },
    {
        inputs: [],
        name: "ECDSAInvalidSignature",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "length",
                type: "uint256"
            }
        ],
        name: "ECDSAInvalidSignatureLength",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "ECDSAInvalidSignatureS",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "allowance",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256"
            }
        ],
        name: "ERC20InsufficientAllowance",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256"
            }
        ],
        name: "ERC20InsufficientBalance",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address"
            }
        ],
        name: "ERC20InvalidApprover",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "ERC20InvalidReceiver",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "ERC20InvalidSender",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            }
        ],
        name: "ERC20InvalidSpender",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            }
        ],
        name: "ERC2612ExpiredSignature",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "signer",
                type: "address"
            },
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "ERC2612InvalidSigner",
        type: "error"
    },
    {
        inputs: [],
        name: "EnforcedPause",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "burnedShares",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "withdrawnAssets",
                type: "uint256"
            }
        ],
        name: "ExcessiveYieldVaultSharesBurned",
        type: "error"
    },
    {
        inputs: [],
        name: "ExpectedPause",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "mintedShares",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "requiredShares",
                type: "uint256"
            }
        ],
        name: "IncorrectAmountOfSharesMinted",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "redeemedShares",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "requiredShares",
                type: "uint256"
            }
        ],
        name: "IncorrectAmountOfSharesRedeemed",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "msgValue",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "requestedAssets",
                type: "uint256"
            }
        ],
        name: "IncorrectMsgValue",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "receivedAssets",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "requestedAssets",
                type: "uint256"
            }
        ],
        name: "InsufficientUnderlyingTokenReceived",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "depositedAssets",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "mintedShares",
                type: "uint256"
            }
        ],
        name: "InsufficientYieldVaultSharesMinted",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "currentNonce",
                type: "uint256"
            }
        ],
        name: "InvalidAccountNonce",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "minimumAmount",
                type: "uint256"
            }
        ],
        name: "InvalidAmountInERC20Permit",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidAssets",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidDestinationNetworkId",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidInitializer",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidLxLyBridge",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidMigrationManager",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidMinimumReservePercentage",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidName",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidOriginNetwork",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidOwner",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "expectedOwner",
                type: "address"
            }
        ],
        name: "InvalidOwnerInERC20Permit",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidPermitData",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidReceiver",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "selector",
                type: "bytes4"
            }
        ],
        name: "InvalidSelectorInERC20Permit",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidShares",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "address",
                name: "expectedSpender",
                type: "address"
            }
        ],
        name: "InvalidSpenderInERC20Permit",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidSymbol",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidUnderlyingToken",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidVaultBridgeTokenPart2",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidYieldRecipient",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidYieldVault",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidYieldVaultMaximumSlippagePercentage",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assetsToDeposit",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "minimumYieldVaultDeposit",
                type: "uint256"
            }
        ],
        name: "MinimumYieldVaultDepositNotMet",
        type: "error"
    },
    {
        inputs: [],
        name: "NoNeedToRebalanceReserve",
        type: "error"
    },
    {
        inputs: [],
        name: "NoYield",
        type: "error"
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error"
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            }
        ],
        name: "SafeERC20FailedOperation",
        type: "error"
    },
    {
        inputs: [],
        name: "Unauthorized",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "UnknownError",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "functionSelector",
                type: "bytes4"
            }
        ],
        name: "UnknownFunction",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assetsToDeposit",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "depositLimit",
                type: "uint256"
            }
        ],
        name: "YieldVaultDepositFailed",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "sharesToRedeem",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "redemptionLimit",
                type: "uint256"
            }
        ],
        name: "YieldVaultRedemptionFailed",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assetsToWithdraw",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "withdrawalLimit",
                type: "uint256"
            }
        ],
        name: "YieldVaultWithdrawalFailed",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "vbTokenAmount",
                type: "uint256"
            }
        ],
        name: "Burned",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "who",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "DonatedAsYield",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "who",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "DonatedForCompletingMigration",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [],
        name: "EIP712DomainChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64"
            }
        ],
        name: "Initialized",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint32",
                name: "originNetwork",
                type: "uint32"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "migrationFeesFundUtilization",
                type: "uint256"
            }
        ],
        name: "MigrationCompleted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "minimumReservePercentage",
                type: "uint256"
            }
        ],
        name: "MinimumReservePercentageSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Paused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "oldReservedAssets",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newReservedAssets",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "reservePercentage",
                type: "uint256"
            }
        ],
        name: "ReserveRebalanced",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32"
            }
        ],
        name: "RoleAdminChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleGranted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleRevoked",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "Transfer",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "transferFeeCalculator",
                type: "address"
            }
        ],
        name: "TransferFeeCalculatorSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Unpaused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        name: "Withdraw",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "yieldRecipient",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "vbTokenAmount",
                type: "uint256"
            }
        ],
        name: "YieldCollected",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "yieldRecipient",
                type: "address"
            }
        ],
        name: "YieldRecipientSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "redeemedShares",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "receivedAssets",
                type: "uint256"
            }
        ],
        name: "YieldVaultDrained",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "slippagePercentage",
                type: "uint256"
            }
        ],
        name: "YieldVaultMaximumSlippagePercentageSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "yieldVault",
                type: "address"
            }
        ],
        name: "YieldVaultSet",
        type: "event"
    },
    {
        stateMutability: "payable",
        type: "fallback"
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "PAUSER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "REBALANCER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "YIELD_COLLECTOR_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "spender",
                type: "address"
            }
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "asset",
        outputs: [
            {
                internalType: "address",
                name: "assetTokenAddress",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "backingDifference",
        outputs: [
            {
                internalType: "bool",
                name: "positive",
                type: "bool"
            },
            {
                internalType: "uint256",
                name: "difference",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32[32]",
                name: "smtProofLocalExitRoot",
                type: "bytes32[32]"
            },
            {
                internalType: "bytes32[32]",
                name: "smtProofRollupExitRoot",
                type: "bytes32[32]"
            },
            {
                internalType: "uint256",
                name: "globalIndex",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "mainnetExitRoot",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "rollupExitRoot",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "destinationAddress",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "bytes",
                name: "metadata",
                type: "bytes"
            }
        ],
        name: "claimAndRedeem",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        name: "convertToAssets",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "convertToShares",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "deposit",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "destinationNetworkId",
                type: "uint32"
            },
            {
                internalType: "bool",
                name: "forceUpdateGlobalExitRoot",
                type: "bool"
            }
        ],
        name: "depositAndBridge",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "depositGasToken",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "destinationAddress",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "destinationNetworkId",
                type: "uint32"
            },
            {
                internalType: "bool",
                name: "forceUpdateGlobalExitRoot",
                type: "bool"
            }
        ],
        name: "depositGasTokenAndBridge",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "bytes",
                name: "permitData",
                type: "bytes"
            }
        ],
        name: "depositWithPermit",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "destinationNetworkId",
                type: "uint32"
            },
            {
                internalType: "bool",
                name: "forceUpdateGlobalExitRoot",
                type: "bool"
            },
            {
                internalType: "bytes",
                name: "permitData",
                type: "bytes"
            }
        ],
        name: "depositWithPermitAndBridge",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "eip712Domain",
        outputs: [
            {
                internalType: "bytes1",
                name: "fields",
                type: "bytes1"
            },
            {
                internalType: "string",
                name: "name",
                type: "string"
            },
            {
                internalType: "string",
                name: "version",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "chainId",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "verifyingContract",
                type: "address"
            },
            {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32"
            },
            {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "initializer_",
                type: "address"
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address"
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string"
                    },
                    {
                        internalType: "string",
                        name: "symbol",
                        type: "string"
                    },
                    {
                        internalType: "address",
                        name: "underlyingToken",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "minimumReservePercentage",
                        type: "uint256"
                    },
                    {
                        internalType: "address",
                        name: "yieldVault",
                        type: "address"
                    },
                    {
                        internalType: "address",
                        name: "yieldRecipient",
                        type: "address"
                    },
                    {
                        internalType: "address",
                        name: "lxlyBridge",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "minimumYieldVaultDeposit",
                        type: "uint256"
                    },
                    {
                        internalType: "address",
                        name: "migrationManager",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "yieldVaultMaximumSlippagePercentage",
                        type: "uint256"
                    },
                    {
                        internalType: "address",
                        name: "vaultBridgeTokenPart2",
                        type: "address"
                    }
                ],
                internalType: "struct VaultBridgeToken.InitializationParameters",
                name: "initParams",
                type: "tuple"
            }
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "lxlyBridge",
        outputs: [
            {
                internalType: "contract ILxLyBridge",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lxlyId",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "maxDeposit",
        outputs: [
            {
                internalType: "uint256",
                name: "maxAssets",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "maxMint",
        outputs: [
            {
                internalType: "uint256",
                name: "maxShares",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "maxRedeem",
        outputs: [
            {
                internalType: "uint256",
                name: "maxShares",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "maxWithdraw",
        outputs: [
            {
                internalType: "uint256",
                name: "maxAssets",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "migrationFeesFund",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "migrationManager",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "minimumReservePercentage",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "minimumYieldVaultDeposit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "mint",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "mintWithGasToken",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "nonces",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "performReversibleYieldVaultDeposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "previewDeposit",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        name: "previewMint",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        name: "previewRedeem",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        name: "previewWithdraw",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "redeem",
        outputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "callerConfirmation",
                type: "address"
            }
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "reservePercentage",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "reservedAssets",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "stakedAssets",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalAssets",
        outputs: [
            {
                internalType: "uint256",
                name: "totalManagedAssets",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "underlyingToken",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "version",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "withdraw",
        outputs: [
            {
                internalType: "uint256",
                name: "shares",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "yield",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "yieldRecipient",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "yieldVault",
        outputs: [
            {
                internalType: "contract IERC4626",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "yieldVaultMaximumSlippagePercentage",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
]