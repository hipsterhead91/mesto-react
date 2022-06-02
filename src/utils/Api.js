class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // ПРОВЕРКА ОТВЕТА ОТ СЕРВЕРА
  // Примечание: здесь мы проверяем ответ от сервера и в зависимости от него возвращаем либо нужный 
  // нам результат, либо ошибку. Этот код вынесен в отдельный приватный метод, поскольку иначе он бы
  // повторялся во всех остальных методах. DRY.
  _checkResponse(result) {
    if (result.ok) { return result.json() }
    else { return Promise.reject(`Ошибка: ${result.status}`) }
  }

  // ПОЛУЧЕНИЕ ИФНОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ (ИМЯ, О СЕБЕ, АВАТАР)
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // ОБНОВЛЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ (ИМЯ, О СЕБЕ)
  patchUserInfo(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(result => { return this._checkResponse(result); })
  }

  // ОБНОВЛЕНИЕ АВАТАРА
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

  // ЗАПРОС КАРТОЧЕК С СЕРВЕРА
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
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

  // УДАЛЕНИЕ КАРТОЧКИ
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => { return this._checkResponse(result); })
  }

  // ПОСТАНОВКА/СНЯТИЕ ЛАЙКА
  changeLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
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