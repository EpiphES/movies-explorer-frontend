import './Profile.css';

import { useContext } from 'react';

import Header from '../Header/Header';

import useForm from '../../utils/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import InfoTip from '../InfoTip/InfoTip';


function Profile({ loggedIn, onSignout, onUpdateUser, isInfotipOpen, updateUserError, handleInfotipClose }) {
  const currentUser = useContext(CurrentUserContext);
  
  const initialFormValues = {
    name: currentUser.name,
    email: currentUser.email,
  }

  const { values, errors, handleChange, isFormValid } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, email: values.email});
  }

  return (
    <>
      <Header page={'profile'} loggedIn={loggedIn} />
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form 
          className='profile__form'
          name='profile-form'
          onSubmit={handleSubmit}
          noValidate
        >
          <label 
            htmlFor='profile-name' className='profile__label'>
            Имя
            <input
              className={`profile__input ${
                errors.name && 'profile__input_invalid'
              }`}
              type='text'
              name='name'
              id='profile-name'
              placeholder='Введите имя'
              minLength='2'
              maxLength='30'
              pattern='^[A-Za-zА-Яа-я-\s]+$'
              required
              onChange={handleChange}
              value={values.name}
              autoComplete={'off'}
            />
          </label>  

          <span
            className={`profile__input-error ${
              errors.name && 'profile__input-error_visible'
            }`}>
            {errors.name}
          </span>
          <label 
            htmlFor='profile-email' className='profile__label profile__label_no-border'>
            E-mail
            <input
              className={`profile__input ${
                errors.email && 'profile__input_invalid'
              }`}
              type='email'
              name='email'
              id='profile-email'
              placeholder='Введите email'
              required
              pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
              onChange={handleChange}
              value={values.email}
              autoComplete={'off'}
            />
          </label>            
          <span
            className={`profile__input-error ${
              errors.email && 'profile__input-error_visible'
            }`}>
            {errors.email}
          </span>
          <button 
            className='profile__button profile__button_type_submit' type='submit'
            disabled={!isFormValid}
            aria-label={'редактировать'}>
            Редактировать
          </button>
        </form>        
        <button 
          className='profile__button profile__button_type_exit'
          type='button'
          aria-label={'выйти из аккаунта'}
          onClick={onSignout}>    
          Выйти из аккаунта
        </button>
      </section>
      <InfoTip 
        errorMessage={updateUserError} isInfotipOpen={isInfotipOpen} 
        onClose={handleInfotipClose}/>
    </>    
  );
}

export default Profile;
