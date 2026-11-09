import Footer from './Footer.tsx';
import Header from './Header.tsx'
import Field from './Field.tsx';
import Card from './Card.tsx';
import Button from './Button/Button.tsx';
import Glonks from './Glonks.tsx';

function App() {

  let userMoney: number = 50;
  let numGlonks: number = 8;
  
  return(
    <>
      <Header/>
      <Field/>
      <Card/>
      <Glonks name="spongebob" value={23}/>
      <Button/>
      <Footer money={userMoney} glonks={numGlonks}/>
    </>
  );
}

export default App
