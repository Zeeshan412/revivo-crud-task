import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user');
    }
  };

  const fetchPostCount = async () => {
    try {
      const res = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myPosts = res.data.filter(post => post.createdBy._id === user._id);
      setPostCount(myPosts.length);
    } catch (err) {
      console.error('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) fetchPostCount();
  }, [user]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto' }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user._id}</p>
      <p><strong>Total Posts:</strong> {postCount}</p>
    </div>
  );
};

export default Profile;
