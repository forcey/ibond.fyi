import './App.css';
import TableInput from './components/TableInput';
import { Bond, compositeRate } from './model/bond';
import { lookupRate } from './model/rateTable';
import { Months } from './utils/date';

function App() {
  const currentRates = lookupRate(new Date());
  const compositeRateNow = (currentRates.fixedRate !== undefined && currentRates.inflationRate !== undefined) ?
    compositeRate(currentRates.fixedRate, currentRates.inflationRate) :
    undefined;

  return (
    <div className="App">
      <h1>I-Bond Calculator</h1>
      {
        (compositeRateNow !== undefined) && (
          <p>Current composite rate is <strong>{(compositeRateNow * 100).toFixed(2)}%</strong>.<br />
            <a href="https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/">Learn more</a>
          </p>
        )
      }

      {/* TODO: add chart here */}
      <TableInput bonds={[
        new Bond(new Date(2022, Months.April, 1), 10000),
        new Bond(new Date(2022, Months.October, 1), 10000),
        new Bond(new Date(2023, Months.January, 1), 10000),
      ]} />
    </div>
  )
}

export default App
