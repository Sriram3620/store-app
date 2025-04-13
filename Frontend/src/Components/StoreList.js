import React from 'react';

const StoreList = ({ stores }) => {
  return (
    <div>
      <h3>Store List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email (if applicable)</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, idx) => (
            <tr key={idx}>
              <td>{store.name}</td>
              <td>{store.email || 'N/A'}</td>
              <td>{store.address}</td>
              <td>{store.avg_rating || 'No ratings yet'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
