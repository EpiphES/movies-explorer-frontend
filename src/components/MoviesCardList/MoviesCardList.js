import './MoviesCardList.css';

import { useState, useEffect } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies, isSavedMoviesPage, handleDelete}) {

  const [slicedMovies, setSlicedMovies] = useState([]);
  
  const [windowWidth, setWindowWidth] = useState(0);
  

  function updateWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect (() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);       
  }, [])

  useEffect (() => {
    let limit
    if (windowWidth > 1024) {
      limit = 12;
    } else if (windowWidth > 480) {
      limit = 8;
    } else {
      limit = 5;
    }
     if(movies.length > limit) {
      setSlicedMovies(movies.slice(0, limit))
    } else {
      setSlicedMovies(movies);
    }
  }, [windowWidth, movies])

  function appendMovies() {
    setSlicedMovies((prevVal) => {
      return prevVal.concat(movies.slice(prevVal.length, prevVal.length + 8));
    })
  }  

  const cardsElements = slicedMovies.map((item) => {
    return (
      <li key={item._id}>
        <MoviesCard
          card={item}
          isSavedMoviesPage={isSavedMoviesPage}
          handleDelete={handleDelete}
        />
      </li>
    );
  });

  return (
    <>
      <ul className='card-list__gallery'>
        {cardsElements}
      </ul>
      {slicedMovies.length < movies.length &&
        <button className='card-list__more' type='button' onClick={ appendMovies }>Ещё</button>
      }
      
    </>
  );
}

export default MoviesCardList;
