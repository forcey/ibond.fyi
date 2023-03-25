import { roundToDecimal } from "../utils/math";
import { lookupRate, Rate } from "./rateTable";

export type BondValue = {
    date: Date,

    fixedRate: number,
    inflationRate: number,
    compositeRate: number,

    principal: number,
    value: number,
    multiplier: number,
}

export function totalValue(value: BondValue): number {
    return value.value * value.multiplier;
}

export type RedeemableValue = {
    value: number,
    isRedeemable: boolean,
}

export class Bond {
    id: string;
    dateIssued: Date;
    principal: number;

    constructor(dateIssued: Date, principal: number) {
        this.id = crypto.randomUUID();
        this.dateIssued = dateIssued;
        this.principal = principal;
    }

    calculateValue(): BondValue[] {
        const values: BondValue[] = [];
        const today = new Date();
        const { fixedRate } = lookupRate(this.dateIssued);
        if (fixedRate === undefined) {
            return values;
        }
        var bondValue: BondValue = {
            date: this.dateIssued,
            fixedRate: fixedRate.rate,
            inflationRate: 0,
            compositeRate: 0,
            principal: 25,
            value: 25,
            multiplier: this.principal / 25,
        }
        var months = 0;
        for (var date = new Date(this.dateIssued); date <= today; date.setMonth(date.getMonth() + 1)) {
            bondValue.date = new Date(date);

            // https://www.bogleheads.org/wiki/I_savings_bonds#How_interest_is_calculated
            const newValue = bondValue.principal * Math.pow(1 + bondValue.compositeRate / 2, months / 6);
            bondValue.value = roundToDecimal(newValue, 2);

            // Inflation rate changes every 6 months. Use this code path for the initial rate as well.
            if (months % 6 == 0) {
                const { inflationRate } = lookupRate(date);
                if (inflationRate === undefined) {
                    return values;
                }
                bondValue.inflationRate = inflationRate.rate;
                bondValue.compositeRate = compositeRate(fixedRate, inflationRate);
                // Semiannual compounding: add the accrued interest to the principal.
                bondValue.principal = bondValue.value;
                months = 0;
            }

            values.push(Object.assign({}, bondValue));
            months++;
        }
        return values;
    }

    redeemableValue(values: BondValue[], index: number): RedeemableValue {
        if (index < 3) {
            return {
                value: totalValue(values[0]),
                isRedeemable: false,
            }
        }
        if (index < 60) {
            const value3MonthsAgo = values[index - 3];
            return {
                value: totalValue(value3MonthsAgo),
                isRedeemable: index >= 12,
            }
        }
        return {
            value: totalValue(values[index]),
            isRedeemable: true,
        }
    }
}

export function compositeRate(fixedRate: Rate, inflationRate: Rate): number {
    const composite = fixedRate.rate + 2 * inflationRate.rate + fixedRate.rate * inflationRate.rate;
    return roundToDecimal(Math.max(0, composite), 4);
}
