import React, { useState } from 'react';
import Sidebar from './layout/SideBar';
import Header from './layout/Header';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Inventory from './components/Inventory';
import Returns from './components/Returns';
import TentBookings from './components/TentBookings';
import Payments from './components/Payments';
import Reports from './components/Reports';
import './styles.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [role, setRole] = useState('Admin');

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />

      <div className="main-content">
        <Header role={role} setRole={setRole} />

        <div className="page-container">
          {activeTab === 'Dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'Orders' && <Orders />}
          {activeTab === 'Customers' && <Customers />}
          {activeTab === 'Inventory' && <Inventory />}
          {activeTab === 'Returns' && <Returns />}
          {activeTab === 'Tent Bookings' && <TentBookings />}
          {activeTab === 'Payments' && <Payments />}
          {activeTab === 'Reports' && <Reports />}
        </div>
      </div>
    </div>
  );
}