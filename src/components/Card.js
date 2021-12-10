import React from 'react';
import RemoveIcon from "../image/icon-remove.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const userInfo = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userInfo._id;
  const isLiked = card.likes.some(i => i._id === userInfo._id);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  }
  
  return (
    <div className="places__item">
      {isOwn && (<button className="places__remove-button" onClick={handleDeleteClick} >
        <img src={RemoveIcon} alt="Удалить" />
      </button>)}
      <img onClick={handleClick} className="places__image" src={card.link} alt={card.name} />
      <div className="places__footer">
        <h2 className="places__name">{card.name}</h2>
        <div className="places__wrapper">
          <button onClick={handleLike} className={`places__like-button ${isLiked ? "places__like-button_active" : ""}`}></button>
          <div className="places__like-number">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}