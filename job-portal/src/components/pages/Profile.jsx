import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiBriefcase, FiHeart, FiBell, FiChevronRight, 
  FiExternalLink, FiClock, FiCheckCircle, FiEdit3 
} from 'react-icons/fi';
import { ButtonBase, Avatar, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useNotifications } from '../../context/NotificationContext';
import { getUserStats, getSavedCount, getRecentApplications } from '../../services/userService';

const Profile = () => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ applied: 0, saved: 0 });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, savedCount, appsData] = await Promise.all([
          getUserStats(),
          getSavedCount(),
          getRecentApplications()
        ]);
        setStats({ applied: statsData.appliedCount, saved: savedCount });
        setRecentApps(appsData);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsCards = [
    { label: 'Applied Jobs', count: stats.applied, icon: FiBriefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/applied' },
    { label: 'Saved Jobs', count: stats.saved, icon: FiHeart, color: 'text-rose-600', bg: 'bg-rose-50', link: '/saved' },
    { label: 'Notifications', count: unreadCount, icon: FiBell, color: 'text-amber-600', bg: 'bg-amber-50', link: '/notifications' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 pt-10">
      
      {/* 1. CLEAN HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-10"
      >
        <div className="relative group">
          <Avatar 
            sx={{ width: 120, height: 120, bgcolor: '#4f46e5', fontSize: '40px', fontWeight: 900 }}
            className="shadow-xl"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
            {user?.name}
          </h1>
          <p className="text-lg font-bold text-slate-400 flex items-center justify-center md:justify-start gap-2">
            <FiMail className="text-indigo-600" /> {user?.email}
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
             <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                Seeker Account
             </span>
             <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                Active Pulse
             </span>
          </div>
        </div>
        <ButtonBase className="!rounded-2xl !bg-slate-50 !px-6 !py-3 !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 !transition-all border border-slate-100 flex gap-2">
          <FiEdit3 /> <span className="text-sm font-black uppercase tracking-widest">Edit Details</span>
        </ButtonBase>
      </motion.div>

      {/* 2. STATS GRID (The Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statsCards.map((stat, i) => (
          <Link to={stat.link} key={i}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-center group"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon />
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">{stat.count}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* 3. RECENT ACTIVITY HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Recent Applications */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Applications</h2>
            <Link to="/applied" className="text-xs font-black text-indigo-600 hover:underline flex items-center gap-1 uppercase tracking-widest">
              View History <FiChevronRight />
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              [1, 2].map(i => <Skeleton key={i} variant="rounded" height={100} className="!rounded-[24px]" />)
            ) : recentApps.length > 0 ? (
              recentApps.map((app) => (
                <div key={app._id} className="bg-white rounded-[24px] p-6 border border-slate-50 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-sm">
                      <FiBriefcase />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase truncate w-32 md:w-48">
                        {app.job?.title}
                      </p>
                      <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tight">{app.job?.company?.name || 'Loading...'}</p>
                    </div>
                  </div>
                  <div className="text-right sr-only md:not-sr-only">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                      {app.status}
                    </span>
                    <p className="text-[10px] font-bold text-slate-300 mt-2 flex items-center justify-end gap-1">
                      <FiClock /> {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 rounded-[24px] p-10 text-center border border-dashed border-slate-200">
                <FiBriefcase size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-500">No applications yet. Go apply to some jobs!</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Tips or Action Hub */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Career Intel</h2>
          </div>
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group h-[calc(100%-40px)]">
             <div className="relative z-10">
                <p className="text-2xl font-black tracking-tight leading-tight mb-4">Your Profile is <br/> looking <span className="text-indigo-400 uppercase">Strong.</span></p>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                  Candidates with a completed profile are 3x more likely to be viewed by top tier recruiters.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <FiCheckCircle className="text-indigo-400" />
                      <span className="text-xs font-black uppercase tracking-widest">Resume Verified</span>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 opacity-50">
                      <FiUser className="text-slate-400" />
                      <span className="text-xs font-black uppercase tracking-widest">Preferences Set</span>
                   </div>
                </div>
                <ButtonBase className="!w-full !mt-10 !rounded-2xl !bg-indigo-600 !py-4 !text-xs !font-black !uppercase !tracking-widest hover:!bg-indigo-500 !transition-all">
                   Manage Profile Details
                </ButtonBase>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <FiExternalLink size={180} />
             </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default Profile;
