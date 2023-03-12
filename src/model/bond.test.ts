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

test('calculateValue', () => {
    const bond = new Bond(new Date(2022, 3, 1), 10000);
    const values = bond.calculateValue();
    expect(values).toEqual([
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 3),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 4),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.15,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 5),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.29,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 6),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.44,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 7),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.59,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, 8),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.74,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, 9),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 25.89,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, 10),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.09,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, 11),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.3,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, 0),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.51,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, 1),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.71,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, 2),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.92,
        },
      ]);
})