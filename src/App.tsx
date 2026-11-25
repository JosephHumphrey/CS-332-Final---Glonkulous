
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import Field from './Field.tsx';
import Sidebar from './Sidebar.tsx';
import { useEffect, useState } from 'react';
import {type ShopItemData} from "./ShopItem.tsx";
import type { GlonkData } from "./Glonk";

// type ShopItemData = Pick<ShopItemProps, 'id' | 'name' | 'cost' | 'description' | 'icon'>;
// type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;
// Function to create the arguments to create a glonk
function makeGlonk(min_value: number, max_value: number): GlonkData {
  return {
    id: crypto.randomUUID(),
    name: "test",
    value: RandomNumberInRange(min_value, max_value),
    x: RandomNumberInRange(0, 500),
    y: RandomNumberInRange(0, 300),
  };
}

function RandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {

  const [userMoney, setUserMoney] = useState<number>(0);
  const [glonks, setGlonks] = useState<GlonkData[]>([]);

  const max_glonks = 100;
  const [spawnInterval, setSpawnInterval] = useState(8000);
  const [glonkMinValue] = useState(1);
  const [glonkMaxValue] = useState(5);
  const [glonksSpawnMin, setGlonksSpawnMin] = useState(1);
  const [glonksSpawnMax, setGlonksSpawnMax] = useState(1);
  const [sellRadius, setSellRadius] = useState(0);

  // Handle Shop
  const [availableItems, setAvailableItems] = useState<ShopItemData[]>([
    { id: 1, name: "Spawn Rate 1", cost: 15, description: "Glonks now spawn every 3 seconds", buyable: true},
    { id: 2, name: "Spawn Quantity 1", cost: 30, description: "Up to 3 glonks can now spawn at a time", buyable: true},
    { id: 3, name: "Spawn Rate 2", cost: 50, description: "Glonks now spawn every second", buyable: false},
    { id: 4, name: "Spawn Quantity 2", cost: 80, description: "Up to 5 glonks can now spawn at a time", buyable: false},
    { id: 5, name: "Sell Area 1", cost: 100, description: "Sell all glonks in an area", buyable: true},
    { id: 6, name: "Sell Area 2", cost: 150, description: "Sell all in a larger area", buyable: false}
  ]);

  // Handle buying an item
  const handleBuy = (item: typeof availableItems[0]) => {
    if (userMoney >= item.cost) {
      setUserMoney(prev => prev - item.cost);
      setAvailableItems(prev => prev.filter(i => i.id !== item.id));
      console.log(`Bought ${item.name} id: ${item.id}. Remaining money: ${userMoney - item.cost}`);

      switch(item.id) {
        case 1:
          setSpawnInterval(3000);
          unlockNext(3);
          break;
        case 2:
          setGlonksSpawnMax(3);
          unlockNext(4);
          break;
        case 3:
          setSpawnInterval(1000);
          break;
        case 4:
          setGlonksSpawnMin(2);
          setGlonksSpawnMax(5);
          break;
        case 5:
          setSellRadius(100);
          unlockNext(6);
          break;
        case 6:
          setSellRadius(150);
          break;
      }

    } else {
      console.log("Not enough money!");
    }
  };

  //Unlocks next upgrade in the shop
  function unlockNext(nextID: number) {
    setAvailableItems(prev =>
      prev.map(item => item.id === nextID ? {...item, buyable: true} : item)
    );
  }

  // Handle Field / Glonks
  // Callback to handle clicks from Field
  const handleGlonkClick = (
    clickedGlonk: GlonkData,
    shiftKey: boolean
  ) => {
    if (shiftKey) {
        addGlonk(1);
    } else {
        sellGlonk(clickedGlonk);
    }
  };

  //Sells the glonk
  const sellGlonk = (glonk: GlonkData) => {
    setUserMoney(prev => prev + glonk.value);

    setGlonks(prev =>
        prev.filter(g => g.id !== glonk.id)
    );
  };

  const sellInRadius = (glonkIds: string[]) => {
    glonkIds.forEach(id => {
      const glonk = glonks.find(g => g.id === id);
      if (glonk) {
        sellGlonk(glonk);
      }
    });
  };

  const addGlonk = (count: number) => {
    setGlonks((prev) => {
      // Check how many more glonks can be added without exeeding the limit
      const room = max_glonks - prev.length;
      if (room <= 0) return prev;

      // add the number of glonks provided or as many as can be without exeeding the limit
      const n = Math.min(count, room);
      const batch = Array.from( {length: n }, () => makeGlonk(glonkMinValue, glonkMaxValue));

      return [...prev, ...batch]
    });
  };

  // const removeGlonk = (id: string) => {
  //     setGlonks((prev) => prev.filter((g) => g.id !== id));
  // };

  useEffect(() => {
    const interval = setInterval(() => {
        const batchSize = RandomNumberInRange(
            glonksSpawnMin,
            glonksSpawnMax
        );
        addGlonk(batchSize);
    }, spawnInterval);
    return () => clearInterval(interval);
  }, [spawnInterval, glonksSpawnMin, glonksSpawnMax]);

  return(
    <>
      <Header/>

      <div className='midscreen'>
        <Field glonks={glonks}
                onGlonkClick={handleGlonkClick}
                onClick={sellInRadius}
                sellRadius={sellRadius}/>
        <Sidebar items={availableItems} onBuy={handleBuy}/>
      </div>
      <Footer money={userMoney} glonks={glonks.length}/>
    </>
  );
}

export default App;
