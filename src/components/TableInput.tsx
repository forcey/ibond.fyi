import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Bond } from '../model/bond';
import { formatDollars, formatPercent } from '../utils/math';
import './TableInput.css';

function BondRow({ bond }: { bond: Bond }): JSX.Element {
    const values = bond.calculateValue().reverse();
    const valueRows = values.map(value => <div className='tableRow'>
        <div className='tableCell'>{value.date.toLocaleDateString("en-US")}</div>
        <div className='tableCell'>{formatDollars(value.value * value.multiplier)}</div>
        <div className='tableCell'>{formatPercent(value.compositeRate, 2)}</div>
    </div>);
    const latestValue = values[0].value * values[0].multiplier;

    return <Accordion.Item value={bond.id}>
        <Accordion.Header>
            <div className='tableRow'>
                <div className='tableCell'>{bond.dateIssued.toLocaleDateString("en-US")}</div>
                <div className='tableCell'>{formatDollars(bond.principal)}</div>
                <div className='tableCell'>{formatDollars(latestValue)}</div>
                <div className='tableCell'>
                    <Accordion.Trigger className='AccordionTrigger'>
                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                    </Accordion.Trigger>
                </div>
            </div>
        </Accordion.Header>
        <Accordion.Content>
            {valueRows}
        </Accordion.Content>
    </Accordion.Item>
}

export default function TableInput({ bonds }: { bonds: Bond[] }): JSX.Element {
    const tableRows = bonds.map(bond => <BondRow bond={bond} key={bond.id} />);
    return <div>
        <div className='tableRow'>
            <div className='tableCell'>Date Issued</div>
            <div className='tableCell'>Principal</div>
            <div className='tableCell'>Value</div>
        </div>
        <Accordion.Root type='multiple'>
            {tableRows}
        </Accordion.Root>
    </div>
}
