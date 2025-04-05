const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/restaurant-images');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create a safe filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, 'restaurant-' + uniqueSuffix + fileExt);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Server error while fetching restaurants' });
  }
});

// Create a new restaurant
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { name, description, cuisine, location, rating } = req.body;
    
    if (!name || !description || !cuisine || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Restaurant image is required' });
    }
    
    // Create the image URL path
    const imagePath = `/uploads/restaurant-images/${req.file.filename}`;
    
    // Generate a unique ID
    const uniqueId = `RESTAURANT_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    
    const newRestaurant = new Restaurant({
      name,
      description,
      cuisine,
      location,
      rating: rating || 0,
      image: imagePath,
      uniqueId: uniqueId
    });
    
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Server error while creating restaurant: ' + error.message });
  }
});

// Get a specific restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ message: 'Server error while fetching restaurant' });
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Delete the image file if it exists
    if (restaurant.image && restaurant.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', restaurant.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Server error while deleting restaurant' });
  }
});

module.exports = router;
