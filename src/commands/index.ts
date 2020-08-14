export function $notFound (msg, command: string) {
    return `Command not found: ${command}`;
}

export function register (msg, address: string) {
    return `Address registered: ${address}`;
}