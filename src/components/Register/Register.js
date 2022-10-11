import './Register.css';

import { Link } from 'react-router-dom';

import useForm from '../../utils/useForm';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  const initialFormValues = {
    name: {
      value: '',
      error: '',
      isValid: true,
    },
    email: {
      value: '',
      error: '',
      isValid: true,
    },
    password: {
      value: '',
      error: '',
      isValid: true,
    },
  }

  const { values, handleChange } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <section className='register'>
      <Logo />
      <h2 className='register__title'>Добро пожаловать!</h2>
      <AuthForm 
        name='register'
        submitText='Зарегистрироваться'
        onSubmit={handleSubmit}
        isValid={
          values.name.isValid &&
          values.email.isValid &&
          values.password.isValid &&
          values.name.value &&
          values.email.value &&
          values.password.value
        }
      >
        
        <label htmlFor='register-name' className='auth-form__label'>Имя</label>
        <input
          className={`auth-form__input ${
            !values.name.isValid && 'auth-form__input_invalid'
          }`}
          type='text'
          name='name'
          id='register-name'
          placeholder='Введите имя'
          minLength="2"
          maxLength="30"
          required
          autoFocus
          onChange={handleChange}
          value={values.name.value}
        />
        <span
          className={`auth-form__input-error ${
            !values.name.isValid && 'auth-form__input-error_visible'
          }`}>
          {values.name.error}
        </span>
        <label htmlFor='register-email' className='auth-form__label'>E-mail</label>
        <input
          className={`auth-form__input ${
            !values.email.isValid && 'auth-form__input_invalid'
          }`}
          type='email'
          name='email'
          id='register-email'
          placeholder='Введите email'
          required
          onChange={handleChange}
          value={values.email.value}
        />
        <span
          className={`auth-form__input-error ${
            !values.email.isValid && 'auth-form__input-error_visible'
          }`}>
          {values.email.error}
        </span>
        <label htmlFor='register-password' className='auth-form__label'>Пароль</label>
        <input
          className='auth-form__input'
          type='password'
          name='password'
          id='register-password'
          placeholder='Введите пароль'
          required
          onChange={handleChange}
          value={values.password.value}
        />
        <span
          className={`auth-form__input-error ${
            !values.password.isValid && 'auth-form__input-error_visible'
          }`}>
          {values.password.error}
        </span>        
      </AuthForm>
      <p className='register__question'>
        Уже зарегистрированы? <Link to='/signin' className='login__link'>Войти</Link></p>      
    </section>
  );
}

export default Register;
