import { assert, expect, test } from 'vitest';
import { Months } from '../utils/date';
import { parseRate, lookupRate } from './rateTable';

test('parseRate positive', () => {
    const rate = parseRate("November 1, 2022", "0.40%");
    expect(rate.date).toStrictEqual(new Date(2022, Months.November, 1));
    expect(rate.rate).toBe(0.004);
})

test('parseRate negative', () => {
    const rate = parseRate("May 1, 2015", "-0.80%");
    expect(rate.date).toStrictEqual(new Date(2015, Months.May, 1));
    expect(rate.rate).toBe(-0.008);
})

test('lookupRate mid period', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2014, Months.April, 1));
    expect(fixedRate?.date).toStrictEqual(new Date(2013, Months.November, 1));
    expect(fixedRate?.validThrough).toStrictEqual(new Date(2014, Months.May, 1));
    expect(fixedRate?.rate).toBe(0.002);

    expect(inflationRate?.date).toStrictEqual(new Date(2013, Months.November, 1));
    expect(inflationRate?.validThrough).toStrictEqual(new Date(2014, Months.May, 1));
    expect(inflationRate?.rate).toBe(0.0059);
})

test('lookupRate period start', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2014, Months.May, 1));
    expect(fixedRate?.date).toStrictEqual(new Date(2014, Months.May, 1));
    expect(fixedRate?.validThrough).toStrictEqual(new Date(2014, Months.November, 1));
    expect(fixedRate?.rate).toBe(0.001);

    expect(inflationRate?.date).toStrictEqual(new Date(2014, Months.May, 1));
    expect(inflationRate?.validThrough).toStrictEqual(new Date(2014, Months.November, 1));
    expect(inflationRate?.rate).toBe(0.0092);
})

test('lookupRate future', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2023, Months.March, 10));
    expect(fixedRate?.date).toStrictEqual(new Date(2022, Months.November, 1));
    expect(fixedRate?.validThrough).toStrictEqual(new Date(2023, Months.May, 1));
    expect(fixedRate?.rate).toBe(0.004);

    expect(inflationRate?.date).toStrictEqual(new Date(2022, Months.November, 1));
    expect(inflationRate?.validThrough).toStrictEqual(new Date(2023, Months.May, 1));
    expect(inflationRate?.rate).toBeCloseTo(0.0324);
})

test('lookupRate too far in the past', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(1998, Months.August, 31));
    expect(fixedRate).toBeUndefined();
    expect(inflationRate).toBeUndefined();
})