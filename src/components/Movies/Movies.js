import './Movies.css';

import { useState } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { filterByKeyWord, filterByDuration } from '../../utils/utils';

function Movies({loggedIn,  loadAllMovies, loadSavedMovies, allMovies, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  function renderMovies(searchQuery, isFilterActive) {
    loadAllMovies();
    const searchedMovies = filterByKeyWord(allMovies, searchQuery)

    isFilterActive ?
    setFilteredMovies(filterByDuration( searchedMovies)) :
    setFilteredMovies(searchedMovies);
  }


  return (
    <>
      < Header page={'movies'} loggedIn={loggedIn}/>
      <main className='movies'>
        <SearchForm 
          name={'movies'}
          renderMovies={renderMovies}
        />
        <MoviesCardList 
          movies={filteredMovies}
          savedMovies={savedMovies} 
        />     
      </main>
      <Footer />
    </>
  );
}

export default Movies;
