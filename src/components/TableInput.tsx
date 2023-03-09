import { Bond } from '../model/bond'
import './TableInput.css'

export default function TableInput(props: { bonds: Bond[] }): JSX.Element {
    const tableRows = [] as JSX.Element[];
    for (const bond of props.bonds) {
        const tableRow = <div className='tableRow'>
            <div className='tableCell'>{bond.dateIssued.toLocaleDateString("en-US")}</div>
            <div className='tableCell'>${bond.principal}</div>
            <div className='tableCell'>$12345</div>
            <div className='tableCell'>EX DU DE</div>
        </div>;
        tableRows.push(tableRow)
    }
    return <div>
        <div className='tableRow'>
            <div className='tableCell'>Date Issued</div>
            <div className='tableCell'>Principal</div>
            <div className='tableCell'>Value</div>
        </div>
        {tableRows}
    </div>
}