import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, FileSpreadsheet, Download, Search, CheckCircle, XCircle } from 'lucide-react';

// --- STUDENT VIEWS ---

export const StudentHistory = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Detailed Attendance History</h2>
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: '#F8FAFC' }}>
            <option>All Courses</option>
            <option>CS-101</option>
            <option>CS-302</option>
          </select>
          <select style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: '#F8FAFC' }}>
            <option>October 2026</option>
            <option>September 2026</option>
          </select>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export PDF
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Course</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Scan Time</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {['Oct 24', 'Oct 23', 'Oct 22', 'Oct 21'].map((date, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 600 }}>{date}, 2026</td>
              <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>CS-101: Intro to CS</td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>08:5{idx} AM</td>
              <td style={{ padding: '1rem' }}>
                <span className={`status-badge ${idx === 2 ? 'status-late' : 'status-present'}`}>
                  {idx === 2 ? 'Late' : 'Present'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export const StudentCourses = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>My Enrolled Courses</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {[
        { code: 'CS-101', name: 'Intro to Computer Science', credits: 4, rate: 98, prof: 'Prof. Smith' },
        { code: 'CS-302', name: 'Database Systems', credits: 3, rate: 100, prof: 'Dr. Johnson' },
        { code: 'CS-405', name: 'Software Engineering', credits: 4, rate: 92, prof: 'Prof. Williams' },
      ].map((c, i) => (
        <div key={i} className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(67,24,255,0.1)', color: '#4318FF', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{c.code}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.75rem' }}>{c.name}</h3>
            </div>
            <BookOpen color="var(--accent-primary)" />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>{c.prof} • {c.credits} Credits</p>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Attendance Rate</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 800, color: c.rate > 95 ? '#00B574' : '#FFB547' }}>{c.rate}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#E0E5F2', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${c.rate}%`, height: '100%', background: c.rate > 95 ? '#00B574' : '#FFB547', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);


// --- TEACHER VIEWS ---

export const TeacherClasses = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Manage Classes</h2>
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {['CS-101', 'CS-202', 'CS-304'].map((cls, i) => (
          <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cls}</h3>
              <Users color="var(--accent-primary)" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '1.5rem' }}>45 Enrolled Students</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }}>View Roster</button>
              <button style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', background: '#FFF', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 700 }}>Settings</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export const TeacherReports = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Class Reports & Analytics</h2>
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <FileSpreadsheet size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} color="var(--accent-primary)" />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Generate Custom Reports</h3>
      <p style={{ fontWeight: 500, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        Select a date range and class to generate a comprehensive AI-powered attendance report.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <select style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: '#F8FAFC' }}>
          <option>Select Class</option>
          <option>CS-101</option>
          <option>CS-304</option>
        </select>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Generate Excel
        </button>
      </div>
    </div>
  </motion.div>
);
