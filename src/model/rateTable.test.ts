import { assert, expect, test } from 'vitest';
import { parseRate, lookupRate } from './rateTable';

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

test('lookupRate mid period', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2014, 3, 1));
    expect(fixedRate?.date).toStrictEqual(new Date(2013, 10, 1));
    expect(fixedRate?.rate).toBe(0.002);

    expect(inflationRate?.date).toStrictEqual(new Date(2013, 10, 1));
    expect(inflationRate?.rate).toBe(0.0059);
})

test('lookupRate period start', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2014, 4, 1));
    expect(fixedRate?.date).toStrictEqual(new Date(2014, 4, 1));
    expect(fixedRate?.rate).toBe(0.001);

    expect(inflationRate?.date).toStrictEqual(new Date(2014, 4, 1));
    expect(inflationRate?.rate).toBe(0.0092);
})

test('lookupRate future', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(2023, 2, 10));
    expect(fixedRate?.date).toStrictEqual(new Date(2022, 10, 1));
    expect(fixedRate?.rate).toBe(0.004);

    expect(inflationRate?.date).toStrictEqual(new Date(2022, 10, 1));
    expect(inflationRate?.rate).toBeCloseTo(0.0324);
})

test('lookupRate too far in the past', () => {
    var { fixedRate, inflationRate } = lookupRate(new Date(1998, 7, 31));
    expect(fixedRate).toBeUndefined();
    expect(inflationRate).toBeUndefined();
})