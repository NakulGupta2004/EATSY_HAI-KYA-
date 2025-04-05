import React from "react";

function RestaurantNavbar({ categories = ["Pizza", "Burgers", "Desserts", "Drinks"] }) {
  return (
    <div className="nav">
      <ul>
        <li>All</li>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantNavbar;
