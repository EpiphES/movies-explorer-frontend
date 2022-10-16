import './Login.css';
import { Link } from 'react-router-dom';

import useForm from '../../utils/useForm';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
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
    <section className='login'>
      <Logo />
      <h1 className='login__title'>Рады видеть!</h1>
      <AuthForm 
        name='login'
        submitText='Войти'
        onSubmit={handleSubmit}
        isValid={
          values.email.isValid &&
          values.password.isValid &&
          values.email.value &&
          values.password.value
        }>        
        <label htmlFor='login-email' className='auth-form__label'>E-mail</label>
        <input
          className={`auth-form__input ${
            !values.email.isValid && 'auth-form__input_invalid'
          }`}
          type='email'
          name='email'
          id='login-email'
          placeholder='Введите email'
          required
          autoFocus
          onChange={handleChange}
          value={values.email.value}
        />
        <span
          className={`auth-form__input-error ${
            !values.email.isValid && 'auth-form__input-error_visible'
          }`}>
          {values.email.error}
        </span>
        <label htmlFor='login-password' className='auth-form__label'>Пароль</label>
        <input
          className='auth-form__input'
          type='password'
          name='password'
          id='login-password'
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
      <p className='login__question'>
        Ещё не зарегистрированы? <Link to='/signup' className='login__link'>Регистрация</Link></p>      
    </section>
  );
}

export default Login;
