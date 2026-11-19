import Footer from './Footer.tsx';
import Header from './Header.tsx'
import Field from './Field.tsx';
import Card from './Card.tsx';
import Button from './Button/Button.tsx';
import Glonks from './Glonk.tsx';
import Sidebar from './Sidebar.tsx';

function App() {

  let userMoney: number = 50;
  let numGlonks: number = 8;
  
  return(
    <>
      <Header/>
      <div className='midscreen'>
        <Field max_glonks={10} spawn_interval_ms={2000} glonk_min_value={5} glonk_max_value={15} glonks_spawn_min={1} glonks_spawn_max={3}/>
        <Sidebar/>
      </div>
      <Footer money={userMoney} glonks={numGlonks}/>
    </>
  );
}

export default App
