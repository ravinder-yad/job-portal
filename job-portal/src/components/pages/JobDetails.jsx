import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FiMapPin, FiBriefcase, FiDollarSign, FiClock, 
  FiArrowLeft, FiShare2, FiHeart, FiZap,
  FiCheckCircle, FiGlobe, FiUsers, FiAward
} from 'react-icons/fi';
import { ButtonBase, Skeleton, Chip, Avatar, Divider, IconButton } from '@mui/material';
import { getAssetUrl } from '../../utils/assets';
import ApplyModal from '../jobs/ApplyModal';
import { useAuth } from '../../context/useAuth';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:7001/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Job not found or connection error.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleSaveToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:7001/api/saved', { jobId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 md:px-8">
       <div className="max-w-5xl mx-auto">
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '40px', mb: 4 }} />
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="40%" height={40} />
       </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
       <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-6 font-black text-2xl">!</div>
       <h2 className="text-3xl font-black text-slate-900 mb-2">INTELLIGENCE ERROR</h2>
       <p className="text-slate-500 font-medium mb-8">{error}</p>
       <ButtonBase onClick={() => navigate('/jobs')} className="!rounded-2xl !bg-indigo-600 !text-white !px-8 !py-4 !font-black !uppercase !tracking-widest shadow-xl">Back to Jobs Feed</ButtonBase>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32 pt-24">
      
      {/* 1. TOP NAV BAR (INNER) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 flex justify-between items-center">
         <ButtonBase 
           onClick={() => navigate(-1)}
           className="!rounded-full !bg-white !px-6 !py-3 !text-xs !font-black !uppercase !tracking-widest !text-slate-600 !border !border-slate-200 hover:!bg-slate-50 transition-all flex items-center gap-2"
         >
            <FiArrowLeft /> Back
         </ButtonBase>
         <div className="flex gap-3">
            <IconButton className="!bg-white !border !border-slate-200 !text-slate-400 hover:!text-indigo-600 transition-all"><FiShare2 size={18} /></IconButton>
            <IconButton 
              onClick={handleSaveToggle}
              className={`!bg-white !border !border-slate-200 transition-all ${isSaved ? '!text-rose-500 !bg-rose-50 !border-rose-100' : '!text-slate-400 hover:!text-rose-500'}`}
            >
              <FiHeart size={18} fill={isSaved ? "currentColor" : "none"} />
            </IconButton>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
         
         {/* LEFT COLUMN: MAIN CONTENT */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* JOB HERO HEADER */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-10 relative z-10">
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                     {job.company?.logo ? (
                       <img 
                         src={job.company.logo} 
                         alt={job.company.name} 
                         className="w-full h-full object-contain"
                         onError={(e) => {
                           e.target.onerror = null;
                           e.target.src = 'https://via.placeholder.com/100?text=Logo';
                         }}
                       />
                     ) : (
                       <FiBriefcase className="text-slate-200 text-4xl" />
                     )}
                  </div>
                  <div>
                     <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">{job.title}</h1>
                     <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <span className="text-indigo-600 font-black text-lg uppercase tracking-tight">{job.company?.name || 'Confident Company'}</span>
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                           <FiMapPin className="text-indigo-400" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                           <FiClock className="text-indigo-400" /> Registered {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Salary Range</p>
                     <p className="text-lg font-black text-slate-900 leading-none">₹{(job.salary?.min/100000).toFixed(1)}L - {(job.salary?.max/100000).toFixed(1)}L</p>
                  </div>
                  <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Employment</p>
                     <p className="text-lg font-black text-slate-900 leading-none">{job.jobType}</p>
                  </div>
                  <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                     <p className="text-lg font-black text-slate-900 leading-none">{job.experience || 'Fresher'}</p>
                  </div>
                  <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Applicants</p>
                     <p className="text-lg font-black text-indigo-600 leading-none">{job.applicantsCount || 0}+ Candidates</p>
                  </div>
               </div>
            </motion.div>

            {/* JOB DESCRIPTION SECTION */}
            <div className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><FiAward size={22} /></div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Job Reconnaissance & Specs</h2>
               </div>
               
               <div className="prose prose-slate max-w-none mb-12">
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line font-medium">
                     {job.description}
                  </p>
               </div>

               <div className="mb-12">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Required Skillset Matrix</h4>
                  <div className="flex flex-wrap gap-3">
                     {job.skills?.map(skill => (
                       <Chip 
                         key={skill} 
                         label={skill} 
                         className="!rounded-2xl !bg-indigo-50 !text-indigo-600 !font-black !uppercase !tracking-widest !py-5 !px-4 !border !border-indigo-100"
                       />
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Strategic Tags</h4>
                  <div className="flex flex-wrap gap-2">
                     {job.tags?.map(tag => (
                       <span key={tag} className="px-4 py-2 rounded-lg bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                          #{tag}
                       </span>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT COLUMN: ACTION PANEL */}
         <div className="space-y-8 sticky top-24">
            
            <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
               
               <h3 className="text-2xl font-black mb-2 tracking-tight">Ready to Deploy?</h3>
               <p className="text-slate-400 font-medium text-sm mb-8 leading-relaxed">Join {job.company?.name || 'Confident Company'} as a {job.title}. Your professional evolution starts here.</p>
               
               <ButtonBase 
                 onClick={() => setIsApplyModalOpen(true)}
                 className="!w-full !rounded-[24px] !bg-indigo-600 !py-6 !font-black !uppercase !tracking-widest !text-white hover:!bg-white hover:!text-slate-900 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3"
               >
                  <FiZap className="fill-current" /> Apply for this position
               </ButtonBase>
               
               <div className="mt-8 flex items-center justify-center gap-4 text-xs font-black text-slate-500 uppercase tracking-[0.15em]">
                  <FiCheckCircle className="text-indigo-400" /> Secure Application
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <FiGlobe className="text-indigo-400" /> Worldwide
               </div>
            </div>

            {/* COMPANY MINI CARD */}
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">About Organization</h4>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                    {job.company?.logo ? (
                       <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                    ) : (
                       <FiBriefcase className="text-slate-200 text-2xl" />
                    )}
                  </div>
                  <div className="min-w-0">
                     <p className="text-lg font-black text-slate-900 leading-tight truncate">{job.company?.name || 'Confident Company'}</p>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{job.location}</p>
                  </div>
               </div>
               
               <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">A leading innovator in various industries, focusing on sustainable growth and exceptional talent acquisition.</p>
               
               <ButtonBase 
                 onClick={() => navigate(`/companies/${job.company?.id || ''}`)}
                 className="!w-full !rounded-2xl !bg-slate-50 !py-4 !text-[11px] !font-black !uppercase !tracking-widest !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 hover:!border-indigo-100 transition-all border border-transparent"
               >
                  Company Intelligence
               </ButtonBase>
            </div>

            {/* QUICK STATS */}
            <div className="bg-indigo-600 rounded-[40px] p-1.5 shadow-lg shadow-indigo-200">
               <div className="bg-white rounded-[38px] p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><FiUsers /></div>
                     <div>
                        <p className="text-lg font-black text-slate-900 leading-none">{job.applicantsCount || 0}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Applying</p>
                     </div>
                  </div>
                  <div className="h-8 w-px bg-slate-100"></div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Status</p>
                     <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">Open</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* RENDER MODAL */}
      {isApplyModalOpen && (
        <ApplyModal 
          job={job} 
          onClose={() => setIsApplyModalOpen(false)} 
        />
      )}

    </div>
  );
};

export default JobDetails;
