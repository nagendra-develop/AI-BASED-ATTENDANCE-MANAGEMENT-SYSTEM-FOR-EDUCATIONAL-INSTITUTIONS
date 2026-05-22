import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BellRing, CheckCircle, AlertTriangle, BookOpen, Clock, Users, FileSpreadsheet, Download } from 'lucide-react';

// --- PARENT VIEWS ---

export const ParentActivity = () => {
  const activities = [
    { id: 1, action: "Arrived at school", time: "08:24 AM", location: "Main Gate Scanner", type: "success" },
    { id: 2, action: "Attended CS-101", time: "09:00 AM", location: "Room 304", type: "success" },
    { id: 3, action: "Left Campus (Lunch)", time: "12:15 PM", location: "South Gate", type: "warning" },
    { id: 4, action: "Returned to Campus", time: "01:10 PM", location: "South Gate", type: "success" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Child's Activity Log</h2>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <div style={{ position: 'absolute', left: '23px', top: '20px', bottom: '20px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
          
          {activities.map((act) => (
            <div key={act.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                background: act.type === 'success' ? '#E8F5E9' : '#FFF8E1', 
                color: act.type === 'success' ? '#00B574' : '#FFB547',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '2px solid #FFF'
              }}>
                <Activity size={20} />
              </div>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', flex: 1, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{act.action}</h3>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{act.time}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Scanned at: {act.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ParentAlerts = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Alerts & Notices</h2>
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: 'rgba(238, 93, 80, 0.05)', borderLeft: '4px solid #EE5D50', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <AlertTriangle color="#EE5D50" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Parent-Teacher Meeting</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginLeft: '2.5rem', fontWeight: 500 }}>Scheduled for Nov 12th, 2026. Please confirm your availability via the school portal.</p>
        </div>
        
        <div style={{ padding: '1.5rem', background: 'rgba(0, 181, 116, 0.05)', borderLeft: '4px solid #00B574', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <CheckCircle color="#00B574" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Perfect Attendance Reward</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginLeft: '2.5rem', fontWeight: 500 }}>Alex achieved 100% attendance in September and has been awarded 5 bonus credits.</p>
        </div>
      </div>
    </motion.div>
  );
};
