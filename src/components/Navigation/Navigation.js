import './Navigation.css';

import { NavLink, Link } from 'react-router-dom';

function Navigation({ isOpened, handleClose }) {
  return (
    <div className={`navigation ${ isOpened ? 'navigation_opened' : ''}`}>
     <div className='navigation__menu'>
      <button className='navigation__close navigation__hidden-item' onClick={ handleClose }/>
      <ul className='navigation__links-list'>
        <li>
          <NavLink end to='/' className='navigation__link navigation__hidden-item'>Главная</NavLink>
        </li>
        <li>
          <NavLink to='/movies' className=  'navigation__link'>Фильмы</NavLink>
        </li>
        <li>
          <NavLink to='/saved-movies' className='navigation__link' >Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <Link to='/profile' className='navigation__profile-link'>
        Аккаунт <span className='navigation__profile-icon'/>
      </Link>
     </div>
    </div>
  );
}

export default Navigation;
