const express = require('express');
const path = require('path');
const app = express();

// ...existing code...

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');

// ...existing code...

// Use blog routes
app.use('/api/blogs', blogRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ...existing code...

module.exports = app;