import * as Accordion from '@radix-ui/react-accordion';
import { CheckIcon, ChevronDownIcon, Cross1Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';
import { Bond } from '../model/bond';
import { formatMonth, parseYearMonth } from '../utils/date';
import { formatDollars } from '../utils/math';
import { BondDetailTable } from './BondDetailsTable';
import './BondList.css';
import { MonthInput } from './MonthInput';

function TableCell({ label, labelFor, children, className }: {
    label?: string, labelFor?: string, children: React.ReactNode, className?: string
}): JSX.Element {
    return <div className={'p-1 text-left ' + className}>
        {label && <div className='text-[50%]'>
            {labelFor ? <label htmlFor={labelFor}>{label}</label> : label}
        </div>}
        <div>{children}</div>
    </div>;
}

function BondRow({ bond, handleBondChanged, handleDeleteBond }: {
    bond: Bond,
    handleBondChanged: (id: string) => void,
    handleDeleteBond: (id: string) => void,
}): JSX.Element {
    const [editMode, setEditMode] = useState(false);
    const [issueMonth, setIssueMonth] = useState("");
    const [principal, setPrincipal] = useState("");
    const monthInput = useRef<HTMLInputElement>(null);
    const principalInput = useRef<HTMLInputElement>(null);

    const startEdit = () => {
        setEditMode(true);
        setIssueMonth(bond.dateIssued.toISOString().substring(0, 7));
        setPrincipal(bond.principal.toString());
    }
    const finishEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        // check validity of inputs
        if (monthInput.current === null || principalInput.current === null) {
            e.preventDefault();
            return;
        }
        if (!monthInput.current.reportValidity() || !principalInput.current.reportValidity()) {
            e.preventDefault();
            return;
        }

        const dateIssued = parseYearMonth(issueMonth);
        const principalValue = parseFloat(principal);
        bond.isNew = false;
        if (dateIssued != bond.dateIssued || principalValue !== bond.principal) {
            bond.dateIssued = dateIssued;
            bond.principal = principalValue;
            handleBondChanged(bond.id);
        }
        setEditMode(false);
    }
    const cancelEdit = () => {
        setEditMode(false);
        if (bond.isNew) {
            handleDeleteBond(bond.id);
        }
    }
    if (bond.isNew && !editMode) {
        startEdit();
    }

    const values = bond.calculateValue(new Date());
    const latestValue = bond.redeemableValue(values, values.length - 1).value;

    const editModeClass = editMode ? " editMode" : "";
    const buttons = editMode ?
        <>
            <button className="mx-2 bg-green-400 dark:bg-green-800" onClick={finishEdit} key="doneButton" type="submit"><CheckIcon className='inlineIcon' /> Done</button>
            <button className="mx-2 bg-red-400 dark:bg-red-800" onClick={e => cancelEdit()} key="cancelButton"><Cross1Icon className='inlineIcon' /> Cancel</button>
        </> : <>
            <button className="mx-2 bg-blue-400 dark:bg-blue-800" onClick={e => startEdit()} key="editButton"><Pencil1Icon className='inlineIcon' /> Edit</button>
            <button className="mx-2 bg-red-400 dark:bg-red-800" onClick={e => handleDeleteBond(bond.id)} key="deleteButton"><TrashIcon className='inlineIcon' /> Delete</button>
        </>

    const currentMonth = new Date().toISOString().substring(0, 7);
    const tableCells = editMode ?
        <div className='flex w-full'>
            <TableCell label="Month Issued" labelFor="issueMonth" className='min-w-[50%]'>
                <MonthInput ref={monthInput}
                    min="1998-09" max={currentMonth} value={issueMonth}
                    onChange={setIssueMonth} />
            </TableCell>
            <TableCell label="Principal" labelFor='principal' className='min-w-[50%]'>
                $ <input type="number" id="principal" name="principal"
                    ref={principalInput}
                    required min="25" max="10000" value={principal}
                    onChange={e => setPrincipal(e.currentTarget.value)}
                    className="p-1 font-sans text-base w-5/6 box-border border-solid border rounded-md invalid:border-pink-500 invalid:text-pink-600" />
            </TableCell>
        </div> : <div className='flex w-full'>
            <TableCell label="Month Issued" className='whitespace-nowrap min-w-[30%]'>{formatMonth(bond.dateIssued)}</TableCell>
            <TableCell label="Principal" className='whitespace-nowrap min-w-[30%]'>{formatDollars(bond.principal)}</TableCell>
            <TableCell label="Value" className='whitespace-nowrap min-w-[30%]'>{formatDollars(latestValue)}</TableCell>
        </div>

    return <Accordion.Item value={bond.id} className={"AccordionItem" + editModeClass}>
        <form>
            <Accordion.Header>
                <div className='tableRow'>
                    {tableCells}
                    <TableCell className='ml-auto mr-[-80px]'>
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
        </form>
    </Accordion.Item>
}

function TotalRow({ bonds }: { bonds: Bond[] }): JSX.Element {
    const principal = bonds.reduce((sum, bond) => sum + bond.principal, 0);
    const value = bonds.reduce((sum, bond) => sum + bond.getValueOfDate(new Date()).value, 0);
    return <div className='tableRow border rounded-md border-solid
             bg-green-100 dark:bg-green-950
             border-green-600 dark:border-green-500 py-2'>
        <TableCell className='whitespace-nowrap min-w-[30%]'>Total</TableCell>
        <TableCell label="Principal" className='whitespace-nowrap min-w-[30%]'>{formatDollars(principal)}</TableCell>
        <TableCell label="Value" className='whitespace-nowrap min-w-[30%]'>{formatDollars(value)}</TableCell>
    </div>
}

export default function BondList({ bonds, handleBondChanged, handleDeleteBond }: {
    bonds: Bond[],
    handleBondChanged: (id: string) => void,
    handleDeleteBond: (id: string) => void
}): JSX.Element {
    const [openItems, setOpenItems] = useState<string[]>([]);

    // Add any bonds that are new to the list of open items.
    const editModeBonds = bonds.filter(bond => bond.isNew).map(bond => bond.id);
    const newOpenItems: string[] = [];
    editModeBonds.forEach(bondId => {
        if (!openItems.includes(bondId)) {
            newOpenItems.push(bondId);
        }
    });
    if (newOpenItems.length > 0) {
        setOpenItems(openItems.concat(newOpenItems));
    }

    const tableRows = bonds.map(bond =>
        <BondRow bond={bond} key={bond.id} handleBondChanged={handleBondChanged} handleDeleteBond={handleDeleteBond} />);
    return <div className='my-4'>
        <Accordion.Root type='multiple' value={openItems} onValueChange={setOpenItems}>
            {tableRows}
        </Accordion.Root>
        <TotalRow bonds={bonds} />
    </div>
}
