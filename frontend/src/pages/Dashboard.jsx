import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Clock, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const Dashboard = () => {
  const [recentScans, setRecentScans] = useState([]);

  const stats = [
  {
    label: 'Total Students',
    value: '3',
    icon: Users,
    color: '#4318FF',
    bgColor: 'rgba(67, 24, 255, 0.1)',
    trend: 'Registered in database'
  },

  {
    label: 'Present Today',
    value: '3',
    icon: UserCheck,
    color: '#00B574',
    bgColor: 'rgba(0, 181, 116, 0.1)',
    trend: '100% attendance rate'
  },

  {
    label: 'Absent Today',
    value: '0',
    icon: UserX,
    color: '#EE5D50',
    bgColor: 'rgba(238, 93, 80, 0.1)',
    trend: 'No absentees today'
  },

  {
    label: 'Late Arrivals',
    value: '0',
    icon: Clock,
    color: '#FFB547',
    bgColor: 'rgba(255, 181, 71, 0.1)',
    trend: 'All students on time'
  },
];

// Fetch real-time attendance records from backend API
  useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/attendance');

      const records = response.data.data || [];
// Sort latest attendance records and format time for live dashboard display
     const formatted = records
  .sort((a, b) => b.id - a.id)
  .map((record, index) => ({
    id: index + 1,
    name:
  record.student_id === 'CSE001'
    ? 'Nagendra'
    : record.student_id === 'CSE002'
    ? 'Kamal'
    : record.student_id === 'CSE003'
    ? 'Harshita'
    : record.student_id,

    time: new Date(`1970-01-01T${record.attendance_time}`)
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),

    status: record.status,
    accuracy: '99.8%'
  }));

      setRecentScans(formatted);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  fetchAttendance();

  const interval = setInterval(fetchAttendance, 3000);

  return () => clearInterval(interval);
}, []);

  const pieData = [
    { name: 'Present', value: 984, color: '#00B574' },
    { name: 'Absent', value: 42, color: '#EE5D50' },
    { name: 'Late', value: 18, color: '#FFB547' }
  ];

  const barData = [
    { name: 'Mon', Present: 920, Absent: 30, Late: 15 },
    { name: 'Tue', Present: 950, Absent: 20, Late: 10 },
    { name: 'Wed', Present: 910, Absent: 40, Late: 20 },
    { name: 'Thu', Present: 960, Absent: 15, Late: 5 },
    { name: 'Fri', Present: 984, Absent: 42, Late: 18 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants} className="glass-card glow-border" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.label}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</h3>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: stat.bgColor, color: stat.color }}>
                <stat.icon size={24} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: stat.color, fontWeight: 500 }}>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Chart Area */}
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Weekly Attendance Analytics</h3>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#F4F7FE', border: 'none', color: 'var(--text-primary)',
              padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600
            }}>
              This Week <ChevronDown size={16} />
            </button>
          </div>
          
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <Tooltip cursor={{ fill: '#F4F7FE' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Present" fill="#00B574" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Late" fill="#FFB547" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Absent" fill="#EE5D50" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Breakdown & Recent Scans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Pie Chart */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '1.5rem', height: '300px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Today's Breakdown</h3>
            <div style={{ flex: 1, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>1,044</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Logged</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Scans */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Live Scans</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00B574', boxShadow: '0 0 10px #00B574' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#00B574', fontWeight: 600 }}>Live</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentScans.map((scan, index) => (
                <div key={index} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', background: '#F8FAFC', borderRadius: '12px',
                  border: '1px solid var(--border-color)', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = '#FFFFFF'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#F8FAFC'; }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{scan.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{scan.time}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span className={`status-badge ${scan.status === 'Present' ? 'status-present' : 'status-late'}`}>
                      {scan.status}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{scan.accuracy} match</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
