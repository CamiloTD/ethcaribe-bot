import { AUTH_USER } from "../../utils/enums";
import { Message } from "node-telegram-bot-api";

const Users: { [key: string]: User } = {};

export class User {

    currentSession: { name: string, data: any } | null = null;

    constructor (
        public name: string,
        public id: string,

        public auth: number = AUTH_USER,

        public address?: string,        
        public ens?: string,

        public points: number = 0,
        public exp: number = 0
    ){}
    
    createSession(name: string, data = {}) {
        if(!Sessions[name]) throw "SESSION_" + name.toUpperCase() + "_NOT_FOUND";
        if(this.currentSession) throw "USER_ALREADY_IN_SESSION";

        this.currentSession = { name, data };
        
        return Sessions[name].$create && Sessions[name].$create(this);
    }

    exitSession () {
        this.currentSession = null;
    }
}

export function createUser (msg: Message) {
    return Users[msg.from.id] = new User(`${msg.from.first_name} ${msg.from.last_name}`, msg.from.id.toString());
}

export function getUserById (id: string) {
    return Users[id];
}

export function getMessageUser(msg: Message) {
    return getUserById(msg.from.id.toString());
}

import * as Sessions from '../../commands/sessions';