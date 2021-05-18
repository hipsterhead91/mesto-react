import React from 'react';
import PopupWithForm from './PopupWithForm.js';

// ПОПАП ОБНОВЛЕНИЯ АВАТАРА

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  // обработка сабмита
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={props.name}
      title={props.title}
      button={props.button}
      sizeModifier={props.sizeModifier}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >

      <label className="popup__input-alignment">
        <input
          required ref={avatarRef}
          id="avatar" name="avatar" className="popup__input"
          type="url" placeholder="Ссылка на аватар" />
        <span id="avatar-error" className="popup__error"></span>
      </label>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;