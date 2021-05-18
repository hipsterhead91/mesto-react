import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import api from '../utils/Api.js';
import { FormValidator, validationOptions } from '../utils/FormValidator.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

// КОРНЕВОЙ КОМПОНЕНТ

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // получаем данные пользователя при запуске приложения
  React.useEffect(() => {
    api.getUserData()
      .then(user => setCurrentUser(user))
      .catch(error => console.error(error))
  }, []);

  // получаем карточки с сервера при запуске приложения
  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => setCards(initialCards))
      .catch(error => console.error(error))
  });

  // статусы попапов (открыт/закрыт)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);

  // определяем текущую карточку (используется для её удаления или для открытия в полном размере)
  const [selectedCard, setSelectedCard] = React.useState({});

  // закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  // открытие попапа с полноразмерной картинкой
  function handleOpenImage(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // обновление аватара
  function handleUpdateAvatar({ avatar }) {
    api.patchUserAvatar(avatar)
      .then((user) => {
        document.querySelector('.profile__avatar').src = user.avatar;
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // обновление профиля
  function handleUpdateUser({ name, about }) {
    api.patchUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // добавление новой карточки
  function handleAddPlaceSubmit({ title, link }) {
    api.postNewCard(title, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(error => console.error(error))
  }

  // клик по корзине
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  // удаление карточки
  function handleRemoveCard() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== selectedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // включаем валидацию форм
  React.useEffect(() => {
    const avatarFormValidator = new FormValidator({
      validationOptions: validationOptions,
      formSelector: '#avatar-form'
    });
    
    const profileFormValidator = new FormValidator({
      validationOptions: validationOptions,
      formSelector: '#profile-form'
    });

    const newCardFormValidator = new FormValidator({
      validationOptions: validationOptions,
      formSelector: '#new-card-form'
    });

    avatarFormValidator.enableValidation();
    profileFormValidator.enableValidation();
    newCardFormValidator.enableValidation();
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onGetCard={handleOpenImage}
          onCardDelete={handleDeleteClick}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditAvatarPopup // попап обновления аватара
          name='avatar'
          title='Обновить аватар'
          button='Сохранить'
          sizeModifier='popup__container_medium'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup // попап обновления профиля
          name='profile'
          title='Редактировать профиль'
          button='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup // попап добавления новой карточки
          name='new-card'
          title='Новое место'
          button='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmationPopup // попап подтверждения удаления карточки (сейчас вообще не работает)
          name='confirmation'
          title='Вы уверены?'
          button='Да'
          sizeModifier='popup__container_small'
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onRemoveCard={handleRemoveCard}
        />

        <ImagePopup // попап полноразмерной картинки
          isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;