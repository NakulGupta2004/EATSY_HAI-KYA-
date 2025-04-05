import React from 'react';
import axios from 'axios';

const BlogsList = ({ blogs, onBlogClick, onDeleteBlog }) => {
  // Ensure blogs is always an array
  const blogArray = Array.isArray(blogs) ? blogs : [];
  
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent triggering the card click event
    
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        onDeleteBlog(id); // This will now show the success toast in the parent component
      } catch (error) {
        console.error('Error deleting blog post:', error);
        // The parent will show an error toast if the deletion function throws
        throw error;
      }
    }
  };

  return (
    <div className="right">
      {blogArray.length > 0 ? (
        blogArray.map((blog, index) => (
          <div className="card" key={blog.id || index} onClick={() => onBlogClick(blog)}>
            <img 
              src={blog.img} 
              alt={blog.title}
              onError={(e) => {
                // Fallback image if the original fails to load
                e.target.onerror = null;
                e.target.src = "images/blog-rt-1.png";
              }}
            />
            <div className="card-content">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="author">
                <span>By {blog.author}</span>
                <span> · </span>
                <span>{blog.date}</span>
              </div>
            </div>
            
            {/* Delete Button */}
            <button 
              className="delete-blog-btn" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click event
                handleDelete(e, blog.id);
              }}
              title="Delete blog post"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))
      ) : (
        <div className="no-blogs-message" style={{ padding: '30px', textAlign: 'center' }}>
          <p>No blog posts available yet. Be the first to create one!</p>
        </div>
      )}
    </div>
  );
};

export default BlogsList;
