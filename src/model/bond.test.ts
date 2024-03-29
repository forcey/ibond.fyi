import { assert, expect, test } from 'vitest';
import { Months } from '../utils/date';
import { Bond, compositeRate, effectiveRate } from './bond';
import { parseRate } from './rateTable';

test('constructor', () => {
    const bond = new Bond(new Date(2022, Months.April, 1), 1000);
    expect(bond.id).toBeDefined();
    expect(bond.dateIssued.toDateString()).toBe('Fri Apr 01 2022');
    expect(bond.principal).toBe(1000);
})

test("compositeRate", () => {
    // https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/
    // Example for November 2022.
    const fixedRate = parseRate("2022-10-01", "0.4%");
    const inflationRate = parseRate("2022-10-01", "3.24%");;
    const composite = compositeRate(fixedRate, inflationRate);
    expect(composite).toBe(0.0689);
})

test("compositeRate won't go below zero", () => {
  // https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/
  // Example for May 2015.
  const fixedRate = parseRate("2015-05-01", "0.0%");
  const inflationRate = parseRate("2015-05-01", "-0.8%");
  const composite = compositeRate(fixedRate, inflationRate);
  expect(composite).toBe(0);
})

test('calculateValue', () => {
    const bond = new Bond(new Date(2022, Months.April, 1), 10000);
    const values = bond.calculateValue();
    expect(values.slice(0, 12)).toEqual([
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.April),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.May),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.15,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.June),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.29,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.July),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.44,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.August),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.59,
        },
        {
          "compositeRate": 0.0712,
          "date": new Date(2022, Months.September),
          "fixedRate": 0,
          "inflationRate": 0.0356,
          "multiplier": 400,
          "principal": 25,
          "value": 25.74,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, Months.October),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 25.89,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, Months.November),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.09,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2022, Months.December),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.3,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, Months.January),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.51,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, Months.February),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.71,
        },
        {
          "compositeRate": 0.0962,
          "date": new Date(2023, Months.March),
          "fixedRate": 0,
          "inflationRate": 0.0481,
          "multiplier": 400,
          "principal": 25.89,
          "value": 26.92,
        },
      ]);
})

test('effectiveRate', () => {
  expect(effectiveRate(100, 100, 0)).toBe(0);
  expect(effectiveRate(100, 101, 1)).toBeCloseTo(0.1268);
  expect(effectiveRate(100, 120, 12)).toBeCloseTo(0.2);
  expect(effectiveRate(100, 120, 36)).toBeCloseTo(0.0626);
})

