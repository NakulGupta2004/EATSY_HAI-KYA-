const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import models
const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dish');

// Configure multer for dish image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/dish-images');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, 'dish-' + uniqueSuffix + fileExt);
  }
});

const fileFilter = (req, file, cb) => {
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
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Get all dishes for a restaurant
router.get('/restaurants/:restaurantId/dishes', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }
    
    // Find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Find dishes for this restaurant
    const dishes = await Dish.find({ restaurantId });
    
    res.json({ dishes });
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ message: 'Server error while fetching dishes' });
  }
});

// Add a dish to a restaurant
router.post('/restaurants/:restaurantId/dishes', upload.single('image'), async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, category } = req.body;
    
    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }
    
    // Check required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price and category are required' });
    }
    
    // Find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Create dish with image
    let imagePath = '/uploads/dish-images/default-dish.jpg'; // Default image
    
    if (req.file) {
      imagePath = `/uploads/dish-images/${req.file.filename}`;
    }
    
    const newDish = new Dish({
      name,
      price: parseFloat(price),
      category,
      image: imagePath,
      restaurantId
    });
    
    const savedDish = await newDish.save();
    
    // Return the saved dish
    res.status(201).json({ 
      message: 'Dish added successfully', 
      dish: {
        id: savedDish._id,
        name: savedDish.name,
        price: savedDish.price,
        category: savedDish.category,
        imgPath: savedDish.image
      }
    });
    
  } catch (error) {
    console.error('Error adding dish:', error);
    res.status(500).json({ message: 'Server error while adding dish' });
  }
});

// Delete a dish
router.delete('/restaurants/:restaurantId/dishes/:dishId', async (req, res) => {
  try {
    const { restaurantId, dishId } = req.params;
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(restaurantId) || 
        !mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    // Find and delete the dish
    const dish = await Dish.findOneAndDelete({ 
      _id: dishId, 
      restaurantId: restaurantId 
    });
    
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    
    // If dish has image and it's not the default, delete it
    if (dish.image && !dish.image.includes('default-dish.jpg')) {
      const imagePath = path.join(__dirname, '..', dish.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.json({ message: 'Dish deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).json({ message: 'Server error while deleting dish' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
