import React from 'react';
import axios from 'axios';

const FoodCard = ({ dish, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/dishes/${dish.id}`); // Replace with your API endpoint
      onDelete(dish.id); // Notify parent component to remove the dish from the UI
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <div className="rest-food-card">
      <div className="rest-food-card-header">
        <button className="rest-delete-btn" onClick={handleDelete}>
          <svg viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
        <div className="rest-food-img-container">
          <img
            className="rest-food-img"
            src={dish.image || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f8f8f8\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-family=\'Arial\' font-size=\'20\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ENo Image Available%3C/text%3E%3C/svg%3E'}
            alt={dish.name}
          />
        </div>
      </div>
      <div className="rest-food-content">
        <h3 className="rest-food-title">{dish.name}</h3>
        <span className="rest-food-category">{dish.category}</span>
        <p className="rest-food-price">${dish.price}</p>
        <button className="rest-add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;
