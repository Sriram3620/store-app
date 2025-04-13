import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StoreRatingPage = () => {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);
  const [myRatings, setMyRatings] = useState({});
  const [newRatings, setNewRatings] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/stores', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setStores(res.data.stores);
      const ratingMap = {};
      res.data.stores.forEach(store => {
        if (store.user_rating) {
          ratingMap[store.id] = store.user_rating;
        }
      });
      setMyRatings(ratingMap);
    });
  }, [token]);

  const handleChange = (storeId, value) => {
    setNewRatings(prev => ({ ...prev, [storeId]: value }));
  };

  const handleSubmit = async (storeId) => {
    const rating = newRatings[storeId];
    if (!rating || rating < 1 || rating > 5) return alert("Rating must be between 1 and 5");

    await axios.post(`http://localhost:5000/rate`, {
      store_id: storeId,
      rating: parseInt(rating)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Rating submitted!");
    window.location.reload(); // refresh page to reflect changes
  };

  return (
    <div>
      <h3>Rate Stores</h3>
      <ul>
        {stores.map(store => (
          <li key={store.id} style={{ marginBottom: '20px' }}>
            <strong>{store.name}</strong> - {store.address}  
            <br />
            <span>⭐ Average Rating: {store.avg_rating || "No ratings yet"}</span>
            <br />
            <span>Your Rating: {myRatings[store.id] || "Not rated yet"}</span>
            <br />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rate 1-5"
              value={newRatings[store.id] || ""}
              onChange={(e) => handleChange(store.id, e.target.value)}
            />
            <button onClick={() => handleSubmit(store.id)}>Submit/Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreRatingPage;
