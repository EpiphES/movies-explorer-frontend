import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, handleCheckBox}) {
  return (
    <div className='filter'>
      <label 
        className='filter__label' htmlFor='shorts'>
        <input
          className='filter__checkbox'
          type='checkbox'
          name='shorts'
          id='shorts'
          checked={isChecked}
          onChange={handleCheckBox}
        />          
        <span className='filter__styled-checkbox' 
        />
        <span className='filter__text'>Короткометражки</span>
      </label>        
    </div>
  );
}

export default FilterCheckbox;
