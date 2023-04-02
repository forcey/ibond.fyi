import { Bond, BondValue, effectiveRate } from "../model/bond";
import { formatMonth } from "../utils/date";
import { formatPercent, formatDollars } from "../utils/math";
import { InfoPopover } from "./InfoPopover";

export function BondDetailTable({ bond, values }: { bond: Bond, values: BondValue[] }): JSX.Element {
    const valueRows = values.map((value, index) => {
        const redeemableValue = bond.redeemableValue(values, index);
        const redeemableDate = new Date(bond.dateIssued);
        redeemableDate.setFullYear(bond.dateIssued.getFullYear() + 1);
        return <tr key={index}>
            <td className="whitespace-nowrap">{formatMonth(value.date)}</td>
            <td>{formatPercent(value.compositeRate, 2)}</td>
            <td>{formatDollars(value.value * value.multiplier)}</td>
            <td className="whitespace-nowrap">
                <span className={redeemableValue.isRedeemable ? '' : 'text-gray-500'}>
                    {formatDollars(redeemableValue.value)}
                    {redeemableValue.isRedeemable ||
                        <InfoPopover>
                            I-Bonds are not redeemable for the first 12 months after purchase.
                            TreasuryDirect will display this value, even though this bond is not redeemable until {formatMonth(redeemableDate)}.
                        </InfoPopover>
                    }
                </span>
            </td>
            <td>{formatPercent(effectiveRate(bond.principal, redeemableValue.value, index), 2)}</td>
        </tr>
    });
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
                {valueRows.reverse()}
            </tbody>
        </table>
    </div>;
}
