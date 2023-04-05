import { Months } from '../utils/date';
import { Bond } from './bond';

export function monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

export const epoch = new Date(1998, Months.September, 1);

export function serialize(bonds: Bond[]): string {
    const buffer = new ArrayBuffer(bonds.length * 4);
    const dataView = new DataView(buffer);
    for (let i = 0; i < bonds.length; i++) {
        const monthIndex = monthDiff(epoch, bonds[i].dateIssued);
        const principalCents = bonds[i].principal * 100;
        // 12 bits for the month index (4096 months = 341 years)
        // 20 bits for the principal in cents (2500 to 1000000)
        // Stored as big endian.
        // "Before a bitwise operation is performed, JavaScript converts numbers to 32 bits signed integers."
        dataView.setUint32(i * 4, monthIndex << 20 | principalCents);
    }
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function deserialize(serialized: string): Bond[] {
    const buffer = new Uint8Array(atob(serialized).split('').map(c => c.charCodeAt(0)));
    const dataView = new DataView(buffer.buffer);
    const bonds: Bond[] = [];
    for (let i = 0; i < buffer.length; i += 4) {
        const monthIndex = dataView.getUint32(i) >> 20;
        const principalCents = dataView.getUint32(i) & 0x000FFFFF;
        const issueDate = new Date(epoch.getFullYear(), epoch.getMonth() + monthIndex);
        if (monthIndex >= 0 && issueDate <= new Date() && principalCents >= 2500 && principalCents <= 1000000) {
            bonds.push(new Bond(issueDate, principalCents / 100));
        }
    }
    return bonds;
}
