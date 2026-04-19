import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close-btn-modal.svg";
import CurrentUserContext from "../../utils/context/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = Boolean(
    currentUser &&
    card &&
    card.owner &&
    String(card.owner._id ?? card.owner) === String(currentUser._id),
  );
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen === "preview" && "modal_opened"}`}
      onClick={handleBackdropClick}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt="card-image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {onDelete && isOwn && (
            <button
              type="button"
              className="modal__delete"
              onClick={() => onDelete(card && (card._id || card.id))}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
