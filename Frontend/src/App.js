import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import Navbar from './Components/navbar';

import LoginPage from './Pages/loginpage';
import RegisterPage from './Pages/registerpage';
import Dashboard from './Pages/dashboard';
import StoreRatingPage from './Pages/storeratingpage';

import "./Pages/login.css"
import "./Components/nav.css"

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/rate" element={
          <PrivateRoute>
            <StoreRatingPage />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
