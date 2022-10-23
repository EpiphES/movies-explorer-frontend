import './Login.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../utils/useForm';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin, loginError, setLoginError, isFormLoading }) {
  
  const initialFormValues = {
    email: '',
    password: '',
  }
 
  const { values, errors, handleChange, isFormValid } = useForm(initialFormValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({email: values.email, password: values.password});
  }

  function handleInputChange(evt) {
    handleChange(evt);
    setLoginError('');
  }

  useEffect(() => {
    setLoginError('');
  }, [setLoginError])

  return (
    <section className='login'>
      <Logo />
      <h1 className='login__title'>Рады видеть!</h1>
      <AuthForm 
        name='login'
        submitText='Войти'
        onSubmit={handleSubmit}
        isValid={isFormValid}
        isLoading={isFormLoading}
      >        
        <label 
          htmlFor='login-email' className='auth-form__label'>
          E-mail
        </label>
        <input
          className={`auth-form__input ${
            errors.email && 'auth-form__input_invalid'
          }`}
          type='email'
          name='email'
          id='login-email'
          placeholder='Введите email'
          required
          pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
          autoFocus
          onChange={handleInputChange}
          value={values.email}
          autoComplete={'off'}
          disabled={isFormLoading}
        />
        <span
          className={`auth-form__input-error ${
            errors.email && 'auth-form__input-error_visible'
          }`}>
          {errors.email}
        </span>
        <label 
          htmlFor='login-password' className='auth-form__label'>
          Пароль
        </label>
        <input
          className={`auth-form__input ${
            errors.password && 'auth-form__input_invalid'
          }`}
          type='password'
          name='password'
          id='login-password'
          placeholder='Введите пароль'
          required
          onChange={handleInputChange}
          value={values.password}
          autoComplete={'off'}
          disabled={isFormLoading}
        />
        <span
          className={`auth-form__input-error ${
            errors.password && 'auth-form__input-error_visible'
          }`}>
          {errors.password}
        </span>
        {loginError && (<span className="auth-form__submit-error" >{loginError}</span>)}        
      </AuthForm>
      <p className='login__question'>
        Ещё не зарегистрированы? <Link to='/signup' className='login__link'>Регистрация</Link></p>      
    </section>
  );
}

export default Login;
