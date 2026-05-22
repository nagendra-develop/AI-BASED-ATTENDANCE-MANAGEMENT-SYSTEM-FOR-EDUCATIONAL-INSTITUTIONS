import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ role = 'admin' }) => {
  const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
  const location = useLocation();
  
  let title = 'Overview';
  let subtitle = 'Monitor real-time AI attendance';

  if (location.pathname.includes('/scanner')) {
    title = 'Live Scanner';
    subtitle = 'AI Face Recognition System';
  } else if (location.pathname.includes('/records')) {
    title = 'Attendance Records';
    subtitle = 'Manage and export attendance data';
  } else if (location.pathname.includes('/students')) {
    title = 'Student Directory';
    subtitle = 'View enrolled students';
  } else if (location.pathname.includes('/classes')) {
    title = 'My Classes';
    subtitle = 'Manage your scheduled classes';
  } else if (location.pathname.includes('/history')) {
    title = 'History';
    subtitle = 'View past records';
  }

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{subtitle}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search students..." 
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              color: 'var(--text-primary)',
              width: '250px',
              fontFamily: 'var(--font-main)',
              fontSize: '0.875rem',
              fontWeight: 500,
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 0 0 4px rgba(67, 24, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
            }}
          />
        </div>

        <button style={{
          position: 'relative',
          padding: '0.5rem',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
        onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        >
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '10px',
            height: '10px',
            background: 'var(--accent-secondary)',
            borderRadius: '50%',
            border: '2px solid var(--bg-primary)'
          }}></span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <User size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{roleDisplay} User</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{roleDisplay} Portal</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
