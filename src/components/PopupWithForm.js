import React from 'react';

// ПОПАП С ФОРМОЙ (БАЗОВЫЙ ШАБЛОН)

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id={`${props.name}-popup`}>
      <form onSubmit={props.onSubmit} className={`popup__container ${props.sizeModifier}`} id={`${props.name}-form`} noValidate >
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
        <p className="popup__title">{props.title}</p>
        {props.children}
        <button type="submit" className="popup__submit-button" id={`${props.name}-submit`}>{props.button}</button>
      </form>
    </div>
  )
}

export default PopupWithForm;