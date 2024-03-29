import { PlusIcon, Share2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import BondList from './components/BondList';
import { Bond, compositeRate } from './model/bond';
import { lookupRate } from './model/rateTable';
import { deserialize, serialize } from './model/serialization';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    const hash = window.location.hash;
    if (hash.length > 1) {
      const deserializedBonds = deserialize(hash.substring(1));
      setBonds(deserializedBonds);
    }
    setInitialized(true);
  }

  const currentRates = lookupRate(new Date());
  const compositeRateNow = (currentRates.fixedRate !== undefined && currentRates.inflationRate !== undefined) ?
    compositeRate(currentRates.fixedRate, currentRates.inflationRate) :
    undefined;

  const handleDeleteBond = (id: string) => {
    setBonds(bonds.filter((bond: Bond) => bond.id !== id));
  }
  const handleBondChanged = (id: string, newBond: Bond) => {
    setBonds(bonds.map((bond: Bond) => bond.id === id ? newBond : bond));
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
  const share = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", { toastId: 'linkCopied' });
  }

  updateHash();

  return (
    <div className="max-w-lg text-center p-4 m-auto">
      <h1>I-Bond Calculator</h1>
      {
        (compositeRateNow !== undefined) ? (
          <p>Current composite rate is <strong>{(compositeRateNow * 100).toFixed(2)}%</strong>.<br />
            <a href="https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/">Learn more</a>
          </p>
        ) : (
          <div className='
            bg-amber-100 text-amber-900 border-amber-200
            dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700
            border border-solid rounded-md p-2'>
            This tool has not been updated with the latest rate.<br />
            Results below may be incomplete.
          </div>
        )
      }

      {/* TODO: add chart here */}
      <BondList bonds={bonds} handleBondChanged={handleBondChanged} handleDeleteBond={handleDeleteBond} />
      <button className="mx-2 bg-blue-400 dark:bg-blue-800" onClick={e => addBond()}><PlusIcon className='inlineIcon' /> Add Bond</button>
      <button className="mx-2 bg-blue-400 dark:bg-blue-800" onClick={e => share()}><Share2Icon className='inlineIcon' /> Save / Share</button>

      <ToastContainer position="bottom-center"
        autoClose={5000} />
    </div>
  )
}

export default App
