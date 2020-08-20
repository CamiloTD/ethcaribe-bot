import { getTopicByName, getTopicList } from "../modules/topics";
import { reply, html } from "../utils/messages";
import { bold } from "../styles";
import { User } from "../models/db";
import fs from "fs";
import { parseHtmlToPNG, identicon } from "../utils/images";

export function $notFound (user: User, command: string) {
    return `Oye, El comando ${command} no existe 😓`;
}

export async function info (user: User, topic: string) {

    //TODO: Improve filter
    if(!topic) {
        const topicList = await getTopicList();

        return `
            🏢 Aquí tienes una lista de temas que pueden interesarte:

            ${topicList.map(topic => 
                `-  /info ${topic}\n`    
            )}
        `;
    }

    const topicData = await getTopicByName(topic);

    if(!topicData) return `Lo siento, no se nada al respecto 😓... Pero seguro que mis amigos si! Pregunta al respecto en el chat de Ethereum Caribe 🎉`;

    return `
        Información sobre ${bold(topic)}:

        ${topicData}
    `;
}

export async function profile (user: User) {
    return await html('profile', {
        name: user.name,
        address: user.address,
        pic: await identicon(user.address || user.id),
        points: user.points,
        exp: user.exp
    });
}

//? When the user starts the private conversation
export async function start (user: User) {
    await reply(user.id, `
        Hola! 🎉 Soy Ethereum Caribe 🏖

        Tengo a mi disposición las herramientas para guiarte en el aprendizaje sobre el mundo crypto.
    `);
    
    if(!user.address) return await user.createSession("registerWallet");
}