import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`/api/blogs/${blogId}`);
      if (response.status === 200) {
        // Refresh the blogs list after successful deletion
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog post:', error.response?.data || error.message);
      // Add error handling UI feedback here if needed
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            {blog.title}
            <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;