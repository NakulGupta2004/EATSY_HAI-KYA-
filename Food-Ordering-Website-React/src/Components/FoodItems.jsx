import React from "react";

function FoodItems({ data = [], addfun }) {
  // Add a default empty array to prevent undefined errors
  const foodData = data || [];
  
  return (
    <div className="fooditems">
      {foodData.length > 0 ? (
        foodData.map((item, index) => (
          <div className="fooditems-child" key={index}>
            <div className="fooditems-child-img-container">
              <img
                src={item.imgPath}
                alt="food"
                className="fooditems-child-img"
              />
            </div>
            <div className="fooditems-child-text">
              <h5>{item.name}</h5>
              <p>$ {item.price}</p>
              <button className="addbtn" onClick={() => addfun(item)}>
                Add +
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-items-message">
          <p>No food items available. Add some dishes to get started!</p>
        </div>
      )}
    </div>
  );
}

export default FoodItems;
