import './App.css';

import { Routes, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='app'>
      <div className='app__container'>
        <Routes>
          <Route
            path='/'
            element={ <Main /> }
          />
          <Route
            path='/movies'
            element={ <Movies /> }
          />
          <Route
            path='/saved-movies'
            element={ <SavedMovies /> }
          />
          <Route
            path='/profile'
            element={ <Profile /> }
          />
          <Route
            path='/signin'
            element={ <Login /> }
          />
          <Route
            path='/signup'
            element={ <Register /> }
          />
          <Route
            path='/*'
            element={ <NotFound /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
