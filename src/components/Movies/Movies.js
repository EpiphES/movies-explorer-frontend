import './Movies.css';

import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import * as MoviesApi from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/utils';
import useWindowWidth from '../../utils/useWindowWidth';

function Movies({ loggedIn, savedMovies, handleSaveMovie, handleDeleteMovie }) {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState([]);
  const windowWidth = useWindowWidth();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSearch(searchQuery, isFilterActive) {
    setIsLoading(true);
    setIsSearchActive(true);
    setIsError(false);
    if(allMovies.length === 0) {
      MoviesApi
      .getAllMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem('allMovies', JSON.stringify(res));
        const filteredMovies = filterMovies(res, searchQuery, isFilterActive);
        setSearchedMovies(filteredMovies);
        localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));      
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
    } else {
      setSearchedMovies(filterMovies(allMovies, searchQuery, isFilterActive));
      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      setIsLoading(false);
    }    
    localStorage.setItem('searchQuery', searchQuery);
    isFilterActive ? 
    localStorage.setItem('filterActive', 'true') :
    localStorage.removeItem('filterActive');   
  }

  function addMovies() {
    let addition = windowWidth > 1024 ? 3 : 2;
    setSlicedMovies((prevVal) => {
      return prevVal.concat(searchedMovies.slice(prevVal.length, prevVal.length + addition));
    })
  }

  useEffect (() => {
    let limit;
    if (windowWidth > 1024) {
      limit = 12;
    } else if (windowWidth > 480) {
      limit = 8;
    } else {
      limit = 5;
    }
     if(searchedMovies.length > limit) {
      setSlicedMovies(searchedMovies.slice(0, limit))
    } else {
      setSlicedMovies(searchedMovies);
    }
  }, [windowWidth, searchedMovies]);

  useEffect(() => {
    const all = localStorage.getItem('allMovies');
    const searched = localStorage.getItem('searchedMovies');
    if(all) {
      setAllMovies(JSON.parse(all));
    }
    if(searched) {
      setSearchedMovies(JSON.parse(searched));
    }
  },[])

  return (
    <>
      < Header page={'movies'} loggedIn={loggedIn}/>
      <main className='movies'>
        <SearchForm 
          name={'movies'}
          handleSearch={handleSearch}
        />
        { isLoading && <Preloader /> }
        { isError && <p className='movies__error-message'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>}
        {
          !isLoading && !isError && isSearchActive && searchedMovies.length === 0 &&
          <p className='movies__error-message'>Ничего не найдено</p>
        }
        {
          !isLoading && !isError && searchedMovies.length > 0 &&
          <>
            <MoviesCardList 
              movies={slicedMovies}
              savedMovies={savedMovies}
              isSavedMoviesPage={false}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />       
            {
              slicedMovies.length < searchedMovies.length &&
              <button className='movies__more' type='button' onClick={ addMovies }>Ещё</button>
            }
          </>
        }   
      </main>
      <Footer />
    </>
  );
}

export default Movies;
