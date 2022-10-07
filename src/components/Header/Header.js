import './Header.css';

import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

function Header() {
  return (
    <header className='header'>
      <Logo />
      <div className='header__links'>
        <Link to='/signup' className='header__link'>Регистрация</Link>
        <Link to='/signin' className='header__link header__link_type_button'>Войти</Link>
      </div>     

    </header>
  );
}

export default Header;
