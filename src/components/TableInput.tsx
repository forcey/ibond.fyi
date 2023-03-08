import { Bond } from '../model/bond'
import './TableInput.css'

export default function TableInput(props: { bonds: Bond[] }): JSX.Element {
    const tableRows = [] as JSX.Element[];
    for (const bond of props.bonds) {
        const tableRow = <div className='tableRow'>
            <div>{bond.dateIssued.toDateString()}</div>
            <div>${bond.principal}</div>
            <div>$12345</div>
            <div>1.23%</div>
            <div>Expand Duplicate Delete</div>
        </div>;
        tableRows.push(tableRow)
    }
    return <div>
        <div className='tableRow'>
            <div>Date Issued</div>
            <div>Principal</div>
            <div>Value</div>
            <div>Effective Rate</div>
            <div>Action</div>
        </div>
        {tableRows}
    </div>
}