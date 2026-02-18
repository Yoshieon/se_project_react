import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, removeItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
// import { clothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isOpen, setisOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeatherType, setSelectedWeatherType] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
    setisOpen("");
  };

  const handleCardClick = (card) => {
    setisOpen("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const deleteItemHandler = (id) => {
    removeItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => String(item._id) !== String(id)));
        closeisOpen();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setName("");
    setImageUrl("");
    setSelectedWeatherType("");
    setisOpen("add-garment");
  };

  const closeisOpen = () => {
    setisOpen("");
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeisOpen();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          isOpen={isOpen === "add-garment"}
          onClose={closeisOpen}
          onAddItem={handleFormSubmit}
          name={name}
          setName={setName}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          selectedWeatherType={selectedWeatherType}
          setSelectedWeatherType={setSelectedWeatherType}
          isFormValid={isFormValid}
        />
        <ItemModal isOpen={isOpen} card={selectedCard} onClose={closeisOpen} onDelete={deleteItemHandler} />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
