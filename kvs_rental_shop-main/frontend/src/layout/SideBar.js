import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, role }) {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Orders', icon: '📄' },
    { name: 'Customers', icon: '👥' },
    { name: 'Inventory', icon: '🧺' },
    { name: 'Returns', icon: '🔄' },
    { name: 'Tent Bookings', icon: '⛺' },
    ...(role === 'Admin' ? [
      { name: 'Payments', icon: '💰' },
      { name: 'Reports', icon: '📈' },
      { name: 'Settings', icon: '⚙️' }
    ] : [])
  ];

  return (
    <div className="sidebar">
      <div>
        <div className="brand-container">
          <div className="brand-icon">KVS</div>
          <div>
            <div className="brand-title">KVS Rental</div>
            <div className="brand-subtitle">UTENSILS & EVENT GEAR</div>
          </div>
        </div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`nav-link ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        Shared workspace — data here is visible to everyone using this app.
      </div>
    </div>
  );
}