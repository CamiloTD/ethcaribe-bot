import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { GAME_ASSET } from "../utils/enums";

/*
 
   _____    _                 _   _             
  | ____|__| |_   _  ___ __ _| |_(_) ___  _ __  
  |  _| / _` | | | |/ __/ _` | __| |/ _ \| '_ \ 
  | |__| (_| | |_| | (_| (_| | |_| | (_) | | | |
  |_____\__,_|\__,_|\___\__,_|\__|_|\___/|_| |_|
                                                
 
  ? Education is made by 4 classes
    * EducationSubject: Stores generic information about a topic
        ? id - stripped `name`, ex. ens, bitcoin, web3
        ? name - topic name, ex. ENS, Bitcoin, Web3
        ? picture - Url of the displaying picture
        ? maxLevel - max level the subject can be upgraded, default is 5
        ? price - Information about the costs and how does it increases
            ? asset - Type of asset (Exp, Points, etc...)
            ? value - quantity of asset required
            ? increment - Multiplies the value for each level (Ex, 1.1 represents a 10% level increment in price)
        ? revenue - Information about the costs and how does it increases
            ? asset - Type of asset that produces (Exp, Points, etc...)
            ? value - quantity of asset that gives each claim
            ? interval - Miliseconds between each claim
            ? increment - Multiplies the value for each level (Ex, 1.1 represents a 10% level increment in production)
    * Education Resource: Represents a specific lecture or resource, its always linked to an EducationSubject
        ? id: stripped name
        ? name: Resource name
        ? description: Short resource description
        ? url: Url to the resource site
        ? subjectId: Subject where is related
        ? price - Information about the costs and how does it increases
            ? asset - Type of asset (Exp, Points, etc...)
            ? value - quantity of asset required
    * Education Link: Represents a dependency link between 2 nodes, the childNode only will be available to buy when all parents nodes are active
        ? parentId
        ? childId
    * EducationData: Represents a specific instance of a EducationSubject in a user
        ? userId
        ? subjectId
        ? level
*/

export class EducationSubject {
    @prop() id: string;
    @prop() name: string;

    @prop() picture: string;
    @prop() description: string;
    @prop({ default: 5 }) maxLevel: number;

    @prop() price: {
        value: number;
        asset: GAME_ASSET;
        increment: number;
    }

    @prop() revenue: {
        value: number;
        asset: GAME_ASSET;
        interval: number;
        increment: number;
    }
}

export class EducationResource {
    @prop() id: string;
    @prop() name: string;
    @prop() description: string;
    @prop() url: string;

    @prop() price: {
        value: number;
        asset: GAME_ASSET;
    }
}

export class EducationLink {
    @prop() parentId: Types.ObjectId;
    @prop() childId: Types.ObjectId;
}

export class EducationData {
    @prop() userId: Types.ObjectId;
    @prop() subjectId: Types.ObjectId;

    @prop() active: boolean;
    @prop() level: number;
}

export const EducationSubjectModel  = getModelForClass(EducationSubject);
export const EducationResourceModel = getModelForClass(EducationResource);
export const EducationLinkModel     = getModelForClass(EducationLink);
export const EducationDataModel     = getModelForClass(EducationData);