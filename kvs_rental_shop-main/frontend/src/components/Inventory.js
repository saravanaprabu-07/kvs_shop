import React, { useEffect, useState } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/inventory`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching inventory:', err));
  }, []);

  if (loading) return <div>Loading SQL inventory data...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>KVS Rental - Inventory Items</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Code</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Item Name (பொருட்கள்)</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Qty Available</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rent Rate (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.item_code}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}><strong>{item.name}</strong></td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.total_qty}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{item.rent_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 