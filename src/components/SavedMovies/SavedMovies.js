import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, loggedIn, handleDeleteMovie }) {

  return (
    <>
      <Header page={'saved-movies'} loggedIn={loggedIn}/>
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList 
          movies={movies}
          isSavedMoviesPage={true}
          handleDeleteMovie={handleDeleteMovie}
        />     
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
