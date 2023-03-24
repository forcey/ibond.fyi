import * as Accordion from '@radix-ui/react-accordion';
import { CheckIcon, ChevronDownIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Bond, BondValue } from '../model/bond';
import { formatMonth, parseYearMonth } from '../utils/date';
import { formatDollars, formatPercent } from '../utils/math';
import './BondList.css';
import { InfoPopover } from './InfoPopover';

function TableCell({ label, labelFor, children, style }: {
    label?: string, labelFor?: string, children: React.ReactNode, style?: React.CSSProperties
}): JSX.Element {
    return <div className='tableCell' style={style}>
        {label && <div className='label'>
            {labelFor ? <label htmlFor={labelFor}>{label}</label> : label}
        </div>}
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
    const [editMode, setEditMode] = useState(false);
    const [issueMonth, setIssueMonth] = useState("");
    const [principal, setPrincipal] = useState("");

    const startEdit = () => {
        setEditMode(true);
        setIssueMonth(bond.dateIssued.toISOString().substring(0, 7));
        setPrincipal(bond.principal.toString());
    }
    const finishEdit = () => {
        const dateIssued = parseYearMonth(issueMonth);
        const principalValue = parseFloat(principal);
        if (dateIssued != bond.dateIssued) {
            console.log("date changed!", bond.dateIssued, dateIssued);
        }
        if (dateIssued != bond.dateIssued || principalValue !== bond.principal) {
            bond.dateIssued = dateIssued;
            bond.principal = principalValue;
            // TODO: emit bond changed event
            console.log("bond changed!", bond.dateIssued, bond.principal);
        }
        setEditMode(false);
    }

    const values = bond.calculateValue();
    const latestValue = bond.redeemableValue(values, values.length - 1).value;

    const editModeClass = editMode ? " editMode" : "";
    const buttons = editMode ?
        <button className="editButton" onClick={e => finishEdit()}><CheckIcon className='inlineIcon' /> Done</button>
        :
        <>
            <button className="editButton" onClick={e => startEdit()}><Pencil1Icon className='inlineIcon' /> Edit</button>
            <button className="editButton" onClick={e => onDeleteBondCommand(bond.id)}><TrashIcon className='inlineIcon' /> Delete</button>
        </>

    const currentMonth = new Date().toISOString().substring(0, 7);
    const tableCells = editMode ?
        <>
            <TableCell label="Month Issued" labelFor="issueMonth" style={{ "width": "fit-content" }}>
                <input type="month" id="issueMonth" name="issueMonth"
                    min="1998-09" max={currentMonth} value={issueMonth} onChange={e => setIssueMonth(e.currentTarget.value)} />
            </TableCell>
            <TableCell label="Principal" labelFor='principal' style={{ "width": "fit-content" }}>
                <input type="number" id="principal" name="principal" min="0" max="10000" value={principal} onChange={e => setPrincipal(e.currentTarget.value)} />
            </TableCell>
        </> : <>
            <TableCell label="Month Issued">{formatMonth(bond.dateIssued)}</TableCell>
            <TableCell label="Principal">{formatDollars(bond.principal)}</TableCell>
            <TableCell label="Value">{formatDollars(latestValue)}</TableCell>
        </>

    return <Accordion.Item value={bond.id} className={"AccordionItem" + editModeClass}>
        <Accordion.Header>
            <div className='tableRow'>
                {tableCells}
                <TableCell style={{ "width": "auto", "marginLeft": "auto" }}>
                    <Accordion.Trigger className='AccordionTrigger' disabled={editMode}>
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                </TableCell>
            </div>
        </Accordion.Header>
        <Accordion.Content>
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                {buttons}
            </div>
            {editMode || <BondDetailTable bond={bond} values={values}></BondDetailTable>}
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
