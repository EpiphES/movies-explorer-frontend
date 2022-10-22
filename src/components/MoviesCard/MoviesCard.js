import './MoviesCard.css';

import { useEffect, useState } from 'react';

import { convertTime } from '../../utils/utils';


function MoviesCard({ card, isSavedMoviesPage, savedMovies, handleSave, handleDelete }) {
  const [isActive, setIsActive] = useState(false);
  useEffect (() => {
    if(!isSavedMoviesPage) {
      setIsActive(savedMovies.some(item => item.movieId === card.id))
    }
    
  }, [card.id, savedMovies, isSavedMoviesPage]);

  function onSave() {
    handleSave( {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: 'https://api.nomoreparties.co/' + card.image.url,
      trailerLink: card.trailerLink,
      thumbnail: 'https://api.nomoreparties.co/' + card.image.formats.thumbnail.url,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    })
  }

  return (
    <div className='card'>
      <div className='card__header'>
        <h2 className='card__title'>{card.nameRU}</h2>
        <p className='card__subtitle'>{convertTime(card.duration)}</p>
      </div>      
      <img 
        className='card__image' 
        src={isSavedMoviesPage ? card.image : ('https://api.nomoreparties.co/' + card.image.url)} 
        alt={card.nameRU} 
      />
      { isSavedMoviesPage ?
        <button 
          className='card__button card__button_type_delete' 
          type='button' 
          onClick={ () => handleDelete(card._id) }
        />
          
        : <button 
          className={`card__button card__button_type_save ${isActive && 'card__button_type_active'}`} 
          type='button' 
          onClick={onSave}
        >
          {!isActive && 'Сохранить'}
        </button>
      }
      
    </div>
  );
}

export default MoviesCard;
