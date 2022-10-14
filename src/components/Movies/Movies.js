import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import movies from '../../utils/movies';



function Movies() {
  return (
    <>
      < Header page={'movies'} loggedIn={true}/>
      <main className='movies'>
        <SearchForm />
        <MoviesCardList cards={ movies }/>     
      </main>
      <Footer />
    </>
  );
}

export default Movies;
