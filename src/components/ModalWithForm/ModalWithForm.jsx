import "./ModalWithForm.css";
import closeIcon from "../../assets/close-btn-modal.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit,
  isSubmitDisabled,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit" disabled={isSubmitDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
