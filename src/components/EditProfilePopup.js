import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const userInfo = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo, props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <div className="popup__inputs-wrapper">
        <input required className="popup__input" value={name} onChange={handleChangeName} id="profile-name" minLength="2" maxLength="40" type="text" name="name" placeholder="Имя" />
        <span className="popup__error" id="profile-name-error"></span>
        <input required className="popup__input" value={description} onChange={handleChangeDescription} id="profile-about" minLength="2" maxLength="200" type="text" name="about" placeholder="Род деятельности" />
        <span className="popup__error" id="profile-about-error"></span>
      </div>
    </PopupWithForm>
  )

}