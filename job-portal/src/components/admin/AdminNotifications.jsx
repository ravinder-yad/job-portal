import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiCheckCircle, 
  FiTrash2, 
  FiUser, 
  FiBriefcase, 
  FiHexagon, 
  FiSettings, 
  FiClock,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService } from '../../services/notificationService';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      await notificationService.markAsRead('all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = async () => {
    try {
      await notificationService.clearNotifications();
      setNotifications([]);
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'user': return <FiUser className="text-blue-500" />;
      case 'job': return <FiBriefcase className="text-emerald-500" />;
      case 'company': return <FiHexagon className="text-amber-500" />;
      default: return <FiSettings className="text-slate-400" />;
    }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.isRead;
    return n.type === filter.toLowerCase();
  });

  const groupNotifications = (list) => {
    const today = [];
    const yesterday = [];
    const earlier = [];
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    list.forEach(n => {
      const date = new Date(n.createdAt);
      const diff = now - date;
      if (diff < oneDay) today.push(n);
      else if (diff < 2 * oneDay) yesterday.push(n);
      else earlier.push(n);
    });

    return { today, yesterday, earlier };
  };

  const { today, yesterday, earlier } = groupNotifications(filtered);

  const NotificationGroup = ({ title, items }) => (
    items.length > 0 && (
      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{title}</h4>
        <div className="space-y-2">
          {items.map(n => (
            <motion.div 
              key={n._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => !n.isRead && markRead(n._id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group ${n.isRead ? 'bg-white border-slate-100 opacity-60' : 'bg-blue-50/30 border-blue-100 shadow-sm shadow-blue-50'}`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${n.isRead ? 'bg-slate-50' : 'bg-white shadow-sm font-bold'}`}>
                  {getIcon(n.type)}
                </div>
                <div>
                  <p className={`text-sm tracking-tight ${n.isRead ? 'text-slate-500 font-bold' : 'text-slate-900 font-black'}`}>
                    {n.content}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 focus:none uppercase tracking-widest">
                    <FiClock /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <FiChevronRight className={`text-xl transition-transform group-hover:translate-x-1 ${n.isRead ? 'text-slate-200' : 'text-blue-200'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* 🚀 Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Notifications</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Administrative Alert Console</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllRead}
            className="px-6 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FiCheckCircle className="text-emerald-500" /> Mark all read
          </button>
          <button 
            onClick={clearAll}
            className="px-6 py-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-100 transition-all flex items-center gap-2"
          >
            <FiTrash2 /> Clear all
          </button>
        </div>
      </header>

      {/* 🎛️ Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-[28px] w-fit">
        {['All', 'Unread', 'Jobs', 'Users', 'System'].map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2.5 rounded-[22px] text-xs font-black transition-all ${filter === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 📄 Notification List */}
      <div className="space-y-12">
        {filtered.length > 0 ? (
          <>
            <NotificationGroup title="Today" items={today} />
            <NotificationGroup title="Yesterday" items={yesterday} />
            <NotificationGroup title="Earlier" items={earlier} />
          </>
        ) : (
          <div className="py-24 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <FiBell className="text-4xl text-slate-200" />
             </div>
             <h3 className="text-xl font-black text-slate-400 tracking-tight">All caught up!</h3>
             <p className="text-slate-300 font-bold text-sm">No new system events found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminNotifications;
