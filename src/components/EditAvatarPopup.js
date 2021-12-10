import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
	const inputRef = useRef();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		props.onUpdateAvatar({
			avatar: inputRef.current.value,
		}, evt)
	};

	return (
		<PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
			<div className="popup__inputs-wrapper">
				<input required className="popup__input" id="profile-avatar" type="url" name="avatar" placeholder="Ссылка на аватар" ref={inputRef} />
				<span className="popup__error" id="profile-avatar-error"></span>
			</div>
		</PopupWithForm>
	)
}