import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button className="element__delete-button" type="button"></button>
      <img className="element__image" src={props.link} alt="Пользовательское изображение." onClick={handleClick} />
      <div className="element__horizontal-alignment">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__vertical-alignment">
          <button className="element__like-button" type="button"></button>
          <span className="element__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;