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
      headers: this._headers,
		  credentials: 'include',
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
		  credentials: 'include',
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  updateProfileData({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
		  credentials: 'include',
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
		  credentials: 'include',
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
		    credentials: 'include',
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    }
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
		    credentials: 'include',
      })
      .then((res) => {
        return this._getResponseData(res);
      })
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
		    credentials: 'include',
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
      credentials: 'include',
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
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;