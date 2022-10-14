import './MoviesCard.css';

import { useState } from 'react';

function MoviesCard({card, isSavedMoviesPage}) {
  const [isActive, setIsActive] = useState(card.saved)

  function toggleSave() {
    setIsActive(!isActive);
  }
  return (
    <div className='card'>
      <div className='card__header'>
        <h2 className='card__title'>{card.nameRU}</h2>
        <p className='card__subtitle'>{card.duration} минут</p>
      </div>      
      <img 
        className='card__image' 
        src={card.image} 
        alt={card.nameRU} 
      />
      { isSavedMoviesPage ?
        <button 
          className='card__delete' 
          type='button' 
          // onClick={ handleDelete }
        />
          
        : <button 
          className={`card__save ${isActive && 'card__save_active'}`} 
          type='button' 
          onClick={ toggleSave }
        >
          {!isActive && 'Сохранить'}
        </button>
      }
      
    </div>
  );
}

export default MoviesCard;
