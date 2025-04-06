import React from "react";

function RestaurantNavbar({ activeCategory, setActiveCategory }) {
  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
    "Chef's Specials",
    "Sides"
  ];

  return (
    <nav className="rest-navbar">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RestaurantNavbar;
