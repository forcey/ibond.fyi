import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Bond, BondValue } from '../model/bond';
import { formatMonth } from '../utils/date';
import { formatDollars, formatPercent } from '../utils/math';
import './BondList.css';
import { InfoPopover } from './InfoPopover';

function TableCell({ label, children, style }: { label?: string, children: React.ReactNode, style?: React.CSSProperties }): JSX.Element {
    return <div className='tableCell' style={style}>
        {label && <div className='label'>{label}</div>}
        <div className='text'>{children}</div>
    </div>;
}

function BondDetailTable({ bond, values }: { bond: Bond, values: BondValue[] }): JSX.Element {
    const valueRows = values.map((value, index) => {
        const redeemableValue = bond.redeemableValue(values, index);
        const redeemableDate = new Date(bond.dateIssued);
        redeemableDate.setFullYear(bond.dateIssued.getFullYear() + 1);
        return <tr key={index}>
            <td>{formatMonth(value.date)}</td>
            <td>{formatPercent(value.compositeRate, 2)}</td>
            <td>{formatDollars(value.value * value.multiplier)}</td>
            <td>
                <span className={redeemableValue.isRedeemable ? 'redeemable' : 'unredeemable'}>
                    {formatDollars(redeemableValue.value)}
                    {redeemableValue.isRedeemable ||
                        <InfoPopover>
                            I-Bonds are not redeemable for the first 12 months after purchase.
                            TreasuryDirect will display this value, even though this bond is not redeemable until {formatMonth(redeemableDate)}.
                        </InfoPopover>
                    }
                </span>
            </td>
            <td>TODO</td>
        </tr>
    });
    // Make the table area scrollable.
    return <div style={{ "overflow": "auto", "paddingBottom": "8px" }}>
        <table>
            <thead>
                <tr>
                    <th style={{ 'minWidth': '5em' }}>Month</th>
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

function BondRow({ bond, onDeleteBondCommand }: {
    bond: Bond,
    onDeleteBondCommand: (id: string) => void
}): JSX.Element {
    const values = bond.calculateValue();

    const latestValue = bond.redeemableValue(values, values.length - 1).value;

    return <Accordion.Item value={bond.id} className="AccordionItem">
        <Accordion.Header>
            <div className='tableRow'>
                <TableCell label="Month Issued">{formatMonth(bond.dateIssued)}</TableCell>
                <TableCell label="Principal">{formatDollars(bond.principal)}</TableCell>
                <TableCell label="Value">{formatDollars(latestValue)}</TableCell>
                <TableCell style={{ "width": "auto", "marginLeft": "auto" }}>
                    <Accordion.Trigger className='AccordionTrigger'>
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                </TableCell>
            </div>
        </Accordion.Header>
        <Accordion.Content>
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <button className="editButton"><Pencil1Icon className='inlineIcon' /> Edit</button>
                <button className="editButton" onClick={e => onDeleteBondCommand(bond.id)}><TrashIcon className='inlineIcon' /> Delete</button>
            </div>
            <BondDetailTable bond={bond} values={values}></BondDetailTable>
        </Accordion.Content>
    </Accordion.Item>
}

export default function BondList({ bonds, onDeleteBondCommand }: {
    bonds: Bond[],
    onDeleteBondCommand: (id: string) => void
}): JSX.Element {
    const tableRows = bonds.map(bond =>
        <BondRow bond={bond} key={bond.id} onDeleteBondCommand={onDeleteBondCommand} />);
    return <div>
        <Accordion.Root type='multiple'>
            {tableRows}
        </Accordion.Root>
    </div>
}
