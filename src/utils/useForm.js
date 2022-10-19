import { useState, useCallback } from 'react';

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  function handleChange(evt) {
    const {
      name,
      value,
      validity: { valid },
      validationMessage,
    } = evt.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: { value, isValid: valid },
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: validationMessage
    }));

    setIsFormValid(evt.target.closest("form").checkValidity());
  }

  // function setCustomErrors(name, value, validationMessage) {
  //   switch (name) {
  //     case 'name':
  //       if(value.length === 0) {
  //         console.log('0');
  //         setErrors((prevState) => ({
  //             ...prevState,
  //             name:'Поле "имя" должно быть заполнено'
  //         }));
  //       } else if (value.length < 2) {
  //         setErrors((prevState) => ({
  //             ...prevState,
  //             name:'Длина поля "имя" должна быть не меньше 2 символов'
  //         }));
  //       } else if (value.length > 30) {
  //         setErrors((prevState) => ({
  //             ...prevState,
  //             name:'Длина поля "имя" должна быть не больше 30 символов'
  //         }));
  //       } else if (!new RegExp(/[A-Za-zА-Яа-я-\s]+$/).test(value)) {
  //         setErrors((prevState) => ({
  //             ...prevState,
  //             name:'Поле "имя" должно содержать латиницу, кирилицу, пробел или дефис'
  //         }));
  //       } else {
  //         setDefaultErrors(name, validationMessage);
  //       }
  //       break;
  
  //     case 'email':
  //       if(value === '') {
  //         setErrors((prevState) => ({
  //           ...prevState,
  //           email:`Поле "${name}" должно быть заполнено`
  //         }));
  //       } else if(
  //         !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value)
  //         ){
  //         setErrors((prevState) => ({
  //           ...prevState,
  //           email:'Введен некорректный адрес электронной почты'
  //         }));
  //       } else {
  //         setDefaultErrors(name, validationMessage);
  //       }
  //       break;
      
  //     default: 
  //     setDefaultErrors(name, validationMessage);
  //     break;
  //   }
  // }
    
  const resetForm = useCallback(
    (NewValues = {}, newIsFormValid = false) => {
      setValues(NewValues);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setIsFormValid]
  );

  return { values, errors, handleChange, isFormValid, resetForm };
}