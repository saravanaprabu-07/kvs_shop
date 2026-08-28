import React from 'react';

export default function Dashboard({ setActiveTab }) {
  const mostRented = [
    { name: 'Plastic Chair', count: 400, max: 400 },
    { name: 'Steel Dinner Plate', count: 230, max: 400 },
    { name: 'Steel Tumbler', count: 150, max: 400 },
    { name: 'Serving Spoon', count: 80, max: 400 },
    { name: 'Round Table (8-seat...', count: 20, max: 400 },
    { name: 'Steel Cooking Vessel...', count: 4, max: 400 }
  ];

  const rentalTrends = [
    { date: '22 Aug 2026', count: 1, max: 1 },
    { date: '23 Aug 2026', count: 0, max: 1 },
    { date: '24 Aug 2026', count: 0, max: 1 },
    { date: '25 Aug 2026', count: 0, max: 1 },
    { date: '26 Aug 2026', count: 1, max: 1 },
    { date: '27 Aug 2026', count: 0, max: 1 },
    { date: '28 Aug 2026', count: 0, max: 1 }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Everything happening at the shop, at a glance.</p>
        </div>
        <div className="btn-group">
          <button className="btn-primary" onClick={() => setActiveTab('Orders')}>+ New Order</button>
          <button className="btn-secondary" onClick={() => setActiveTab('Customers')}>+ Add Customer</button>
        </div>
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-label">TOTAL INVENTORY</div>
          <div className="metric-value">1944</div>
          <div className="metric-subtext">units across 16 item types</div>
        </div>
        <div className="metric-card blue">
          <div className="metric-label">RENTED RIGHT NOW</div>
          <div className="metric-value">729</div>
          <div className="metric-subtext">units currently out with customers</div>
        </div>
        <div className="metric-card red">
          <div className="metric-label">OVERDUE ORDERS</div>
          <div className="metric-value">1</div>
          <div className="metric-subtext" style={{ color: '#dc2626' }}>need a follow-up call today</div>
        </div>
        <div className="metric-card amber">
          <div className="metric-label">PENDING PAYMENTS</div>
          <div className="metric-value">₹6,150</div>
          <div className="metric-subtext">across all open orders</div>
        </div>
        <div className="metric-card green">
          <div className="metric-label">REVENUE TODAY</div>
          <div className="metric-value">₹0</div>
          <div className="metric-subtext">₹14,600 this month</div>
        </div>
      </div>

      <div className="content-grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Most Rented Items</span>
            <span className="card-subtitle">by units currently & historically booked</span>
          </div>
          <div className="bar-group">
            {mostRented.map((item) => (
              <div key={item.name} className="bar-row">
                <span className="bar-label">{item.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(item.count / item.max) * 100}%` }}></div>
                </div>
                <span className="bar-val">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Active vs Returned Orders</span>
          </div>
          <div className="bar-group">
            <div className="bar-row">
              <span className="bar-label">Active / Open</span>
              <div className="bar-track"><div className="bar-fill blue" style={{ width: '80%' }}></div></div>
              <span className="bar-val">4</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Returned</span>
              <div className="bar-track"><div className="bar-fill green" style={{ width: '20%' }}></div></div>
              <span className="bar-val">1</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Cancelled</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '0%' }}></div></div>
              <span className="bar-val">0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Rental Trend — last 7 days (orders placed)</span>
          </div>
          <div className="bar-group">
            {rentalTrends.map((trend) => (
              <div key={trend.date} className="bar-row">
                <span className="bar-label">{trend.date}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(trend.count / trend.max) * 100}%` }}></div>
                </div>
                <span className="bar-val">{trend.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">⏰ Overdue & Due Soon</span>
          </div>
          <div style={{ padding: '12px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Suresh Kumar</strong> <span className="code-tag">ORD-0005</span>
                <div style={{ color: '#be123c', fontSize: '12px', marginTop: '4px' }}>Overdue by 1 day(s)</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn-secondary" style={{ padding: '4px 8px' }}>📞</button>
                <button className="btn-secondary" style={{ padding: '4px 8px' }}>WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}