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
import AdminLayout from './components/admin/AdminLayout'
import { AdminAnalytics, AdminMessages, AdminNotifications, AdminSettings } from './components/admin/AdminPages'
import AdminJobs from './components/admin/AdminJobs'
import AdminCompanies from './components/admin/AdminCompanies'

import './App.css'

import { FullPageLoader } from './components/common/Loader'
import { AnimatePresence } from 'framer-motion'

const RoleRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/profile" replace />;
};

function App() {
  const [initialLoading, setInitialLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AnimatePresence>
             {initialLoading && <FullPageLoader />}
          </AnimatePresence>
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
            
            {/* User Hub Routes (No Sidebar) */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/applied" element={<ProtectedRoute><AppliedJobs /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/redirect" element={<RoleRedirect />} />               
          </Route>

          {/* Admin Power Panel Routes (Keep Sidebar) */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard defaultTab="Users" />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Legacy/Redirect Cleanup */}
          <Route path="/dashboard" element={<RoleRedirect />} />
        </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
