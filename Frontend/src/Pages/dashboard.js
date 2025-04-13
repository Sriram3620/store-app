import React from 'react';
import AdminDashboard from "../Components/AdminDashboard"
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
  
      <h2>Welcome to the Dashboard</h2>
      <AdminDashboard/>
    </div>
  );
};

export default Dashboard;
