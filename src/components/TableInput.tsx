import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Bond } from '../model/bond';
import './TableInput.css';

export default function TableInput(props: { bonds: Bond[] }): JSX.Element {
    const tableRows = props.bonds.map((bond) => (
        <Accordion.Item value={bond.id}>
            <Accordion.Header>
                <div className='tableRow'>
                    <div className='tableCell'>{bond.dateIssued.toLocaleDateString("en-US")}</div>
                    <div className='tableCell'>${bond.principal}</div>
                    <div className='tableCell'>$12345</div>
                    <div className='tableCell'>
                        <Accordion.Trigger className='AccordionTrigger'>
                            <ChevronDownIcon className="AccordionChevron" aria-hidden />
                        </Accordion.Trigger>
                    </div>
                </div>
            </Accordion.Header>
            <Accordion.Content>
                details here
            </Accordion.Content>
        </Accordion.Item>));
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