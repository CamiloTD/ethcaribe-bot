import { stylize } from "../styles";
import util from "util";
import fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);

export async function reply (chatId: string, response: any) {
    if(typeof response === "string" || !response) response = { text: response };

    const textToSend = response.text;
    const keyboard = response.keyboard || [];

    if(textToSend) await bot.sendMessage(chatId, stylize(textToSend), {
        parse_mode: "HTML",
        reply_markup: { keyboard }
    });

    if(response.photo) await bot.sendPhoto(chatId, response.photo);
}


export async function html (name: string, data: any = {}, size?: [number, number]) {
    return {
        photo: await parseHtmlToPNG(
            await readFile(path.resolve(__dirname, "../html/" + name + ".html"), "utf-8"),
            data,
            size
        )
    }
}

import { bot } from "../../index";
import { Message } from "node-telegram-bot-api";
import { parseHtmlToPNG } from "./images";

