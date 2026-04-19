import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiDollarSign, FiBookmark, FiZap, FiBriefcase } from 'react-icons/fi';
import { ButtonBase, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatTimeAgo } from '../../utils/timeAgo';
import { getAssetUrl } from '../../utils/assets';

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:7001/api/jobs/all', {
          params: { sort: 'latest' }
        });
        // Take top 4 for the home page
        setJobs(response.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Jobs</span>
            </h2>
            <p className="text-slate-600 text-lg font-medium">Your next career move is just one click away.</p>
          </div>
          <ButtonBase 
            onClick={() => navigate('/jobs')}
            className="!hidden sm:!inline-flex !rounded-xl !text-indigo-600 !font-black !uppercase !tracking-widest hover:!bg-indigo-50 !px-6 !py-3 !border !border-indigo-100 transition-all"
          >
            Explore Market →
          </ButtonBase>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
             [1,2,3,4].map(i => (
               <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <Skeleton variant="rectangular" height={56} width={56} sx={{ borderRadius: '12px', mb: 4 }} />
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={20} className="mb-4" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="70%" />
               </div>
             ))
          ) : (
            jobs.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
              >
                {/* RELEASE DATE BADGE */}
                <div className="absolute top-4 right-4 text-[9px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                   {formatTimeAgo(job.createdAt)}
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
                    {job.company?.logo ? (
                      <img 
                        src={getAssetUrl(job.company.logo)} 
                        alt={job.company.name} 
                        className="w-full h-full object-contain" 
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=Logo'; }} 
                      />
                    ) : (
                      <FiBriefcase className="text-slate-200 text-2xl" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 uppercase tracking-tight">{job.title}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{job.company?.name || 'Confident Company'}</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-tight">
                    <FiMapPin className="mr-2 text-indigo-400" /> {job.location}
                  </div>
                  <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-tight">
                    <FiClock className="mr-2 text-indigo-400" /> {job.jobType}
                  </div>
                  <div className="flex items-center text-sm font-black text-slate-800">
                    <FiDollarSign className="mr-1 text-emerald-500" /> ₹{(job.salary?.min/100000).toFixed(0)}L - {(job.salary?.max/100000).toFixed(0)}L
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(job.skills || []).slice(0, 2).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>

                <ButtonBase className="!w-full !rounded-xl !bg-slate-900 !text-white hover:!bg-indigo-600 !py-3 !text-[11px] !font-black !uppercase !tracking-widest transition-all shadow-md flex items-center justify-center gap-2">
                  <FiZap className="fill-current" /> Quick Apply
                </ButtonBase>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <ButtonBase 
            onClick={() => navigate('/jobs')}
            className="!rounded-xl !bg-indigo-600 !text-white !px-8 !py-4 !font-black !uppercase !tracking-widest shadow-xl"
          >
            Explore Market →
          </ButtonBase>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;
