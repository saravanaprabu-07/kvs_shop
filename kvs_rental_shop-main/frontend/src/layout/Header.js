import React from 'react';

export default function Header({ role, setRole }) {
  return (
    <div className="header-navbar">
      <div className="search-bar">
        <span>🔍</span>
        <input placeholder="Who has this item? Search orders, customers, i" />
      </div>

      <div className="header-right">
        <select
          className="role-pill"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">👤 Admin ⌄</option>
          <option value="Staff">👤 Staff ⌄</option>
        </select>
        <button className="notification-bell">
          🔔
          <span className="notification-count">4</span>
        </button>
      </div>
    </div>
  );
}