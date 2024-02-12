import { isHexString } from 'ethereumjs-util';
import { ITransactionOption } from "../interfaces";
import { AbiItem } from "../types";
import { BaseToken, Web3SideChainClient } from "../utils";
import { IBaseClientConfig } from "../interfaces";

export class Contract extends BaseToken<IBaseClientConfig> {

    constructor(
        abi: AbiItem[],
        tokenAddress: string,
        networkId: number,
        client: Web3SideChainClient<IBaseClientConfig>,
    ) {
        super({
            networkId,
            address: tokenAddress,
            abi,
            name: '',
        }, client);
    }

    /**
     * Read from contract
     *
     * @param {string} method - Method to call
     * @param {any[]} args - method arguments
     * @returns
     * @memberof Contract
     */
    read(method: string, ...args: any[]) {
        return this.getContract().then(contract => {
            const methodInstance = contract.method(
                method,
                ...args
            );
            return this.processRead<any>(methodInstance);
        });
    }

    /**
     * write to contract
     *
     * @param {ITransactionOption} option - options
     * @param {string} method - Method to call
     * @param {any[]} args - method arguments
     * @returns
     * @memberof Contract
     */
    write(option: ITransactionOption, method: string, ...args: any[]) {
        return this.getContract().then(contract => {
            const methodInstance = contract.method(
                method,
                ...args
            );
            return this.processWrite(methodInstance, option);
        });
    }

    /**
     * encode abi call
     * @param {string} method - Method to call
     * @param {any[]} args - method arguments
     * @returns
     * @memberof Contract
     */
    encodeAbi(method: string, ...args: any[]) {
        return this.getContract().then(contract => {
            const methodInstance = contract.method(
                method,
                ...args
            );
            return methodInstance.encodeABI();
        });
    }

    /**
     * get {r, s, v} from signature
     * @param {string} signature
     * 
     * @returns
     * @memberof ERC20
     */
    getSignatureParameters(signature: string) {
        const client = this.client.providers[this.contractParam.networkId].provider;
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
}
