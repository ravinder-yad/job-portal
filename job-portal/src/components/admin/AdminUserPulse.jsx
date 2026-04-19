import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FiArrowLeft, FiUser, FiBriefcase, FiHeart, 
  FiMail, FiPhone, FiMapPin, FiCalendar,
  FiActivity, FiCheckCircle, FiFileText, FiLink
} from 'react-icons/fi';
import { Avatar, ButtonBase, Chip, Divider, Skeleton } from '@mui/material';
import { getAssetUrl } from '../../utils/assets';

const AdminUserPulse = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Applications');

  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7001/api/applications/admin/user-stats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching user stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStats();
  }, [userId]);

  if (loading) return (
    <div className="p-8 max-w-6xl mx-auto">
       <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '40px', mb: 4 }} />
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '40px' }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '40px', gridColumn: 'span 2' }} />
       </div>
    </div>
  );

  if (!data) return <div className="p-20 text-center">User Intel Not Found.</div>;

  const { user, applications, saved, appliedCount, savedCount } = data;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50">
      
      {/* 1. TOP NAVIGATION */}
      <div className="max-w-7xl mx-auto mb-8">
         <ButtonBase 
           onClick={() => navigate(-1)}
           className="!rounded-full !bg-white !px-6 !py-3 !text-xs !font-black !uppercase !tracking-widest !text-slate-600 !border !border-slate-200 hover:!bg-slate-50 transition-all flex items-center gap-2"
         >
            <FiArrowLeft /> Back to Command Center
         </ButtonBase>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
         
         {/* LEFT COLUMN: IDENTITY PROFILE */}
         <div className="space-y-8">
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               
               <Avatar 
                 src={getAssetUrl(user.profileImage)}
                 sx={{ width: 120, height: 120, bgcolor: '#4f46e5', fontWeight: 900, mx: 'auto', mb: 4, border: '6px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
               >
                  {user.name?.charAt(0).toUpperCase()}
               </Avatar>
               
               <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{user.name}</h2>
               <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">{user.role || 'Career Seeker'}</p>
               
               <div className="flex justify-center gap-2 mb-8">
                  <Chip label={`${appliedCount} Applications`} className="!bg-slate-900 !text-white !font-black !uppercase !text-[10px] !tracking-widest" />
                  <Chip label={`${savedCount} Saved`} className="!bg-rose-50 !text-rose-600 !font-black !uppercase !text-[10px] !tracking-widest" />
               </div>

               <div className="space-y-4 text-left border-t border-slate-50 pt-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiMail /></div>
                     <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Intelligence Endpoint</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{user.email}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiPhone /></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Phone Liaison</p>
                        <p className="text-sm font-bold text-slate-700">{user.phone || 'Not Shared'}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiMapPin /></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Primary Sector</p>
                        <p className="text-sm font-bold text-slate-700">{user.location || 'Global/Remote'}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-8 text-white">
               <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                  <FiActivity className="text-indigo-400" /> Professional DNA
               </h3>
               <div className="space-y-6">
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Skills Matrix</p>
                     <div className="flex flex-wrap gap-2">
                        {user.skills?.map(skill => (
                          <span key={skill} className="px-3 py-1 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/5">
                             {skill}
                          </span>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Bio Briefing</p>
                     <p className="text-xs text-slate-400 leading-relaxed italic">{user.bio || 'Tactical operative with no established narrative yet.'}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT COLUMN: ACTIVITY ENGINE */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[48px] p-4 border border-slate-100 shadow-sm">
               <div className="flex p-2 gap-2 bg-slate-50/50 rounded-[32px]">
                  {['Applications', 'Saved Pipeline'].map(tab => (
                    <ButtonBase 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`!flex-1 !rounded-[24px] !py-4 !text-[11px] !font-black !uppercase !tracking-[0.2em] !transition-all ${activeTab === tab ? '!bg-white !text-slate-900 !shadow-lg' : '!text-slate-400 hover:!text-slate-600'}`}
                    >
                      {tab}
                    </ButtonBase>
                  ))}
               </div>
            </div>

            <AnimatePresence mode='wait'>
               {activeTab === 'Applications' ? (
                 <motion.div 
                   key="apps"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="space-y-6"
                 >
                    {applications.length === 0 ? (
                      <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                         <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No active deployments identified.</p>
                      </div>
                    ) : applications.map(app => (
                      <div key={app._id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black"><FiBriefcase size={28} /></div>
                               <div>
                                  <h4 className="text-xl font-black text-slate-900 truncate max-w-xs">{app.job?.title}</h4>
                                  <div className="flex items-center gap-4 mt-1">
                                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{app.job?.company?.name || 'Company Intel'}</span>
                                     <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                     <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{app.status}</span>
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <ButtonBase 
                                 href={getAssetUrl(app.resume)}
                                 target="_blank"
                                 className="!rounded-2xl !bg-slate-50 !px-5 !py-3 !text-[10px] !font-black !uppercase !tracking-widest !text-slate-500 hover:!bg-slate-900 hover:!text-white transition-all flex items-center gap-2"
                               >
                                  <FiFileText /> Resume
                               </ButtonBase>
                               <ButtonBase 
                                 onClick={() => navigate(`/jobs/${app.job?._id}`)}
                                 className="!rounded-full !w-12 !h-12 !bg-indigo-600 !text-white hover:!scale-110 !transition-all shadow-lg shadow-indigo-200"
                               >
                                  <FiLink />
                               </ButtonBase>
                            </div>
                         </div>
                      </div>
                    ))}
                 </motion.div>
               ) : (
                 <motion.div 
                   key="saved"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="grid grid-cols-1 md:grid-cols-2 gap-6"
                 >
                    {saved.length === 0 ? (
                      <div className="col-span-2 bg-white rounded-[40px] p-20 text-center border border-dashed border-slate-200">
                         <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Pipeline monitoring: Zero targets locked.</p>
                      </div>
                    ) : saved.map(item => (
                      <div key={item._id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                         <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500"><FiHeart /></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{new Date(item.createdAt).toLocaleDateString()}</span>
                         </div>
                         <h5 className="text-lg font-black text-slate-900 leading-tight mb-1">{item.job?.title}</h5>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{item.job?.company?.name || 'Confident Company'}</p>
                         <ButtonBase 
                           onClick={() => navigate(`/jobs/${item.job?._id}`)}
                           className="!w-full !rounded-2xl !bg-slate-50 !py-3 !text-[9px] !font-black !uppercase !tracking-widest !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 transition-all border border-transparent"
                         >
                            Open Intelligence
                         </ButtonBase>
                      </div>
                    ))}
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

    </div>
  );
};

export default AdminUserPulse;
