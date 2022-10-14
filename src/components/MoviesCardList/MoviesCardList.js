import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, isSavedMoviesPage}) {
  const cardsElements = cards.map((item) => {
    return (
      <li key={item._id}>
        <MoviesCard
          card={item}
          isSavedMoviesPage={isSavedMoviesPage}
        />
      </li>
    );
  });

  return (
    <>
      <ul className='card-list__gallery'>
        {cardsElements}
      </ul>
      <button className='card-list__more' type='button'>Ещё</button>
    </>
  );
}

export default MoviesCardList;
