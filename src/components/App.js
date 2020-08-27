import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

// КОРНЕВОЙ КОМПОНЕНТ

function App() {

  // текущий пользователь, список карточек
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData()
      .then(user => setCurrentUser(user))
      .catch(error => console.error(error))
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => setCards(initialCards))
      .catch(error => console.error(error))
  });

  // статусы попапов (открыт/закрыт) + текущая карточка в попапе с полноразмерной картинкой
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  // клики по кнопкам и картинкам
  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) };
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) };
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) };
  const handleImagePopupClick = () => { setIsImagePopupOpen(true) };

  // закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  // открытие попапа с полноразмерной картинкой
  function openImage(card) {
    setSelectedCard(card);
    handleImagePopupClick();
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

  // удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      })
      .catch(error => console.error(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onGetCard={openImage}
          onCardDelete={handleCardDelete}
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

        <PopupWithForm // попап подтверждения удаления карточки (можно вынести в отдельный компонент)
          name='confirmation'
          title='Вы уверены?'
          button='Да'
          sizeModifier='popup__container_small'
          isOpen={false}
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