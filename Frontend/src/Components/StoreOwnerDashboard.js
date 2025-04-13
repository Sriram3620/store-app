// src/Components/StoreOwnerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StoreOwnerDashboard = () => {
  const { token } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/store/ratings', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setRatings(res.data.ratings);
      setAvg(res.data.average);
    }).catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h3>Store Owner Dashboard</h3>
      <p>Average Rating: {avg.toFixed(2)}</p>
      <ul>
        {ratings.map((r, idx) => (
          <li key={idx}>User: {r.user_name} - Rating: {r.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreOwnerDashboard;
