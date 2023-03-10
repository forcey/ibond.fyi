import { assert, expect, test } from 'vitest';
import { parseRate } from './rateTable';

test('parseRate positive', () => {
    const rate = parseRate("November 1, 2022", "0.40%");
    expect(rate.date).toStrictEqual(new Date(2022, 10, 1));
    expect(rate.rate).toBe(0.004);
})

test('parseRate negative', () => {
    const rate = parseRate("May 1, 2015", "-0.80%");
    expect(rate.date).toStrictEqual(new Date(2015, 4, 1));
    expect(rate.rate).toBe(-0.008);
})
