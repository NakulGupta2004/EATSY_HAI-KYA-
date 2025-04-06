import React from "react";
import "./FoodItems.css";

function FoodItems({ data = [], addfun, deleteFun }) {
  // Add error handling for image loading
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image+Available';
  };

  return (
    <div className="rest-food-grid">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div className="rest-food-card" key={index}>
            <div className="rest-food-img-container">
              <img 
                className="rest-food-img" 
                src={item.imgPath} 
                alt={item.name}
                onError={handleImageError}
              />
              <button 
                className="delete-icon"
                onClick={() => deleteFun(item._id)}
                title="Delete dish"
              >
                ×
              </button>
            </div>
            <div className="rest-food-content">
              <h3 className="rest-food-title">{item.name}</h3>
              {item.category && (
                <span className="rest-food-category">{item.category}</span>
              )}
              <p className="rest-food-price">${item.price}</p>
              <div className="rest-food-buttons">
                <button 
                  className="rest-add-btn"
                  onClick={() => addfun(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rest-no-dishes">
          <p>No dishes available. Add some dishes to get started!</p>
        </div>
      )}
    </div>
  );
}

export default FoodItems;
