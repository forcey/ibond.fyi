export type Rate = {
    date: Date,
    rate: number,
    validThrough: Date,
}

export function parseRate(date: string, rate: string): Rate {
    const issueDate = new Date(date);
    const validThrough = new Date(date);
    validThrough.setMonth(validThrough.getMonth() + 6);

    return {
        date: issueDate,
        rate: parseFloat(rate) / 100,
        validThrough: validThrough,
    }
}

// https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/
const fixedRateTable: Rate[] = [
    parseRate("November 1, 2024", "1.20%"),
    parseRate("May 1, 2024", "1.30%"),
    parseRate("November 1, 2023", "1.30%"),
    parseRate("May 1, 2023", "0.90%"),
    parseRate("November 1, 2022", "0.40%"),
    parseRate("May 1, 2022", "0.00%"),
    parseRate("November 1, 2021", "0.00%"),
    parseRate("May 1, 2021", "0.00%"),
    parseRate("November 1, 2020", "0.00%"),
    parseRate("May 1, 2020", "0.00%"),
    parseRate("November 1, 2019", "0.20%"),
    parseRate("May 1, 2019", "0.50%"),
    parseRate("November 1, 2018", "0.50%"),
    parseRate("May 1, 2018", "0.30%"),
    parseRate("November 1, 2017", "0.10%"),
    parseRate("May 1, 2017", "0.00%"),
    parseRate("November 1, 2016", "0.00%"),
    parseRate("May 1, 2016", "0.10%"),
    parseRate("November 1, 2015", "0.10%"),
    parseRate("May 1, 2015", "0.00%"),
    parseRate("November 1, 2014", "0.00%"),
    parseRate("May 1, 2014", "0.10%"),
    parseRate("November 1, 2013", "0.20%"),
    parseRate("May 1, 2013", "0.00%"),
    parseRate("November 1, 2012", "0.00%"),
    parseRate("May 1, 2012", "0.00%"),
    parseRate("November 1, 2011", "0.00%"),
    parseRate("May 1, 2011", "0.00%"),
    parseRate("November 1, 2010", "0.00%"),
    parseRate("May 1, 2010", "0.20%"),
    parseRate("November 1, 2009", "0.30%"),
    parseRate("May 1, 2009", "0.10%"),
    parseRate("November 1, 2008", "0.70%"),
    parseRate("May 1, 2008", "0.00%"),
    parseRate("November 1, 2007", "1.20%"),
    parseRate("May 1, 2007", "1.30%"),
    parseRate("November 1, 2006", "1.40%"),
    parseRate("May 1, 2006", "1.40%"),
    parseRate("November 1, 2005", "1.00%"),
    parseRate("May 1, 2005", "1.20%"),
    parseRate("November 1, 2004", "1.00%"),
    parseRate("May 1, 2004", "1.00%"),
    parseRate("November 1, 2003", "1.10%"),
    parseRate("May 1, 2003", "1.10%"),
    parseRate("November 1, 2002", "1.60%"),
    parseRate("May 1, 2002", "2.00%"),
    parseRate("November 1, 2001", "2.00%"),
    parseRate("May 1, 2001", "3.00%"),
    parseRate("November 1, 2000", "3.40%"),
    parseRate("May 1, 2000", "3.60%"),
    parseRate("November 1, 1999", "3.40%"),
    parseRate("May 1, 1999", "3.30%"),
    parseRate("November 1, 1998", "3.30%"),
    parseRate("September 1, 1998", "3.40%"),
];

const inflationRateTable: Rate[] = [
    parseRate("November 1, 2024", "0.95%"),
    parseRate("May 1, 2024", "1.48%"),
    parseRate("November 1, 2023", "1.97%"),
    parseRate("May 1, 2023", "1.69%"),
    parseRate("November 1, 2022", "3.24%"),
    parseRate("May 1, 2022", "4.81%"),
    parseRate("November 1, 2021", "3.56%"),
    parseRate("May 1, 2021", "1.77%"),
    parseRate("November 1, 2020", "0.84%"),
    parseRate("May 1, 2020", "0.53%"),
    parseRate("November 1, 2019", "1.01%"),
    parseRate("May 1, 2019", "0.70%"),
    parseRate("November 1, 2018", "1.16%"),
    parseRate("May 1, 2018", "1.11%"),
    parseRate("November 1, 2017", "1.24%"),
    parseRate("May 1, 2017", "0.98%"),
    parseRate("November 1, 2016", "1.38%"),
    parseRate("May 1, 2016", "0.08%"),
    parseRate("November 1, 2015", "0.77%"),
    parseRate("May 1, 2015", "-0.80%"),
    parseRate("November 1, 2014", "0.74%"),
    parseRate("May 1, 2014", "0.92%"),
    parseRate("November 1, 2013", "0.59%"),
    parseRate("May 1, 2013", "0.59%"),
    parseRate("November 1, 2012", "0.88%"),
    parseRate("May 1, 2012", "1.10%"),
    parseRate("November 1, 2011", "1.53%"),
    parseRate("May 1, 2011", "2.30%"),
    parseRate("November 1, 2010", "0.37%"),
    parseRate("May 1, 2010", "0.77%"),
    parseRate("November 1, 2009", "1.53%"),
    parseRate("May 1, 2009", "-2.78%"),
    parseRate("November 1, 2008", "2.46%"),
    parseRate("May 1, 2008", "2.42%"),
    parseRate("November 1, 2007", "1.53%"),
    parseRate("May 1, 2007", "1.21%"),
    parseRate("November 1, 2006", "1.55%"),
    parseRate("May 1, 2006", "0.50%"),
    parseRate("November 1, 2005", "2.85%"),
    parseRate("May 1, 2005", "1.79%"),
    parseRate("November 1, 2004", "1.33%"),
    parseRate("May 1, 2004", "1.19%"),
    parseRate("November 1, 2003", "0.54%"),
    parseRate("May 1, 2003", "1.77%"),
    parseRate("November 1, 2002", "1.23%"),
    parseRate("May 1, 2002", "0.28%"),
    parseRate("November 1, 2001", "1.19%"),
    parseRate("May 1, 2001", "1.44%"),
    parseRate("November 1, 2000", "1.52%"),
    parseRate("May 1, 2000", "1.91%"),
    parseRate("November 1, 1999", "1.76%"),
    parseRate("May 1, 1999", "0.86%"),
    parseRate("November 1, 1998", "0.86%"),
    parseRate("September 1, 1998", "0.62%"),
];

export function lookupRate(date: Date): { fixedRate: Rate | undefined, inflationRate: Rate | undefined } {
    var fixedRate = fixedRateTable.find(rate => rate.date <= date);
    var inflationRate = inflationRateTable.find(rate => rate.date <= date);
    if (fixedRate !== undefined && date >= fixedRate.validThrough) {
        fixedRate = undefined;
    }
    if (inflationRate !== undefined && date >= inflationRate.validThrough) {
        inflationRate = undefined;
    }
    return { fixedRate, inflationRate };
}
