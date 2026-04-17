import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiArrowRight,
  FiActivity,
  FiZap
} from 'react-icons/fi';
import { ButtonBase, CircularProgress } from '@mui/material';

const STATS = [
  { label: 'Applied Jobs', value: '42', icon: FiBriefcase, color: 'bg-blue-500', trend: '+12% this month' },
  { label: 'Interviews', value: '08', icon: FiActivity, color: 'bg-purple-500', trend: '+2 new invites' },
  { label: 'Offers Received', value: '02', icon: FiZap, color: 'bg-amber-500', trend: 'Highest potential' },
  { label: 'Viewed Profile', value: '1.2k', icon: FiTrendingUp, color: 'bg-emerald-500', trend: '+18% growth' },
];

const RECENT_ACTIVITIES = [
  { id: 1, type: 'Application Sent', target: 'TechNova Innovations', time: '2 hours ago', status: 'In Review' },
  { id: 2, type: 'Interview Scheduled', target: 'CreativeSpace UI', time: '5 hours ago', status: 'Pending' },
  { id: 3, type: 'Profile Viewed', target: 'DataFlow Systems', time: '1 day ago', status: 'Anonymous' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terminal <span className="text-indigo-600">Overview</span></h1>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Live Career Intelligence Dashboard</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <ButtonBase className="!rounded-2xl !bg-white !px-6 !py-3 !text-sm !font-black !text-slate-600 !border !border-slate-100 !shadow-sm hover:!bg-slate-50 transition-all">
            Export Report
          </ButtonBase>
          <ButtonBase className="!rounded-2xl !bg-indigo-600 !px-6 !py-3 !text-sm !font-black !text-white !shadow-lg !shadow-indigo-100 hover:!bg-indigo-700 transition-all">
            Find New Jobs
          </ButtonBase>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            <p className="text-sm font-bold text-slate-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. MAIN CONTENT: ACTIVITY & STRENGTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-50 shadow-sm min-h-[460px]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs">Dynamic Feed</h3>
              <ButtonBase className="!text-indigo-600 !text-sm !font-black hover:!underline">Explore All &rarr;</ButtonBase>
            </div>

            <div className="space-y-6">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-center gap-6 group cursor-pointer hover:bg-slate-50/50 p-4 -mx-4 rounded-[24px] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                     <FiClock size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900 leading-none">{activity.type}</p>
                    <p className="text-xs font-bold text-slate-500 mt-2">{activity.target} • {activity.time}</p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Strength */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-lg font-black tracking-tight mb-8">Profile Pulse</h3>
            
            <div className="flex flex-col items-center py-6">
               <div className="relative">
                  <CircularProgress 
                    variant="determinate" 
                    value={85} 
                    size={140} 
                    thickness={4} 
                    sx={{ color: '#6366f1', filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' }} 
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tracking-tight">85%</span>
                    <span className="text-[9px] font-black uppercase text-indigo-300 tracking-widest mt-1">Excellent</span>
                  </div>
               </div>
            </div>

            <p className="text-sm text-slate-400 text-center font-medium leading-relaxed mt-4">
              Your profile is in the **Top 5%** for Senior Backend Developer roles.
            </p>

            <ButtonBase className="!mt-10 !rounded-2xl !bg-white/10 !w-full !py-4 !text-xs !font-black !uppercase !tracking-widest hover:!bg-white/20 transition-all">
              Optimise Score
            </ButtonBase>
          </div>

          <div className="bg-indigo-600 rounded-[40px] p-8 md:p-10 text-white shadow-xl flex items-center gap-6 group cursor-pointer transition-transform hover:scale-[1.02]">
             <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">
                <FiZap />
             </div>
             <div>
                <p className="text-lg font-black leading-tight">Pro Career <br/>Insights</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mt-2">Activate Now &rarr;</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
