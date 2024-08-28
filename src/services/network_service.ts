import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrl(url: string) {
        return `${url}`;
    }

    async getMerkleProof(networkID: number, depositCount: number) {
        const url = this.createUrl(`merkle-proof?networkId=${networkID}&depositCount=${depositCount}`);
        const result = await this.httpRequest.get<any>(url);
        return result.proof;
    }

    async getBridgeTransactionDetails(networkID: number, depositCount: number) {
        const url = this.createUrl(`bridge?net_id=${networkID}&deposit_cnt=${depositCount}`);
        const result = await this.httpRequest.get<any>(url);
        return result.deposit;
    }

    async getUserBridgeTransactions(userAddress: string, pageIndex: number = 0) {
        const url = this.createUrl(`transactions?userAddress=${userAddress}&page=${pageIndex}`);
        const result = await this.httpRequest.get<any>(url);
        return result.result;
    }
}
