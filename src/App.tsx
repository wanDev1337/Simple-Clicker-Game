import React, { useState, useEffect } from 'react';
import { MousePointer2, Coins, ArrowUp } from 'lucide-react';

interface Upgrade {
  id: number;
  name: string;
  cost: number;
  multiplier: number;
}

const upgrades: Upgrade[] = [
  { id: 1, name: 'Double Click', cost: 10, multiplier: 2 },
  { id: 2, name: 'Triple Click', cost: 50, multiplier: 3 },
  { id: 3, name: 'Quad Click', cost: 100, multiplier: 4 },
];

function App() {
  const [count, setCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<number[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    setCount((prevCount) => prevCount + clickPower);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Reset shaking after 500ms
  };

  const purchaseUpgrade = (upgrade: Upgrade) => {
    if (count >= upgrade.cost && !purchasedUpgrades.includes(upgrade.id)) {
      setCount((prevCount) => prevCount - upgrade.cost);
      setClickPower((prevPower) => prevPower * upgrade.multiplier);
      setPurchasedUpgrades((prevUpgrades) => [...prevUpgrades, upgrade.id]);
    }
  };

  useEffect(() => {
    document.title = `Clicker Game - ${count} coins`;
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Clicker Game</h1>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Coins className="w-6 h-6 mr-2 text-yellow-500" />
            <span className="text-2xl font-semibold">{count}</span>
          </div>
          <div className="flex items-center">
            <MousePointer2 className="w-6 h-6 mr-2 text-blue-500" />
            <span className="text-xl font-medium">{clickPower}</span>
          </div>
        </div>
        <button
          onClick={handleClick}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mb-6 ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          Click Me!
        </button>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Upgrades</h2>
          {upgrades.map((upgrade) => (
            <button
              key={upgrade.id}
              onClick={() => purchaseUpgrade(upgrade)}
              disabled={count < upgrade.cost || purchasedUpgrades.includes(upgrade.id)}
              className={`w-full flex items-center justify-between bg-gray-200 hover:bg-gray-300 font-medium py-2 px-4 rounded-lg transition duration-200 ${
                purchasedUpgrades.includes(upgrade.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : count < upgrade.cost
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <span>{upgrade.name}</span>
              <div className="flex items-center">
                <Coins className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{upgrade.cost}</span>
                <ArrowUp className="w-4 h-4 ml-2 text-green-500" />
                <span className="ml-1">{upgrade.multiplier}x</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;