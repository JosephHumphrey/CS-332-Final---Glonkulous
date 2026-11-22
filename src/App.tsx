
import { useState } from 'react';

import Footer from './Footer.tsx';
import Header from './Header.tsx';
import Field from './Field.tsx';
import Sidebar from './Sidebar.tsx';
import type { GlonkData } from './Glonk.tsx';

function App() {

  // Our collection of Glonks
  const [glonks, setGlonks] = useState<GlonkData[]>([
    { id: 1, name: "spongebob", value: 23 }
  ]);

  const [userMoney, setUserMoney] = useState<number>(50);
  const [nextGlonkId, setNextGlonkId] = useState<number>(3);

  function handleGlonkClick(id: number, shiftKey: boolean) {

    // Find the Glonk that was clicked
    const clickedGlonk = glonks.find(glonk => glonk.id === id);

    if (!clickedGlonk) return;

    if (shiftKey) {
      // Duplicate that specific Glonk
      setGlonks(prev => [
        ...prev,
        { ...clickedGlonk, id: nextGlonkId }
      ]);

      setNextGlonkId(prev => prev + 1);
    }
    else {
      // Sell that specific Glonk
      setUserMoney(prev => prev + clickedGlonk.value);

      setGlonks(prev =>
        prev.filter(glonk => glonk.id !== id)
      );
    }
  }

  return(
    <>
      <Header/>

      <div className='midscreen'>
        <Field
          glonks={glonks}
          onGlonkClick={handleGlonkClick}
        />
        <Sidebar/>
      </div>

      <Footer money={userMoney} glonks={glonks.length}/>
    </>
  );
}

export default App;
