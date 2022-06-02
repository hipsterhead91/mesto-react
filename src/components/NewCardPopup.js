import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function NewCardPopup(props) {

  const titleRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      title: titleRef.current.value,
      link: linkRef.current.value,
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
          required ref={titleRef} autoComplete="off"
          id="title-input" name="title" className="popup__input"
          type="text" placeholder="Заголовок карточки" minLength="1" maxLength="30" />
        <span id="title-input-error" className="popup__error"></span>
      </label>

      <label className="popup__input-alignment">
        <input
          required ref={linkRef}
          id="link-input" name="link" className="popup__input"
          type="url" placeholder="Ссылка на картинку" autoComplete="off" />
        <span id="link-input-error" className="popup__error"></span>
      </label>

    </PopupWithForm>
  )
}

export default NewCardPopup;