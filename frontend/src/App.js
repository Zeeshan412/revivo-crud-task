import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile'; // ✅ Import Profile component

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Update token on localStorage change (optional enhancement)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setToken(localStorage.getItem('token'))} />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />} // ✅ New Route
        />
      </Routes>
    </Router>
  );
}

export default App;
