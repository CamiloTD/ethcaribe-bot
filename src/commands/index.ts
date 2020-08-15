import { keyboardResponse, KEYBOARD_YES_NO } from "../utils/keyboard";
import { isValidAddress, toId } from "../utils/string";
import { createUser, getMessageUser, User } from "../controller/user";
import { Message } from "node-telegram-bot-api";
import { bold } from "../styles";
import { reply } from "../utils/messages";


export function $notFound (user: User, command: string) {
    return `Oye, El comando ${command} no existe 😓`;
}

// export async function wallet (user: User, address: string) {
//     if(!address) return "No has ingresado ninguna dirección, para registrarte usa /wallet tu-dirección-eth";
//     if(!isValidAddress(address)) return "Oye, esto (" + address + ") no es una dirección válida, para registrarte usa /wallet tu-dirección-eth";
//     if(!user) return "Hey " + user.name + "! No te has registrado en nuestra plataforma, para registrarte usa /start";

//     return `
//         🌟 Listo! Has sido registrado con la dirección: ${bold(address)} 🌟
//         ❓ Si no sabes que es ENS, para qué sirve o como funciona, usa <b>/sobre ens</b>

//         Vamos a configurar tu propio dominio .caribe.eth!
//         Usa <b>/dominio ${toId(user.name)}.caribe.eth</b> o inventate el tuyo para registrarlo!
//         Por ser la primera vez, la casa correrá con los gastos. 😁
//     `;
// }


//? When the user starts the private conversation
export async function start (user: User) {
    await reply(user.id, `
        Hola! 🎉 Soy Ethereum Caribe 🏖

        Tengo a mi disposición las herramientas para guiarte en el aprendizaje sobre el mundo crypto.
    `);

    if(!user.address) return await user.createSession("registerWallet");
}

export async function salir (user: User) {
    console.log(user.id)
    await reply(user.id,`
        muerete viejo
    `);
}
