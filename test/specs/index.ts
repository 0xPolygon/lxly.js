import { use } from "@maticnetwork/lxlyjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";

use(Web3ClientPlugin);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

import './lxly';
