// export const COLOR_TEXT = "#030301";
// export const COLOR_COMMAND = "$00D9C0";
// export const COLOR_NUMBER = "#FF4365";

export function stylize (str: string = "") {
    return str
            .replace(/^(?:^|\s)0x[a-fA-F0-9]{40}(?:$|\s)/g, (cmd) => italics(cmd))
            .replace(/\n +/g, "\n")
}

export function italics (str) {
    return "<i>" + str + "</i>";
}

export function bold (str) {
    return "<b>" + str + "</b>";
}