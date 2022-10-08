import './Main.css';

import '../Footer/Footer';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from'../Techs/Techs';
import '../AboutMe/AboutMe';
import '../Portfolio/Portfolio';

function Main() {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
      <Techs />
    </div>
  );
}

export default Main;
