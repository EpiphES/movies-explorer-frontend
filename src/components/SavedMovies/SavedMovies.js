import './SavedMovies.css';

import { useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ loggedIn, loadMovies, movies }) {

  useEffect(() => {
    loadMovies();
  }, [loadMovies])

  return (
    <>
      <Header page={'saved-movies'} loggedIn={loggedIn}/>
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList 
          movies={movies}
          isSavedMoviesPage
          // handleDelete={handleDelete}
          />     
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
