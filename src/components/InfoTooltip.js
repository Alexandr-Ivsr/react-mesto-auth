import React from 'react';
import closeIcon from "../image/icon-close.svg";
import iconTooltipSuccess from "../image/icon-tooltip-success.svg";
import iconTooltipError from "../image/icon-tooltip-error.svg";

export default function InfoTooltip(props) {

	return (
		<article className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<img className="popup__tooltip-icon" alt="Уведомление" src={props.isSuccess ? iconTooltipSuccess : iconTooltipError} />
				<p className="popup__tooltip-message">
					{props.isSuccess ? (
						<>Вы успешно зарегистрировались!</>
					) : (
						<>Что-то пошло не так! Попробуйте ещё раз.</>
					)}
				</p>
				<button className="popup__btn-close" onClick={props.onClose}>
					<img className="popup__btn-close-icon" src={closeIcon} alt="Закрыть" />
				</button>
			</div>
		</article>
	)
}