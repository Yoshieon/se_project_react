import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../utils/context/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__profile">
          <p className="sidebar__username">{currentUser?.name || "User"}</p>
          <img
            src={currentUser?.avatar || ""}
            alt={currentUser?.name || "User"}
            className="sidebar__avatar"
          />
        </div>
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfile}
        >
          Edit profile
        </button>
        <button
          type="button"
          className="sidebar__signout-btn"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
