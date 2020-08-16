import fs from "fs";
import path from "path";
import util from "util";
import { toId } from "../../utils/string";

const read = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const alias = require("./aliases.json");

export async function getTopicByName (topic: string) {
    topic = toId(topic);
    topic = alias[topic] || topic;

    try {
        return await read(path.resolve(__dirname, `./docs/${topic}.txt`));
    } catch (exc) {
        return null;
    }
}

export async function getTopicList () {
    return (await readdir(path.resolve(__dirname, `./docs`))).map(name => name.replace(".txt", ""));
}