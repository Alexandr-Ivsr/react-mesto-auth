import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
	const [placeName, setPlaceName] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		setPlaceName('');
		setUrl('');
	}, [props.isOpen])

	const handleChangePlaceName = (evt) => {
		setPlaceName(evt.target.value);
	};

	const handleChangeUrl = (evt) => {
		setUrl(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		props.onAddNewCard({
			name: placeName,
			link: url,
		})
	};

	return (
		<PopupWithForm title="Новое место" name="place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Создать">
			<div className="popup__inputs-wrapper">
				<input required className="popup__input" value={placeName} onChange={handleChangePlaceName} type="text" id="place-name" minLength="2" maxLength="30" name="name" placeholder="Название" />
				<span className="popup__error" id="place-name-error"></span>
				<input required className="popup__input" value={url} onChange={handleChangeUrl} type="url" name="link" id="place-link" placeholder="Ссылка на картинку" />
				<span className="popup__error" id="place-link-error"></span>
			</div>
		</PopupWithForm>
	)
}