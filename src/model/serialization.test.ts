import { assert, expect, test } from 'vitest';
import { Months } from '../utils/date';
import { deserialize, epoch, monthDiff, serialize } from './serialization';
import { Bond } from './bond';

test('monthDiff', () => {
    expect(monthDiff(epoch, new Date(1998, Months.September, 1))).toBe(0);
    expect(monthDiff(epoch, new Date(1998, Months.October, 5))).toBe(1);
    expect(monthDiff(epoch, new Date(1999, Months.September, 30))).toBe(12);
    expect(monthDiff(epoch, new Date(2023, Months.April, 17))).toBe(295);
})

test('serialization', () => {
    const bonds = [
        new Bond(new Date(1998, Months.September, 1), 25),
        new Bond(new Date(2022, Months.November, 1), 10000),
        new Bond(new Date(2023, Months.April, 1), 1234.56)];
    for (const bond of bonds) {
        bond.id = 'ignored';
    }

    const serialized = serialize(bonds);
    const deserialized = deserialize(serialized);

    for (const bond of deserialized) {
        bond.id = 'ignored';
    }
    expect(deserialized).toEqual(bonds);
})

test('deserialization removes invalid data', () => {
    const bonds = [
        new Bond(new Date(1998, Months.August, 1), 25),
        new Bond(new Date(2022, Months.November, 1), 10001),
        new Bond(new Date(2023, Months.April, 1), 12.34),
        new Bond(new Date(2049, Months.April, 1), 1234),
    ];

    const serialized = serialize(bonds);
    const deserialized = deserialize(serialized);
    
    expect(deserialized).toHaveLength(0);
})
