import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart,
  FiMapPin,
  FiBriefcase,
  FiTrash2,
  FiClock,
  FiChevronRight,
  FiAlertCircle,
  FiZap,
  FiSearch,
  FiFilter,
  FiInfo,
  FiCalendar,
  FiTrendingUp,
  FiBookmark
} from 'react-icons/fi';
import { ButtonBase, Chip, IconButton, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const INITIAL_SAVED_JOBS = [
  { 
    id: 1, 
    title: 'Senior Frontend Engineer', 
    company: 'TechNova Innovations', 
    location: 'Remote', 
    salary: '₹12L - ₹18L', 
    type: 'Full-time', 
    savedAt: '2 days ago',
    deadline: 'Closing in 2 days',
    daysLeft: 2,
    priority: 'High',
    note: 'Priority 1: Leading candidate for my next role.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcBmJYUYj67mXeSfDXSDJ5Q8TpVUbAsmQpg&s',
    match: 94
  },
  { 
    id: 2, 
    title: 'UI/UX Design Lead', 
    company: 'CreativeFlow', 
    location: 'New York', 
    salary: '$90k - $130k', 
    type: 'Contract', 
    savedAt: '5 hours ago',
    deadline: 'Closing in 5 days',
    daysLeft: 5,
    priority: 'Medium',
    note: 'Good backup options with great creative freedom.',
    logo: 'https://cdn6.f-cdn.com/contestentries/1735047/31130405/5e4f6d2ad7797_thumbCard.jpg',
    match: 88
  },
  { 
    id: 3, 
    title: 'Backend Engineer (Node.js)', 
    company: 'DataStream', 
    location: 'San Francisco', 
    salary: '$130k - $170k', 
    type: 'Full-time', 
    savedAt: '1 week ago',
    deadline: 'Expired',
    daysLeft: 0,
    priority: 'Low',
    note: 'Missed deadline, but keep for networking.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhc2CFE2uqCXv3fnsj4i2bOiACOEgrDDnzpA&s',
    match: 72
  },
];

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Saved');

  // Stats Logic
  const stats = useMemo(() => ({
    total: savedJobs.length,
    highPriority: savedJobs.filter(j => j.priority === 'High').length,
    reminders: savedJobs.filter(j => j.daysLeft > 0 && j.daysLeft <= 3).length
  }), [savedJobs]);

  const removeJob = (id) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  // Filter & Sort Logic
  const filteredAndSortedJobs = useMemo(() => {
    let result = savedJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });

    if (sortBy === 'Deadline') {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === 'Salary') {
      // Simple parse for mock salary sorting
      result.sort((a, b) => b.id - a.id); // Placeholder for mock
    }
    
    return result;
  }, [savedJobs, searchQuery, priorityFilter, sortBy]);

  const PriorityBadge = ({ level }) => {
    const styles = {
      High: 'bg-rose-50 text-rose-600 border-rose-100',
      Medium: 'bg-amber-50 text-amber-600 border-amber-100',
      Low: 'bg-slate-50 text-slate-400 border-slate-100'
    };
    return (
      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${styles[level]}`}>
        {level} Priority
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-32">
      
      {/* 1. VAULT MASTER HEADER */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-20 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col xl:flex-row xl:items-end justify-between gap-12"
          >
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-600/5 border border-indigo-600/10 text-indigo-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <FiBookmark className="animate-bounce" /> Strategic Roadmap Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
                Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Futures.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                Shortlist opportunities, manage priorities, and execute your career roadmap with intelligence.
              </p>
            </div>

            {/* LIVE KPI COUNTERS */}
            <div className="flex flex-wrap items-center gap-6">
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 min-w-[200px] group hover:scale-[1.02] transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                     <FiBriefcase />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 leading-none">{stats.total}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Inventory</p>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 min-w-[200px] group hover:scale-[1.02] transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                     <FiZap />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-rose-500 leading-none">{stats.highPriority}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">High Focus</p>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 min-w-[200px] group hover:scale-[1.02] transition-all relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                     <FiClock />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 leading-none">{stats.reminders}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Reminders</p>
                  </div>
                  {stats.reminders > 0 && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>}
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. CONTROL HUB (SEARCH & FILTERS) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="flex flex-1 w-full xl:w-auto items-center gap-4 bg-slate-50 rounded-[20px] px-6 py-3 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
             <FiSearch className="text-slate-400" />
             <input 
               type="text" 
               placeholder="Search saved roadmap..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="bg-transparent outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-400"
             />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
             <div className="hidden sm:flex items-center gap-2 mr-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <FiFilter className="text-indigo-400" /> Filter:
             </div>
             {['All', 'High', 'Medium', 'Low'].map(p => (
               <ButtonBase 
                 key={p}
                 onClick={() => setPriorityFilter(p)}
                 className={`!rounded-xl !px-5 !py-2 !text-[10px] !font-black !uppercase !tracking-widest transition-all ${priorityFilter === p ? '!bg-indigo-600 !text-white shadow-lg' : '!bg-white !text-slate-400 hover:!bg-slate-50'}`}
               >
                 {p}
               </ButtonBase>
             ))}
             
             <div className="h-8 w-px bg-slate-100 mx-3 hidden sm:block"></div>
             
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="bg-transparent border-none focus:ring-0 text-[10px] font-black text-slate-800 uppercase tracking-widest cursor-pointer"
             >
                <option>Recently Saved</option>
                <option>Deadline</option>
                <option>Highest Salary</option>
             </select>
          </div>
        </div>
      </div>

      {/* 3. ROADMAP FEED */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pb-32">
         <AnimatePresence mode="popLayout">
            {filteredAndSortedJobs.length === 0 ? (
              /* EMPTY STATE */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[48px] border border-slate-100 p-24 text-center shadow-sm flex flex-col items-center"
              >
                 <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200 mb-10 relative">
                    <FiHeart size={64} />
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-[40px] animate-pulse"></div>
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4">Your roadmap is currently empty.</h3>
                 <p className="text-slate-500 font-medium max-w-sm mb-12">Capture opportunities from the jobs hub to start building your strategic career roadmap.</p>
                 <ButtonBase 
                    onClick={() => navigate('/jobs')}
                    className="!rounded-[24px] !bg-indigo-600 !text-white !px-12 !py-4.5 !font-black !uppercase !tracking-widest hover:!bg-slate-900 transition-all shadow-xl shadow-indigo-100"
                 >
                    Explore Opportunities Hub
                 </ButtonBase>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                 {filteredAndSortedJobs.map((job, index) => (
                   <motion.div
                     key={job.id}
                     layout
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                     transition={{ duration: 0.4 }}
                     className="group relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-10 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden"
                   >
                     {/* Top Bar: Action & Priority */}
                     <div className="flex items-center justify-between mb-8">
                        <PriorityBadge level={job.priority} />
                        <IconButton 
                          onClick={() => removeJob(job.id)}
                          className="!bg-rose-50 !text-rose-400 hover:!bg-rose-500 hover:!text-white transition-all scale-90"
                        >
                          <FiTrash2 size={20} />
                        </IconButton>
                     </div>

                     {/* Job Primary Info */}
                     <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                        <div className="w-20 h-20 rounded-[28px] bg-slate-50 border border-slate-100 flex items-center justify-center p-4 group-hover:rotate-6 transition-transform duration-500 shadow-sm relative">
                           <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                           {job.match >= 90 && (
                             <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                <FiStar size={12} fill="white" />
                             </div>
                           )}
                        </div>
                        <div className="flex-1">
                           <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-none mb-2 uppercase">{job.title}</h3>
                           <p className="text-lg font-bold text-slate-400 uppercase tracking-tight">{job.company}</p>
                        </div>
                     </div>

                     {/* Metadata Matrix */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Package</p>
                           <p className="text-[10px] font-black text-slate-800">{job.salary}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Match</p>
                           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{job.match}% Level</p>
                        </div>
                        <div className={`rounded-2xl p-4 border text-center ${job.daysLeft <= 3 && job.daysLeft > 0 ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Deadline</p>
                           <p className={`text-[10px] font-black uppercase tracking-widest ${job.daysLeft <= 3 && job.daysLeft > 0 ? 'text-amber-600' : 'text-slate-800'}`}>{job.deadline}</p>
                        </div>
                     </div>

                     {/* Strategic Note */}
                     <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-50 mb-10 flex gap-4">
                        <FiInfo className="text-indigo-400 shrink-0 mt-1" />
                        <p className="text-xs font-bold text-slate-600 italic tracking-tight">{job.note}</p>
                     </div>

                     {/* Final Actions */}
                     <div className="flex gap-4">
                        <ButtonBase 
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          className="!flex-1 !rounded-[24px] !bg-slate-950 !text-white !py-4.5 !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                        >
                           Examine Details <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                        </ButtonBase>
                        <ButtonBase className="!rounded-[24px] !bg-slate-50 !text-slate-900 !px-8 !py-4.5 !font-black !uppercase !tracking-widest hover:!bg-slate-100 transition-all border border-slate-100">
                           Apply Now
                        </ButtonBase>
                     </div>

                     {/* Alert Indicator */}
                     {job.daysLeft <= 2 && job.daysLeft > 0 && (
                       <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-indigo-500 animate-gradient-x"></div>
                     )}
                   </motion.div>
                 ))}
              </div>
            )}
         </AnimatePresence>
      </div>

    </div>
  );
};

// Simple Star icon missing in Fi list
const FiStar = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default SavedJobs;
