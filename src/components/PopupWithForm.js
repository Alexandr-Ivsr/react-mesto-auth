import closeIcon from "../image/icon-close.svg";

export default function PopupWithForm(props) {

  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" onSubmit={props.onSubmit} name={props.name}>
          {props.children}
          <button className="popup__btn-save" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__btn-close" onClick={props.onClose}>
          <img className="popup__btn-close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </article>
  )
}