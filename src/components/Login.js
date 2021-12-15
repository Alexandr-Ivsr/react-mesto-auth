import React, { useState } from 'react';

export default function Login(props) {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const handleChangeEmail = (evt) => {
		setEmailValue(evt.target.value);
	}

	const handleChangePassword = (evt) => {
		setPasswordValue(evt.target.value);
	}

	const handleSubmit = (evt) => {
    evt.preventDefault();

		props.onAuthorization({
			"password": passwordValue,
    	"email": emailValue,
		});
	}


	return (
		<div className="form-registr">
			<h3 className="form-registr__title">Вход</h3>
			<form className="form-registr__form" onSubmit={handleSubmit}>
				<div className="form-registr__inputs-wrapper">
					<input required className="form-registr__input" value={emailValue} onChange={handleChangeEmail} type="email" id="user-email" minLength="6" maxLength="30" name="email" placeholder="Email" />
					<input required className="form-registr__input" value={passwordValue} onChange={handleChangePassword} type="password" id="user-password" minLength="6" maxLength="15" name="password" placeholder="Пароль" />
				</div>
				<button className="form-registr__btn-save" type="submit">Войти</button>
			</form>
		</div>
	)
}