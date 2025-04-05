import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    
    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!selectedImage) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    try {
      const blogFormData = new FormData();
      blogFormData.append('title', formData.title);
      blogFormData.append('content', formData.content);
      blogFormData.append('author', formData.author);
      blogFormData.append('image', selectedImage);

      await axios.post('/api/blogs', blogFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form and close modal
      setFormData({ title: '', content: '', author: '' });
      setSelectedImage(null);
      setImagePreview('');
      setShowModal(false);
      
      // Refresh blog list
      fetchBlogs();
    } catch (err) {
      console.error('Error creating blog:', err);
      setError(err.response?.data?.message || 'Error creating blog post');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: '', content: '', author: '' });
    setSelectedImage(null);
    setImagePreview('');
    setError('');
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Our Food Blog</h1>
        <p>Discover delicious recipes and culinary inspiration</p>
        
        <button 
          className="post-blog-btn" 
          onClick={() => setShowModal(true)}
        >
          Post Blog
        </button>
      </div>

      <div className="blog-container">
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <div className="blog-image">
                <img src={blog.img} alt={blog.title} />
              </div>
              <div className="blog-content">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <div className="blog-footer">
                  <span className="author">By {blog.author}</span>
                  <span className="date">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Blog Post</h2>
              <button className="close-modal" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title">Blog Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="image">Blog Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-buttons">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
