const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/blog-images');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-').toLowerCase());
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

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 });
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Server error while fetching blog posts' });
  }
});

// Create a new blog post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    // Create the image URL path
    const imagePath = `/uploads/blog-images/${req.file.filename}`;
    
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      image: imagePath
    });
    
    const savedPost = await newBlogPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Server error while creating blog post' });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Server error while fetching blog post' });
  }
});

module.exports = router;
