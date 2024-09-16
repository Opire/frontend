import { fillWithZero } from "./fillWithZero";

export function formatDate(date: Date): string {
    const day = fillWithZero(date.getDate());
    const month = fillWithZero(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateTime(date: Date): string {
    const day = fillWithZero(date.getDate());
    const month = fillWithZero(date.getMonth() + 1);
    const year = date.getFullYear();

    const hour = fillWithZero(date.getHours());
    const minute = fillWithZero(date.getMinutes());
    const second = fillWithZero(date.getSeconds());

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
