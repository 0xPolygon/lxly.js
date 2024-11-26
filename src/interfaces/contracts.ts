import { Bridge, BridgeUtil, GasPorter, Wrapper } from "../lxly";

export interface IContracts {
    bridge: Bridge;
    bridgeUtil: BridgeUtil;
    wrapper: Wrapper;
    gasPorter: GasPorter;
}
