import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ButtonBase, IconButton, Badge, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { 
  FiSearch, FiMapPin, FiMenu, FiX, 
  FiBell, FiMessageSquare, FiUser, 
  FiBriefcase, FiHome, FiLayers, FiPieChart, FiHeart, FiSettings, FiLogOut, FiShield 
} from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { useAuth } from '../../context/useAuth';
import { useNotifications } from '../../context/NotificationContext';
import { notificationStyles } from '../../data/notifications';
import { mockChats, getUnreadCount } from '../../data/messages';
import { getAssetUrl } from '../../utils/assets';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: <FiHome className="md:hidden mr-3" /> },
  { name: 'Jobs', path: '/jobs', icon: <FiBriefcase className="md:hidden mr-3" /> },
  { name: 'Companies', path: '/companies', icon: <FiLayers className="md:hidden mr-3" /> },
  { name: 'Saved', path: '/saved', icon: <FiHeart className="md:hidden mr-3" /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [navKeyword, setNavKeyword] = useState('');
  const [navLocation, setNavLocation] = useState('');

  const handleNavSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const params = new URLSearchParams();
      if (navKeyword) params.append('keyword', navKeyword);
      if (navLocation) params.append('location', navLocation);
      navigate(`/jobs?${params.toString()}`);
    }
  };

  const { notifications, unreadCount, markAsRead } = useNotifications();
  const recentNotifications = notifications.slice(0, 3);
  const unreadMessagesCount = getUnreadCount();

  // Profile Menu State (MUI)
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';
  const avatarLetter = userName.charAt(0).toUpperCase();
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotificationOpen(false);
    setMessagesOpen(false);
  };
  
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNavigate = (path) => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
    setNotificationOpen(false);
    setMessagesOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent ${
          scrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3 border-gray-100'
            : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* 1. LEFT - BRAND */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <svg 
              className="w-10 h-10 transition-all duration-300 group-hover:scale-[1.15] group-hover:-rotate-6 drop-shadow-sm" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad)" />
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4f46e5" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-extrabold tracking-tight text-slate-800 hidden sm:block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
              Jobify
            </span>
          </Link>

          {/* 2. CENTER - SMART SEARCH (Desktop Only) */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-12">
            <div 
              className={`flex w-full items-center bg-white rounded-full border transition-all duration-300 ${
                isFocused 
                ? 'border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.15)]' 
                : 'border-gray-200 shadow-sm hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              {/* Job Title */}
              <div className="flex items-center flex-1 pl-5 h-12">
                <FiSearch className="text-gray-400 mr-3 text-lg" />
                <input
                  type="text"
                  value={navKeyword}
                  onChange={(e) => setNavKeyword(e.target.value)}
                  onKeyDown={handleNavSearch}
                  placeholder="Search jobs, skills, companies..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 font-medium"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>

              {/* Divider */}
              <div className="h-6 w-[1px] bg-gray-200"></div>

              {/* Location */}
              <div className="flex items-center flex-1 pl-4 h-12">
                <FiMapPin className="text-gray-400 mr-3 text-lg" />
                <input
                  type="text"
                  value={navLocation}
                  onChange={(e) => setNavLocation(e.target.value)}
                  onKeyDown={handleNavSearch}
                  placeholder="Location..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 font-medium"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>

              {/* Search Button */}
              <div className="p-1.5">
                <ButtonBase
                  onClick={handleNavSearch}
                  className="!rounded-full !bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !h-10 !px-6 !text-sm !font-semibold !transition-all hover:!scale-[1.05] hover:!shadow-lg hover:!shadow-indigo-500/40 focus:!ring-2 focus:!ring-indigo-500 focus:!ring-offset-2"
                >
                  Search
                </ButtonBase>
              </div>
            </div>
          </div>

          {/* 3. NAV LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mr-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors hover:text-indigo-600 group ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* Hover Underline Animation */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 4. RIGHT SIDE - USER ACTIONS */}
          <div className="flex items-center gap-2 lg:gap-4 z-50">

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <ButtonBase className="!rounded-lg !px-4 !py-2 !text-sm !font-medium !text-gray-700 hover:!bg-gray-50 !hidden sm:!block transition-colors">
                    Log in
                  </ButtonBase>
                </Link>
                <div className="hidden sm:block">
                  <Link to="/register">
                    <ButtonBase className="!rounded-lg !bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !px-5 !py-2.5 !text-sm !font-medium !shadow-md !shadow-indigo-200 hover:!shadow-lg hover:!scale-[1.02] !transition-all">
                      Register Now
                    </ButtonBase>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="relative">
                  <IconButton 
                    onClick={() => {
                      setNotificationOpen(!notificationOpen);
                      setMessagesOpen(false);
                      setAnchorEl(null);
                    }}
                    className="!text-gray-500 hover:!bg-indigo-50 hover:!text-indigo-600 !transition-colors"
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      <FiBell className="text-[20px]" />
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
                                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{notification.time}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative hidden sm:block">
                  <IconButton 
                    onClick={() => {
                      setMessagesOpen(!messagesOpen);
                      setNotificationOpen(false);
                      setAnchorEl(null);
                    }}
                    className="!text-gray-500 hover:!bg-indigo-50 hover:!text-indigo-600 !transition-colors"
                  >
                    <Badge badgeContent={unreadMessagesCount} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#4f46e5' } }}>
                      <FiMessageSquare className="text-[20px]" />
                    </Badge>
                  </IconButton>

                  {messagesOpen && (
                    <div className="absolute right-0 top-12 z-50 w-[340px] overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xl shadow-slate-200/80">
                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                        <div>
                          <p className="text-sm font-black text-slate-950">Messages</p>
                          <p className="text-xs font-semibold text-slate-500">{unreadMessagesCount} unread messages</p>
                        </div>
                        <Link
                          to="/messages"
                          onClick={() => setMessagesOpen(false)}
                          className="text-xs font-black text-indigo-600 hover:text-indigo-700"
                        >
                          View all chats
                        </Link>
                      </div>

                      <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                          <FiSearch className="text-slate-400" />
                          <input type="text" placeholder="Search messages..." className="w-full bg-transparent outline-none text-xs text-slate-700 placeholder:text-slate-400" />
                        </div>
                      </div>

                      <div className="max-h-[320px] overflow-y-auto p-2">
                        {mockChats.slice(0, 3).map((chat) => (
                          <Link
                            key={chat.id}
                            to="/messages"
                            onClick={() => setMessagesOpen(false)}
                            className={`flex gap-3 rounded-lg p-3 transition hover:bg-slate-50 ${chat.unread > 0 ? 'bg-indigo-50/40' : ''}`}
                          >
                            <div className="relative shrink-0">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: '#f1f5f9', color: '#4f46e5', fontWeight: 800 }}>
                                {chat.user.avatar}
                              </Avatar>
                              {chat.user.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <div className="flex justify-between items-center mb-0.5">
                                <p className={`truncate text-sm ${chat.unread > 0 ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{chat.user.name}</p>
                                <span className="text-[10px] font-bold text-slate-400 shrink-0">{chat.lastTime}</span>
                              </div>
                              <p className={`line-clamp-1 text-xs ${chat.unread > 0 ? 'font-bold text-indigo-700' : 'font-medium text-slate-500'}`}>
                                {chat.lastMessage}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-2 relative">
                  <div 
                    className="flex items-center gap-2 cursor-pointer rounded-full hover:bg-slate-50 pr-4 transition-colors border border-transparent hover:border-slate-100"
                    onClick={handleProfileClick}
                  >
                    <Avatar 
                      src={getAssetUrl(user?.profileImage)} 
                      sx={{ width: 38, height: 38, bgcolor: '#4f46e5', fontWeight: 800, fontSize: '14px' }}
                    >
                      {avatarLetter}
                    </Avatar>
                    <span className="text-sm font-black text-slate-700 hidden sm:block select-none pointer-events-none">
                      {userName || 'User'}
                    </span>
                  </div>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleProfileClose}
                    onClick={handleProfileClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.08))',
                          mt: 2,
                          minWidth: 280,
                          borderRadius: '24px',
                          border: '1px solid #f1f5f9',
                          padding: '8px',
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 18,
                            width: 12,
                            height: 12,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderLeft: '1px solid #f1f5f9',
                            borderTop: '1px solid #f1f5f9',
                          },
                        },
                      },
                    }}
                  >
                    <div className="px-4 py-5 border-b border-slate-50 mb-2 flex items-center gap-4">
                       <Avatar 
                         src={getAssetUrl(user?.profileImage)}
                         sx={{ width: 44, height: 44, bgcolor: '#4f46e5', fontWeight: 900, borderRadius: '12px', fontSize: '18px' }}
                       >
                          {avatarLetter}
                       </Avatar>
                       <div className="min-w-0">
                          <p className="text-[14px] font-black text-slate-900 leading-tight truncate">{userName}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                             <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${user?.role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {user?.role || 'Seeker'}
                             </span>
                             <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                             <p className="text-[10px] font-bold text-slate-400 truncate w-24">{userEmail}</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-1">
                      <MenuItem 
                        onClick={() => handleMenuNavigate('/profile')} 
                        className="!rounded-xl !py-3 !px-4 hover:!bg-indigo-50 transition-all group/item"
                      >
                        <FiUser className="mr-3 text-lg text-slate-400 group-hover/item:text-indigo-600 transition-colors" />
                        <span className="text-sm font-black text-slate-700">My Profile</span>
                      </MenuItem>

                      {user?.role === 'admin' && (
                        <MenuItem 
                          onClick={() => handleMenuNavigate('/admin/dashboard')} 
                          className="!rounded-xl !py-3 !px-4 hover:!bg-indigo-50 transition-all group/item"
                        >
                          <FiShield className="mr-3 text-lg text-indigo-400 group-hover/item:text-indigo-600 transition-colors" />
                          <span className="text-sm font-black text-indigo-600">Admin Terminal</span>
                        </MenuItem>
                      )}

                      <MenuItem 
                        onClick={() => handleMenuNavigate('/notifications')} 
                        className="!rounded-xl !py-3 !px-4 hover:!bg-indigo-50 transition-all group/item"
                      >
                        <FiBell className="mr-3 text-lg text-slate-400 group-hover/item:text-indigo-600 transition-colors" />
                        <span className="text-sm font-black text-slate-700">Notifications</span>
                      </MenuItem>

                      <Divider className="!my-2 !mx-4 !border-slate-50" />

                      <MenuItem 
                        onClick={handleLogout} 
                        className="!rounded-xl !py-3 !px-4 hover:!bg-red-50 transition-all group/item"
                      >
                        <FiLogOut className="mr-3 text-lg text-red-400 group-hover/item:text-red-500 transition-colors" />
                        <span className="text-sm font-black text-red-500">Logout</span>
                      </MenuItem>
                    </div>
                  </Menu>
                </div>
              </div>
            )}

            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              className="lg:!hidden !text-gray-700 hover:!bg-indigo-50 hover:!text-indigo-600"
            >
              <FiMenu className="text-2xl" />
            </IconButton>

          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-white shadow-2xl z-[70] lg:hidden flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <span className="text-lg font-bold text-gray-800">Menu</span>
                <IconButton onClick={() => setMobileMenuOpen(false)} className="!bg-gray-50 hover:!bg-gray-100">
                  <FiX />
                </IconButton>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <ButtonBase className="!w-full !rounded-xl !border !border-gray-200 !py-3 !text-sm !font-semibold !text-gray-700 hover:!bg-gray-50 transition-colors">
                        Log in
                      </ButtonBase>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <ButtonBase className="!w-full !rounded-xl !bg-indigo-600 !py-3 !text-sm !font-semibold !text-white hover:!bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                        Register
                      </ButtonBase>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <Avatar 
                        src={getAssetUrl(user?.profileImage)}
                        sx={{ width: 40, height: 40, bgcolor: '#4f46e5', fontWeight: 800 }}
                      >
                        {avatarLetter}
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">Hi, {userName}</p>
                        <p className="truncate text-xs font-medium text-slate-500">{userEmail}</p>
                      </div>
                    </div>
                    <ButtonBase onClick={() => handleMenuNavigate('/profile')} className="!w-full !rounded-xl !border !border-gray-200 !py-3 !text-sm !font-semibold !text-gray-700 hover:!bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <FiUser /> My Profile
                    </ButtonBase>
                    {user?.role === 'admin' && (
                      <ButtonBase onClick={() => handleMenuNavigate('/admin/dashboard')} className="!w-full !rounded-xl !border !border-gray-200 !py-3 !text-sm !font-semibold !text-indigo-600 hover:!bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                        <FiShield /> Admin Terminal
                      </ButtonBase>
                    )}
                    <ButtonBase onClick={handleLogout} className="!w-full !rounded-xl !bg-red-50 !py-3 !text-sm !font-semibold !text-red-600 hover:!bg-red-100 transition-colors flex items-center justify-center gap-2">
                      <FiLogOut /> Logout
                    </ButtonBase>
                  </div>
                )}
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
