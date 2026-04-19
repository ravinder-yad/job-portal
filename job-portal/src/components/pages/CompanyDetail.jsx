import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FiMapPin, FiGlobe, FiBriefcase, FiUsers, 
  FiArrowLeft, FiStar, FiHeart, FiTrendingUp,
  FiClock, FiExternalLink, FiChevronRight
} from 'react-icons/fi';
import { ButtonBase, Avatar, Chip, Skeleton, Divider } from '@mui/material';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Company Info
        const companyRes = await axios.get(`http://localhost:7001/api/companies/${id}`);
        setCompany(companyRes.data);

        // 2. Fetch Jobs for this company (filtering by company name or ID)
        const jobsRes = await axios.get('http://localhost:7001/api/jobs/all', {
          params: { keyword: companyRes.data.name } // Simple filter by name for now
        });
        setJobs(jobsRes.data);
      } catch (err) {
        console.error("Error fetching company intel:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 md:px-8">
       <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '40px' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Skeleton variant="rectangular" height={500} sx={{ borderRadius: '40px' }} />
             <Skeleton variant="rectangular" height={500} sx={{ borderRadius: '40px', gridColumn: 'span 2' }} />
          </div>
       </div>
    </div>
  );

  if (!company) return <div className="p-20 text-center">Company Reconnaissance Failed. Information not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-32">
       
       <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* BACK NAV */}
          <div className="mb-8">
             <ButtonBase 
               onClick={() => navigate(-1)}
               className="!rounded-full !bg-white !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest !text-slate-500 !border !border-slate-100 hover:!bg-slate-50 transition-all flex items-center gap-2"
             >
                <FiArrowLeft /> Return to Market
             </ButtonBase>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
             
             {/* LEFT COLUMN: COMPANY IDENTITY */}
             <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 text-center relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   
                   <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 p-4 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=Logo';
                        }}
                      />
                   </div>
                   
                   <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{company.name}</h1>
                   <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-6">{company.industry}</p>
                   
                   <div className="flex justify-center gap-3 mb-8">
                      <div className="px-4 py-2 rounded-2xl bg-amber-50 text-amber-600 text-xs font-black flex items-center gap-1.5 border border-amber-100">
                         <FiStar className="fill-current" /> {company.rating || '4.5'}
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-600 text-xs font-black flex items-center gap-1.5 border border-emerald-100">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Hiring
                      </div>
                   </div>

                   <div className="space-y-4 text-left border-t border-slate-50 pt-8">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiMapPin /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Hub</p>
                            <p className="text-sm font-bold text-slate-700">{company.location}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiGlobe /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Cyber Endpoint</p>
                            <p className="text-sm font-bold text-indigo-600 truncate">{company.website || 'organization.io'}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiUsers /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Force</p>
                            <p className="text-sm font-bold text-slate-700">{company.size || '500-1000'} Employees</p>
                         </div>
                      </div>
                   </div>
                </motion.div>

                <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                   <h3 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-3"><FiTrendingUp className="text-indigo-400" /> Strategic Impact</h3>
                   <p className="text-slate-400 text-sm leading-relaxed font-medium">A market leader in {company.industry}, committed to excellence and sustainable organizational infrastructure.</p>
                </div>
             </div>

             {/* RIGHT COLUMN: OPEN OPPORTUNITIES */}
             <div className="lg:col-span-2 space-y-12">
                
                {/* BIO / OVERVIEW */}
                <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Mission Directives</h4>
                   <p className="text-slate-600 text-lg font-medium leading-relaxed">
                      {company.description || 'This organization is dedicated to pushing the boundaries of innovation and delivering exceptional value in their sector. They foster a culture of growth, inclusivity, and technical excellence.'}
                   </p>
                </div>

                {/* JOBS LIST */}
                <div>
                   <div className="flex items-center justify-between mb-8">
                      <div>
                         <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-2">Live Vacancies</h2>
                         <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Sourcing Talent for {company.name}</p>
                      </div>
                      <Chip label={`${jobs.length} Active`} className="!bg-indigo-600 !text-white !font-black !uppercase !text-[10px] !tracking-widest" />
                   </div>

                   <div className="space-y-4">
                      {jobs.length === 0 ? (
                         <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No active deployments found for this sector.</p>
                         </div>
                      ) : jobs.map((job, idx) => (
                         <motion.div 
                           key={job._id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer"
                           onClick={() => navigate(`/jobs/${job._id}`)}
                         >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><FiBriefcase size={22} /></div>
                                  <div>
                                     <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{job.title}</h4>
                                     <div className="flex items-center gap-4 mt-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.jobType}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.location}</span>
                                     </div>
                                  </div>
                               </div>
                               <div className="flex items-center gap-6">
                                  <div className="md:text-right">
                                     <p className="text-sm font-black text-slate-900">₹{(job.salary?.min/100000).toFixed(1)}L - {(job.salary?.max/100000).toFixed(1)}L</p>
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CTC Annum</p>
                                  </div>
                                  <ButtonBase className="!w-10 !h-10 !rounded-full !bg-indigo-600 !text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                     <FiChevronRight />
                                  </ButtonBase>
                               </div>
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>

             </div>
          </div>
       </div>

    </div>
  );
};

export default CompanyDetail;
