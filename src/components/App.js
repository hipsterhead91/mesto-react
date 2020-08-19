import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen) };
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(!isEditProfilePopupOpen) };
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(!isAddPlacePopupOpen) };
  const handleImagePopupClick = () => { setIsImagePopupOpen(!isImagePopupOpen) };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  function openImage(card) {
    setSelectedCard(card);
    handleImagePopupClick();
  }

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} getCard={(item) => openImage(item)} />
      <Footer />

      {/* ПОПАП ОБНОВЛЕНИЯ АВАТАРА */}
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name='avatar' title='Обновить аватар' sizeModifier='popup__container_medium' button='Сохранить'>
        <label className="popup__input-alignment">
          <input id="avatar" name="avatar" className="popup__input" required autoComplete="off" type="url"
            placeholder="Ссылка на аватар" />
          <span id="avatar-error" className="popup__error"></span>
        </label>
      </PopupWithForm>

      {/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name='profile' title='Редактировать профиль' button='Сохранить'>
        <label className="popup__input-alignment">
          <input id="name" name="name" className="popup__input" required autoComplete="off" type="text"
            placeholder="Имя" minLength="2" maxLength="40" />
          <span id="name-error" className="popup__error"></span>
        </label>
        <label className="popup__input-alignment">
          <input id="job" name="job" className="popup__input" required autoComplete="off" type="text"
            placeholder="О себе" minLength="2" maxLength="200" />
          <span id="job-error" className="popup__error"></span>
        </label>
      </PopupWithForm>

      {/* ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ */}
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name='new-card' title='Новое место' button='Сохранить'>
        <label className="popup__input-alignment">
          <input id="title" name="title" className="popup__input" required autoComplete="off" type="text"
            placeholder="Название" minLength="1" maxLength="30" />
          <span id="title-error" className="popup__error"></span>
        </label>
        <label className="popup__input-alignment">
          <input id="link" name="link" className="popup__input" required autoComplete="off" type="url"
            placeholder="Ссылка на картинку" />
          <span id="link-error" className="popup__error"></span>
        </label>
      </PopupWithForm>

      {/* ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ */}
      <PopupWithForm isOpen={false} name='confirmation' title='Вы уверены?' size='popup__container_small' button='Да'></PopupWithForm>

      {/* ПОПАП ПОЛНОРАЗМЕРНОЙ КАРТИНКИ */}
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;