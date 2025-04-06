import React, { useState, useEffect, useMemo } from "react";
import CartItems from "../Components/CartItems";
import FoodItems from "../Components/FoodItems";
import RestrauntHeader from "../Components/RestrauntHeader";
import RestaurantNavbar from "../Components/RestaurantNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Static/R1.css";
import Footer from "../Components/Footer";

function Restaurant() {
  const navigate = useNavigate();
  
  // Create a base64 encoded placeholder image directly in the code
  const noImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f8f8'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E";
  
  // Get selected restaurant from localStorage
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  // Add modal state
  const [showModal, setShowModal] = useState(false);
  
  // Add state for active category
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Add state for form data
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    category: ''
  });
  
  // Add state for image upload
  const [dishImage, setDishImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Add state for toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Cart state
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [counter, setCounter] = useState(0);
  
  // Add state to track loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Add state for managing food items
  const [foodItems, setFoodItems] = useState([
    {
      name: "Spicy Paneer Pizza",
      imgPath: "../images/food1.jpg",
      price: 12.5,
      category: "Main Course"
    },
    {
      name: "Veg Supreme Pizza",
      imgPath: "../images/food2.jpg",
      price: 15,
      category: "Main Course" 
    },
    {
      name: "Veg Burger",
      imgPath: "../images/food3.jpg",
      price: 8,
      category: "Lunch"
    },
  ]);
  
  // Filter food items based on selected category
  const filteredFoodItems = useMemo(() => {
    if (activeCategory === "All") {
      return foodItems;
    } else {
      return foodItems.filter(item => item.category === activeCategory);
    }
  }, [foodItems, activeCategory]);
  
  useEffect(() => {
    // Try to get selected restaurant from localStorage
    const storedRestaurant = localStorage.getItem('selectedRestaurant');
    
    if (storedRestaurant) {
      const restaurant = JSON.parse(storedRestaurant);
      setSelectedRestaurant(restaurant);
      
      // Fetch dishes for this restaurant
      if (restaurant.id) {
        fetchDishesForRestaurant(restaurant.id);
      }
      
      // Clear localStorage after retrieving data
      localStorage.removeItem('selectedRestaurant');
      
      // Set the page title with unique ID
      if (restaurant.pageId) {
        document.title = `${restaurant.pageId}`;
      }
    }
  }, []);

  // Function to fetch dishes for a specific restaurant
  const fetchDishesForRestaurant = async (restaurantId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/restaurants/${restaurantId}/dishes`);
      if (response.data && response.data.dishes) {
        setFoodItems(response.data.dishes);
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
      showToast('Failed to load dishes for this restaurant', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    setAmount(amount + item.price);
    setCounter(counter + 1);
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
    setAmount(amount - item.price);
    setCounter(counter - 1);
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

  // Add function to handle modal close
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Add function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value
    });
  };
  
  // Add function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDishImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Add function to show toast notification
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  // Updated function to handle form submission with API call
  const handleAddDish = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newDish.name || !newDish.price || !newDish.category) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    if (!selectedRestaurant || !selectedRestaurant.id) {
      showToast('Cannot add dish - restaurant not identified', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a FormData object for multipart/form-data
      const formData = new FormData();
      formData.append('name', newDish.name);
      formData.append('price', newDish.price);
      formData.append('category', newDish.category);
      
      if (dishImage) {
        formData.append('image', dishImage);
      }
      
      // Send to server
      const response = await axios.post(
        `/api/restaurants/${selectedRestaurant.id}/dishes`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Add the new dish to the state with the returned data (includes server-generated ID)
      setFoodItems([...foodItems, response.data.dish]);
      
      // Show success toast
      showToast('Dish added successfully!', 'success');
      
      // Reset form and close modal
      setNewDish({ name: '', price: '', category: '' });
      setDishImage(null);
      setImagePreview(null);
      setShowModal(false);
      
    } catch (error) {
      console.error("Error adding dish:", error);
      showToast(error.response?.data?.message || 'Failed to add dish', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rest-page">
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
        <div className="rest-banner">
          <div className="rest-banner-img-container">
            <img className="rest-banner-img" src={selectedRestaurant.image} alt={selectedRestaurant.name} />
          </div>
          <div className="rest-banner-content">
            <h1 className="rest-banner-title">{selectedRestaurant.name}</h1>
            <div className="rest-banner-rating">
              <span>★</span> {selectedRestaurant.rating}
            </div>
            <p className="rest-banner-cuisine">{selectedRestaurant.cuisine}</p>
            <p className="rest-banner-location">{selectedRestaurant.location}</p>
            <p className="rest-banner-desc">{selectedRestaurant.description}</p>
          </div>
        </div>
      )}

      <div className="rest-content-container">
        <main className="rest-main">
          <div className="rest-main-container">
            <div className="rest-main-left">
              <RestaurantNavbar 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <div className="rest-content">
                <div className="rest-search-container">
                  <div className="rest-search-bar">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search dishes..." />
                  </div>
                </div>
                {isLoading ? (
                  <div className="rest-loading">
                    <div className="rest-spinner"></div>
                  </div>
                ) : (
                  <div className="rest-food-grid">
                    {filteredFoodItems.length > 0 ? (
                      filteredFoodItems.map((item, index) => (
                        <div className="rest-food-card" key={index}>
                          <div className="rest-food-img-container">
                            <img 
                              className="rest-food-img" 
                              src={item.imgPath || noImagePlaceholder} 
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = noImagePlaceholder;
                              }}
                            />
                          </div>
                          <div className="rest-food-content">
                            <h3 className="rest-food-title">{item.name}</h3>
                            {item.category && (
                              <span className="rest-food-category">{item.category}</span>
                            )}
                            <p className="rest-food-price">${item.price.toFixed(2)}</p>
                            <button 
                              className="rest-add-btn"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rest-no-dishes">
                        <p>No dishes available in this category. Add some dishes to get started!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <CartItems data={cart} addfun={handleAddToCart} amount={amount} subfun={handleRemoveFromCart}/>
          </div>
        </main>
      </div>
      
      <Footer />
      
      {/* Add Dish Button */}
      <div className="rest-add-floating-btn" onClick={() => setShowModal(true)}>
        <span>+</span>
        <span className="rest-btn-text">Add Dish</span>
      </div>

      {/* Add Dish Modal */}
      {showModal && (
        <div className="rest-modal-overlay">
          <div className="rest-modal-container">
            <div className="rest-modal-header">
              <h2>Add New Dish</h2>
              <button className="rest-modal-close" onClick={handleModalClose}>×</button>
            </div>
            <div className="rest-modal-body">
              <form onSubmit={handleAddDish}>
                <div className="rest-form-group">
                  <label htmlFor="name">Dish Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={newDish.name}
                    onChange={handleInputChange}
                    placeholder="Enter dish name" 
                    required 
                  />
                </div>
                <div className="rest-form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price"
                    value={newDish.price}
                    onChange={handleInputChange}
                    placeholder="Enter price" 
                    step="0.01" 
                    required 
                  />
                </div>
                <div className="rest-form-group">
                  <label htmlFor="category">Category</label>
                  <select 
                    id="category" 
                    name="category"
                    value={newDish.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Chef's Specials">Chef's Specials</option>
                    <option value="Sides">Sides</option>
                  </select>
                </div>
                <div className="rest-form-group">
                  <label htmlFor="dishImage">Image</label>
                  <input 
                    type="file" 
                    id="dishImage" 
                    onChange={handleImageChange}
                    accept="image/*" 
                  />
                </div>
                
                {/* Image preview */}
                {imagePreview && (
                  <div className="rest-image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
                
                <div className="rest-form-actions">
                  <button 
                    type="button" 
                    className="rest-cancel-btn" 
                    onClick={handleModalClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="rest-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Dish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`rest-toast ${toast.type === 'success' ? 'rest-toast-success' : 'rest-toast-error'}`}>
          <div className="rest-toast-message">{toast.message}</div>
          <button className="rest-toast-close" onClick={() => setToast({...toast, show: false})}>×</button>
        </div>
      )}
    </div>
  );
}

export default Restaurant;