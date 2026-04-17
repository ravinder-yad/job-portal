import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, IconButton } from '@mui/material';
import {
  FiBell,
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMenu,
  FiPlusCircle,
  FiSearch,
  FiSettings,
  FiUser,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import { useNotifications } from '../../context/NotificationContext';
import { notificationStyles } from '../../data/notifications';

const seekerMenu = [
  { label: 'Overview', icon: FiHome, path: '/dashboard' },
  { label: 'Explore Jobs', icon: FiSearch, path: '/jobs' },
  { label: 'Applied Jobs', icon: FiBriefcase, path: '/applied' },
  { label: 'Saved Jobs', icon: FiHeart, path: '/saved' },
  { label: 'Profile Settings', icon: FiSettings, path: '/profile' },
];

const adminMenu = [
  { label: 'Admin Terminal', icon: FiHome, path: '/admin/dashboard' },
  { label: 'Job Inventory', icon: FiBriefcase, path: '/admin/dashboard' },
  { label: 'User Directory', icon: FiUsers, path: '/admin/dashboard' }, // Will use tabs
  { label: 'Company Hub', icon: FiGrid, path: '/admin/dashboard' },
  { label: 'Global Notifications', icon: FiBell, path: '/notifications' },
  { label: 'System Settings', icon: FiSettings, path: '/settings' },
];

const DashboardSidebar = ({ isAdmin, userName, userEmail, avatarLetter, menuItems, currentPath, onClose, onLogout }) => (
  <div className="flex h-full flex-col border-r border-slate-200 bg-white text-slate-900">
    <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
      <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
        <svg 
          className="w-10 h-10 transition-all duration-300 group-hover:scale-[1.1] group-hover:-rotate-3 drop-shadow-sm" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad-side)" />
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#logo-grad-side)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="logo-grad-side" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4f46e5" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-all duration-300">
          Jobify
        </span>
      </Link>
      <IconButton onClick={onClose} className="lg:!hidden !text-slate-500">
        <FiX />
      </IconButton>
    </div>

    {/* Profile Info Removed as requested */}

    <nav className="flex-1 space-y-2 px-4 py-5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const canBeActive = ['Dashboard', 'Overview', 'Profile Settings', 'Company Profile', 'Applied Jobs', 'Saved Jobs', 'Notifications', 'Settings', 'Explore Jobs'].includes(item.label);
        const isActive = canBeActive && currentPath === item.path;

        return (
          <Link
            key={item.label}
            to={item.path}
            onClick={onClose}
            className={`relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
          >
            {isActive && <span className="absolute left-0 top-2 h-7 w-1 rounded-r-full bg-indigo-600" />}
            <Icon className="text-lg" />
            {item.label}
          </Link>
        );
      })}
    </nav>

    <div className="p-4 border-t border-slate-100">
      {/* Profile Strength Removed as requested */}

      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100 hover:text-red-700"
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  </div>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const isAdmin = user?.role === 'admin';
  const userName = user?.name || 'Ravindra';
  const userEmail = user?.email || 'ravindra@gmail.com';
  const avatarLetter = userName.charAt(0).toUpperCase();
  const menuItems = isAdmin ? adminMenu : seekerMenu;
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const recentNotifications = notifications.slice(0, 3);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-[80] bg-slate-950/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className="fixed inset-y-0 left-0 z-[90] hidden w-64 lg:block">
        <DashboardSidebar
          isAdmin={isAdmin}
          userName={userName}
          userEmail={userEmail}
          avatarLetter={avatarLetter}
          menuItems={menuItems}
          currentPath={location.pathname}
          onClose={closeSidebar}
          onLogout={handleLogout}
        />
      </aside>

      <aside className={`fixed inset-y-0 left-0 z-[90] w-64 transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <DashboardSidebar
          isAdmin={isAdmin}
          userName={userName}
          userEmail={userEmail}
          avatarLetter={avatarLetter}
          menuItems={menuItems}
          currentPath={location.pathname}
          onClose={closeSidebar}
          onLogout={handleLogout}
        />
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconButton onClick={() => setSidebarOpen(true)} className="lg:!hidden !text-slate-700">
                <FiMenu />
              </IconButton>
              <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(79,70,229,0.08)] md:flex">
                <FiSearch className="text-slate-400" />
                <input
                  type="text"
                  placeholder={isAdmin ? 'Search applicants, jobs...' : 'Search jobs, companies...'}
                  className="w-72 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <IconButton
                  onClick={() => setNotificationOpen((current) => !current)}
                  className="!rounded-lg !bg-slate-50 !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600"
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <FiBell />
                  </Badge>
                </IconButton>

                {notificationOpen && (
                  <div className="absolute right-0 top-12 z-50 w-[320px] overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xl shadow-slate-200/80">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <div>
                        <p className="text-sm font-black text-slate-950">Recent notifications</p>
                        <p className="text-xs font-semibold text-slate-500">{unreadCount} unread updates</p>
                      </div>
                      <Link
                        to="/notifications"
                        onClick={() => setNotificationOpen(false)}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-700"
                      >
                        View all
                      </Link>
                    </div>

                      <div className="max-h-[320px] overflow-y-auto p-2">
                        {recentNotifications.map((notification) => {
                          const style = notificationStyles[notification.type] || notificationStyles.Default;
                          const Icon = style.icon;

                          return (
                            <Link
                              key={notification.id}
                              to="/notifications"
                              onClick={() => {
                                markAsRead(notification.id);
                                setNotificationOpen(false);
                              }}
                              className={`flex gap-3 rounded-2xl p-3 transition hover:bg-slate-50 ${
                                notification.unread ? 'bg-indigo-50/40' : ''
                              }`}
                            >
                              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.iconClass}`}>
                                {notification.isLive ? (
                                  <div className="relative">
                                    <Icon className="text-xl" />
                                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                                  </div>
                                ) : <Icon className="text-xl" />}
                              </div>
                              <div className="min-w-0 text-left">
                                <p className={`truncate text-sm ${notification.unread ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{notification.title}</p>
                                <p className="mt-1 line-clamp-2 text-xs font-semibold text-slate-500">{notification.message}</p>
                                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{notification.time}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                  </div>
                )}
              </div>
              <Avatar sx={{ width: 38, height: 38, bgcolor: '#4f46e5', fontWeight: 800 }}>
                {avatarLetter}
              </Avatar>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
