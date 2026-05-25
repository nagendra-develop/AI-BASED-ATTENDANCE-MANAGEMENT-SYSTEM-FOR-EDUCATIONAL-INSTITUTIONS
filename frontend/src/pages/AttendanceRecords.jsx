import React, { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';
import { motion } from 'framer-motion';
import { Download, Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const AttendanceRecords = () => {
  const [activeTab, setActiveTab] = useState('All');

  const [records, setRecords] = useState([]);
  
useEffect(() => {
  const fetchRecords = async () => {
    try {

      console.log("API calling...");

      const data = await attendanceAPI.getRecords();
      
      console.log(data);

      // adjust based on backend response
      setRecords(data.records || data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  fetchRecords();
}, []); 

  const filteredRecords = activeTab === 'All' 
    ? records 
    : records.filter(r => r.status === activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Attendance Records</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Manage and export AI generated attendance data</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '12px', 
            background: '#FFFFFF', 
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Tabs and Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: '#F8FAFC', padding: '0.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            {['All', 'Present', 'Late', 'Absent'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '10px',
                  background: activeTab === tab ? '#FFFFFF' : 'transparent',
                  color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab ? 700 : 600,
                  boxShadow: activeTab === tab ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search ID, Name..." 
              style={{
                background: '#F8FAFC',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                color: 'var(--text-primary)',
                width: '300px',
                fontFamily: 'var(--font-main)',
                fontSize: '0.875rem',
                fontWeight: 500,
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.background = '#FFFFFF'; e.target.style.boxShadow = '0 0 0 4px rgba(67, 24, 255, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Student ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Course</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Date & Time</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Confidence</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ 
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{record.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{record.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>{record.course}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{record.date}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{record.time}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 700 }}>{record.confidence}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`status-badge ${record.status === 'Present' ? 'status-present' : record.status === 'Late' ? 'status-late' : 'status-absent'}`}>
                      {record.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Showing 1 to 8 of 1,248 entries</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)' }}><ChevronLeft size={16} /></button>
            <button style={{ padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, boxShadow: '0 4px 10px rgba(67,24,255,0.3)' }}>1</button>
            <button style={{ padding: '0.5rem 1rem', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>2</button>
            <button style={{ padding: '0.5rem 1rem', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>3</button>
            <span style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>...</span>
            <button style={{ padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceRecords;
