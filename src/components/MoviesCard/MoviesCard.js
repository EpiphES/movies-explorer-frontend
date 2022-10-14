import './MoviesCard.css';

import { useState } from 'react';

function MoviesCard({card}) {
  const [isSaved, setIsSaved] = useState(card.saved)

  function toggleSave() {
    setIsSaved(!isSaved);
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
      <button 
        className={`card__save ${isSaved && 'card__save_active'}`} 
        type='button' 
        onClick={ toggleSave }
      >
        {!isSaved && 'Сохранить'}
      </button>
    </div>
  );
}

export default MoviesCard;
