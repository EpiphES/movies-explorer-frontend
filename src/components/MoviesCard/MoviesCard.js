import './MoviesCard.css';

import { useEffect, useState } from 'react';

import { convertTime } from '../../utils/utils';
import { URL_REGEX } from '../../utils/config';

function MoviesCard({ movie, isSavedMoviesPage, savedMovies, handleSave, handleDelete }) {
  const [savedMovie, setSavedMovie] = useState(null);
  const trailerLink = URL_REGEX.test(movie.trailerLink) ? movie.trailerLink : 'https://www.youtube.com';
  
  useEffect (() => {
    if(!isSavedMoviesPage) {
      setSavedMovie(savedMovies.find(item => item.movieId === movie.id));
    }    
  }, [movie.id, savedMovies, isSavedMoviesPage]);

  function toggleSave(evt) {
    evt.preventDefault();
    savedMovie ? 
    handleDelete(savedMovie._id ) :
    handleSave( {
      country: movie.country || 'unknown',
      director: movie.director || 'unknown',
      duration: movie.duration || 0,
      year: movie.year || 0,
      description: movie.description || 'no description',
      image: 'https://api.nomoreparties.co/' + movie.image.url,
      trailerLink,
      thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || 'unknown',
      nameEN: movie.nameEN || 'unknown',
    })
  }

  function onDelete(evt) {
    evt.preventDefault();
    handleDelete(movie._id);
  }

  return (
    <a className='card' href={trailerLink} target="_blank" rel="noreferrer">
      <div className='card__header'>
        <h2 className='card__title'>{movie.nameRU}</h2>
        <p className='card__subtitle'>{convertTime(movie.duration)}</p>
      </div>      
      <img 
        className='card__image' 
        src={isSavedMoviesPage ? movie.image : ('https://api.nomoreparties.co/' + movie.image.url)} 
        alt={movie.nameRU} 
      />
      { isSavedMoviesPage ?
        <button 
          className='card__button card__button_type_delete' 
          type='button' 
          onClick={onDelete}
        />
          
        : <button 
          className={`card__button card__button_type_save ${savedMovie && 'card__button_type_active'}`} 
          type='button' 
          onClick={toggleSave}
        > 
          {!savedMovie && 'Сохранить'}
        </button>
      }
      
    </a>
  );
}

export default MoviesCard;
