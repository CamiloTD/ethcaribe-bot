import TelegramBot from 'node-telegram-bot-api';
import { log, highlight, cold, danger } from "termx";
import { BOT_TOKEN } from "./env";

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', async function (msg) {
    const match = /^\/(.+?)(?: (.+))?$/.exec((msg.text || "").trim());
    
    const user = await getMessageUser(msg) || await createUser(msg);
    const module = user && user.currentSession && Sessions[user.currentSession.name] || Commands;
    
    let response: any;

    try {
        const thisArg = { msg };

        if(match) { // On Command Received
            let [, cmd, params] = match;
            let args = (params || "").split(" ");

            cmd = cmd.toLowerCase();
            if(!args[0]) args = [];
        
            log(`${highlight("COMMAND")} - <${msg.from.id}> ${cold(msg.from.first_name + " " + msg.from.last_name + ":")} /${cmd} ${params}`);
        
            if(!module[cmd]) response = module.$notFound && await module.$notFound.bind(thisArg)(msg, cmd); //? 404 Command not found
            else response = await module[cmd].bind(thisArg)(user, ...args); //? Execute command
        } else {
            response = module.default && await module.default.bind(thisArg)(msg, user); //? On message received
        }   
    } catch (exc) {
        log(danger(exc), exc);
        response = "😓 Ha ocurrido un pequeño error, por favor intentalo de nuevo mas tarde. (" + (exc.message || exc) + ").";
    }
    
    await user.save();
    await reply(user.id, response);
})


import * as Sessions from './src/commands/sessions';
import * as Commands from './src/commands';
import { getMessageUser, createUser } from './src/modules/user';
import { reply } from "./src/utils/messages";
import './src/modules/aragon';
import { initDatabase } from "./src/models/db/index";


initDatabase().then(db => {
    log(highlight("✨ Connected to Database!"))
}).catch(err => log(danger(err.toString())));