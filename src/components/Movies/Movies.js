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

import { 
  SMALL_SCREEN_SIZE, 
  MEDIUM_SCREEN_SIZE,
  CARDS_PER_PAGE_LARGE,
  CARDS_PER_PAGE_MEDIUM,
  CARDS_PER_PAGE_SMALL,
  CARDS_ADD_LARGE,
  CARDS_ADD_MEDIUM,
} from '../../utils/config';

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
        const filteredArray = filterByKeyWord(res, searchQuery);
        setSearchedMovies(filteredArray); 
        localStorage.setItem('searchedMovies', JSON.stringify(filteredArray));     
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
    } else {
      const filteredArray = filterByKeyWord(allMovies, searchQuery)
      setSearchedMovies(filteredArray); 
      localStorage.setItem('searchedMovies', JSON.stringify(filteredArray));
      setIsLoading(false);
    }    
    localStorage.setItem('searchQuery', searchQuery);
    isFilterActive ? 
      localStorage.setItem('filterActive', 'true') : 
      localStorage.removeItem('filterActive');   
  }

  function handleCheckBox() {
      isFilterActive ? 
      localStorage.removeItem('filterActive') :
      localStorage.setItem('filterActive', 'true');
      setIsFilterActive((prevState) => !prevState);   
  }

  function addMovies() {
    let addition = windowWidth > MEDIUM_SCREEN_SIZE ? CARDS_ADD_LARGE : CARDS_ADD_MEDIUM;
    setSlicedMovies((prevVal) => {
      return prevVal.concat(filteredMovies.slice(prevVal.length, prevVal.length + addition));
    })
  }

  useEffect(() => {
    if(isFilterActive) {
      setFilteredMovies(filterByDuration(searchedMovies))
    } else {
      setFilteredMovies(searchedMovies);
    }    
  }, [isFilterActive, searchedMovies])

  useEffect (() => {
    let limit;
    if (windowWidth > MEDIUM_SCREEN_SIZE) {
      limit = CARDS_PER_PAGE_LARGE;
    } else if (windowWidth > SMALL_SCREEN_SIZE) {
      limit = CARDS_PER_PAGE_MEDIUM;
    } else {
      limit = CARDS_PER_PAGE_SMALL;
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
        { isError && <p className='movies__error-message'>???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????.</p>}
        {
          !isLoading && !isError && isSearchActive && filteredMovies.length === 0 &&
          <p className='movies__error-message'>???????????? ???? ??????????????</p>
        }
        {
          !isLoading && !isError && filteredMovies.length > 0 &&
          <>
            <MoviesCardList 
              movies={slicedMovies}
              savedMovies={savedMovies}
              isSavedMoviesPage={false}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />       
            {
              slicedMovies.length < filteredMovies.length &&
              <button className='movies__more' type='button' onClick={ addMovies }>??????</button>
            }
          </>
        }   
      </main>
      <Footer />
    </>
  );
}

export default Movies;
