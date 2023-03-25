import { assert, expect, test } from 'vitest';
import { formatDollars, formatPercent, roundToDecimal } from './math';

test('roundToDecimal', () => {
    expect(roundToDecimal(1.23456789, 2)).toBe(1.23);
    expect(roundToDecimal(1.255, 2)).toBe(1.26);
})

test('formatPercent', () => {
    expect(formatPercent(0.123456789, 2)).toBe('12.35%');
    expect(formatPercent(0.255, 2)).toBe('25.50%');
})

test('formatDollars', () => {
    expect(formatDollars(123456789)).toBe('$123,456,789.00');
    expect(formatDollars(255)).toBe('$255.00');
    expect(formatDollars(123.4567)).toBe('$123.46');
})