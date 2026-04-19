import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FiSearch, FiFilter, FiDownload, FiEye, 
  FiCheckCircle, FiXCircle, FiClock, FiUser,
  FiBriefcase, FiExternalLink, FiMoreVertical,
  FiMail, FiPhone, FiCalendar
} from 'react-icons/fi';
import { 
  ButtonBase, Avatar, Chip, IconButton, 
  Menu, MenuItem, Tooltip, Skeleton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../utils/assets';

const AdminApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7001/api/applications/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:7001/api/applications/admin/status/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(apps => apps.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Shortlisted': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Interviewing': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50">
      
      {/* 1. HEADER & INTEL HUB */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none mb-2">Application Hub</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Deploying Candidate Reconnaissance</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">{applications.length}</div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Intake</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">Incoming Packets</p>
               </div>
            </div>
         </div>
      </div>

      {/* 2. CONTROL CENTER */}
      <div className="bg-white rounded-[32px] p-4 md:p-6 border border-slate-100 shadow-sm mb-8 flex flex-col lg:flex-row items-center gap-4">
         <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search candidate by identity or job title..."
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-bold text-slate-600 outline-none focus:border-indigo-600 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {['All', 'Applied', 'Shortlisted', 'Interviewing', 'Rejected', 'Accepted'].map(status => (
              <ButtonBase 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`!rounded-xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest !transition-all !shrink-0 ${statusFilter === status ? '!bg-indigo-600 !text-white' : '!bg-white !text-slate-400 !border !border-slate-100'}`}
              >
                {status}
              </ButtonBase>
            ))}
         </div>
      </div>

      {/* 3. APPLICATIONS TABLE */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Candidate Intel</th>
                     <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Target Position</th>
                     <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status / Logistics</th>
                     <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Documents</th>
                     <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
               </thead>
               <tbody>
                  <AnimatePresence mode='popLayout'>
                    {loading ? (
                       [1,2,3,4,5].map(i => (
                         <tr key={i} className="animate-pulse">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                                  <div className="space-y-2"><div className="w-24 h-4 bg-slate-100 rounded"></div><div className="w-16 h-3 bg-slate-50 rounded"></div></div>
                               </div>
                            </td>
                            <td colSpan={4} className="px-8 py-6"><div className="w-full h-8 bg-slate-50 rounded-xl"></div></td>
                         </tr>
                       ))
                    ) : filteredApps.map((app, index) => (
                      <motion.tr 
                        key={app._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                      >
                        {/* CANDIDATE COLUMN */}
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/admin/users/${app.applicant?._id}`)}>
                              <Avatar 
                                src={getAssetUrl(app.applicant?.profileImage)} 
                                sx={{ width: 48, height: 48, bgcolor: '#4f46e5', fontWeight: 900, borderRadius: '16px' }}
                              >
                                 {app.fullName?.charAt(0)}
                              </Avatar>
                              <div>
                                 <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{app.fullName}</p>
                                 <div className="flex items-center gap-2 mt-1">
                                    <FiMail className="text-slate-300 text-xs" />
                                    <p className="text-[10px] font-bold text-slate-400 truncate w-32">{app.email}</p>
                                 </div>
                              </div>
                           </div>
                        </td>

                        {/* JOB COLUMN */}
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100"><FiBriefcase size={18} /></div>
                              <div>
                                 <p className="text-[13px] font-black text-slate-800 leading-tight">{app.job?.title || 'Unknown Position'}</p>
                                 <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{app.job?.location}</p>
                              </div>
                           </div>
                        </td>

                        {/* STATUS COLUMN */}
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(app.status)}`}>
                                 {app.status}
                              </span>
                              <div className="flex items-center gap-1.5 text-slate-300">
                                 <FiCalendar size={14} />
                                 <span className="text-[10px] font-bold uppercase">{new Date(app.createdAt).toLocaleDateString()}</span>
                              </div>
                           </div>
                        </td>

                        {/* DOCUMENTS COLUMN */}
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <Tooltip title="View Intelligence Resume">
                                 <ButtonBase 
                                   href={getAssetUrl(app.resume)}
                                   target="_blank"
                                   className="!w-10 !h-10 !rounded-xl !bg-slate-50 !text-slate-400 hover:!bg-indigo-600 hover:!text-white transition-all border border-slate-100"
                                 >
                                    <FiDownload size={18} />
                                 </ButtonBase>
                              </Tooltip>
                              {app.coverLetter && (
                                <Tooltip title="Cover Letter Briefing">
                                   <IconButton className="!w-10 !h-10 !text-slate-300 hover:!text-indigo-600"><FiFileText size={20} /></IconButton>
                                </Tooltip>
                              )}
                           </div>
                        </td>

                        {/* ACTION COLUMN */}
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <select 
                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                value={app.status}
                                className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-600 cursor-pointer"
                              >
                                {['Applied', 'Shortlisted', 'Interviewing', 'Rejected', 'Accepted'].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <IconButton 
                                onClick={() => navigate(`/admin/users/${app.applicant?._id}`)}
                                className="!bg-indigo-50 !text-indigo-600 !rounded-xl"
                              >
                                 <FiEye size={18} />
                              </IconButton>
                           </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
         
         {!loading && filteredApps.length === 0 && (
           <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-6"><FiSearch size={40} /></div>
              <h3 className="text-xl font-black text-slate-900 uppercase">No Candidates Detected</h3>
              <p className="text-slate-400 font-medium">Try adjusting your filters or search terminology.</p>
           </div>
         )}
      </div>

    </div>
  );
};

export default AdminApplications;
