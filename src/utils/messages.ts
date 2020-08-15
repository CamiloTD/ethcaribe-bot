import { stylize } from "../styles";

export async function reply (chatId: string, response: any) {
    if(typeof response === "string" || !response) response = { text: response };

    const textToSend = response.text;
    const keyboard = response.keyboard || [];

    if(textToSend) await bot.sendMessage(chatId, stylize(textToSend), {
        parse_mode: "HTML",
        reply_markup: { keyboard }
    });
}

import { bot } from "../../index";
import { Message } from "node-telegram-bot-api";
