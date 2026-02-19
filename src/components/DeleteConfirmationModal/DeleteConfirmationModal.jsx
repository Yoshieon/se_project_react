import { useEffect } from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-btn-modal.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemId }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(itemId);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleBackdropClick}>
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal__title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__button modal__button_type_delete"
            onClick={handleConfirm}>
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__button modal__button_type_cancel"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
