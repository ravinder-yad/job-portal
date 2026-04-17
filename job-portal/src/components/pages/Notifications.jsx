import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBell,
  FiBriefcase,
  FiMessageSquare,
  FiZap,
  FiSettings,
  FiX,
  FiFilter,
  FiCheckCircle,
  FiStar,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { ButtonBase, IconButton, Badge } from '@mui/material';
import { useNotifications } from '../../context/NotificationContext';
import { notificationStyles } from '../../data/notifications';

const Notifications = () => {
  const { notifications, unreadCount, markAsRead, deleteNotification, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('All');

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const categories = ['All', 'Job', 'Interview', 'System', 'Offer'];

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-10">
      
      {/* 1. NOTIFICATION HEADER */}
      <div className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div>
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-[0.25em] mb-6">
                  <FiBell className="animate-swing origin-top" /> Intelligence Feed
               </div>
               <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Status <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Interactions.</span>
               </h1>
               <p className="mt-6 text-slate-400 text-lg font-medium max-w-lg leading-relaxed">
                  Real-time updates on your career trajectory. Filter by intelligence category to stay focused.
               </p>
            </div>

            <div className="flex flex-col gap-4">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl min-w-[240px] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Unread Alerts</p>
                    <p className="text-4xl font-black text-white">{unreadCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                     <FiZap />
                  </div>
               </div>
               <ButtonBase 
                 onClick={markAllAsRead}
                 className="!w-full !rounded-2xl !bg-white/10 !py-4 !text-[10px] !font-black !uppercase !tracking-widest hover:!bg-white/20 transition-all text-white border border-white/5"
               >
                 Flush Read Items
               </ButtonBase>
            </div>
         </div>
      </div>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-3 items-center px-4">
         <FiFilter className="text-slate-400 mr-2" />
         {categories.map(cat => (
           <ButtonBase
             key={cat}
             onClick={() => setFilter(cat)}
             className={`!rounded-2xl !px-6 !py-3 !text-xs !font-black !uppercase !tracking-widest transition-all ${
               filter === cat 
               ? '!bg-indigo-600 !text-white shadow-lg shadow-indigo-100' 
               : '!bg-white !text-slate-500 !border !border-slate-100 hover:!bg-slate-50'
             }`}
           >
             {cat}
           </ButtonBase>
         ))}
         <div className="ml-auto">
            <IconButton className="!bg-white !shadow-sm !border !border-slate-100 hover:!bg-slate-50 transition-all">
               <FiSettings size={20} className="text-slate-400" />
            </IconButton>
         </div>
      </div>

      {/* 3. FEED LIST */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] p-20 text-center border border-slate-50 shadow-sm"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                 <FiBell className="text-slate-200 text-5xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Silent Intelligence Feed</h3>
              <p className="mt-2 text-slate-500 font-medium">No updates found in the **{filter}** category.</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const style = notificationStyles[notification.type] || notificationStyles.Default;
              const Icon = style.icon;

              return (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative bg-white rounded-[32px] p-6 md:p-8 border transition-all duration-300 cursor-pointer ${
                    notification.unread 
                    ? 'border-indigo-100 shadow-xl shadow-indigo-500/5' 
                    : 'border-slate-100 hover:border-slate-200 shadow-sm'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-6 items-start">
                    
                    {/* Status Indicator */}
                    {notification.unread && (
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-indigo-600 rounded-l-[32px]"></div>
                    )}

                    {/* Icon Module */}
                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-500 ${style.iconClass}`}>
                       {notification.isLive ? (
                         <div className="relative">
                           <Icon />
                           <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 animate-ping border-2 border-white"></span>
                         </div>
                       ) : <Icon />}
                    </div>

                    {/* Content Module */}
                    <div className="flex-1 min-w-0 pr-8">
                       <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg tracking-tight uppercase leading-none truncate ${notification.unread ? 'font-black text-slate-900' : 'font-bold text-slate-600'}`}>
                             {notification.title}
                          </h3>
                          {notification.unread && (
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100">New</span>
                          )}
                       </div>
                       <p className={`text-sm leading-relaxed ${notification.unread ? 'font-black text-slate-700' : 'font-medium text-slate-500'}`}>
                          {notification.message}
                       </p>
                       <div className="mt-4 flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          <span className="flex items-center gap-1.5"><FiClock className="text-indigo-400" /> {notification.time}</span>
                          <span className="flex items-center gap-1.5"><FiStar className="text-amber-400" /> Priority: High</span>
                       </div>
                    </div>

                    {/* Actions Module */}
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <IconButton 
                         size="small" 
                         onClick={(e) => {
                           e.stopPropagation();
                           deleteNotification(notification.id);
                         }}
                         className="!bg-rose-50 !text-rose-500 hover:!bg-rose-500 hover:!text-white transition-all"
                       >
                         <FiX size={18} />
                       </IconButton>
                       <IconButton size="small" className="!bg-slate-50 !text-slate-400 hover:!bg-slate-900 hover:!text-white transition-all">
                         <FiCheckCircle size={18} />
                       </IconButton>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* System Tip */}
      <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex items-center gap-6 group">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-sm border border-slate-50">
             <FiAlertCircle />
          </div>
          <div>
             <p className="text-xl font-black text-slate-900 tracking-tight">Intelligence Config</p>
             <p className="text-sm font-medium text-slate-500 mt-1">You can customize notification thresholds and push intelligence settings in your <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Vault Settings</span>.</p>
          </div>
      </div>

    </div>
  );
};

export default Notifications;
