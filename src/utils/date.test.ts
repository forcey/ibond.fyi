import { assert, expect, test } from 'vitest';
import { formatMonth, Months } from './date';

test('formatMonth', () => {
    expect(formatMonth(new Date(2022, Months.March, 15))).toBe('Mar 2022');
})
