import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiDollarSign, FiBookmark, FiZap, FiTarget, FiBarChart2 } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';

const JobCard = ({ job, viewMode = 'list' }) => {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const isGrid = viewMode === 'grid';
  // Fallback description
  const description = job.description || "We are looking for a highly motivated individual to join our team and make an impact. You will work closely with cross-functional teams to deliver excellent results.";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/jobs/${job.id}`)}
      className={`bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col gap-4 relative overflow-hidden`}
    >
      {/* 🔹 Top Row: Logo, Title, Save */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform shrink-0 shadow-sm">
            <img src={job.logo} alt={job.company} className="w-full h-full object-contain mix-blend-multiply" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-slate-500">{job.company}</p>
          </div>
        </div>
        
        {/* Save button (Top Right) */}
        <button 
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className="p-2 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors shrink-0"
        >
          <FiBookmark className={`text-xl ${saved ? 'fill-current text-red-500' : ''}`} />
        </button>
      </div>
      
      {/* 🔹 Middle Info: Location, Salary, Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-1">
        <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          <FiMapPin className="mr-1.5 text-slate-400" /> {job.location}
        </div>
        <div className="flex items-center text-sm font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          <FiDollarSign className="mr-1 text-indigo-500" /> {job.salary}
        </div>
        
        {/* Pro features */}
        {job.match && (
           <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
             <FiTarget className="mr-1" /> {job.match}% Match
           </span>
        )}
      </div>

      {/* 🔹 Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-indigo-50/50 text-indigo-600 hover:bg-indigo-50 transition-colors text-xs font-semibold rounded-full border border-indigo-100/50">
            {tag}
          </span>
        ))}
        {job.easyApply && (
          <span className="px-3 py-1 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold rounded-full flex items-center shadow-sm">
            <FiZap className="mr-1 fill-current" /> Easy Apply
          </span>
        )}
        {(job.id % 2 === 0) && (
          <span className="px-3 py-1 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-full flex items-center shadow-sm">
            <FiBarChart2 className="mr-1" /> Actively Hiring
          </span>
        )}
      </div>

      {/* 🔹 Description (2 lines max fade) */}
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1">
        {description}
      </p>

      {/* 🔹 Bottom Row */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <span className="text-xs font-semibold text-slate-400 flex items-center">
          <FiClock className="mr-1.5" /> {job.postedAt}
        </span>
        <ButtonBase className="!rounded-lg !bg-gray-900 !text-white hover:!bg-indigo-600 !py-2 !px-5 !text-sm !font-bold transition-all shadow-sm">
          Apply
        </ButtonBase>
      </div>

    </motion.div>
  );
};

export default JobCard;
