import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, role = 'admin' }) => {
  return (
    <div className="app-container">
      <Sidebar role={role} />
      <main className="main-content">
        <Header role={role} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
