import { Bond, BondValue, effectiveRate } from "../model/bond";
import { formatMonth } from "../utils/date";
import { formatPercent, formatDollars } from "../utils/math";
import { InfoPopover } from "./InfoPopover";

export function BondDetailTable({ bond, values }: { bond: Bond, values: BondValue[] }): JSX.Element {
    const valueRows: JSX.Element[] = [];
    var shownInfoPopover = false;
    for (var index = values.length - 1; index >= 0; index--) {
        const value = values[index];
        const redeemableValue = bond.redeemableValue(values, index);
        const redeemableDate = new Date(bond.dateIssued);
        redeemableDate.setFullYear(bond.dateIssued.getFullYear() + 1);

        const today = new Date();
        const isFuture = value.date > today;
        const isCurrentYearMonth = value.date.getFullYear() === today.getFullYear() &&
            value.date.getMonth() === today.getMonth();
        const rowTextClass = isFuture ? 'text-gray-500 italic' : isCurrentYearMonth ? 'font-bold' : '';
        const valueTextClass = rowTextClass + (redeemableValue.isRedeemable ? '' : ' text-gray-500');

        const showInfoPopover: boolean = !shownInfoPopover && !redeemableValue.isRedeemable && !isFuture;
        shownInfoPopover ||= showInfoPopover;

        valueRows.push(<tr key={index}>
            <td className="whitespace-nowrap">
                <span className={rowTextClass}>{formatMonth(value.date)}</span>
            </td>
            <td>
                <span className={rowTextClass}>{formatPercent(value.compositeRate, 2)}</span>
            </td>
            <td>
                <span className={rowTextClass}>{formatDollars(value.value * value.multiplier)}</span>
            </td>
            <td className="whitespace-nowrap">
                <span className={valueTextClass}>
                    {formatDollars(redeemableValue.value)}
                    {showInfoPopover &&
                        <InfoPopover>
                            I-Bonds are not redeemable for the first 12 months after purchase.
                            TreasuryDirect will display this value, even though this bond is not redeemable until {formatMonth(redeemableDate)}.
                        </InfoPopover>
                    }
                </span>
            </td>
            <td><span className={rowTextClass}>
                {formatPercent(effectiveRate(bond.principal, redeemableValue.value, index), 2)}
            </span></td>
        </tr>);
    }
    // Make the table area scrollable.
    return <div style={{ "overflow": "auto", "paddingBottom": "8px" }}>
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Composite Rate</th>
                    <th>Accrued Value</th>
                    <th>Redeemable Value</th>
                    <th>Effective Rate</th>
                </tr>
            </thead>
            <tbody>
                {valueRows}
            </tbody>
        </table>
    </div>;
}
