class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // проверка ответа от сервера
  _checkResponse(result) {
    if (result.ok) { return result.json() }
    else { return Promise.reject(`Ошибка: ${result.status}`) }
  }

  // получение информации о пользователе (имя, профессия, аватар)
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // обновление информации о пользователе (имя, профессия)
  patchUserInfo(newName, newJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
      .then(result => { return this._checkResponse(result); })
  }

  // обновление аватара
  patchUserAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(result => { return this._checkResponse(result); })
  }

  // запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // добавление новой карточки
  postNewCard(cardTitle, cardImage) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle,
        link: cardImage
      })
    })
      .then(result => { return this._checkResponse(result); })
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // постановка/снятие лайка
  changeLike(cardId, isNotLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isNotLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '41d7f09e-77c9-4cd2-9eb8-a7dd1866e16a',
    'Content-Type': 'application/json'
  }
});

export default api;