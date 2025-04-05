import React from "react";

function FoodItems({ data = [], addfun }) {
  return (
    <div className="rest-food-grid">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div className="rest-food-card" key={index}>
            <div className="rest-food-img-container">
              <img className="rest-food-img" src={item.imgPath} alt={item.name} />
            </div>
            <div className="rest-food-content">
              <h3 className="rest-food-title">{item.name}</h3>
              {item.category && (
                <span className="rest-food-category">{item.category}</span>
              )}
              <p className="rest-food-price">${item.price}</p>
              <button 
                className="rest-add-btn"
                onClick={() => addfun(item)}
              >
                Add to Cart
              </button>
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
