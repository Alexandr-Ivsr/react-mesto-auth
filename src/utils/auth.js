export const BASE_URL = 'https://auth.nomoreparties.co/';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	else {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
}

// регистрация, отправляем данные юзера
export const register = ({ email, password }) => {
	return fetch(`${BASE_URL}signup`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password })
	})
		.then((res) => {
			return checkResponse(res);
		})
};

// авторизация
export const authorization = (data) => {
	return fetch(`${BASE_URL}signin`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	})
		.then((res) => {
			return checkResponse(res);
		})
};

// проверка токена для входа
export const checkToken = (token) => {
	return fetch(`${BASE_URL}users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
	})
		.then((res) => {
			return checkResponse(res);
		})
}