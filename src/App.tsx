import './App.css'
import TableInput from './components/TableInput'

function App() {
  return (
    <div className="App">
      <h1>I-Bond Calculator</h1>
      {/* TODO: add chart here */}
      <TableInput bonds={[
        {dateIssued: new Date(2022, 3, 1), principal: 10000},
        {dateIssued: new Date(2022, 9, 1), principal: 10000},
        {dateIssued: new Date(2023, 0, 1), principal: 10000},
      ]}/>
    </div>
  )
}

export default App
