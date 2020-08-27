import React from 'react';
import Card from '../Card/Card.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

// ОСНОВНОЙ РАБОЧИЙ БЛОК

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={currentUser.avatar} alt="Пользовательский аватар." />
          <div className="profile__avatar-overlay">
            <button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar"></button>
          </div>
          <div className="profile__vertical-alignment">
            <div className="profile__horizontal-alignment">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
      </section>

      <section className="elements">
        {props.cards.map(card =>
          <Card
            key={card._id}
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes}
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