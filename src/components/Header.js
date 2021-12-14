import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <a className="header__logo" href="/" target="_self"></a>
      <div className="header__wrapper">
        <p className="header__user-information">User information</p>
        {location.pathname === "/sign-up" ? (
            <Link to="/sign-in" className="header__link">Войти</Link>
          ) : (
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          )
        }
      </div>
    </header>
  )
};