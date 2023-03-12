export function roundToDecimal(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}
