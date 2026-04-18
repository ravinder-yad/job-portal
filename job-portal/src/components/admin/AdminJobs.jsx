import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Skeleton,
  Tooltip,
  Grid
} from '@mui/material';
import { 
  FiArrowLeft, 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiMapPin, 
  FiExternalLink, 
  FiFilter, 
  FiBriefcase, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiXCircle, 
  FiStar, 
  FiUpload, 
  FiRefreshCw, 
  FiClock, 
  FiDollarSign, 
  FiZap,
  FiTag
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { motion, AnimatePresence } from 'framer-motion';
import JobForm from './JobForm';
import JobDetails from './JobDetails';

const StatsCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[28px] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] flex items-center gap-5 border border-slate-100 relative overflow-hidden h-full transiton-all"
  >
    <div 
      className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shrink-0"
      style={{ backgroundColor: `${color}10`, color: color }}
    >
      {icon}
    </div>
    <div className="z-10">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-3xl font-black text-slate-900 tracking-tight">
          {value}
        </h4>
        {trend && (
           <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <FiTrendingUp className="text-[10px]" /> {trend}
           </span>
        )}
      </div>
    </div>
    {/* Subtle Decorative Circle */}
    <div
      className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-5 pointer-events-none"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit' | 'details'
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error("Fetch jobs error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const stats = {
    total: jobs.length,
    open: jobs.filter(j => j.status === 'open').length,
    closed: jobs.filter(j => j.status === 'closed').length,
    featured: jobs.filter(j => (j.isFeatured || j.featured)).length
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (view === 'edit') {
        await adminService.updateJob(selectedJob._id, formData);
      } else {
        await adminService.createJob(formData);
      }
      fetchJobs();
      setView('list');
      setSelectedJob(null);
    } catch (error) {
      console.error("Save job error:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya aap sachme ye job delete karna chahte hain?")) {
      try {
        await adminService.deleteJob(id);
        setJobs(prev => prev.filter(j => j._id !== id));
      } catch (error) {
        console.error("Delete job error:", error);
      }
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'All' || job.jobType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStyle = (status) => {
    const isMain = status === 'open';
    return {
      bgcolor: isMain ? '#f0fdf4' : '#fef2f2',
      color: isMain ? '#16a34a' : '#dc2626',
      border: `1px solid ${isMain ? '#bcf0da' : '#fecaca'}`,
      boxShadow: isMain ? '0 0 10px rgba(22, 163, 74, 0.1)' : '0 0 10px rgba(220, 38, 38, 0.1)'
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-0 min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 md:p-12"
          >
      {/* 👑 1. Premium Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-linear-to-br from-slate-900 to-indigo-600 bg-clip-text text-transparent">
            Job Management Dashboard 👑
          </h1>
          <div className="flex items-center gap-2 text-slate-500 font-bold">
            Manage, create and control all job listings in one place. 
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-wider">
              Admin Control
            </span>
          </div>
        </div>
        <div className="flex gap-4">
           <button
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <FiUpload className="text-lg" />
            Bulk Upload
          </button>
          <button
            onClick={() => { setSelectedJob(null); setView('add'); }}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-200"
          >
            <FiPlus className="text-lg" />
            Add New Job
          </button>
        </div>
      </div>

      {/* 🔥 2. Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total Jobs" value={stats.total} icon={<FiBriefcase />} color="#6366f1" trend="+12%" />
        <StatsCard title="Open Jobs" value={stats.open} icon={<FiCheckCircle />} color="#10b981" trend="Active" />
        <StatsCard title="Closed" value={stats.closed} icon={<FiXCircle />} color="#ef4444" />
        <StatsCard title="Featured" value={stats.featured} icon={<FiStar />} color="#f59e0b" trend="Boosted" />
      </div>

      {/* 🔍 3. Filter & Track Bar */}
      <div className="space-y-6 mb-12">
        {/* Category Tracks */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
             <FiTag className="text-slate-400" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Tracks:</span>
          </div>
          {['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Management', 'Finance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchTerm(cat === 'All' ? '' : cat)}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border ${
                (searchTerm === cat || (cat === 'All' && searchTerm === ''))
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] focus-within:shadow-xl focus-within:shadow-indigo-50/50 transition-all">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative w-full lg:w-1/3 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search title, track or keyword..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-0 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center w-full lg:w-2/3 lg:justify-end">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-700 font-black text-sm outline-none cursor-pointer"
              >
                <option value="All">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-700 font-black text-sm outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
  
              <button 
                onClick={() => { setSearchTerm(''); setTypeFilter('All'); setStatusFilter('All'); }}
                className="flex items-center gap-2 px-4 py-3.5 text-slate-400 font-black text-sm hover:text-rose-500 transition-colors"
              >
                <FiRefreshCw />
              </button>
              
              <div className="px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-indigo-100">
                {filteredJobs.length} matches
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 4. Card Results */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 flex items-center gap-8 animate-pulse">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <div className="w-1/3 h-6 bg-slate-100 rounded-md" />
                  <div className="w-1/4 h-4 bg-slate-100 rounded-md" />
                </div>
                <div className="w-24 h-10 bg-slate-100 rounded-xl" />
              </div>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                layout
                onClick={() => { setSelectedJob(job); setView('details'); }}
                whileHover={{ y: -3 }}
                className="bg-white p-5 md:p-6 rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.08)] transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Company Info */}
                  <div className="flex items-center gap-5 w-full md:w-2/5">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[22px] p-2 md:p-3 border-2 border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                      {job.company.logo ? (
                        <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-2xl font-black text-indigo-400">{job.company.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                           {job.title}
                         </h3>
                         {(job.isFeatured || job.featured) && (
                            <FiStar className="text-amber-400 fill-amber-400" />
                         )}
                      </div>
                      <p className="text-slate-400 font-bold text-sm">
                        <span className="text-indigo-600">{job.company.name}</span> • {job.location}
                      </p>
                      
                      <div className="flex gap-2 mt-3">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[11px] font-black uppercase tracking-tight">
                          <FiClock className="text-xs" /> {job.jobType}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[11px] font-black uppercase tracking-tight">
                          <FiMapPin className="text-xs" /> {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="w-full md:w-1/4">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Current Status</p>
                    <span 
                      className={`
                        inline-flex items-center px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider
                        ${job.status === 'open' 
                          ? 'bg-emerald-50 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                          : 'bg-rose-50 text-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.1)]'}
                      `}
                    >
                      {job.status === 'open' ? '🚀 Active Listing' : '🛑 Closed'}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="w-full md:w-1/6">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Added On</p>
                    <p className="text-slate-600 font-black text-sm">
                      {new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 w-full md:w-1/6">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedJob(job); setView('edit'); }}
                      className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <FiEdit2 className="text-xl" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(job._id); }}
                      className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-24 bg-white rounded-[32px] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 grayscale opacity-40">
                🕵️‍♂️
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Zero jobs found, boss!</h2>
              <p className="text-slate-400 font-bold max-w-md mx-auto mb-8">
                Try adjusting your search terms or filters. Maybe search for something less specific?
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setStatusFilter('All'); setTypeFilter('All'); }}
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
              >
                Reset all filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    )}

    {view === 'add' && (
      <JobForm 
        key="add"
        onClose={() => setView('list')} 
        onSave={handleCreateOrUpdate} 
      />
    )}

    {view === 'edit' && (
      <JobForm 
        key="edit"
        editingJob={selectedJob} 
        onClose={() => setView('list')} 
        onSave={handleCreateOrUpdate} 
      />
    )}

    {view === 'details' && (
      <JobDetails 
        key="details"
        job={selectedJob} 
        onClose={() => setView('list')} 
        onEdit={() => setView('edit')}
      />
    )}
  </AnimatePresence>
</div>
);
};

export default AdminJobs;
