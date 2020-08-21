import { AUTH_USER, USER_BASE_POINTS } from "../utils/enums";
import { prop, getModelForClass, DocumentType, index } from "@typegoose/typegoose";

@index({ id: 1 }, { unique: true })
export class User {
    @prop() name: string;
    @prop() id: string;

    @prop({ default: AUTH_USER }) auth: number;

    @prop({ unique: true }) address?: string;
    @prop() ens?: string;

    @prop({ default: USER_BASE_POINTS }) points: number;
    @prop({ default: USER_BASE_POINTS }) exp: number;
    @prop() currentSession: { name: string, data: any } | null = null;

    //? Daily Rewards
        @prop() lastClaimedReward?: Date;

    //? Exp Farming
        @prop({ default: 0 }) expIncrement: number;
        @prop({ default: 0 }) expTime: number;
    
    @prop() updatedAt: Date;


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
