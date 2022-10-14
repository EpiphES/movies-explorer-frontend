import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards }) {
  const cardsElements = cards.map((item) => {
    return (
      <li key={item._id}>
        <MoviesCard
          card={item}
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
