import Web3 from "web3";
import HDWallet from "@truffle/hdwallet-provider";
import { ETH_PROVIDER, ETH_PRIVATE_KEY, TOKEN_ECP_ADDRESS, TOKEN_EXP_ADDRESS, ETH_ADDRESS, DEFAULT_GAS_PRICE } from "../../../env";

export const contractConfig = { from: ETH_ADDRESS, gasPrice: DEFAULT_GAS_PRICE };
export const web3           = new Web3(new HDWallet(ETH_PRIVATE_KEY, ETH_PROVIDER) as any);

/*
 
   _____     _               ____            _                  _       
  |_   _|__ | | _____ _ __  / ___|___  _ __ | |_ _ __ __ _  ___| |_ ___ 
    | |/ _ \| |/ / _ \ '_ \| |   / _ \| '_ \| __| '__/ _` |/ __| __/ __|
    | | (_) |   <  __/ | | | |__| (_) | | | | |_| | | (_| | (__| |_\__ \
    |_|\___/|_|\_\___|_| |_|\____\___/|_| |_|\__|_|  \__,_|\___|\__|___/
                                                                        
 
*/

export const ExpContract   : any = new web3.eth.Contract(require("./abi/exp.json"), TOKEN_EXP_ADDRESS, contractConfig);
export const PointsContract: any = new web3.eth.Contract(require("./abi/ecp.json"), TOKEN_ECP_ADDRESS, contractConfig);

// (web3.currentProvider as any).sendAsync = (web3.currentProvider as any).__proto__.send.bind(web3);

export function getUserToken(contract: any, address: string) {
    return contract.methods.balanceOf(address).call({});
}
export async function updateUserPoints (contract: any, address: string, total: number) {
    const current = await contract.methods.balanceOf(address).call({});
    const diff = total - current;

    if(diff === 0) return 0;
    if(diff > 0) { //? Mint
        await contract.methods.mint(address, diff).send({});

    } else { //? Burn
        await contract.methods.burnFrom(address, Math.abs(diff)).send({});
    }

    return diff;
}
