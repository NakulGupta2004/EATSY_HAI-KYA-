const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');

// Get all menu items for a restaurant
router.get('/restaurants/:restaurantId/menu', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await Menu.find({ restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new menu item
router.post('/restaurants/:restaurantId/menu', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, category, image } = req.body;
    
    const newMenuItem = new Menu({
      restaurantId,
      name,
      description,
      price: Number(price),
      category,
      image
    });
    
    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a menu item
router.delete('/restaurants/:restaurantId/menu/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    await Menu.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
