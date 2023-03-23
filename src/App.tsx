import { useState } from 'react';
import './App.css';
import BondList from './components/BondList';
import { Bond, compositeRate } from './model/bond';
import { lookupRate } from './model/rateTable';
import { Months } from './utils/date';

function App() {
  const [bonds, setBonds] = useState<Bond[]>([
    new Bond(new Date(2021, Months.April, 1), 10000),
    new Bond(new Date(2022, Months.April, 1), 10000),
    new Bond(new Date(2022, Months.October, 1), 10000),
    new Bond(new Date(2023, Months.January, 1), 10000),
  ]);
  
  const currentRates = lookupRate(new Date());
  const compositeRateNow = (currentRates.fixedRate !== undefined && currentRates.inflationRate !== undefined) ?
    compositeRate(currentRates.fixedRate, currentRates.inflationRate) :
    undefined;

  const handleDeleteBond = (id: string) => {
    setBonds(bonds.filter((bond: Bond) => bond.id !== id));
  }

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
      <BondList bonds={bonds} onDeleteBondCommand={handleDeleteBond} />
    </div>
  )
}

export default App
