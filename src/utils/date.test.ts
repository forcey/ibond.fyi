import { assert, expect, test } from 'vitest';
import { formatMonth, Months, parseYearMonth } from './date';

test('formatMonth', () => {
    expect(formatMonth(new Date(2022, Months.March, 15))).toBe('Mar 2022');
})

test('parseYearMonth', () => {
    expect(parseYearMonth('2022-03')).toStrictEqual(new Date(2022, Months.March, 1));
})
