export function getOrdinalPositionDescription(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = position % 100;

    const suffix =
        suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

    return `${position}${suffix}`;
}