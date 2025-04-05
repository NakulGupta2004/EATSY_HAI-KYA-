import CartItems from "../Components/CartItems";
import FoodItems from "../Components/FoodItems";
import RestrauntHeader from "../Components/RestrauntHeader";
import RestaurantNavbar from "../Components/RestaurantNavbar";
import SearchBar from "../Components/SearchBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Static/R1.css";
import Footer from "../Components/Footer";

function Restaurant() {
  const navigate = useNavigate();
  
  // Get selected restaurant from localStorage
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  useEffect(() => {
    // Try to get selected restaurant from localStorage
    const storedRestaurant = localStorage.getItem('selectedRestaurant');
    
    if (storedRestaurant) {
      const restaurant = JSON.parse(storedRestaurant);
      setSelectedRestaurant(restaurant);
      // Clear localStorage after retrieving data
      localStorage.removeItem('selectedRestaurant');
      
      // Set the page title with unique ID
      if (restaurant.pageId) {
        document.title = `${restaurant.pageId}`;
      }
    }
  }, []);

  const [cart, setCart] = useState([]);
  const [amount, setamount] = useState(0);
  const [counter, setcounter] = useState(0);

  const handleAddToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    setamount(amount + item.price);
    setcounter(counter + 1);
    if (itemIndex >= 0) {
      const newCart = [...cart];
      newCart[itemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    setamount(amount - item.price);
    setcounter(counter - 1);
    if (itemIndex >= 0) {
      const newCart = [...cart];

      if (newCart[itemIndex].quantity > 1) {
        newCart[itemIndex].quantity -= 1;
      } else {
        newCart.splice(itemIndex, 1);
      }

      setCart(newCart);
    }
  };

  return (
    <>
      <RestrauntHeader 
        restaurantInfo={selectedRestaurant}
        cartcounter={counter} 
        data={cart} 
        addfun={handleAddToCart} 
        amount={amount} 
        subfun={handleRemoveFromCart} 
      />

      {/* Restaurant Banner */}
      {selectedRestaurant && (
        <div className="restaurant-banner">
          <div className="restaurant-banner-image">
            <img src={selectedRestaurant.image} alt={selectedRestaurant.name} />
          </div>
          <div className="restaurant-banner-content">
            <h1>{selectedRestaurant.name}</h1>
            <div className="restaurant-banner-rating">
              <span>★</span> {selectedRestaurant.rating}
            </div>
            <p className="restaurant-banner-cuisine">{selectedRestaurant.cuisine}</p>
            <p className="restaurant-banner-location">{selectedRestaurant.location}</p>
            <p className="restaurant-banner-description">{selectedRestaurant.description}</p>
          </div>
        </div>
      )}

      <main>
        <div className="container">
          <div className="container-child1">
            <RestaurantNavbar />
            <div className="content">
              <SearchBar />
              <FoodItems data={foodItemData} addfun={handleAddToCart} />
            </div>
          </div>
          <CartItems data={cart} addfun={handleAddToCart} amount={amount} subfun={handleRemoveFromCart}/>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

const foodItemData = [
  {
    name: "Spicy Paneer Pizza",
    imgPath: "../images/food1.jpg",
    price: 12.5,
  },
  {
    name: "Veg Supreme Pizza",
    imgPath: "../images/food2.jpg",
    price: 15,
  },
  {
    name: "Veg Burger",
    imgPath: "../images/food3.jpg",
    price: 8,
  },
];

export default Restaurant;
