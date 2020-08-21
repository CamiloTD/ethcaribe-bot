import { Message } from "node-telegram-bot-api";
import { User, UserModel } from "../../models/db";

export async function createUser (msg: Message) {
    return await UserModel.create({
        name: `${msg.from.first_name} ${msg.from.last_name}`,
        id: msg.from.id.toString()
    })
}

export async function getUserById (id: string): Promise<User> {
    const user = await UserModel.findOne({ id });
    return user;
}

export function getMessageUser(msg: Message) {
    return getUserById(msg.from.id.toString());
}

export function pointStats () {
    return UserModel.aggregate([
        { $group: {
            _id: null,
            exp: { $sum: "$exp" },
            points: { $sum: "$points" }
        }}
    ])
}