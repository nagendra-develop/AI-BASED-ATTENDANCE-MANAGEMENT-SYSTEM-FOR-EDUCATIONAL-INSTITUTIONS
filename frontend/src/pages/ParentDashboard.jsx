import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, BellRing, Activity, CalendarCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ParentDashboard = () => {
  const weeklyData = [
    { name: 'Mon', arrival: 8.5 }, // 8:30 AM
    { name: 'Tue', arrival: 8.4 }, // 8:24 AM
    { name: 'Wed', arrival: 9.1 }, // 9:06 AM (Late)
    { name: 'Thu', arrival: 8.45 }, // 8:27 AM
    { name: 'Fri', arrival: 8.5 }, // 8:30 AM
  ];

  const formatTime = (decimal) => {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
  };

  const recentAlerts = [
    { type: 'late', title: 'Late Arrival Alert', message: 'Alex arrived at 9:06 AM for CS-101 today.', time: 'Wed, Oct 22' },
    { type: 'info', title: 'Weekly Summary', message: 'Alex has 92% attendance this week.', time: 'Sun, Oct 19' },
    { type: 'present', title: 'Safe Arrival', message: 'Alex arrived on time at 8:24 AM.', time: 'Tue, Oct 21' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Profile Header */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0075FF, #4318FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '2rem', fontWeight: 800 }}>
            AJ
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Alex Johnson</h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Grade 10 • Section A • ID: STD-1042</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: '#E8F5E9', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#2E7D32' }}>
            <ShieldCheck size={24} />
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Status</p>
              <p style={{ fontWeight: 800 }}>Safely in School</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(0, 181, 116, 0.1)', color: '#00B574' }}>
            <CalendarCheck size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Overall Attendance</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>96%</h3>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(67, 24, 255, 0.1)', color: '#4318FF' }}>
            <Clock size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Avg. Arrival Time</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>08:28 AM</h3>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(238, 93, 80, 0.1)', color: '#EE5D50' }}>
            <Activity size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Total Absences</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>2 Days</h3>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Arrival Time Chart */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Weekly Arrival Timeline</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <YAxis domain={[8, 10]} axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} tickFormatter={(val) => `${val}:00`} />
                <Tooltip 
                  formatter={(value) => [formatTime(value), 'Arrival Time']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} 
                />
                <Line type="monotone" dataKey="arrival" stroke="#4318FF" strokeWidth={3} dot={{ r: 6, fill: '#0075FF', strokeWidth: 0 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BellRing size={20} color="#FFB547" /> Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentAlerts.map((alert, idx) => (
              <div key={idx} style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                background: alert.type === 'late' ? 'rgba(255, 181, 71, 0.1)' : alert.type === 'present' ? 'rgba(0, 181, 116, 0.1)' : '#F8FAFC',
                borderLeft: `4px solid ${alert.type === 'late' ? '#FFB547' : alert.type === 'present' ? '#00B574' : '#0075FF'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{alert.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{alert.time}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParentDashboard;
