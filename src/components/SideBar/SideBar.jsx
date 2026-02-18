import "./SideBar.css";
import logo from "../../assets/logo.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img src={logo} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
