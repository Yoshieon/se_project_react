import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    weatherType: "",
    imageUrl: "",
  });

  const isImageUrlValid = (() => {
    if (!values.imageUrl) return false;
    try {
      new URL(values.imageUrl);
      return true;
    } catch (e) {
      return false;
    }
  })();

  const isFormValid =
    values.name.trim() !== "" && isImageUrlValid && values.weatherType !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isFormValid) return;
    onAddItem(values);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="name"
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            value="hot"
            className="modal__radio-input"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            value="warm"
            className="modal__radio-input"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            value="cold"
            className="modal__radio-input"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
