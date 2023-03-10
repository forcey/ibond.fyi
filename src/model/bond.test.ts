import { assert, expect, test } from 'vitest';
import { Bond } from './bond';

test('constructor', () => {
    const bond = new Bond(new Date(2022, 3, 1), 1000);
    expect(bond.id).toBeDefined();
    expect(bond.dateIssued.toDateString()).toBe('Fri Apr 01 2022');
    expect(bond.principal).toBe(1000);
})
