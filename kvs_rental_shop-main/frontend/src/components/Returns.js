import React from 'react';

export default function Returns() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Returns & Overdue</h1>
          <p className="page-description">Process returns and chase down overdue rentals.</p>
        </div>
      </div>

      <div className="content-grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Open Orders — awaiting return</span>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>DUE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="code-tag">ORD-0001</span></td>
                <td>Priya Ramesh</td>
                <td>30 Aug 2026</td>
                <td><span className="status-badge active">Active</span></td>
                <td><button className="btn-primary" style={{ padding: '4px 8px', fontSize: 11 }}>Process Return</button></td>
              </tr>
              <tr>
                <td><span className="code-tag">ORD-0002</span></td>
                <td>Murugan Selvaraj</td>
                <td>25 Aug 2026</td>
                <td><span className="status-badge overdue">Overdue</span></td>
                <td><button className="btn-primary" style={{ padding: '4px 8px', fontSize: 11 }}>Process Return</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">⏰ Overdue Follow-ups</span>
          </div>
          <div style={{ padding: 12, background: '#fff1f2', borderRadius: 8 }}>
            <strong>Suresh Kumar</strong> <span className="code-tag">ORD-0005</span>
            <div style={{ color: '#be123c', fontSize: 12, margin: '4px 0 12px' }}>Overdue by 1 days</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" style={{ padding: '4px 8px' }}>📞 Call</button>
              <button className="btn-secondary" style={{ padding: '4px 8px' }}>💬 WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}