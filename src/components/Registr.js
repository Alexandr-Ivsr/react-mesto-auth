import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Registr(props) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangeEmail = (evt) => {
    setEmailValue(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPasswordValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onRegister({
      password: passwordValue,
      email: emailValue
    })

  }

  return (
    <div className="form-registr">
      <h3 className="form-registr__title">Регистрация</h3>
      <form className="form-registr__form" onSubmit={handleSubmit}>
        <div className="form-registr__inputs-wrapper">
          <input required className="form-registr__input" onChange={handleChangeEmail} value={emailValue} type="email" id="user-email" minLength="2" maxLength="30" name="email" placeholder="Email" />
          <input required className="form-registr__input" onChange={handleChangePassword} value={passwordValue} type="password" id="user-password" minLength="6" maxLength="30" name="password" placeholder="Пароль" />
        </div>
        <button className="form-registr__btn-save" type="submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="form-registr__link">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}
