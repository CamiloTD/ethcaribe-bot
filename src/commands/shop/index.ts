import { html } from "../../utils/messages";
import { ExpContract } from "../../modules/web3";
import { User } from "../../models/db";

export async function shop (user: User) {
    console.log("ETH BALANCE:", await ExpContract.methods.balanceOf(user.address).call({

    }));
}