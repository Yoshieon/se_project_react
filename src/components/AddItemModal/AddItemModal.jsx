import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onClose,
  name,
  setName,
  imageUrl,
  setImageUrl,
  selectedWeatherType,
  setSelectedWeatherType,
}) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem();
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
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
            checked={selectedWeatherType === "hot"}
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
            checked={selectedWeatherType === "warm"}
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
            checked={selectedWeatherType === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
