import { NetworkService } from "./network_service";

export * from "./network_service";
export * from "./abi_service";

class Service {
    network: NetworkService;
}

export const service = new Service();




