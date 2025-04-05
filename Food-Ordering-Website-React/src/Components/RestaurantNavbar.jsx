import React, { useState } from "react";

function RestaurantNavbar({ categories = ["Pizza", "Burger", "Pasta", "Dessert", "Drink"] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="restaurant-nav">
      <ul>
        <li 
          className={activeCategory === "All" ? "active" : ""}
          onClick={() => setActiveCategory("All")}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li 
            key={index}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantNavbar;
