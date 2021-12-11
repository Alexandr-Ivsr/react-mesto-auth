import React from 'react';
import closeIcon from "../image/icon-close.svg";
import iconTooltipSuccess from "../image/icon-tooltip-success.svg";
//import iconTooltipError from "../icon-tooltip-error.svg";


export default function InfoTooltip(props) {

	return (
		<article className="popup popup_type_tooltip">
			<div className="popup__container">
				<img className="popup__tooltip-icon" src={iconTooltipSuccess} />
				<p className="popup__tooltip-message">Что-то пошло не так! Попробуйте ещё раз.</p>
				<button className="popup__btn-close" onClick={props.onClose}>
          <img className="popup__btn-close-icon" src={closeIcon} alt="Закрыть" />
        </button>
			</div>
		</article>
	)
}