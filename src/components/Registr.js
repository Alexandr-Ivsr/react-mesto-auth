import React from 'react';


export default function Registr(props) {


  return (
    <div className="form-registr">
      <h3 className="form-registr__title">Регистрация</h3>
      <form className="form-registr__form">
        <div className="form-registr__inputs-wrapper">
          <input required className="form-registr__input" type="email" id="user-email" minLength="2" maxLength="30" name="email" placeholder="Email" />
          <input required className="form-registr__input" type="password" id="user-password" minLength="2" maxLength="30" name="password" placeholder="Пароль" />
        </div>
        <button className="form-registr__btn-save" type="submit">Зарегистрироваться</button>
        <a href="" className="form-registr__link">Уже зарегистрированы? Войти</a>
      </form>
    </div>
  )
}
