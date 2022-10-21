import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isSavedMoviesPage, savedMovies, handleDelete}) {  

  const cardsElements = movies.map((item) => {
    return (
      <li key={item.id}>
        <MoviesCard
          card={item}
          isSavedMoviesPage={isSavedMoviesPage}
          handleDelete={handleDelete}
          savedMovies={savedMovies}
        />
      </li>
    );
  });

  return (
    <>
      <ul className='card-list'>
        {cardsElements}
      </ul>   
    </>
  );
}

export default MoviesCardList;
