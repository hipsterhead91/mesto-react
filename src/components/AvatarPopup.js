import React from 'react';
import PopupWithForm from './PopupWithForm';

function AvatarPopup(props) {

  const avatarRef = React.useRef();
  
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
          required ref={avatarRef} autoComplete="off"
          id="avatar-input" name="avatar" className="popup__input"
          type="url" placeholder="Ссылка на аватар" />
        <span id="avatar-input-error" className="popup__error"></span>
      </label>

    </PopupWithForm>
  )
}

export default AvatarPopup;