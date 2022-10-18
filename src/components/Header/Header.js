import './Header.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ page, loggedIn }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function openNavMenu() {
    setIsNavOpen(true);
  }
 
  function closeNavMenu() {
    setIsNavOpen(false);
  }
  
  return (
    <header className={`header header_place_${page}`}>
      <Logo />
      { loggedIn ? 
      (
        <>
          <button className='header__menu-button' onClick={openNavMenu}/>
          <Navigation isOpened={isNavOpen} handleClose={closeNavMenu}/>
        </>
      ) :  (
        <div className='header__links'>
          <Link to='/signup' className='header__link'>Регистрация</Link>
          <Link to='/signin' className='header__link header__link_accented'>Войти</Link>
        </div>
      )}      
    </header>
  );
}

export default Header;
