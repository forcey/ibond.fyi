import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import BondList from './components/BondList';
import { Bond, compositeRate } from './model/bond';
import { lookupRate } from './model/rateTable';
import { serialize } from './model/serialization';

function App() {
  const [bonds, setBonds] = useState<Bond[]>([]);

  const currentRates = lookupRate(new Date());
  const compositeRateNow = (currentRates.fixedRate !== undefined && currentRates.inflationRate !== undefined) ?
    compositeRate(currentRates.fixedRate, currentRates.inflationRate) :
    undefined;

  const handleDeleteBond = (id: string) => {
    setBonds(bonds.filter((bond: Bond) => bond.id !== id));
  }
  const handleBondChanged = (id: string) => {
    updateHash();
  }
  const addBond = () => {
    const bond = new Bond(new Date(), 1000);
    bond.isNew = true;
    setBonds([...bonds, bond]);
  }
  const updateHash = () => {
    window.location.hash = serialize(bonds.filter(b => !b.isNew));
  }
  updateHash();

  return (
    <div className="max-w-lg text-center p-4 m-auto">
      <h1>I-Bond Calculator</h1>
      {
        (compositeRateNow !== undefined) && (
          <p>Current composite rate is <strong>{(compositeRateNow * 100).toFixed(2)}%</strong>.<br />
            <a href="https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/">Learn more</a>
          </p>
        )
      }

      {/* TODO: add chart here */}
      <BondList bonds={bonds} handleBondChanged={handleBondChanged} handleDeleteBond={handleDeleteBond} />
      <button className="mx-2 bg-blue-400 dark:bg-blue-800" onClick={e => addBond()}><PlusIcon className='inlineIcon' /> Add Bond</button>
    </div>
  )
}

export default App
