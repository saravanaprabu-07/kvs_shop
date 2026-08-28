import React from 'react';

export default function Reports() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-description">Revenue, utilization and outstanding items — exportable anytime.</p>
        </div>
      </div>

      <div className="metrics-row">
        <div className="metric-card"><div className="metric-label">REVENUE (7 DAYS)</div><div className="metric-value">₹13,000</div></div>
        <div className="metric-card"><div className="metric-label">REVENUE (THIS MONTH)</div><div className="metric-value">₹14,600</div></div>
        <div className="metric-card green"><div className="metric-label">REVENUE (ALL TIME)</div><div className="metric-value">₹14,600</div></div>
        <div className="metric-card red"><div className="metric-label">DAMAGE / LOSS CHARGES</div><div className="metric-value">₹750</div></div>
      </div>
    </div>
  );
}