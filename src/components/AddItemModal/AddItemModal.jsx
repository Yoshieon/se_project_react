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
  isFormValid,
}) => {
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isFormValid) return;
    onAddItem({
      name,
      imageUrl,
      weatherType: selectedWeatherType,
    });
  }

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };

  const handleWeatherChange = (evt) => {
    setSelectedWeatherType(evt.target.value);
  };

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
          placeholder="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleImageUrlChange}
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
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
