import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPieChart, 
  FiBriefcase, 
  FiUsers, 
  FiGrid, 
  FiTrendingUp, 
  FiMessageSquare, 
  FiBell, 
  FiSettings, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu
} from 'react-icons/fi';
import { ButtonBase, Tooltip, IconButton } from '@mui/material';
import { useAuth } from '../../context/useAuth';

const menuItems = [
  { title: 'MAIN', type: 'header' },
  { title: 'Dashboard', icon: FiPieChart, path: '/admin/dashboard' },
  { title: 'Jobs', icon: FiBriefcase, path: '/admin/jobs' },
  { title: 'Companies', icon: FiGrid, path: '/admin/companies' },
  { title: 'Users', icon: FiUsers, path: '/admin/users' },
  { title: 'MANAGEMENT', type: 'header' },
  { title: 'Analytics', icon: FiTrendingUp, path: '/admin/analytics' },
  { title: 'Messages', icon: FiMessageSquare, path: '/admin/messages' },
  { title: 'Notifications', icon: FiBell, path: '/admin/notifications' },
  { title: 'SYSTEM', type: 'header' },
  { title: 'Settings', icon: FiSettings, path: '/admin/settings' },
];

const AdminSidebar = ({ collapsed, setCollapsed, mobile, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    const content = (
      <Link
        to={item.path}
        onClick={mobile ? onClose : undefined}
        className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
          isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
        }`}
      >
        <Icon className={`text-xl shrink-0 ${isActive ? 'text-white' : 'group-hover:text-indigo-600'}`} />
        
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-sm tracking-wide whitespace-nowrap"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>

        {isActive && !collapsed && (
          <motion.div 
            layoutId="sidebar-active-indicator"
            className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/40"
          />
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip title={item.title} placement="right" arrow>
          <span>{content}</span>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <div className={`h-full flex flex-col bg-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* 1. Header (Logo) */}
      <div className={`h-24 flex items-center px-6 ${collapsed ? 'justify-center' : 'justify-start'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
                J
             </div>
             <span className="text-xl font-black text-slate-900 tracking-tight uppercase">Jobify <span className="text-indigo-600">Admin</span></span>
          </div>
        )}
        {collapsed && <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">J</div>}
      </div>

      {/* 2. Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-2 hide-scrollbar">
        {menuItems.map((item, idx) => {
          if (item.type === 'header') {
            return !collapsed ? (
              <p key={idx} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pt-8 pb-3 px-4">
                {item.title}
              </p>
            ) : null;
          }
          return <NavItem key={idx} item={item} />;
        })}
      </div>

      {/* 3. Footer (Logout) */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all group ${collapsed ? 'justify-center' : ''}`}
        >
          <FiLogOut className="text-xl shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="font-bold text-sm tracking-wide">Logout System</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
