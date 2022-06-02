import React from 'react';

function PopupWithForm(props) {

  function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) props.onClose();
  }

  function closeByEsc(event) {
    if (event.keyCode === 27) props.onClose();
  }

  React.useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => { document.removeEventListener("keydown", closeByEsc) };
  });

  const visibilityModifier = props.isOpen ? "popup_opened" : "";

  return (
    <div className={`popup ${visibilityModifier}`} id={`${props.name}-popup`} onClick={closeByOverlayClick}>
      <form className={`popup__container ${props.sizeModifier}`} id={`${props.name}-form`} onSubmit={props.onSubmit} noValidate >
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <p className="popup__title">{props.title}</p>
        {props.children}
        <button className="popup__submit-button" id={`${props.name}-submit`} type="submit" >{props.button}</button>
      </form>
    </div>
  )
}

export default PopupWithForm;