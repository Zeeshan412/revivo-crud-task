import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts');
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data._id);
    } catch (err) {
      console.error('Error fetching user');
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/posts',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent('');
      fetchPosts();
      alert('Post created!');
    } catch (err) {
      alert('Failed to create post!');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      alert('Failed to delete post!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Welcome to the Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={logout}>Logout</button>
        <button onClick={() => navigate('/profile')}>View Profile</button>
      </div>

      <form onSubmit={handlePost} style={{ marginBottom: '30px' }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          Create Post
        </button>
      </form>

      <h3>All Posts</h3>
      <p>Total Posts: {posts.length}</p>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post._id}
              style={{
                marginBottom: '15px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p><strong>Content:</strong> {post.content}</p>
                <p><strong>Posted by:</strong> {post.createdBy?.name} ({post.createdBy?.email})</p>
              </div>
              {post.createdBy?._id === userId && (
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{ background: 'red', color: 'white', height: '40px' }}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}  
    </div>
  );
};

export default Dashboard;
