import React, { useState, useEffect } from 'react';
import BlogHeader from '../Components/BlogHeader';
import BlogSidebar from '../Components/BlogSidebar';
import Footer from '../Components/Footer';
import BlogsList from '../Components/BlogsList';
import Blog_r from '../Components/Blog_r';
import axios from 'axios';
import '../Static/blog.css';

function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      
      if (response.data && response.data.posts) {
        // Transform the data to match our component structure
        const transformedBlogs = response.data.posts.map(blog => ({
          id: blog._id,
          img: blog.image.startsWith('/') ? `https://eatsy-hai-kya.onrender.com/${blog.image}` : blog.image,
          title: blog.title,
          content: blog.content,
          author: blog.author,
          date: new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          })
        }));
        setBlogs(transformedBlogs);
      } else {
        loadFallbackData();
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      loadFallbackData();
    }
  };

  // Function to load fallback data if API call fails
  const loadFallbackData = () => {
    setBlogs([
      {
        id: '1',
        img: 'images/blog-rt-1.png',
        title: 'Paradise Taste of Meals',
        content: `A world of gourmet ingredients and specialty products that will inspire your culinary creativity.`,
        author: 'Furion',
        date: 'May 30, 2024',
      },
      {
        id: '2',
        img: 'images/blog-rt-2.png',
        title: 'The Art of Cooking',
        content: `Discover the secrets of professional chefs and elevate your cooking skills to new heights.`,
        author: 'Chef Maria',
        date: 'May 28, 2024',
      },
      {
        id: '3',
        img: 'images/blog-rt-3.png',
        title: 'Global Cuisine Tours',
        content: `Explore the diverse flavors of international cuisine from the comfort of your own kitchen.`,
        author: 'Travel Foodie',
        date: 'May 25, 2024',
      },
    ]);
  };

  // Blog click handlers
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
  };

  // Modal handlers
  const openModal = () => setShowModal(true);
  
  const closeModal = () => {
    setShowModal(false);
    setBlogFormData({ title: '', content: '', author: '' });
    setBlogImage(null);
    setImagePreview(null);
    setError(null);
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData({ ...blogFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
      
      // If the deleted blog was selected, clear the selection
      if (selectedBlog && selectedBlog.id === blogId) {
        setSelectedBlog(null);
      }
      
      showToast('Blog post deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      showToast('Failed to delete blog post. Please try again.', 'error');
    }
  };

  // Form submission - Save to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!blogImage) {
      setError('Please select an image for your blog post');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Create FormData object to send to the server
      const formData = new FormData();
      formData.append('title', blogFormData.title);
      formData.append('content', blogFormData.content);
      formData.append('author', blogFormData.author);
      formData.append('image', blogImage);

      // Send data to API
      const response = await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Add the new blog to the state
      const newBlog = {
        id: response.data._id,
        img: response.data.image.startsWith('/') ? `https://eatsy-hai-kya.onrender.com/${response.data.image}` : response.data.image,
        title: response.data.title,
        content: response.data.content,
        author: response.data.author,
        date: new Date(response.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        })
      };
      
      // Update blogs state with the new blog at the start
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      
      // Show success toast
      showToast('Blog posted successfully!', 'success');
      
      // Close the modal
      closeModal();
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError(err.response?.data?.message || 'Failed to create blog post. Please try again.');
      showToast('Failed to publish blog post. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blogs-page-wrapper">
      <BlogHeader title="Blogs List" />
      <main>
        <div className="main dark_back">
          <BlogSidebar />
          {!selectedBlog ? (
            <BlogsList 
              blogs={blogs} 
              onBlogClick={handleBlogClick} 
              onDeleteBlog={handleDeleteBlog} 
            />
          ) : (
            <Blog_r {...selectedBlog} onBack={handleBackToList} />
          )}
        </div>
      </main>
      <Footer />
      
      {/* Post Blog Button */}
      <div className="blog-post-button-container">
        <button 
          onClick={openModal}
          className="blog-post-button"
        >
          <span>+</span> Post Blog
        </button>
      </div>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="blog-toast-notification" onClick={hideToast}>
          <div className={`blog-toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}
      
      {/* Blog Post Modal */}
      {showModal && (
        <div className="blog-modal-overlay">
          <div className="blog-modal">
            <div className="blog-modal-header">
              <h2>Create New Blog Post</h2>
              <button onClick={closeModal} className="blog-modal-close">&times;</button>
            </div>
            <div className="blog-modal-body">
              <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="blog-form-group">
                  <label htmlFor="title">Blog Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={blogFormData.title}
                    onChange={handleInputChange}
                    placeholder="Enter an engaging title for your blog"
                    required
                  />
                </div>
                
                {/* Content Input */}
                <div className="blog-form-group">
                  <label htmlFor="content">Blog Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={blogFormData.content}
                    onChange={handleInputChange}
                    placeholder="Share your culinary thoughts, tips, or experiences..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                {/* Author Input */}
                <div className="blog-form-group">
                  <label htmlFor="author">Author Name</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={blogFormData.author}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                {/* Image Input */}
                <div className="blog-form-group">
                  <label htmlFor="image">Blog Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    className="blog-file-input"
                  />
                  <small>Choose a high-quality image for your blog post</small>
                </div>
                
                {imagePreview && (
                  <div className="blog-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <p>Image Preview</p>
                  </div>
                )}
                
                {error && (
                  <div className="blog-error-message">
                    <span>⚠️</span> {error}
                  </div>
                )}
                
                <div className="blog-form-buttons">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="blog-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="blog-submit-btn"
                  >
                    {loading ? 'Publishing...' : 'Publish Blog'}
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

export default Blogs;
