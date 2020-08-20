import mongoose from "mongoose";
import { DB_CONNECTION } from "../../../env";
export * from '../user';

export async function initDatabase() {
    await mongoose.connect(DB_CONNECTION);
}