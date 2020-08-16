import Web3 from "web3";
import HDWallet from "@truffle/hdwallet-provider";
import { ETH_PROVIDER, ETH_PRIVATE_KEY } from "../../../env";

export const web3 = new Web3(new HDWallet(ETH_PRIVATE_KEY, ETH_PROVIDER) as any);

(web3.currentProvider as any).sendAsync = (web3.currentProvider as any).__proto__.send.bind(web3);