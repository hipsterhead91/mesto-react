import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={`${props.name}-popup`}>
      <form className={`popup__container ${props.sizeModifier}`} id={`${props.name}-form`} noValidate>
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
        <p className="popup__title">{props.title}</p>
        {props.children}
        <button type="submit" className="popup__submit-button popup__submit-button_disabled" id={`${props.name}-submit`} disabled>{props.button}</button>
      </form>
    </div>
  )
}

export default PopupWithForm;