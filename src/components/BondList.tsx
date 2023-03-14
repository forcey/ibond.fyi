import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Bond, BondValue } from '../model/bond';
import { formatMonth } from '../utils/date';
import { formatDollars, formatPercent } from '../utils/math';
import './BondList.css';

function TableCell({ label, children, style }: { label?: string, children: React.ReactNode, style?: React.CSSProperties }): JSX.Element {
    return <div className='tableCell' style={style}>
        {label && <div className='label'>{label}</div>}
        <div className='text'>{children}</div>
    </div>;
}

function BondDetailTable({ values }: { values: BondValue[] }): JSX.Element {
    const valueRows = values.map((value, index) => <tr key={index}>
        <td>{formatMonth(value.date)}</td>
        <td>{formatPercent(value.compositeRate, 2)}</td>
        <td>{formatDollars(value.value * value.multiplier)}</td>
        <td>TODO</td>
        <td>TODO</td>
    </tr>);
    // Make the table area scrollable.
    return <div style={{ "overflow": "auto" }}>
        <table>
            <thead>
                <tr>
                    <th style={{'minWidth': '5em'}}>Month</th>
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

function BondRow({ bond }: { bond: Bond }): JSX.Element {
    const values = bond.calculateValue().reverse();

    const latestValue = values[0].value * values[0].multiplier;

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
            <BondDetailTable values={values}></BondDetailTable>
        </Accordion.Content>
    </Accordion.Item>
}

export default function BondList({ bonds }: { bonds: Bond[] }): JSX.Element {
    const tableRows = bonds.map(bond => <BondRow bond={bond} key={bond.id} />);
    return <div>
        <Accordion.Root type='multiple'>
            {tableRows}
        </Accordion.Root>
    </div>
}
