import { AUTH_USER } from "../utils/enums";
import { prop, getModelForClass, DocumentType, index } from "@typegoose/typegoose";

@index({ id: 1 }, { unique: true })
export class User {
    @prop() name: string;
    @prop() id: string;

    @prop() auth: number = AUTH_USER;

    @prop() address?: string;
    @prop() ens?: string;

    @prop({ default: 0 }) points: number = 0;
    @prop({ default: 0 }) exp: number = 0;
    @prop() currentSession: { name: string, data: any } | null = null;


    createSession(this: DocumentType<User>, name: string, data = {}) {
        if(!Sessions[name]) throw "SESSION_" + name.toUpperCase() + "_NOT_FOUND";
        if(this.currentSession) throw "USER_ALREADY_IN_SESSION";

        this.currentSession = { name, data };
        
        return Sessions[name].$create && Sessions[name].$create(this);
    }

    exitSession (this: DocumentType<User>) {
        this.currentSession = null;
    }

    // async save (this: DocumentType<User>) { await UserModel.updateOne({ id: this.id }, this); }
}

export const UserModel = getModelForClass(User);
import * as Sessions from '../commands/sessions';
