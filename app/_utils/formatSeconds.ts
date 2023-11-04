import { fillWithZero } from "./fillWithZero";

export function formatSeconds(totalSeconds: number): string {
    const hours = fillWithZero(Math.floor(totalSeconds / (60 * 60)));
    const minutes = fillWithZero(Math.floor(totalSeconds % (60 * 60) / 60));
    const seconds = fillWithZero(Math.floor(totalSeconds % 60));

    return `${hours}:${minutes}:${seconds}`;
}
