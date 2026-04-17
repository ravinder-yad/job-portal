import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import Home from './components/pages/Home'
import JobDetails from './components/pages/JobDetails'
import Companies from './components/pages/Companies'
import AdminDashboard from './components/pages/AdminDashboard'
import Dashboard from './components/pages/Dashboard'
import AppliedJobs from './components/pages/AppliedJobs'
import SavedJobs from './components/pages/SavedJobs'
import Profile from './components/pages/Profile'
import Notifications from './components/pages/Notifications'
import Jobs from './components/pages/Jobs'
import Messages from './components/pages/Messages'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { useAuth } from './context/useAuth'
import './App.css'

const RoleRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applied" element={<AppliedJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/redirect" element={<RoleRedirect />} />               
            <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Route>
        </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
