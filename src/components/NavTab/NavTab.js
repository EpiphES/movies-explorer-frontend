import './NavTab.css';

import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

function NavTab() {
  return (
    <div className='nav-tab'>
      <Logo />
      <div className='nav-tab__links'>
          <Link to='/signup' className='nav-tab__link'>Регистрация</Link>
          <Link to='/signin' className='nav-tab__link nav-tab__link_type_login'>Войти</Link>
      </div>  
    </div>
  );
}

export default NavTab;
