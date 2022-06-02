import React from 'react';

function ImagePopup(props) {

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
    <div className={`popup ${visibilityModifier}`} id="image-popup" onClick={closeByOverlayClick}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.selectedCard.link} alt="Изображение, загруженное пользователем" />
        <p className="popup__image-title">{props.selectedCard.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;