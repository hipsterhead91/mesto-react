import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

// КАРТОЧКА

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // статусы карточки (автор, лайк)
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() { props.onCardClick(props.card) }
  function handleLikeClick() { props.onCardLike(props.card) }
  function handleDeleteClick() { props.onCardDelete(props.card) }

  const deleteButtonClassName = (`element__delete-button ${!isOwn && "element__delete-button_hidden"}`);
  const likeButtonClassName = (`element__like-button ${isLiked && "element__like-button_active"}`);

  return (
    <div className="element">
      <button className={deleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
      <img className="element__image" src={props.link} alt="Пользовательское изображение." onClick={handleClick} />
      <div className="element__horizontal-alignment">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__vertical-alignment">
          <button className={likeButtonClassName} type="button" onClick={handleLikeClick} ></button>
          <span className="element__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;