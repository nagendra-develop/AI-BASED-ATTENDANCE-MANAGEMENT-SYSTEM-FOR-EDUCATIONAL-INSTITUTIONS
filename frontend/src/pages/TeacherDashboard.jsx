import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, AlertTriangle, ScanFace, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Total Students', value: '185', icon: Users, color: '#4318FF', bgColor: 'rgba(67, 24, 255, 0.1)' },
    { label: 'Avg. Attendance', value: '94%', icon: UserCheck, color: '#00B574', bgColor: 'rgba(0, 181, 116, 0.1)' },
    { label: 'At Risk Students', value: '4', icon: AlertTriangle, color: '#EE5D50', bgColor: 'rgba(238, 93, 80, 0.1)' },
  ];

  const classData = [
    { name: 'CS-101', rate: 96 },
    { name: 'CS-202', rate: 91 },
    { name: 'CS-304', rate: 98 },
    { name: 'CS-405', rate: 89 },
  ];

  const schedule = [
    { time: '09:00 AM', course: 'Introduction to CS (CS-101)', room: 'Room 304', status: 'Completed' },
    { time: '11:30 AM', course: 'Data Structures (CS-202)', room: 'Lab 2', status: 'Active' },
    { time: '02:00 PM', course: 'Operating Systems (CS-304)', room: 'Room 101', status: 'Upcoming' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome & Quick Action */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div className="glass-card" style={{ flex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Good Morning, Prof. Smith!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: 500 }}>You have 3 classes scheduled today. Your next class starts in 15 minutes.</p>
        </div>
        
        <div className="glass-card" style={{ flex: 1, padding: '2rem', background: 'linear-gradient(135deg, #0075FF 0%, #4318FF 100%)', color: '#FFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
             onClick={() => navigate('/teacher/scanner')}
             onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
             onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ScanFace size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Launch AI Scanner</h3>
          <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>Start taking attendance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, index) => (
          <div key={index} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '14px', background: stat.bgColor, color: stat.color }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Class Performance */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Class Attendance Rates</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="rate" fill="#00B574" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Today's Schedule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {schedule.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.5rem 0', width: '70px', borderRight: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>
                  {item.time.split(' ')[0]}
                  <span style={{ fontSize: '0.7rem', display: 'block' }}>{item.time.split(' ')[1]}</span>
                </div>
                <div style={{ flex: 1, padding: '1rem', background: item.status === 'Active' ? 'rgba(0, 117, 255, 0.05)' : '#F8FAFC', border: item.status === 'Active' ? '1px solid var(--accent-secondary)' : '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.course}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherDashboard;
