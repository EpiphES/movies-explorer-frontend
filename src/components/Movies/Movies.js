import './Movies.css';

import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { filterByKeyWord, filterByDuration } from '../../utils/utils';
import useWindowWidth from '../../utils/useWindowWidth';

function Movies({ loggedIn,  loadAllMovies, loadSavedMovies, allMovies, savedMovies, isLoading }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState([]);
  const windowWidth = useWindowWidth();
  const [isSearchActive, setIsSearchActive] = useState(false);

  function renderMovies(searchQuery, isFilterActive) {
    loadAllMovies();
    const searchedMovies = filterByKeyWord(allMovies, searchQuery)

    isFilterActive ?
    setFilteredMovies(filterByDuration( searchedMovies)) :
    setFilteredMovies(searchedMovies);
    setIsSearchActive(true);
  }

  function addMovies() {
    let addition;
    addition = windowWidth > 1024 ? 3 : 2;
    setSlicedMovies((prevVal) => {
      return prevVal.concat(filteredMovies.slice(prevVal.length, prevVal.length + addition));
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
     if(filteredMovies.length > limit) {
      setSlicedMovies(filteredMovies.slice(0, limit))
    } else {
      setSlicedMovies(filteredMovies);
    }
  }, [windowWidth, filteredMovies]);

  useEffect(() => {
    loadSavedMovies()
  }, [loadSavedMovies]);

  return (
    <>
      < Header page={'movies'} loggedIn={loggedIn}/>
      <main className='movies'>
        <SearchForm 
          name={'movies'}
          renderMovies={renderMovies}
        />
        { isLoading && <Preloader /> }
        {
          !isLoading && isSearchActive && filteredMovies.length === 0 &&
          <p className='movies__no-movies'>Ничего не найдено</p>
        }
        {
          !isLoading && filteredMovies.length > 0 &&
          <>
            <MoviesCardList 
              movies={slicedMovies}
              savedMovies={savedMovies} 
            />       
            {
              slicedMovies.length < filteredMovies.length &&
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
