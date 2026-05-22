import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanFace, Shield, Zap, Activity } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: ScanFace, title: 'Facial Recognition', desc: 'State-of-the-art AI instantly identifies students with 99.8% accuracy.' },
    { icon: Zap, title: 'Real-Time Sync', desc: 'Attendance records updated live across all dashboards within milliseconds.' },
    { icon: Shield, title: 'Secure & Private', desc: 'Bank-level encryption ensures biometric data is safe and anonymized.' },
    { icon: Activity, title: 'Smart Analytics', desc: 'Predictive insights help educators track chronic absenteeism early.' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.5rem 5%', borderBottom: '1px solid var(--border-color)',
        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ScanFace size={32} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>FaceAuth<span className="text-gradient">.AI</span></h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={() => navigate('/admin')}>Login as Admin</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '120px' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '4rem 2rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl" 
            style={{ marginBottom: '1.5rem' }}
          >
            The Future of <span className="text-gradient">Smart Attendance</span> is Here
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, fontWeight: 500 }}
          >
            Eliminate manual roll calls. FaceAuth.AI uses advanced computer vision to automate attendance, providing distinct real-time portals for administrators, teachers, parents, and students.
          </motion.p>

          {/* Role Selection Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}
          >
            {[
              { role: 'Student', path: '/student', color: '#0075FF', desc: 'View your history' },
              { role: 'Teacher', path: '/teacher', color: '#00B574', desc: 'Manage your classes' },
              { role: 'Parent', path: '/parent', color: '#4318FF', desc: 'Track child activity' }
            ].map((portal, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '2.5rem 2rem', 
                  cursor: 'pointer',
                  border: `1px solid var(--border-color)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onClick={() => navigate(portal.path)}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = portal.color; e.currentTarget.style.boxShadow = `0 15px 35px ${portal.color}33`; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'var(--glass-shadow)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ background: `${portal.color}15`, padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                  <UserIcon role={portal.role} color={portal.color} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{portal.role} Portal</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>{portal.desc}</p>
                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: 700, color: portal.color }}>Access &rarr;</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <div style={{ width: '100%', background: '#FFFFFF', padding: '6rem 5%', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 className="heading-lg" style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--text-primary)' }}>Powered by Intelligence</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {features.map((feat, idx) => (
                <div key={idx} style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <feat.icon size={32} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>{feat.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer style={{ padding: '2rem 5%', textAlign: 'center', background: '#FFFFFF', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
        <p style={{ fontWeight: 600 }}>&copy; 2026 FaceAuth.AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Helper component for icons
const UserIcon = ({ role, color }) => {
  return <Shield size={24} color={color} />;
};

export default LandingPage;
