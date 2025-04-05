const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    default: function() {
      return `rest_${uuidv4()}`;
    },
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
