export function isValidAddress (address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function toId (name: string) {
    return name.toLowerCase().replace(/[^A-Za-z0-9]/g, "");
}