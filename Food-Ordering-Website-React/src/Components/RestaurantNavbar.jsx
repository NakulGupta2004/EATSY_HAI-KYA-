import React from "react";

function RestaurantNavbar({ activeCategory, setActiveCategory }) {
  // Categories for a restaurant menu
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
    <div className="rest-navbar">
      <ul>
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
