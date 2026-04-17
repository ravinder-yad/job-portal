import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiHeart, FiBriefcase, FiExternalLink } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const [following, setFollowing] = useState(company.isFollowing);
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      // onClick={() => navigate(`/companies/${company.id}`)}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
    >
      {/* Top badges */}
      <div className="absolute top-4 right-4 flex gap-2">
        {company.hiringNow && (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
            Hiring Now
          </span>
        )}
      </div>

      {/* Header Info */}
      <div className="flex items-start gap-4 mb-4 mt-2">
        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 shrink-0 group-hover:scale-105 transition-transform">
          <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{company.name}</h3>
          <p className="text-sm font-medium text-slate-500 mt-0.5">{company.industry}</p>
        </div>
      </div>

      {/* Location & Rating */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center text-sm text-slate-600 font-medium">
          <FiMapPin className="mr-1.5 text-slate-400" /> {company.location}
        </div>
        <div className="flex items-center text-sm font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md">
          <FiStar className="mr-1 text-amber-500 fill-amber-500" /> {company.rating}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6 flex-grow">
        {company.tagline}
      </p>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
        <div className="flex items-center text-sm font-bold text-indigo-600">
          <FiBriefcase className="mr-2" /> {company.openJobs} Openings
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); setFollowing(!following); }}
          className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center border transition-all ${
            following 
              ? 'bg-red-50 text-red-500 border-red-100' 
              : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <FiHeart className={`mr-2 ${following ? 'fill-current' : ''}`} /> {following ? 'Following' : 'Follow'}
        </button>
      </div>

    </motion.div>
  );
};

export default CompanyCard;
