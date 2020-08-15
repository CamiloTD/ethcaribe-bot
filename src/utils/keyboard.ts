export const KEYBOARD_YES_NO = [["Si", "No"], ["/salir"]];

export function keyboardResponse (text: string, layout: any[]) {
    return { text, keyboard: layout }
}