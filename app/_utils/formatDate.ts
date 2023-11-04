import { fillWithZero } from "./fillWithZero";

export function formatDate(date: Date): string {
    const day = fillWithZero(date.getDate());
    const month = fillWithZero(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
