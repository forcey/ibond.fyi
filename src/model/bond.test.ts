import { assert, expect, test } from 'vitest';
import { Bond ,compositeRate} from './bond';

test('constructor', () => {
    const bond = new Bond(new Date(2022, 3, 1), 1000);
    expect(bond.id).toBeDefined();
    expect(bond.dateIssued.toDateString()).toBe('Fri Apr 01 2022');
    expect(bond.principal).toBe(1000);
})

test("compositeRate", () => {
    // https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/
    // Example for November 2022.
    const fixedRate = { date: new Date(2022, 10, 1), rate: 0.004 };
    const inflationRate = { date: new Date(2022, 10, 1), rate: 0.0324 };
    const composite = compositeRate(fixedRate, inflationRate);
    expect(composite).toBe(0.0689);
})
