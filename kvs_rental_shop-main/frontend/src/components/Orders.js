import React, { useState } from 'react';

export default function Orders() {
  const [filter, setFilter] = useState('All');

  const orders = [
    { id: 'ORD-0003', customer: 'Karthik Events', dates: '31 Aug 2026 → 03 Sept 2026', total: 14800, balance: 4800, status: 'Active' },
    { id: 'ORD-0001', customer: 'Priya Ramesh', dates: '26 Aug 2026 → 30 Aug 2026', total: 1850, balance: 0, status: 'Active' },
    { id: 'ORD-0005', customer: 'Suresh Kumar', dates: '22 Aug 2026 → 27 Aug 2026', overdue: '1d overdue', total: 1950, balance: 950, status: 'Overdue' },
    { id: 'ORD-0002', customer: 'Murugan Selvaraj', dates: '18 Aug 2026 → 25 Aug 2026', overdue: '3d overdue', total: 1400, balance: 400, status: 'Overdue' },
    { id: 'ORD-0004', customer: 'Lakshmi Devi', dates: '08 Aug 2026 → 13 Aug 2026', total: 600, balance: 0, status: 'Returned' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-description">Every rental & event booking in one place.</p>
        </div>
        <button className="btn-primary">+ New Order</button>
      </div>

      <div className="filter-container">
        <div className="filter-pills">
          {['All', 'Active', 'Overdue', 'Partially Returned', 'Returned', 'Cancelled'].map((item) => (
            <div
              key={item}
              className={`pill-item ${filter === item ? 'active' : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <input className="search-bar" style={{ width: '220px' }} placeholder="Search order ID or customer..." />
      </div>

      <div className="card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>RENTAL DATES</th>
              <th>TOTAL</th>
              <th>BALANCE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id}>
                <td><span className="code-tag">{ord.id}</span></td>
                <td><strong>{ord.customer}</strong></td>
                <td>
                  {ord.dates}
                  {ord.overdue && <div style={{ color: '#dc2626', fontSize: '11px' }}>{ord.overdue}</div>}
                </td>
                <td>₹{ord.total.toLocaleString()}</td>
                <td style={{ color: ord.balance > 0 ? '#b91c1c' : 'inherit', fontWeight: ord.balance > 0 ? '700' : 'normal' }}>
                  ₹{ord.balance.toLocaleString()}
                </td>
                <td>
                  <span className={`status-badge ${ord.status.toLowerCase()}`}>{ord.status}</span>
                </td>
                <td><a href="#details" style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: '600' }}>Details</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}