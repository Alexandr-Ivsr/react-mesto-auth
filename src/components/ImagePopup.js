import CloseIcon from "../image/icon-close.svg";

export default function ImagePopup({card, onClose}) {
  return (
    <article className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__btn-close" onClick={onClose}>
          <img className="popup__btn-close-icon" src={CloseIcon} alt="Закрыть" />
        </button>
        <img className="popup__place-img" src={card.link} alt={card.name} />
        <p className="popup__place-name">{card.name}</p>
      </div>
    </article>
  );
}