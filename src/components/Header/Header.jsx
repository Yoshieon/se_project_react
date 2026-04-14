import "./Header.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "User";
  const avatarIsValid = Boolean(currentUser?.avatar);
  const userInitial = userName.charAt(0).toUpperCase();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__section header__left">
        <NavLink to="/" className="header__logo-link">
          <img className="header__logo" src={avatar} alt="Avatar" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__section header__right">
        <ToggleSwitch />
        {!isLoggedIn && (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onLoginClick}>
              Log in
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onRegisterClick}>
              Register
            </button>
          </>
        )}
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn">
          + Add clothes
        </button>
        {isLoggedIn && (
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{userName}</p>
              {avatarIsValid ? (
                <img
                  src={currentUser.avatar}
                  alt={userName}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
