import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import Registr from './Registr';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import RequireAuth from './RequireAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const navigate = useNavigate();

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

  // проверка токена при загрузке страницы
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmailUser(res.data.email);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, []);

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    
    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc);
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
  // Регистрация
  const handleUserRegister = (data) => {
    auth.register(data)
      .then((res) => {
        navigate("/sign-in");
        setIsRequestSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setIsRequestSuccess(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      })
  }
  // Авторизация, отправка данных
  const handleUserAuth = (data) => {
    const userEmail = data.email;
    auth.authorization(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmailUser(userEmail);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsRequestSuccess(false);
        setInfoTooltipPopupOpen(true);
      })
  }

  // удаление токена, выход из профиля юзера
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={loggedIn} userEmail={emailUser} onLogOut={handleLogOut} />
        <Routes>
          <Route path="/"
            element={
              <RequireAuth
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}>
              </RequireAuth>
            }>
          </Route>
          <Route path="/sign-up" element={<Registr onRegister={handleUserRegister} />}/>
          <Route path="/sign-in" element={<Login onAuthorization={handleUserAuth} />}/>
        </Routes>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}  />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isRequestSuccess} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
