import { assert, expect, test } from 'vitest';
import { roundToDecimal } from './math';

test('roundToDecimal', () => {
    expect(roundToDecimal(1.23456789, 2)).toBe(1.23);
    expect(roundToDecimal(1.255, 2)).toBe(1.26);
})
