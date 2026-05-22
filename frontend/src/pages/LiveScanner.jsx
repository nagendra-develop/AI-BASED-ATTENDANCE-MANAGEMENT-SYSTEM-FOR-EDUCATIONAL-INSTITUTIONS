import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, CheckCircle, AlertTriangle, ShieldCheck, ScanFace, XCircle } from 'lucide-react';

const LiveScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [detectedUser, setDetectedUser] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Handle starting/stopping the webcam
  useEffect(() => {
    const startCamera = async () => {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setCameraError("Unable to access camera. Please check permissions.");
        setScanning(false);
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };

    if (scanning) {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup on unmount
    return () => stopCamera();
  }, [scanning]);

  // Simulate AI face detection polling to a "backend"
  useEffect(() => {
    if (!scanning || cameraError) return;

    const interval = setInterval(() => {
      // In a real scenario, we would capture a frame from videoRef and send it to the backend here:
      // const canvas = document.createElement('canvas');
      // canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      // const frame = canvas.toDataURL('image/jpeg');
      // await api.post('/recognize', { frame });

      // Simulated detection
      if (Math.random() > 0.6) {
        const mockUsers = [
          { name: 'Priya Sharma', id: 'STD-8472', match: '99.9%', status: 'Present', color: '#00B574' },
          { name: 'Alex Johnson', id: 'STD-1042', match: '98.5%', status: 'Present', color: '#00B574' },
          { name: 'Unknown Face', id: 'UNREGISTERED', match: '42.1%', status: 'Alert', color: '#EE5D50' }
        ];
        
        setDetectedUser(mockUsers[Math.floor(Math.random() * mockUsers.length)]);
        
        setTimeout(() => setDetectedUser(null), 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [scanning, cameraError]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Live Camera Feed</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI Face Recognition System (Wired to Real WebCam)</p>
        </div>
        
        <button 
          onClick={() => setScanning(!scanning)}
          className="btn-primary"
          style={{
            background: scanning ? '#EE5D50' : 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: scanning ? '0 4px 15px rgba(238, 93, 80, 0.3)' : '0 4px 15px rgba(67, 24, 255, 0.3)'
          }}
        >
          {scanning ? <Scan size={18} /> : <Camera size={18} />}
          {scanning ? 'Stop Recognition' : 'Start Camera & Recognition'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
        {/* Camera Feed Area */}
        <div style={{ flex: 2, position: 'relative' }} className="glass-card glow-border">
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            background: '#E2E8F0', borderRadius: '19px', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            
            {cameraError ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#EE5D50' }}>
                <XCircle size={48} style={{ marginBottom: '1rem' }} />
                <p style={{ fontWeight: 600 }}>{cameraError}</p>
              </div>
            ) : scanning ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                />
                
                <div className="scanner-line"></div>
                
                {/* Crosshairs */}
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40px', height: '40px', borderTop: '3px solid var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)' }}></div>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: '40px', height: '40px', borderTop: '3px solid var(--accent-primary)', borderRight: '3px solid var(--accent-primary)' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '40px', height: '40px', borderBottom: '3px solid var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '40px', height: '40px', borderBottom: '3px solid var(--accent-primary)', borderRight: '3px solid var(--accent-primary)' }}></div>

                {/* HUD Elements */}
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  REC [●] LIVE
                </div>
                <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  FPS: 60 | LATENCY: 12ms
                </div>

                <AnimatePresence>
                  {detectedUser && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      style={{ 
                        position: 'absolute',
                        border: `3px solid ${detectedUser.color}`,
                        width: '250px',
                        height: '250px',
                        borderRadius: '12px',
                        boxShadow: `0 0 30px ${detectedUser.color}66`
                      }}
                    >
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '-70px', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        background: '#FFFFFF',
                        border: `2px solid ${detectedUser.color}`,
                        padding: '0.75rem 1.25rem',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        whiteSpace: 'nowrap',
                        color: detectedUser.color,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                      }}>
                        {detectedUser.status === 'Alert' ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
                        <span style={{ fontSize: '1rem', fontWeight: 800 }}>{detectedUser.match} MATCH</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)' }}>
                <Camera size={64} style={{ marginBottom: '1rem', opacity: 0.5, color: 'var(--accent-primary)' }} />
                <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>Camera is offline. Click Start to connect.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Information */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ScanFace size={24} color="var(--accent-primary)" />
              Real-Time Analysis
            </h3>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {detectedUser ? (
                  <motion.div
                    key="detected"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                  >
                    <div style={{ 
                      width: '120px', height: '120px', borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${detectedUser.color}, transparent)`,
                      padding: '4px',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ScanFace size={56} color={detectedUser.color} />
                      </div>
                    </div>
                    
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{detectedUser.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '2rem' }}>ID: {detectedUser.id}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                      <div style={{ background: '#F8FAFC', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Status</p>
                        <p style={{ color: detectedUser.color, fontWeight: 700, fontSize: '1.125rem' }}>{detectedUser.status}</p>
                      </div>
                      <div style={{ background: '#F8FAFC', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Confidence</p>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.125rem' }}>{detectedUser.match}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
                  >
                    <div className="scanner-line" style={{ position: 'relative', width: '60px', marginBottom: '1.5rem', animationDuration: '2s' }}></div>
                    <p style={{ fontWeight: 500 }}>Awaiting face detection payload...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} color="#00B574" />
              API Connection Status
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Backend Node</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#00B574' }}>Connected (WSS)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Model</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>FaceNet-v4</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Inference Time</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>42ms avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScanner;
