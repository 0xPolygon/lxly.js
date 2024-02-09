import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrl(url: string) {
        return `${url}`;
    }

    getMerkleProof(networkID: number, depositCount: number) {
        const url = this.createUrl(`merkle-proof?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getBridgeTransactionDetails(networkID: number, depositCount: number) {
        const url = this.createUrl(`bridge?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.deposit;
        });
    }
}
