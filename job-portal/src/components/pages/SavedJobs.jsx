import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart, FiMapPin, FiBriefcase, FiTrash2, FiClock, FiChevronRight,
  FiZap, FiSearch, FiFilter, FiInfo, FiBookmark, FiInbox
} from 'react-icons/fi';
import { ButtonBase, IconButton, Skeleton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7001/api/saved', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const stats = useMemo(() => ({
    total: savedJobs.length,
    highPriority: savedJobs.filter(j => j.priority === 'High').length,
    reminders: 2 // Mocking logic for reminders as real data might not have deadline info in this schema yet
  }), [savedJobs]);

  const removeJob = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:7001/api/saved/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedJobs(prev => prev.filter(job => job._id !== id));
    } catch (error) {
      console.error("Error removing saved job", error);
    }
  };

  const filteredJobs = savedJobs.filter(item => {
    const job = item.job;
    if (!job) return false;
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const PriorityBadge = ({ level }) => {
    const styles = {
      High: 'bg-rose-50 text-rose-600 border-rose-100',
      Medium: 'bg-amber-50 text-amber-600 border-amber-100',
      Low: 'bg-slate-50 text-slate-400 border-slate-100'
    };
    const displayLevel = level || 'Medium';
    return (
      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${styles[displayLevel]}`}>
        {displayLevel} Priority
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-32 pt-10 px-4 max-w-7xl mx-auto">
      
      {/* 1. VAULT MASTER HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-600/5 border border-indigo-600/10 text-indigo-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <FiBookmark className="animate-bounce" /> Strategic Roadmap
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4 uppercase">
            Saved <span className="text-indigo-600">Futures.</span>
          </h1>
          <p className="text-lg text-slate-500 font-bold max-w-xl leading-relaxed">
            Shortlist opportunities and manage your career roadmap with architectural precision.
          </p>
        </motion.div>

        {/* KPI COUNTERS */}
        <div className="flex flex-wrap items-center gap-6">
           <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 min-w-[200px]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-sm">
                 <FiBriefcase />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 leading-none">{stats.total}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Saved</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 min-w-[200px]">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shadow-sm">
                 <FiZap />
              </div>
              <div>
                <p className="text-3xl font-black text-rose-500 leading-none">{stats.highPriority}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Priority</p>
              </div>
           </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm flex items-center gap-6 mb-16">
        <div className="flex flex-1 items-center gap-4 bg-slate-50 rounded-[20px] px-6 py-3 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
           <FiSearch className="text-slate-400" />
           <input 
             type="text" 
             placeholder="Search your roadmap..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="bg-transparent outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-400"
           />
        </div>
      </div>

      {/* 3. ROADMAP FEED */}
      <div>
         {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[1, 2].map(i => <Skeleton key={i} variant="rounded" height={300} className="!rounded-[40px]" />)}
            </div>
         ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-[48px] border border-slate-100 p-24 text-center">
               <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mx-auto mb-10">
                  <FiHeart size={48} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Empty Roadmap</h3>
               <p className="text-slate-500 font-bold max-w-sm mx-auto mt-2">Capture opportunities to start building your career roadmap.</p>
               <ButtonBase onClick={() => navigate('/jobs')} className="!mt-10 !rounded-2xl !bg-indigo-600 !text-white !px-12 !py-4.5 !font-black !uppercase !tracking-widest shadow-xl shadow-indigo-100">
                  Explore Jobs
               </ButtonBase>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <AnimatePresence>
                  {filteredJobs.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white border border-slate-100 rounded-[40px] p-8 md:p-10 hover:border-indigo-100 hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <PriorityBadge level={item.priority} />
                        <IconButton onClick={() => removeJob(item._id)} className="!bg-rose-50 !text-rose-400 hover:!bg-rose-500 hover:!text-white transition-all">
                          <FiTrash2 size={20} />
                        </IconButton>
                      </div>

                      <div className="flex gap-8 items-start mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                           <Avatar src={item.job?.company?.logo} sx={{ width: '100%', height: '100%', borderRadius: '12px' }}>{item.job?.company?.name?.charAt(0)}</Avatar>
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight uppercase leading-tight mb-2">{item.job?.title}</h3>
                           <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{item.job?.company?.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                           <p className="text-[10px] font-black text-slate-800 uppercase">{item.job?.location}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Package</p>
                           <p className="text-[10px] font-black text-indigo-600 uppercase">₹{item.job?.salary / 1000}K+</p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-auto">
                        <ButtonBase onClick={() => navigate(`/jobs/${item.job?._id}`)} className="!flex-1 !rounded-[24px] !bg-slate-900 !text-white !py-4 !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2">
                           View Details <FiChevronRight />
                        </ButtonBase>
                      </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         )}
      </div>
    </div>
  );
};

export default SavedJobs;
