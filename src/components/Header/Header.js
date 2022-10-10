import './Header.css';

import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);

  function openNavMenu() {
    setIsNavMenuOpened(true);
  }

  function closeNavMenu() {
    setIsNavMenuOpened(false);
  }
  
  return (
    <header className='header'>
      <Logo />
      <Navigation isOpened={ isNavMenuOpened } handleClose={ closeNavMenu }/>
      <button className='header__menu-button' onClick={ openNavMenu }/>
    </header>
  );
}

export default Header;
