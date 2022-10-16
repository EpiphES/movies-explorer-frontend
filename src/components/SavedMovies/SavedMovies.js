import './SavedMovies.css';

import { useState } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/movies';


function SavedMovies() {
  const [movies, setMovies] = useState(savedMovies);

  function handleDelete(id) {
    setMovies((prevState) => prevState.filter(item => item._id !== id))
  } 

  return (
    <div className='SavedMovies'>
      <Header page={'saved-movies'} loggedIn={true}/>
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList 
          movies={ movies }
          isSavedMoviesPage
          handleDelete={handleDelete}
          />     
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
