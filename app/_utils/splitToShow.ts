export function splitToShow<T> (
    data: T[],
    limit: number,
): [toShow: T[], hidden: T[]] {
    const toShow = data.slice(0, limit);
    const hidden = data.slice(limit);

    return [toShow, hidden];
}
