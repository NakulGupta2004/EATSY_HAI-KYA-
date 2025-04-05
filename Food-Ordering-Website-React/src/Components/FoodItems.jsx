import React from "react";

function FoodItems(props) {
  const foodItemData=props.data;

  const FoodItemList = foodItemData.map((categories, index) => (
    <div className="item-card" key={index}>
      <p className="title">{categories.category}</p>
      <div>
        {categories.itemList.map((item, index) => (
          <div key={index}>
            <div className="card-container">
              <div className="card-container-start">
                <img src={item.imgPath} />
              </div>
              <div className="card-container-middle">
                <div>
                  <img
                    src="images/veg.svg"
                    alt=""
                    height="16px"
                    width="16px"
                    style={{ marginTop: "5px" }}
                  />
                  <div className="item-name">{item.name}</div>
                </div>
                <div>
                  <div className="stars">★★★★★</div>
                  <div className="ratings">{item.rating}k+ ratings</div>
                </div>
                <div className="dashed-border"></div>
                <p>{item.desc}</p>
              </div>
              <div className="card-container-end">
                <h2>${item.price}</h2>
                <div className="add-button" onClick={()=>{props.addfun(item)}}>+Add</div>
              </div>
            </div>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </div>
  ));

  return <div className="fooditems">{FoodItemList}</div>;
}

export default FoodItems;
