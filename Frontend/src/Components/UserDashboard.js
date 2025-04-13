// src/Components/UserDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Normal User Dashboard</h3>
      <button onClick={() => navigate('/rate')}>Rate Stores</button>
    </div>
  );
};

export default UserDashboard;
