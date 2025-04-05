const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const dishRoutes = require('./routes/dishRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists with proper permissions
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

const restaurantImagesDir = path.join(__dirname, 'uploads/restaurant-images');
if (!fs.existsSync(restaurantImagesDir)) {
  fs.mkdirSync(restaurantImagesDir, { recursive: true });
  console.log('Created restaurant-images directory');
}

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`🌐 Database: ${mongoose.connection.name}`);
    console.log(`📡 Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('Connection URI:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
  });

// Connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
// Use blog routes
app.use('/api/blogs', blogRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api', dishRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple test route
app.get('/', (req, res) => {
  res.json({
    message: 'API is running...',
    mongoDBStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API available at http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
