import React from 'react';
import avatarPath from '../../images/avatar.jpg';
import api from '../../utils/api.js';
import Card from '../Card/Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userInfo, setUserInfo] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatarPath);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setUserName(user.name);
        setUserInfo(user.about);
        setUserAvatar(user.avatar);
        setCards(initialCards);
      })
      .catch(error => console.error(error))
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={userAvatar} alt="Пользовательский аватар." />
          <div className="profile__avatar-overlay">
            <button className="profile__edit-avatar" type="button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__vertical-alignment">
            <div className="profile__horizontal-alignment">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__job">{userInfo}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map(card => <Card key={card._id} card={card} link={card.link} name={card.name} likes={card.likes} onCardClick={props.getCard} />)}
      </section>
    </main>
  );
}

export default Main;