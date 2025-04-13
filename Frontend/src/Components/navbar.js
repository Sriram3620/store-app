import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './nav.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {user && <span className="welcome">Welcome, <strong>{user.name}</strong> ({user.role})</span>}
      </div>
      <div className="navbar-links">
        {user?.role === 'admin' && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-user">Add User</Link>
            <Link to="/add-store">Add Store</Link>
          </>
        )}

        {user?.role === 'normal' && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/rate">Rate Stores</Link>
          </>
        )}

        {user?.role === 'store_owner' && <Link to="/dashboard">Dashboard</Link>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
