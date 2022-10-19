import './Register.css';

import { Link } from 'react-router-dom';

import useForm from '../../utils/useForm';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
  const initialFormValues = {
    name: {
      value: '',
      isValid: false,
    },
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  }

  const { values, errors, handleChange, isFormValid, resetForm } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ name: values.name.value, email: values.email.value, password: values.password.value });
    resetForm(initialFormValues, false);
  }
  return (
    <section className='register'>
      <Logo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <AuthForm 
        name='register'
        submitText='Зарегистрироваться'
        onSubmit={handleSubmit}
        isValid={isFormValid}
      >        
        <label 
          htmlFor='register-name' className='auth-form__label'>
          Имя
        </label>
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
          {errors.name}
        </span>
        <label 
          htmlFor='register-email' className='auth-form__label'>
          E-mail
        </label>
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
          {errors.email}
        </span>
        <label htmlFor='register-password' className='auth-form__label'>Пароль</label>
        <input
          className={`auth-form__input ${
            !values.password.isValid && 'auth-form__input_invalid'
          }`}
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
          {errors.password}
        </span>        
      </AuthForm>
      <p className='register__question'>
        Уже зарегистрированы? <Link to='/signin' className='login__link'>Войти</Link></p>      
    </section>
  );
}

export default Register;
