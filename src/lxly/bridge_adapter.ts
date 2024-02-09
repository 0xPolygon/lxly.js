import { ITransactionOption, IBaseClientConfig } from '../interfaces';
import { BaseToken, Converter, Web3SideChainClient } from '../utils';
import { TYPE_AMOUNT } from '../types';

/**
 * BridgeAdapter used Bridge to implement additional custom features
 * like bridging custom ERC20
 */
export class BridgeAdapter extends BaseToken<IBaseClientConfig> {

  constructor(client_: Web3SideChainClient<IBaseClientConfig>, address: string, networkId: number) {
    super(
      {
        address: address,
        name: 'ZkEVMBridgeAdapter',
        networkId: networkId,
      },
      client_,
    );
  }

  method(methodName: string, ...args) {
    return this.getContract().then(contract => {
      return contract.method(methodName, ...args);
    });
  }

  /**
   * uses the bridge function present in the adapter contract
   * @param recipient
   * @param amount
   * @param destinationNetworkId
   * @param forceUpdateGlobalExitRoot
   * @param option
   *
   * @returns
   * @memberof ZkEvmCustomBridge
   */
  bridgeToken(
    recipient: string,
    amount: TYPE_AMOUNT,
    destinationNetworkId: number,
    forceUpdateGlobalExitRoot?: boolean,
    option?: ITransactionOption,
  ) {
    return this.method('bridgeToken', recipient, Converter.toHex(amount), forceUpdateGlobalExitRoot).then(
      method => {
        return this.processWrite(method, option);
      },
    );
  }
}
