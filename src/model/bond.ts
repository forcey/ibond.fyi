import { Rate } from "./rateTable";

export class Bond {
    id: string;
    dateIssued: Date;
    principal: number;

    constructor(dateIssued: Date, principal: number) {
        this.id = crypto.randomUUID();
        this.dateIssued = dateIssued;
        this.principal = principal;
    }
}

export function compositeRate(fixedRate: Rate, inflationRate: Rate): number {
    const composite = fixedRate.rate + 2 * inflationRate.rate + fixedRate.rate * inflationRate.rate;
    return Math.round((composite + Number.EPSILON) * 10000) / 10000;
}
