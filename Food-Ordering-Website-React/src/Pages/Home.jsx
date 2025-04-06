import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/HomeHeader';
import Footer from '../Components/Footer';
import Toast from '../Components/Toast';
import '../Static/home.css';
import '../Static/blog.css'; // Import blog.css as it might contain footer styles

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: '',
    location: '',
    rating: 0
  });
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Form styling
  const formStyles = {
    formGroup: {
      marginBottom: '25px',
      width: '100%'
    },
    label: {
      display: 'block',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#444',
      fontSize: '16px',
      letterSpacing: '0.3px'
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid #eaeaea',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f9f9f9',
      boxSizing: 'border-box',
      color: '#333',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    select: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid #eaeaea',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f9f9f9',
      boxSizing: 'border-box',
      color: '#333',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
      appearance: 'none'
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid #eaeaea',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f9f9f9',
      boxSizing: 'border-box',
      color: '#333',
      minHeight: '120px', 
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
      resize: 'vertical'
    },
    fileInput: {
      width: '100%',
      padding: '14px 18px',
      border: '2px dashed #ccc',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#f0f0f0',
      boxSizing: 'border-box',
      color: '#444',
      cursor: 'pointer',
      textAlign: 'center'
    }
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/api/restaurants');
      if (response.data && response.data.restaurants) {
        setRestaurants(response.data.restaurants);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      showToast('Failed to load restaurants. Please try again later.', 'error');
    }
  };

  // Open modal
  const openModal = () => setShowModal(true);
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', description: '', cuisine: '', location: '', rating: 0 });
    setRestaurantImage(null);
    setImagePreview(null);
    setError(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurantImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!restaurantImage) {
      setError('Please select an image for the restaurant');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Create FormData object to send to the server
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('cuisine', formData.cuisine);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('image', restaurantImage);

      // Log the data being sent
      console.log('Sending form data:', {
        name: formData.name,
        description: formData.description,
        cuisine: formData.cuisine,
        location: formData.location,
        rating: formData.rating,
        image: restaurantImage.name
      });

      // Send data to API
      const response = await axios.post('/api/restaurants', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Server response:', response.data);

      // Add the new restaurant to the state
      setRestaurants(prevRestaurants => [response.data, ...prevRestaurants]);
      
      // Show success toast
      showToast('Restaurant added successfully!', 'success');
      
      // Close the modal
      closeModal();
    } catch (err) {
      console.error('Error creating restaurant:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add restaurant. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle restaurant deletion
  const handleDeleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await axios.delete(`/api/restaurants/${id}`);
        setRestaurants(prevRestaurants => prevRestaurants.filter(restaurant => restaurant._id !== id));
        showToast('Restaurant deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        showToast('Failed to delete restaurant. Please try again.', 'error');
      }
    }
  };

  // Function to handle restaurant card click
  const handleRestaurantClick = (restaurant) => {
    // Ensure restaurant has an ID, if not generate one
    const restaurantWithId = restaurant.id ? 
      restaurant : 
      { ...restaurant, id: restaurant._id || Date.now().toString() };
      
    navigate(`/restaurant/${restaurantWithId.id}`, { 
      state: { restaurant: restaurantWithId }
    });
  };

  // Sample static restaurants - keeping these intact
  const staticRestaurants = [

  ];

  return (
    <div className="home-page-wrapper">
      <Header />
      
      <div className="restaurant-container">
        <h2 className="section-title">Featured Restaurants</h2>
        <div className="restaurant-grid">
          {/* Static restaurants with click handlers */}
          {staticRestaurants.map((restaurant, index) => (
            <div 
              className="restaurant-card" 
              key={`static-${index}`}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <div className="restaurant-image">
                <img src={restaurant.image} alt={restaurant.name} />
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <div className="restaurant-rating">
                  <span>★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <p className="restaurant-location">{restaurant.location}</p>
              </div>
              <button 
                className="view-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleRestaurantClick(restaurant);
                }}
              >
                View
              </button>
            </div>
          ))}
          
          {/* Dynamic restaurants from database with click handlers */}
          {restaurants.map((restaurant) => (
            <div 
              className="restaurant-card" 
              key={restaurant._id}
              onClick={() => handleRestaurantClick({
                id: restaurant._id,
                uniqueId: restaurant.uniqueId,
                name: restaurant.name,
                description: restaurant.description,
                cuisine: restaurant.cuisine,
                location: restaurant.location,
                rating: restaurant.rating,
                image: restaurant.image.startsWith('/') ? 
                  `http://localhost:5000${restaurant.image}` : restaurant.image
              })}
            >
              <div className="restaurant-image">
                <img 
                  src={restaurant.image.startsWith('/') ? `http://localhost:5000${restaurant.image}` : restaurant.image} 
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "images/r1.jpg"; // Fallback image
                  }}
                />
                <button 
                  className="delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleDeleteRestaurant(restaurant._id);
                  }}
                  title="Delete restaurant"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <div className="restaurant-rating">
                  <span>★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <p className="restaurant-location">{restaurant.location}</p>
              </div>
              <button 
                className="view-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleRestaurantClick({
                    id: restaurant._id,
                    name: restaurant.name,
                    description: restaurant.description,
                    cuisine: restaurant.cuisine,
                    location: restaurant.location,
                    rating: restaurant.rating,
                    image: restaurant.image.startsWith('/') ? 
                      `http://localhost:5000${restaurant.image}` : restaurant.image
                  });
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* This is the section that was missing - Home Page Sections after restaurant cards */}
      <div className="about-section">
        <div className="about-content">
          <h2>About Our Food Service</h2>
          <p>Welcome to Foodies, where culinary excellence meets exceptional service! Our platform connects you with the finest restaurants across the city, offering a diverse range of cuisines to satisfy your cravings. Whether you're looking for a quick bite or planning a special meal, we've got you covered.</p>
          <div className="about-features">
            <div className="feature">
              <i className="fas fa-utensils"></i>
              <h3>Quality Food</h3>
              <p>We partner with restaurants that prioritize fresh ingredients and authentic flavors.</p>
            </div>
            <div className="feature">
              <i className="fas fa-shipping-fast"></i>
              <h3>Fast Delivery</h3>
              <p>Our efficient delivery network ensures your food arrives promptly and at the perfect temperature.</p>
            </div>
            <div className="feature">
              <i className="fas fa-medal"></i>
              <h3>Best Restaurants</h3>
              <p>Discover top-rated restaurants with exceptional culinary offerings and service.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="quote">"The food was amazing and the delivery was incredibly fast. Will definitely order again!"</div>
            <div className="customer">
              <img src="images/customer1.jpg" alt="Customer" />
              <div className="customer-info">
                <h4>Sarah Johnson</h4>
                <p>Food Enthusiast</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">"I love the variety of restaurants available on this platform. It's my go-to for all food cravings."</div>
            <div className="customer">
              <img src="images/customer2.jpg" alt="Customer" />
              <div className="customer-info">
                <h4>Michael Rodriguez</h4>
                <p>Regular Customer</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">"The ordering process is so simple and intuitive. Great service and even better food!"</div>
            <div className="customer">
              <img src="images/customer3.jpg" alt="Customer" />
              <div className="customer-info">
                <h4>Emily Chen</h4>
                <p>Food Blogger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ensure Footer is outside any containers for proper styling */}
      <Footer />
      
      {/* Add Restaurant Button */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: '999999'
      }}>
        <button 
          onClick={openModal}
          style={{
            background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 6px 16px rgba(255, 122, 0, 0.3)'
          }}
        >
          <span style={{ marginRight: '5px' }}>+</span> Add Restaurant
        </button>
      </div>
      
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      {/* Add Restaurant Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999999,
          width: '100vw',
          height: '100vh'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '28px 32px',
              borderBottom: '2px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '26px',
                fontWeight: 700,
                color: 'white',
                textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
              }}>
                Add New Restaurant
              </h2>
              <button 
                onClick={closeModal} 
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: '32px' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {/* Restaurant Name */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="name"
                    style={formStyles.label}
                  >
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter restaurant name"
                    required
                    style={formStyles.input}
                  />
                </div>
                
                {/* Restaurant Description */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="description"
                    style={formStyles.label}
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the restaurant, ambiance, specialties..."
                    rows="4"
                    required
                    style={formStyles.textarea}
                  ></textarea>
                </div>
                
                {/* Cuisine Type */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="cuisine"
                    style={formStyles.label}
                  >
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    id="cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    placeholder="Italian, Chinese, Indian, etc."
                    required
                    style={formStyles.input}
                  />
                </div>
                
                {/* Location */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="location"
                    style={formStyles.label}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Restaurant address"
                    required
                    style={formStyles.input}
                  />
                </div>
                
                {/* Rating */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="rating"
                    style={formStyles.label}
                  >
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    style={formStyles.input}
                  />
                </div>
                
                {/* Restaurant Image */}
                <div style={formStyles.formGroup}>
                  <label 
                    htmlFor="image"
                    style={formStyles.label}
                  >
                    Restaurant Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    style={formStyles.fileInput}
                  />
                  <small style={{ color: '#777', marginTop: '8px', display: 'block' }}>
                    Choose a high-quality image of the restaurant
                  </small>
                </div>
                
                {imagePreview && (
                  <div style={{ 
                    margin: '25px 0',
                    textAlign: 'center',
                    padding: '15px',
                    backgroundColor: '#f6f6f6',
                    borderRadius: '12px',
                    border: '2px dashed #e0e0e0',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{
                        maxWidth: '100%',
                        maxHeight: '250px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <p style={{ marginTop: '10px', color: '#666' }}>Image Preview</p>
                  </div>
                )}
                
                {error && (
                  <div style={{
                    backgroundColor: '#fff5f5',
                    color: '#e74c3c',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #e74c3c',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <span style={{ marginRight: '10px' }}>⚠️</span> {error}
                  </div>
                )}
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '16px',
                  marginTop: '35px',
                  width: '100%'
                }}>
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    style={{
                      backgroundColor: '#f5f5f5',
                      color: '#555',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '50px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                      color: 'white',
                      border: 'none',
                      padding: '14px 32px',
                      borderRadius: '50px',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      fontSize: '15px'
                    }}
                  >
                    {loading ? 'Adding...' : 'Add Restaurant'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
