import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // инпут с именем
  function handleChangeName(event) {
    setName(event.target.value)
  }

  // инпут с профессией
  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  // обработка сабмита
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >

      <label className="popup__input-alignment">
        <input
          required defaultValue={name} onChange={handleChangeName}
          id="name" name="name" className="popup__input"
          type="text" placeholder="Имя" minLength="2" maxLength="40" />
        <span id="name-error" className="popup__error"></span>
      </label>

      <label className="popup__input-alignment">
        <input
          required defaultValue={description} onChange={handleChangeDescription}
          id="job" name="job" className="popup__input"
          type="text" placeholder="О себе" minLength="2" maxLength="200" />
        <span id="job-error" className="popup__error"></span>
      </label>

    </PopupWithForm>
  )
}

export default EditProfilePopup;