import { useEffect, useState } from "react";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeatherType, setSelectedWeatherType] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [defaultClothingItemsState, setDefaultClothingItems] =
    useState(defaultClothingItems);

  const isImageUrlValid = (() => {
    if (!imageUrl) return false;
    try {
      new URL(imageUrl);
      return true;
    } catch (e) {
      return false;
    }
  })();

  const isFormValid =
    name.trim() !== "" && isImageUrlValid && selectedWeatherType !== "";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setName("");
    setImageUrl("");
    setSelectedWeatherType("");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          defaultClothingItems={defaultClothingItemsState}
        />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onSubmit={handleFormSubmit}
        isSubmitDisabled={!isFormValid}>
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="weatherType"
              value="hot"
              className="modal__radio-input"
              checked={selectedWeatherType === "hot"}
              onChange={(e) => setSelectedWeatherType(e.target.value)}
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio">
            <input
              id="warm"
              type="radio"
              name="weatherType"
              value="warm"
              className="modal__radio-input"
              checked={selectedWeatherType === "warm"}
              onChange={(e) => setSelectedWeatherType(e.target.value)}
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio">
            <input
              id="cold"
              type="radio"
              name="weatherType"
              value="cold"
              className="modal__radio-input"
              checked={selectedWeatherType === "cold"}
              onChange={(e) => setSelectedWeatherType(e.target.value)}
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
