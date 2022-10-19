import './App.css';
import {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedPoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import * as MainApi from '../../utils/MainApi';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogin({ email, password }) {
    console.log(email, password)
    MainApi
      .login({ email, password })
      .then((user) => {
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister({ name, email, password }) {
    MainApi
    .register({name, email, password})
    .then((user) => {
        setLoggedIn(true);
        navigate('/movies');
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
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
            element={ <Login onLogin={handleLogin}/> }
          />
          <Route
            path='/signup'
            element={ <Register onRegister={handleRegister} /> }
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
