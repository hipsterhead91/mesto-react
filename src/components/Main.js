import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import CurrentCardsContext from '../contexts/CurrentCardsContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const currentCards = React.useContext(CurrentCardsContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          <div className="profile__avatar-overlay">
            <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__vertical-alignment">
            <div className="profile__horizontal-alignment">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddCard}></button>
      </section>

      <section className="elements">
        {currentCards.map(card =>
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onGetCard}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )}
      </section>
    </main>
  );
}

export default Main;