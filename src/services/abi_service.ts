import testnetAbis from "../abis/testnet";
// import mainnetAbis from "../abis/mainnet";


export class ABIService {
    network: string;

    constructor(network: string) {
        this.network = network;
    }

    getABI(contractName: string) {
        return testnetAbis[contractName];
    }
}
