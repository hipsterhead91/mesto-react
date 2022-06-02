import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function ProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeAbout(event) {
    setAbout(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name={props.name}
      title={props.title}
      button={props.button}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >

      <label className="popup__input-alignment">
        <input
          className="popup__input" id="name-input" required defaultValue={name}
          onChange={handleChangeName} name="name" autoComplete="off"
          type="text" placeholder="Имя" minLength="2" maxLength="40" />
        <span id="name-input-error" className="popup__error"></span>
      </label>

      <label className="popup__input-alignment">
        <input
          className="popup__input" id="about-input" required defaultValue={about}
          onChange={handleChangeAbout} name="about" autoComplete="off"
          type="text" placeholder="О себе" minLength="2" maxLength="200" />
        <span id="about-input-error" className="popup__error"></span>
      </label>

    </PopupWithForm>
  )
}

export default ProfilePopup;