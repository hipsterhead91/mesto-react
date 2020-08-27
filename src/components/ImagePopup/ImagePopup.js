import React from 'react';

// ПОПАП ПОЛНОРАЗМЕРНОЙ КАРТИНКИ

function ImagePopup(props) {
  
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id="image-popup">
      <div className="popup__image-container">
        <button onClick={props.onClose} className="popup__close-button" type="button"></button>
        <img className="popup__image" src={props.selectedCard.link} alt="Пользовательское изображение." />
        <p className="popup__image-title">{props.selectedCard.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;