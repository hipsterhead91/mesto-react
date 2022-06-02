import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import AvatarPopup from './AvatarPopup.js';
import ProfilePopup from './ProfilePopup.js';
import NewCardPopup from './NewCardPopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import api from '../utils/Api.js';
import { FormValidator, validationOptions } from '../utils/FormValidator.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {

  // СТЕЙТЫ С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ И ТЕКУЩИМИ КАРТОЧКАМИ
  // Примечание: стейты обновляются при рендере страницы, а затем каждый раз, когда на сервер
  // отправляются соответствующие изменения, но только в том случае, если изменения прошли и
  // от сервера получен положительный ответ. Таким образом, данные в стейте и на сервере всегда
  // одинаковые, и нам нет необходимости делать повторный запрос на сервер, чтобы удостовериться.
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);

  // ПОЛУЧАЕМ С СЕРВЕРА ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ И ПЕРЕДАЁМ ИХ В СТЕЙТ
  React.useEffect(() => {
    api.getUserData()
      .then(user => setCurrentUser(user))
      .catch(error => console.error(error))
  }, []);

  // ПОЛУЧАЕМ С СЕРВЕРА СПИСОК КАРТОЧЕК И ПЕРЕДАЁМ ИХ В СТЕЙТ
  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => setCurrentCards(initialCards))
      .catch(error => console.error(error))
  }, []);

  // СТЕЙТЫ С СОСТОЯНИЕМ ПОПАПОВ (ОТКРЫТЫ/ЗАКРЫТЫ)
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);

  // СТЕЙТ С ТЕКУЩЕЙ ВЫБРАННОЙ КАРТОЧКОЙ
  const [selectedCard, setSelectedCard] = React.useState({});

  // ЗАКРЫТИЕ ВСЕХ ПОПАПОВ
  const closeAllPopups = () => {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  // ОТКРЫТИЕ КАРТИНКИ В ПОЛНОМ РАЗМЕРЕ
  function handleImageClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // ОБНОВЛЕНИЕ АВАТАРА
  function handleUpdateAvatar({ avatar }) {
    const avatarInput = document.querySelector('#avatar-input');
    api.patchUserAvatar(avatar)
      .then((user) => {
        document.querySelector('.profile__avatar').src = user.avatar;
        closeAllPopups();
        avatarInput.value = '';
      })
      .catch(error => console.error(error))
  }

  // ОБНОВЛЕНИЕ ПРОФИЛЯ
  function handleUpdateProfile({ name, about }) {
    api.patchUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
  function handleNewCardSubmit({ title, link }) {
    const titleInput = document.querySelector('#title-input');
    const linkInput = document.querySelector('#link-input');
    api.postNewCard(title, link)
      .then((newCard) => {
        setCurrentCards([...currentCards, newCard]);
        closeAllPopups();
        titleInput.value = '';
        linkInput.value = '';
      })
      .catch(error => console.error(error))
  }

  // ЛАЙК КАРТОЧКИ
  // Примечание: then после api.changeLike возвращает newCard вместо card - ту же самую карточку, 
  // но с изменённым свойством likes. Далее массив текущих карточек преобразуется: среди всех карточек
  // находится исходная card по id, совпадающему с newCard, и старая карточка заменяется на новую.
  function handleCardLike(card) {
    const isLiked = card.likes.some(с => с._id === currentUser._id);
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = currentCards.map(c => c._id === card._id ? newCard : c);
        setCurrentCards(newCards);
      })
      .catch(error => console.error(error))
  }

  // КЛИК ПО КОРЗИНЕ
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  // УДАЛЕНИЕ КАРТОЧКИ
  // Примечание: в отличие от лайка, здесь then не возвращает новую карточку (нечего возвращать),
  // но массив текущих карточек всё равно изменяется путём отсева текущей выбранной карточки.
  function handleDeleteCard() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = currentCards.filter(c => c._id !== selectedCard._id);
        setCurrentCards(newCards);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }

  // ВКЛЮЧАЕМ ВАЛИДАЦИЮ ФОРМ
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
          cards={currentCards}
          onEditAvatar={() => setIsAvatarPopupOpen(true)}
          onEditProfile={() => setIsProfilePopupOpen(true)}
          onAddCard={() => setIsNewCardPopupOpen(true)}
          onGetCard={handleImageClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />

        <Footer />

        <AvatarPopup
          name='avatar'
          title='Обновить аватар'
          button='Сохранить'
          sizeModifier='popup__container_medium'
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ProfilePopup
          name='profile'
          title='Редактировать профиль'
          button='Сохранить'
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateProfile}
        />

        <NewCardPopup
          name='new-card'
          title='Новая карточка'
          button='Сохранить'
          isOpen={isNewCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleNewCardSubmit}
        />

        <ConfirmationPopup
          name='confirmation'
          title='Вы уверены?'
          button='Да'
          sizeModifier='popup__container_small'
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onRemoveCard={handleDeleteCard}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;