import './Profile.css';

import { useState, useContext } from 'react';

import Header from '../Header/Header';

import useForm from '../../utils/useForm';
import CurrentUserContext from "../../contexts/CurrentUserContext";


function Profile() {
  const currentUser = useContext(CurrentUserContext);
  
  const [isEdited, setIsEdited] = useState(false);

  const initialFormValues = {
    name: currentUser.name,
    email: currentUser.value,
  }

  const { values, errors, handleChange } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <>
      <Header page={'profile'} loggedIn={true} />
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        { isEdited ? (
          <form 
            className='profile__form'
            name='profile-form'
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor='profile-name' className='profile__label'>
              Имя
              <input
                className={`profile__input ${
                  !values.name.isValid && 'profile__input_invalid'
                }`}
                type='text'
                name='name'
                id='profile-name'
                placeholder='Введите имя'
                minLength="2"
                maxLength="30"
                required
                autoFocus
                onChange={handleChange}
                value={values.name.value}
              />
            </label>        
            <span
              className={`profile__input-error ${
                !values.name.isValid && 'profile__input-error_visible'
              }`}>
              {values.name.error}
            </span>
            <label htmlFor='profile-email' className='profile__label profile__label_no-border'>
              E-mail
              <input
                className={`profile__input ${
                  !values.email.isValid && 'profile__input_invalid'
                }`}
                type='email'
                name='email'
                id='profile-email'
                placeholder='Введите email'
                required
                onChange={handleChange}
                value={values.email.value}
              />
            </label>            
            <span
              className={`profile__input-error ${
                !values.email.isValid && 'profile__input-error_visible'
              }`}>
              {values.email.error}
            </span>
          </form>
        ) : (
          <div className='profile__info'>
            <div className='profile__info-item'>
              <p className='profile__info-title'>Имя</p>
              <p className='profile__info-value'>{currentUser.name}</p>
            </div>
            <div className='profile__info-item'>
              <p className='profile__info-title'>E-mail</p>
              <p className='profile__info-value'>{currentUser.email}</p>
            </div>
          </div>
        )}
        <button className='profile__button profile__button_type_edit' type='button' onClick={() => setIsEdited(true)}>Редактировать</button>
        <button className='profile__button profile__button_type_exit' type='button'>Выйти из аккаунта</button>
      </section>
    </>
    
  );
}

export default Profile;
