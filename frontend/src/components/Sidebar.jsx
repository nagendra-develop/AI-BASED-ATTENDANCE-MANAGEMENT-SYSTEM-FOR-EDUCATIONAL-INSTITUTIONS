import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ScanFace, FileSpreadsheet, Users, Settings, LogOut, BookOpen, Clock, Activity, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const adminLinks = [
    { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/admin' },
    { icon: ScanFace, label: 'Live Scanner', path: '/admin/scanner' },
    { icon: FileSpreadsheet, label: 'All Records', path: '/admin/records' },
    { icon: Users, label: 'Directory', path: '/admin/students' },
  ];

  const teacherLinks = [
    { icon: LayoutDashboard, label: 'Teacher Dashboard', path: '/teacher' },
    { icon: ScanFace, label: 'Class Scanner', path: '/teacher/scanner' },
    { icon: Users, label: 'My Classes', path: '/teacher/classes' },
    { icon: FileSpreadsheet, label: 'Class Reports', path: '/teacher/reports' },
  ];

  const studentLinks = [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/student' },
    { icon: Clock, label: 'Attendance History', path: '/student/history' },
    { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
  ];

  const parentLinks = [
    { icon: LayoutDashboard, label: 'Parent Dashboard', path: '/parent' },
    { icon: Activity, label: "Child's Activity", path: '/parent/activity' },
    { icon: Bell, label: 'Alerts & Notices', path: '/parent/alerts' },
  ];

  let navItems = adminLinks;
  if (role === 'teacher') navItems = teacherLinks;
  if (role === 'student') navItems = studentLinks;
  if (role === 'parent') navItems = parentLinks;

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-panel"
      style={{
        width: 'var(--sidebar-width)',
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        bottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        zIndex: 50
      }}
    >
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          padding: '0.5rem',
          borderRadius: '12px',
          boxShadow: '0 0 20px var(--accent-glow)'
        }}>
          <ScanFace size={32} color="#FFF" strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>FaceAuth<span className="text-gradient">.AI</span></h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </p>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split('/').length <= 2} // Exact match for root layout paths
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '12px',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(67, 24, 255, 0.05)' : 'transparent',
              border: isActive ? '1px solid rgba(67, 24, 255, 0.1)' : '1px solid transparent',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: 'var(--accent-primary)',
                      boxShadow: '0 0 10px var(--accent-primary)'
                    }}
                  />
                )}
                <item.icon size={20} style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }} />
                <span style={{ fontWeight: isActive ? 700 : 600 }}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'var(--text-secondary)',
            padding: '1rem',
            width: '100%',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(67, 24, 255, 0.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={20} />
          <span style={{ fontWeight: 600 }}>Logout to Home</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
