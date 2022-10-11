import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';



function Movies() {
  return (
    <div className='movies'>
      < Header />
      <SearchForm />
      <Footer />
    </div>
  );
}

export default Movies;
