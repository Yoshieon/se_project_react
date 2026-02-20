import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}
