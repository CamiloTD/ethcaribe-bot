import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";

dotenv.config();

const { BOT_TOKEN } = process.env;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/(.+?) (.+)/, async function (msg, match) {
    const [, cmd, params] = match;
    const args = params.split(" ");

    if(!Commands[cmd]) var response = await Commands.$notFound(msg, ...args);
    else var response = await Commands[cmd](msg, ...args);

    if(typeof response === "string") bot.sendMessage(msg.chat.id, response as unknown as string);
});

import * as Commands from './src/commands';