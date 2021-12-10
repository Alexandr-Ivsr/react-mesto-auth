class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  updateProfileData({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  createCardData({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCardData(id, isOwn) {
    if (isOwn) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    }
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    }
  }

  updateProfileAvatar({avatar}, evt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: 'f77a7956-a5a9-4ad6-a04a-920b557c7dfd',
    'Content-Type': 'application/json'
  }
});

export default api;