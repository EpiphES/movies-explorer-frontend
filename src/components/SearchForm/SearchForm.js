import './SearchForm.css';

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
        <div className='search-form__filter'>
          <label 
            className='search-form__filter-label' htmlFor='shorts'>
            <input
              className='search-form__checkbox'
              type='checkbox'
              name='shorts'
              id='shorts'
              // onChange={handleCheckBox}
              // checked={true}            
            />          
            <span className='search-form__styled-checkbox' 
            />
            <span className='search-form__filter-text'>Короткометражки</span>
          </label>
        </div>

      </form>
      
    </section>
  );
}

export default SearchForm;
