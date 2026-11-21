import Footer from './Footer.tsx';
import Header from './Header.tsx'
import Field from './Field.tsx';
import {type GlonkProps} from "./Glonk";
import Sidebar from './Sidebar.tsx';
import { useEffect, useState } from 'react';
import {type ShopItemData} from "./Sidebar.tsx";

// type ShopItemData = Pick<ShopItemProps, 'id' | 'name' | 'cost' | 'description' | 'icon'>;
type GlonkData = Pick<GlonkProps, 'id' | 'name' | 'value'>;
// Function to create the arguments to create a glonk
function makeGlonk(min_value: number, max_value: number): GlonkData {
  return {
    id: crypto.randomUUID(),
    name: "test",
    value: RandomNumberInRange(min_value, max_value),
  };
}

function RandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {

  const [userMoney, setUserMoney] = useState<number>(0);
  const [glonks, setGlonks] = useState<GlonkData[]>([]);

  const max_glonks = 20;
  const spawn_interval_ms = 1000;
  const glonk_min_value = 1;
  const glonk_max_value = 5;
  const glonks_spawn_min = 1;
  const glonks_spawn_max = 1;


  const [availableItems, setAvailableItems] = useState<ShopItemData[]>([
    { id: 1, name: "test", cost: 12, description: "lorem ipsum", icon: "" },
    { id: 2, name: "upgrade", cost: 3, description: "hello", icon: "" },
  ]);

  // Handle buying an item
  const handleBuy = (item: typeof availableItems[0]) => {
    if (userMoney >= item.cost) {
      setUserMoney(prev => prev - item.cost);
      setAvailableItems(prev => prev.filter(i => i.id !== item.id));
      console.log(`Bought ${item.name}. Remaining money: ${userMoney - item.cost}`);

      switch(item.id) {
        case 1: {
          // do whatever the upgrade should do
          break;
        }
      }

    } else {
      console.log("Not enough money!");
    }
  };

  // Callback to handle clicks from Field
  const handleGlonkClick = (clickedGlonk: GlonkData) => {
    setUserMoney((prevMoney) => prevMoney + clickedGlonk.value);
    setGlonks((prev) => prev.filter((g) => g.id !== clickedGlonk.id));
  };

  const addGlonk = (count: number) => {
        setGlonks((prev) => {
            // Check how many more glonks can be added without exeeding the limit
            const room = max_glonks - prev.length;
            if (room <= 0) return prev;

            // add the number of glonks provided or as many as can be without exeeding the limit
            const n = Math.min(count, room);
            const batch = Array.from( {length: n }, () => makeGlonk(glonk_min_value, glonk_max_value));

            return [...prev, ...batch]
        });
    };

    // const removeGlonk = (id: string) => {
    //     setGlonks((prev) => prev.filter((g) => g.id !== id));
    // };

    useEffect(() => {
        const interval = setInterval(() => {
            const batchSize = RandomNumberInRange(glonks_spawn_min, glonks_spawn_max);
            addGlonk(batchSize);
        }, spawn_interval_ms);
        return () => clearInterval(interval);
    }, []);

  
  return(
    <>
      <Header/>
      <div className='midscreen'>
        <Field glonks={glonks}
                onGlonkClick={handleGlonkClick}/>
        <Sidebar items={availableItems} onBuy={handleBuy}/>
      </div>
      <Footer money={userMoney} glonks={glonks.length}/>
    </>
  );
}

export default App
