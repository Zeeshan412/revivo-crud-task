import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully!');
      navigate('/login'); // go to login after registration
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />

        <button type="submit" style={{ width: '100%' }}>Register</button>
      </form>

      {/* Login Instead Button */}
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Login Instead</button>
      </p>
    </div>
  );
};

export default Register;
