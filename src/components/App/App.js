import './App.css';
import {useState, useEffect, useCallback } from 'react';
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
import * as MoviesApi from '../../utils/MoviesApi'
import CurrentUserContext from '../../contexts/CurrentUserContext';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isInfotipOpen, setIsInfotipOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin({ email, password }) {
    MainApi
      .login({ email, password })
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        setLoginError('');
        navigate('/movies');
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  }

  function handleRegister({ name, email, password }) {
    MainApi
    .register({ name, email, password })
    .then(() => {
      setRegisterError('');
      handleLogin({ email, password })
    })
    .catch((err) => {
      setRegisterError(err.message);
    })
  }

  function handleUpdateUser({ name, email }) {
    MainApi
    .updateUser({ name, email })
    .then((user) => {
      setCurrentUser(user.data);
      setProfileError('');
      setIsInfotipOpen(true);
      setProfileError('');
    })
    .catch((err) => {
      setProfileError(err.message);
      setIsInfotipOpen(true);
    })
  }

  function handleSignout() {
    MainApi
    .logout()
    .then(() => {
      setLoggedIn(false);
      setCurrentUser(null);
      navigate('/');
    })
    .catch((err) => {
      setProfileError(err.message);
      setIsInfotipOpen(true);
    })
  }

  function handleInfotipClose() {
    setIsInfotipOpen(false);
  }

  function loadAllMovies() {
    setIsLoading(true);
    MoviesApi
    .getAllMovies()
    .then((data) => {
      setAllMovies(data);
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  const loadSavedMovies = useCallback(() => {
    MainApi
    .getSavedMovies()
    .then((res) => setSavedMovies(res.data))
    .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    MainApi
      .getCurrentUser()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                  loadAllMovies={loadAllMovies}
                  loadSavedMovies={loadSavedMovies}
                  allMovies={allMovies}
                  savedMovies={savedMovies}
                  isLoading={isLoading}
                /> 
              } />
            <Route
              path='/saved-movies'
              element={ 
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  loadMovies={loadSavedMovies}
                  movies={savedMovies}
                /> 
              } />
            <Route
              path='/profile'
              element={ 
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  onSignout={handleSignout}
                  onUpdateUser={handleUpdateUser}
                  isInfotipOpen={isInfotipOpen}
                  updateUserError={profileError}
                  handleInfotipClose={handleInfotipClose}
                /> 
              } />
            <Route
              path='/signin'
              element={ 
                <Login 
                  onLogin={handleLogin} 
                  loginError={loginError}
                  setLoginError={setLoginError}
                /> 
              } />
            <Route
              path='/signup'
              element={
                <Register 
                  onRegister={handleRegister}
                  registerError={registerError}
                  setRegisterError={setRegisterError}
                /> 
              } />
            <Route
              path='*'
              element={ <NotFound /> }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
