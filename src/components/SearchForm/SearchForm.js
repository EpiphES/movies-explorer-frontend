import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ name }) {
  function handleSubmit(evt) {
    evt.preventDefault();    
  }
  return (
    <section className="search-form">
      <form 
        className='search-form__form' 
        name={`${name}-form`}
        onSubmit={ handleSubmit }
        noValidate>
        <div className='search-form__input-group'>
          <input
            className='search-form__input'
            type='text'
            name='search'
            placeholder='Фильм'
            required
            autoFocus
            // onChange={ handleChange }
            // value={ values.search.value }           
          />
          <button className='search-form__submit-button'
          // disabled={ values.search.value.length === 0 } 
          type="submit" />            
        </div>
        <FilterCheckbox />
      </form>
      
    </section>
  );
}

export default SearchForm;
