import React from 'react';
import AvatarImage from "../image/avatar.jpg";
import EditButtonIcon from "../image/edit-button.svg";
import AddButtonIcon from "../image/add-button.svg";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

export default function Main(props) {
  const userInfo = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={userInfo.avatar ? userInfo.avatar : AvatarImage} alt="Аватар профиля" />
            <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__container">
            <div className="profile__wrapper">
              <h1 className="profile__name">{userInfo.name}</h1>
              <button className="profile__edit-button" onClick={props.onEditProfile}>
                <img className="profile__edit-button-logo" src={EditButtonIcon} alt="Редактирование профиля" />
              </button>
            </div>
            <p className="profile__info">{userInfo.about}</p>
          </div>
          <button className="profile__add-button" onClick={props.onAddPlace}>
            <img className="profile__add-button-logo" src={AddButtonIcon} alt="Добавление" />
          </button>
        </section>
        <section className="places">
          {props.cards.map((item) => {
            return (
              <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}