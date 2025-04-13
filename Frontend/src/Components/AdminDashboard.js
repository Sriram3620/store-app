// src/Components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { token } = useAuth();
  console.log(token,"hello")
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setStats(res.data);
    }).catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <p>Total Users: {stats.users}</p>
      <p>Total Stores: {stats.stores}</p>
      <p>Total Ratings: {stats.ratings}</p>
      {/* Add user/store management UI if needed */}
    </div>
  );
};

export default AdminDashboard;
