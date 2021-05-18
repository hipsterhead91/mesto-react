import React from 'react';
import PopupWithForm from './PopupWithForm.js';

// ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ

function ConfirmationPopup(props) {

  // обработка сабмита
  function handleSubmit(event) {
    event.preventDefault();
    props.onRemoveCard();
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
    </PopupWithForm>
  )
}

export default ConfirmationPopup;