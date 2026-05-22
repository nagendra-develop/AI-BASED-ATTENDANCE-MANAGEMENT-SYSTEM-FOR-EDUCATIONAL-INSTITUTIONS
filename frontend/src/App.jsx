import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LiveScanner from './pages/LiveScanner';
import AttendanceRecords from './pages/AttendanceRecords';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import { ParentActivity, ParentAlerts } from './pages/ParentViews';
import { StudentHistory, StudentCourses, TeacherClasses, TeacherReports } from './pages/StudentTeacherViews';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <DashboardLayout role="admin">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="scanner" element={<LiveScanner />} />
              <Route path="records" element={<AttendanceRecords />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={
          <DashboardLayout role="teacher">
            <Routes>
              <Route path="/" element={<TeacherDashboard />} />
              <Route path="scanner" element={<LiveScanner />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="reports" element={<TeacherReports />} />
              <Route path="*" element={<Navigate to="/teacher" replace />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <DashboardLayout role="student">
            <Routes>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="history" element={<StudentHistory />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="*" element={<Navigate to="/student" replace />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Parent Routes */}
        <Route path="/parent/*" element={
          <DashboardLayout role="parent">
            <Routes>
              <Route path="/" element={<ParentDashboard />} />
              <Route path="activity" element={<ParentActivity />} />
              <Route path="alerts" element={<ParentAlerts />} />
              <Route path="*" element={<Navigate to="/parent" replace />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
