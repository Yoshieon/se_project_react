import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Text</p>
        <button>Button</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
