import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <Link className="header__logo" to="/" target="_self"></Link>
      <div className="header__wrapper">
        {props.isLoggedIn ? ( <p className="header__user-information">{props.userEmail}</p> ) : '' }
        {location.pathname === "/sign-up" ? (
            <Link to="/sign-in" className="header__link">Войти</Link>
          ) : (
            <Link to={props.isLoggedIn ? "/sign-in" : "/sign-up"} onClick={props.onLogOut} className="header__link">{props.isLoggedIn ? 'Выйти' : 'Регистрация'}</Link>
          )
        }
      </div>
    </header>
  )
};