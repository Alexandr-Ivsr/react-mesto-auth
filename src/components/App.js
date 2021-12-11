import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import Registr from './Registr';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    api.getCardsData()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    api.deleteCardData(card._id, isOwn)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (data) => {
    api.updateProfileData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleUpdateAvatar = (data, evt) => {
    api.updateProfileAvatar(data, evt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        evt.target.reset();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleAddPlaceSubmit = (data) => {
    api.createCardData(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}  />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
        
        <Registr />
        <Login />
        <InfoTooltip />

        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
