import './App.css';
import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedPoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className='app'>
      <div className='app__container'>
        <Routes>
          <Route
            path='/'
            element={ 
              <Main loggedIn={loggedIn}/> 
            } />
          <Route
            path='/movies'
            element={ 
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
               /> 
            } />
          <Route
            path='/saved-movies'
            element={ 
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
               /> 
            } />
          <Route
            path='/profile'
            element={ 
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
               /> 
            } />
          <Route
            path='/signin'
            element={ <Login /> }
          />
          <Route
            path='/signup'
            element={ <Register /> }
          />
          <Route
            path='*'
            element={ <NotFound /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
