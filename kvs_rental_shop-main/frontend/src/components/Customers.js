import React from 'react';

export default function Customers() {
  const customers = [
    { name: 'Murugan Selvaraj', area: 'K.K. Nagar, Madurai', phone: '+91 98421 33456', orders: 1, balance: 400, initials: 'MS' },
    { name: 'Priya Ramesh', area: 'Anna Nagar, Madurai', phone: '+91 90477 22110', orders: 1, balance: 0, initials: 'PR' },
    { name: 'Karthik Events', area: 'Simmakkal, Madurai', phone: '+91 98765 41230', orders: 1, balance: 4800, initials: 'KE' },
    { name: 'Lakshmi Devi', area: 'Villapuram, Madurai', phone: '+91 91502 87744', orders: 1, balance: 0, initials: 'LD' },
    { name: 'Suresh Kumar', area: 'Goripalayam, Madurai', phone: '+91 89400 12233', orders: 1, balance: 950, initials: 'SK' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-description">Profiles, rental history and pending balances.</p>
        </div>
        <button className="btn-primary">+ Add Customer</button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <input className="search-bar" style={{ width: '280px' }} placeholder="Search by name or phone..." />
      </div>

      <div className="card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ORDERS</th>
              <th>PENDING BALANCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.name}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', background: '#fef3c7',
                      color: '#92400e', fontWeight: 'bold', fontSize: '12px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center'
                    }}>{c.initials}</div>
                    <div>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.area}</div>
                    </div>
                  </div>
                </td>
                <td>{c.phone}</td>
                <td>{c.orders}</td>
                <td style={{ color: c.balance > 0 ? '#b91c1c' : 'inherit', fontWeight: c.balance > 0 ? '700' : 'normal' }}>
                  ₹{c.balance.toLocaleString()}
                </td>
                <td><a href="#profile" style={{ color: '#0284c7', textDecoration: 'underline' }}>View profile</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}