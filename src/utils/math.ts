export function roundToDecimal(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

export function formatPercent(value: number, decimalPlaces: number): string {
    return `${(value * 100).toFixed(decimalPlaces)}%`;
}

export function formatDollars(value: number): string {
    return `$${value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}
