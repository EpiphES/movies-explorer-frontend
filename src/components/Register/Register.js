import './Register.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../utils/useForm';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister, registerError, setRegisterError }) {
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
  }

  const { values, errors, handleChange, isFormValid } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ name: values.name, email: values.email, password: values.password });
  }
  
   function handleInputChange(evt) {
    handleChange(evt);
    setRegisterError('');
  }

  useEffect(() => {
    setRegisterError('');
  }, [setRegisterError])

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
            errors.name && 'auth-form__input_invalid'
          }`}
          type='text'
          name='name'
          id='register-name'
          placeholder='Введите имя'
          minLength="2"
          maxLength="30"
          pattern='^[A-Za-zА-Яа-я-\s]+$'
          required
          autoFocus
          onChange={handleInputChange}
          value={values.name}
        />
        <span
          className={`auth-form__input-error ${
            errors.name && 'auth-form__input-error_visible'
          }`}>
          {errors.name}
        </span>
        <label 
          htmlFor='register-email' className='auth-form__label'>
          E-mail
        </label>
        <input
          className={`auth-form__input ${
            errors.email && 'auth-form__input_invalid'
          }`}
          type='email'
          name='email'
          id='register-email'
          placeholder='Введите email'
          required
          pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
          onChange={handleInputChange}
          value={values.email}
        />
        <span
          className={`auth-form__input-error ${
            errors.email && 'auth-form__input-error_visible'
          }`}>
          {errors.email}
        </span>
        <label 
          htmlFor='register-password' className='auth-form__label'>
          Пароль
        </label>
        <input
          className={`auth-form__input ${
            errors.password && 'auth-form__input_invalid'
          }`}
          type='password'
          name='password'
          id='register-password'
          placeholder='Введите пароль'
          required
          onChange={handleInputChange}
          value={values.password}
        />
        <span
          className={`auth-form__input-error ${
            errors.password && 'auth-form__input-error_visible'
          }`}>
          {errors.password}
        </span>
        {registerError && (<span className="auth-form__submit-error" >{registerError}</span>)}        
      </AuthForm>
      <p className='register__question'>
        Уже зарегистрированы? <Link to='/signin' className='login__link'>Войти</Link></p>      
    </section>
  );
}

export default Register;
