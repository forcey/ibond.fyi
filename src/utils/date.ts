export const Months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
}

export function formatMonth(date: Date): string {
    return date.toLocaleDateString("en-US", { "month": "short", "year": "numeric" });
}

export function parseYearMonth(yearMonth: string) {
    const monthParts = yearMonth.split("-");
    const year = parseInt(monthParts[0]);
    const month = parseInt(monthParts[1]);
    return new Date(year, month - 1);
}
