import React from 'react';

export default function Payments() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-description">Advance, partial, final and deposit tracking.</p>
        </div>
        <button className="btn-primary">+ Record Payment</button>
      </div>

      <div className="content-grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Payment History</span></div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>AMOUNT</th>
                <th>TYPE</th>
                <th>METHOD</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="code-tag">ORD-0003</span></td>
                <td>Karthik Events</td>
                <td><strong>₹10,000</strong></td>
                <td><span className="status-badge active">Advance</span></td>
                <td>UPI</td>
                <td>31 Aug 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Orders with Pending Balance</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <div><strong>Murugan Selvaraj</strong> <span className="code-tag">ORD-0002</span></div>
            <div style={{ color: '#b91c1c', fontWeight: 'bold' }}>₹400</div>
          </div>
        </div>
      </div>
    </div>
  );
}