import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const StudentDashboard = () => {
  const stats = [
    { label: 'Overall Attendance', value: '96%', icon: Calendar, color: '#00B574', bgColor: 'rgba(0, 181, 116, 0.1)' },
    { label: 'Classes Attended', value: '142', icon: BookOpen, color: '#4318FF', bgColor: 'rgba(67, 24, 255, 0.1)' },
    { label: 'Late Arrivals', value: '3', icon: Clock, color: '#FFB547', bgColor: 'rgba(255, 181, 71, 0.1)' },
    { label: 'Absences', value: '2', icon: AlertCircle, color: '#EE5D50', bgColor: 'rgba(238, 93, 80, 0.1)' },
  ];

  const recentHistory = [
    { course: 'Advanced Algorithms (CS-401)', date: 'Today', status: 'Present', time: '09:00 AM' },
    { course: 'Database Systems (CS-302)', date: 'Yesterday', status: 'Present', time: '11:15 AM' },
    { course: 'Operating Systems (CS-304)', date: 'Wed, Oct 22', status: 'Late', time: '10:12 AM' },
    { course: 'Software Engineering (CS-405)', date: 'Tue, Oct 21', status: 'Present', time: '08:55 AM' },
  ];

  const monthlyData = [
    { name: 'Week 1', rate: 98 },
    { name: 'Week 2', rate: 92 },
    { name: 'Week 3', rate: 100 },
    { name: 'Week 4', rate: 95 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #4318FF 0%, #0075FF 100%)', color: '#FFF' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome back, Alex! 👋</h2>
          <p style={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500 }}>Your attendance is looking great this semester. Keep it up!</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Next Class</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Ethics (1:00 PM)</p>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Attendance Trend */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Monthly Performance</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0075FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0075FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#A3AED0' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="rate" stroke="#0075FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent History */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Classes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentHistory.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.course}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.date} at {item.time}</p>
                </div>
                <span className={`status-badge ${item.status === 'Present' ? 'status-present' : 'status-late'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
