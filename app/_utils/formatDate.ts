import { fillWithZero } from "./fillWithZero";

export function formatDate (date: Date): string {
    const day = fillWithZero(date.getUTCDate());
    const month = fillWithZero(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateTime (date: Date): string {
    const day = fillWithZero(date.getUTCDate());
    const month = fillWithZero(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();

    const hour = fillWithZero(date.getUTCHours());
    const minute = fillWithZero(date.getUTCMinutes());
    const second = fillWithZero(date.getUTCSeconds());

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
