import mongoose from "mongoose";
import { DB_CONNECTION } from "../../../env";
export * from '../user';
export * from '../shop';
export * from '../education';

export async function initDatabase() {
    await mongoose.connect(DB_CONNECTION);
}