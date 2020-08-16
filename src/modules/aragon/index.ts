import AragonWrapper, { providers } from '@aragon/wrapper'
import { ETH_ADDRESS, ETH_ENS_ADDRESS, ARAGON_DAO_ADDRESS } from '../../../env';
import { web3 } from '../web3';

let alreadyInitialized = false;
const aragon = new AragonWrapper(ARAGON_DAO_ADDRESS, { 
    provider: web3,
    apm: { ensRegistryAddress: ETH_ENS_ADDRESS }
});

export async function initAragon () {
    if(alreadyInitialized) return;

    await aragon.init({
        accounts: {
            providedAccounts: [ETH_ADDRESS]
        }
    })

    console.log("Aragon initialized!")
}

process.nextTick(initAragon);