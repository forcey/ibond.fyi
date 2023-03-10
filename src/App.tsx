import './App.css'
import TableInput from './components/TableInput'
import { Bond } from './model/bond'

function App() {
  return (
    <div className="App">
      <h1>I-Bond Calculator</h1>
      {/* TODO: add chart here */}
      <TableInput bonds={[
        new Bond(new Date(2022, 3, 1), 10000),
        new Bond(new Date(2022, 9, 1), 10000),
        new Bond(new Date(2023, 0, 1), 10000),
      ]} />
    </div>
  )
}

export default App
