import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaRegClock, FaMotorcycle, FaShoppingCart, FaTrash, FaHeart, FaPlus, FaPencilAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Restaurant.css';
// Fix import to use default export instead of named export
// Import Footer component
import RstHeader from '../Components/RstHeader';
import Footer from '../Components/Footer';

// Add a base URL for your API requests
axios.defaults.baseURL = 'http://localhost:5000'; // Adjust port as needed

const Restaurant = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state?.restaurant;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    category: 'breakfast',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Beverages'];

  useEffect(() => {
    if (!restaurant) {
      navigate('/');
      return;
    }
    
    fetchMenuItems();
    window.scrollTo(0, 0);
  }, [restaurant, navigate]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      console.log(`Fetching menu items for restaurant ID: ${restaurant.id || id}`);
      
      // Check if we have a valid ID
      if (!restaurant.id && !id) {
        console.error("No restaurant ID available");
        throw new Error("Restaurant ID not available");
      }

      // Make sure to use the correct endpoint format
      const response = await axios.get(`/api/restaurants/${restaurant._id || restaurant.id || id}/dishes`);
      
      console.log("Menu items response:", response.data);
      
      // Check if the response has a dishes property
      if (response.data.dishes) {
        setMenuItems(response.data.dishes);
      } else if (Array.isArray(response.data)) {
        setMenuItems(response.data);
      } else {
        console.warn("Unexpected response format:", response.data);
        setMenuItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      // Use sample menu items if API fails
      setMenuItems([
        {
          id: 1,
          name: 'Classic Pancakes',
          description: 'Fluffy pancakes served with maple syrup and fresh berries',
          price: 199,
          image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D',
          category: 'breakfast'
        },
        {
          id: 2,
          name: 'Avocado Toast',
          description: 'Toasted sourdough bread topped with avocado, poached eggs, and chili flakes',
          price: 249,
          image: 'https://images.unsplash.com/photo-1588137378633-dea1148094bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww',
          category: 'breakfast'
        },
        {
          id: 3,
          name: 'Butter Chicken',
          description: 'Tender chicken in a rich buttery tomato sauce with spices',
          price: 349,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D',
          category: 'lunch'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      if (!restaurant._id && !restaurant.id && !id) {
        setError("Restaurant ID not available");
        return;
      }
      
      console.log('Adding dish:', newDish);
      console.log('Restaurant ID:', restaurant._id || restaurant.id || id);
      
      // Use FormData to support file uploads if needed
      const formData = new FormData();
      formData.append('name', newDish.name);
      formData.append('description', newDish.description);
      formData.append('price', newDish.price);
      formData.append('category', newDish.category);
      formData.append('image', newDish.image);
      
      const response = await axios.post(
        `/api/restaurants/${restaurant._id || restaurant.id || id}/dishes`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      console.log('Dish added response:', response.data);
      
      // Handle different response formats
      const addedDish = response.data.dish || response.data;
      
      // Add the new dish to the menu items
      setMenuItems(prev => [...prev, addedDish]);
      
      // Reset form and close modal
      setNewDish({
        name: '',
        description: '',
        price: '',
        category: 'breakfast',
        image: ''
      });
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add dish. Please try again.");
      console.error("Failed to add dish:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDish = async (dishId) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Deleting dish:', dishId);
      console.log('Restaurant ID:', restaurant._id || restaurant.id || id);
      
      await axios.delete(`/api/restaurants/${restaurant._id || restaurant.id || id}/dishes/${dishId}`);
      
      // Remove the dish from the menu items
      setMenuItems(prev => prev.filter(item => item.id !== dishId && item._id !== dishId));
      
    } catch (err) {
      setError("Failed to delete dish. Please try again.");
      console.error("Failed to delete dish:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <RstHeader/>
      <div className="restaurant-container">
        {restaurant && (
          <>
            <div className="restaurant-hero" style={{ backgroundImage: `url(${restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww'})` }}>
              <div className="hero-overlay">
                <div className="hero-content">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1>{restaurant.name}</h1>
                    <div className="restaurant-meta">
                      <span><FaStar className="icon" /> {restaurant.rating}</span>
                      <span>{restaurant.cuisine}</span>
                      <span><FaRegClock className="icon" /> {restaurant.deliveryTime}</span>
                    </div>
                    <button className="favorite-btn">
                      <FaHeart className="heart-icon" /> Save
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="content-wrapper">
              <div className="main-content">
                <div className="category-tabs">
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`category-tab ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading menu...</p>
                  </div>
                ) : (
                  <motion.div 
                    className="menu-container"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { 
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {menuItems
                      .filter(item => selectedCategory === 'all' || item.category === selectedCategory.toLowerCase())
                      .map((item) => (
                        <motion.div 
                          key={item.id}
                          className="menu-card"
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                          }}
                        >
                          <div className="menu-image">
                            <img src={item.image} alt={item.name} />
                            <button className="quick-add" onClick={() => addToCart(item)}>+</button>
                          </div>
                          <div className="menu-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <div className="menu-footer">
                              <span className="price">₹{item.price}</span>
                              <div className="action-buttons">
                                <button className="add-btn" onClick={() => addToCart(item)}>
                                  Add to order
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteDish(item.id)}>
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </div>

              <div className="order-sidebar">
                <div className="sticky-order">
                  <h2><FaShoppingCart className="cart-icon" /> Your Order</h2>
                  
                  {cart.length === 0 ? (
                    <div className="empty-cart">
                      <img src="https://cdn-icons-png.flaticon.com/512/5058/5058454.png" alt="Empty cart" />
                      <p>Your cart is empty</p>
                      <small>Add items from the menu to get started</small>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items-list">
                        {cart.map((item) => (
                          <div key={item.id} className="cart-item">
                            <div className="item-detail">
                              <div className="quantity">{item.quantity}x</div>
                              <div className="item-name-price">
                                <h4>{item.name}</h4>
                                <span className="item-price">₹{item.price * item.quantity}</span>
                              </div>
                            </div>
                            <div className="item-actions">
                              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-summary">
                        <div className="summary-row">
                          <span>Subtotal</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                        <div className="summary-row">
                          <span>Delivery Fee</span>
                          <span>₹30</span>
                        </div>
                        <div className="summary-row">
                          <span>Taxes</span>
                          <span>₹{(calculateTotal() * 0.05).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total</span>
                          <span>₹{(calculateTotal() * 1.05 + 30).toFixed(2)}</span>
                        </div>
                        
                        <button className="checkout-btn">
                          <FaMotorcycle className="icon" /> Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Admin button */}
            <motion.button 
              className="admin-add-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus />
            </motion.button>
            
            {/* Add Dish Modal */}
            <AnimatePresence>
              {isModalOpen && (
                <motion.div 
                  className="modal-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="modal-content"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                  >
                    <div className="modal-header">
                      <h2>Add New Dish</h2>
                      <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                        <FaTimes />
                      </button>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={handleAddDish} className="dish-form">
                      <div className="form-group">
                        <label htmlFor="name">Dish Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newDish.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter dish name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={newDish.description}
                          onChange={handleInputChange}
                          required
                          placeholder="Describe the dish"
                          rows={3}
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="price">Price (₹)</label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={newDish.price}
                            onChange={handleInputChange}
                            required
                            placeholder="199"
                            min="0"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <select
                            id="category"
                            name="category"
                            value={newDish.category}
                            onChange={handleInputChange}
                            required
                          >
                            {categories.filter(cat => cat !== 'All').map(cat => (
                              <option key={cat} value={cat.toLowerCase()}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                          type="url"
                          id="image"
                          name="image"
                          value={newDish.image}
                          onChange={handleInputChange}
                          required
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="cancel-btn"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="submit-btn"
                          disabled={loading}
                        >
                          {loading ? 'Adding...' : 'Add Dish'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
