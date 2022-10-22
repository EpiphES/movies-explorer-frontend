import './Movies.css';

import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import * as MoviesApi from '../../utils/MoviesApi';
import { filterByKeyWord, filterByDuration } from '../../utils/utils';
import useWindowWidth from '../../utils/useWindowWidth';

function Movies({ loggedIn, savedMovies, handleSaveMovie, handleDeleteMovie }) {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState([]);
  const windowWidth = useWindowWidth();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSearch(searchQuery) {
    setIsLoading(true);
    setIsSearchActive(true);
    setIsError(false);
    if(allMovies.length === 0) {
      MoviesApi
      .getAllMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem('allMovies', JSON.stringify(res));
        setSearchedMovies(filterByKeyWord(res, searchQuery));      
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
    } else {
      setSearchedMovies(filterByKeyWord(allMovies, searchQuery));
      setIsLoading(false);
    }    
    localStorage.setItem('searchQuery', searchQuery);   
  }

  function handleCheckBox() {
      setIsFilterActive((prevState) => !prevState);    
  }

  function addMovies() {
    let addition = windowWidth > 1024 ? 3 : 2;
    setSlicedMovies((prevVal) => {
      return prevVal.concat(filteredMovies.slice(prevVal.length, prevVal.length + addition));
    })
  }

  useEffect(() => {
    if(isFilterActive) {
      localStorage.setItem('filterActive', 'true');
      setFilteredMovies(filterByDuration(searchedMovies))
    } else {
      localStorage.removeItem('filterActive');
      setFilteredMovies(searchedMovies);
    }    
  }, [isFilterActive, searchedMovies])

  useEffect (() => {
    let limit;
    if (windowWidth > 1024) {
      limit = 12;
    } else if (windowWidth > 480) {
      limit = 8;
    } else {
      limit = 5;
    }
     if(filteredMovies.length > limit) {
      setSlicedMovies(filteredMovies.slice(0, limit))
    } else {
      setSlicedMovies(filteredMovies);
    }
  }, [windowWidth, filteredMovies]);

  useEffect(() => {
    const all = localStorage.getItem('allMovies');
    const searched = localStorage.getItem('searchedMovies');
    const isChecked = localStorage.getItem('filterActive');
    if(all) {
      setAllMovies(JSON.parse(all));
    }
    if(searched) {
      setSearchedMovies(JSON.parse(searched));
    }
    if(isChecked) {
        setIsFilterActive(true);
      }
  },[])

  return (
    <>
      < Header page={'movies'} loggedIn={loggedIn}/>
      <main className='movies'>
        <SearchForm 
          name={'movies'}
          handleSearch={handleSearch}
          isChecked={isFilterActive}
          handleCheckBox={handleCheckBox}
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
