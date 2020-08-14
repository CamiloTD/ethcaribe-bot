import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";
import { log, highlight, cold } from "termx";

dotenv.config();

const { BOT_TOKEN } = process.env;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/^\/(.+?)(?: (.+))?$/, async function (msg, match) {
    const [, cmd, params] = match;
    const args = (params || "").split(" ");

    log(`${highlight("COMMAND")} - <${msg.from.id}> ${cold(msg.from.first_name + " " + msg.from.last_name + ":")} /${cmd} ${params}`);

    if(!Commands[cmd]) var response = await Commands.$notFound(msg, cmd);
    else var response = await Commands[cmd](msg, ...args);

    if(typeof response === "string") bot.sendMessage(msg.chat.id, response as unknown as string);
});



import * as Commands from './src/commands';