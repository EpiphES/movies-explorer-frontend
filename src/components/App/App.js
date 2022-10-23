import './App.css';
import {useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedPoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import * as MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isAuth'));
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isLoadMoviesError, setIsLoadMoviesError] = useState(false);
  const [isInfotipOpen, setIsInfotipOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  

  function handleLogin({ email, password }) {
    MainApi
      .login({ email, password })
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        localStorage.setItem('isAuth', true)
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
      localStorage.clear();
    })
    .catch((err) => {
      setProfileError(err.message);
      setIsInfotipOpen(true);
    })
  }

  function handleInfotipClose() {
    setIsInfotipOpen(false);
  }

  function loadSavedMovies() {
    MainApi
    .getSavedMovies()
    .then((res) => setSavedMovies(res.data))
    .catch((err) => {
      setIsLoadMoviesError(true)
      console.log(err)
    });
  };

  function handleSaveMovie(data) {
    MainApi
    .saveMovie(data)
    .then((res) => {
      setSavedMovies((prevVal) => {
        return prevVal.concat(res.data);
      })
    })
    .catch((err) => console.log(err));
  }

  function handleDeleteMovie(id) {
    MainApi
    .deleteMovie(id)
    .then((res) => {
      setSavedMovies((prevVal) => {
        return prevVal.filter((item) => item._id !== res.data._id);
      })
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    MainApi
      .getCurrentUser()
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem('isAuth', true);
        setCurrentUser(user.data);
      })
      .catch((err) => {
        localStorage.removeItem('isAuth');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(loggedIn) {
      loadSavedMovies();      
    }
  }, [loggedIn]);
  
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
                  savedMovies={savedMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                /> 
              } />
            <Route
              path='/saved-movies'
              element={ 
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  isError={isLoadMoviesError}
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
                loggedIn ? 
                <Navigate to='/' replace/> : 
                <Login 
                  onLogin={handleLogin} 
                  loginError={loginError}
                  setLoginError={setLoginError}
                /> 
              } />
            <Route
              path='/signup'
              element={
                loggedIn ? 
                <Navigate to='/' replace/> :
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
