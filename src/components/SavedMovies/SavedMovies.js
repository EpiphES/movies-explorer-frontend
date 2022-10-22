import './SavedMovies.css';

import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { filterMovies } from '../../utils/utils';

function SavedMovies({ savedMovies, loggedIn, handleDeleteMovie, isError }) {
  const [searchedMovies, setSearchedMovies] = useState([]);

  function handleSearch(searchQuery, isFilterActive) {
    setSearchedMovies(filterMovies(savedMovies, searchQuery, isFilterActive));
  }

  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);

  return (
    <>
      <Header page={'saved-movies'} loggedIn={loggedIn}/>
      <main className='saved-movies'>
        <SearchForm 
          name={'saved-movies'}
          handleSearch={handleSearch}
        />
        { isError && <p className='movies__error-message'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>}
        {
          !isError && searchedMovies.length === 0 &&
          <p className='movies__error-message'>Ничего не найдено</p>
        }
        {
          !isError && searchedMovies.length > 0 &&
          <MoviesCardList 
            movies={searchedMovies}
            isSavedMoviesPage={true}
            handleDeleteMovie={handleDeleteMovie}
          />
        }     
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
