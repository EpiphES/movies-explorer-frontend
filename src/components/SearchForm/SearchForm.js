import './SearchForm.css';

import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ name, handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryError, setSearchQueryError] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  function  handleCheckBox() {
      setIsFilterActive((prevState) => !prevState);    
    }

  function handleSearchInputChange(evt) {
    setSearchQuery(evt.target.value);
    setSearchQueryError('');
  }  

  function handleSubmit(evt) {
    evt.preventDefault();
    searchQuery ? 
      handleSearch(searchQuery, isFilterActive)
      : 
      setSearchQueryError('Нужно ввести ключевое слово');   
  }

  useEffect(() => {
    if(name === 'movies') {
      const query = localStorage.getItem('searchQuery');
      const isChecked = localStorage.getItem('filterActive');
      if(query) {
        setSearchQuery(query);
      }
      if(isChecked) {
        setIsFilterActive(true);
      }
    }
  }, [name]);

  return (
    <section className="search-form">
      <form 
        className='search-form__form' 
        name={`${name}-form`}
        onSubmit={ handleSubmit }
        noValidate
      >
        <div className='search-form__input-group'>
          <input
            className={`search-form__input ${searchQueryError && 'search-form__input_invalid'}`}
            type='text'
            name='search'
            placeholder='Фильм'
            required
            autoFocus
            onChange={handleSearchInputChange}
            value={searchQuery}           
          />
          <button 
            className='search-form__submit-button'
            type='submit'
            aria-label='начать поиск' 
          />            
        </div>
        <span
          className={`search-form__input-error ${
            searchQueryError && 'auth-form__input-error_visible'
          }`}>
          {searchQueryError}
        </span>
        <FilterCheckbox 
          isChecked={isFilterActive}
          handleCheckBox={handleCheckBox}
        />
      </form>
      
    </section>
  );
}

export default SearchForm;
