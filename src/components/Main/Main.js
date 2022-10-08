import './Main.css';

import '../Footer/Footer';

import Promo from '../Promo/Promo';
import '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import '../Techs/Techs';
import '../AboutMe/AboutMe';
import '../Portfolio/Portfolio';

function Main() {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
    </div>
  );
}

export default Main;
