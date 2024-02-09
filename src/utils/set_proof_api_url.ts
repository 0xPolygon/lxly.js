import { service, NetworkService } from "../services";

export const setProofApi = (url: string) => {
    const urlLength = url.length;
    if (url[urlLength - 1] !== '/') {
        url += '/';
    }
    service.network = new NetworkService(url);
};
