import { Bond } from '../model/bond'

export default function TableInput(props: { bonds: Bond[] }): JSX.Element {
    const tableRows = [] as JSX.Element[];
    for (const bond of props.bonds) {
        const tableRow = <div>
            <div>{bond.dateIssued.toString()}</div>
        </div>;
        tableRows.push(tableRow)
    }
    return <div><div>
        <div>Date Issued</div>
        <div>Principal</div>
        <div>Value</div>
        <div>Effective Rate</div>
        <div>Action</div>
    </div>
        <div>
            {tableRows}
        </div>
    </div>
}