import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, removeItem, addCardLike, removeCardLike } from "../../utils/api";
import { signup, signin, checkToken, updateUser } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../utils/context/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isOpen, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const deleteItemHandler = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    removeItem(id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => String(item._id ?? item.id) !== String(id)),
        );
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => setActiveModal("login");

  const handleRegisterClick = () => setActiveModal("register");

  const handleEditProfileClick = () => setActiveModal("edit-profile");

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((data) => {
        if (!data?.token) throw new Error("Authorization failed");
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(data.token);
      })
      .then((user) => setCurrentUser(user))
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        if (!data?.token) throw new Error("Authorization failed");
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(data.token);
      })
      .then((user) => setCurrentUser(user))
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAllowed={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                    onEditProfile={handleEditProfileClick}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <AddItemModal
            isOpen={isOpen === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <LoginModal
            isOpen={isOpen === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />
          <RegisterModal
            isOpen={isOpen === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />
          <EditProfileModal
            isOpen={isOpen === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
          <ItemModal
            isOpen={isOpen}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={isLoggedIn ? deleteItemHandler : undefined}
          />
          <DeleteConfirmationModal
            isOpen={showDeleteConfirmation}
            onClose={closeDeleteConfirmation}
            onConfirm={confirmDeleteItem}
            itemId={itemToDelete}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
