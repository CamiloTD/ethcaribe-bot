import { Message } from "node-telegram-bot-api";
import { User } from '../../modules/user';
import { ADDRESS_REGEX } from "../../utils/regex";
import { keyboardResponse, KEYBOARD_YES_NO } from "../../utils/keyboard";

export function $create () {
    return keyboardResponse("Ya tienes una billetera Ethereum?", KEYBOARD_YES_NO);
}

export default function ({ text }: Message, user: User) {
    const session = user.currentSession.data;

    //? Si la respuesta es si, no, o una address
    if(/(?:Si+)|(Ye+s+)/i.test(text) || ADDRESS_REGEX.exec(text)) {
        //TODO: Recibe la wallet
        const address = ADDRESS_REGEX.exec(text);

        if(!address) return "Puedes enviarme tu dirección pública?";
        
        user.address = address[0];
        user.exitSession();

        return keyboardResponse(`✨ Listo calixto! Hemos registrado tu wallet! Ahora eres ya oficialmente parte de CaribeEth! ✨`, [
            ["Qué sigue?"],
            ["Muchas gracias! Hasta luego!"]
        ]);
    }


    session.alreadyDenied = true;

    if(/(?:No+)/i.test(text)) {
        return `Aquí tienes una guía que te ayudara en ello: {{Inserte Url Guia Aqui}}`;
    }
    else return keyboardResponse("No entiendo, responde si o no. ¿Tienes ya una billetera Ethereum?. Si quieres continuar luego, solo di /salir y dejaré de preguntarte.", KEYBOARD_YES_NO);

}

export function salir (user: User) {
    user.exitSession();

    return "Adios! Cuando quieras continuar, puedes usar /start";
}