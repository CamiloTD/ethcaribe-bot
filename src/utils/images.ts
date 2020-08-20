import nodeHtmlToImage from "node-html-to-image";
import JDenticon from "jdenticon";
import util from "util";
import fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);

export async function identicon (value: string, size=200) {
    return JDenticon.toSvg(value, size);
}

export async function parseHtmlToPNG (html: string, data: any = {}, size?: [number, number]) {
    html = `<html>
        <head>
        <style>
            body {
                ${size? `width: ${size[0]}px; height: ${size[1]}px;` : ''}
                padding: 50px;
            }
        </style>
        </head>
        <body>${html}</body>
    </html>`

    html = html.replace(/@@(.+?)@@/g, ($0, $1) => data[$1]);

    const image = await nodeHtmlToImage({
        html,
        content: data,
        type: "png"
    });

    return image;
}