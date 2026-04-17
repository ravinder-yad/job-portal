import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiBookmark,
  FiShare2,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiZap,
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { ButtonBase, IconButton, Chip, Divider } from '@mui/material';

// Dummy Data (In production, this would come from an API based on ID)
const JOB_DETAILS = {
  id: 1,
  title: 'Senior Frontend Engineer',
  company: 'TechNova Innovations',
  location: 'Remote, US',
  salary: '₹12L - ₹18L',
  type: 'Full-time',
  posted: '2 hours ago',
  match: 94,
  experience: '5-8 Years',
  applicants: 124,
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcBmJYUYj67mXeSfDXSDJ5Q8TpVUbAsmQpg&s',
  description: `We are looking for a Senior Frontend Engineer to lead our core product team. You will work with React, TypeScript, and modern CSS frameworks like Tailwind to build high-performance dashboard components. 

You should be passionate about building pixel-perfect UI and scalable frontend architectures. You will collaborate closely with product managers and designers to bridge the gap between human intuition and digital complexity.`,
  requirements: [
    '5+ years of experience with React.js and modern state management (Zustand, Redux).',
    'Strong proficiency in TypeScript and ES6+ features.',
    'Experience building responsive designs with Tailwind CSS or CSS Modules.',
    'Knowledge of unit testing (Jest, React Testing Library).',
    'Familiarity with CI/CD pipelines and deployment strategies.'
  ],
  benefits: [
    '100% Remote Work Culture',
    'Comprehensive Health Insurance (Family included)',
    'Stock Options (ESOPs)',
    'Annual Performance Bonus & Learning Stipend',
    'Latest MacBook Pro & Desk Setup Budget'
  ],
  companyInfo: {
    about: 'TechNova is a global leader in AI-driven productivity tools. We empower 10M+ users with intelligent automation and seamless collaboration interfaces.',
    size: '500+ Employees',
    website: 'https://technova.ai',
    founded: '2016'
  }
};

const SIMILAR_JOBS = [
  { id: 2, title: 'UI/UX Lead', company: 'CreativeSpace', location: 'New York', logo: 'https://cdn6.f-cdn.com/contestentries/1735047/31130405/5e4f6d2ad7797_thumbCard.jpg' },
  { id: 3, title: 'Product Designer', company: 'Visionary', location: 'London', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_ojNN3vgVBwwpK8_EbDKwyCqdHTrrmMt6A&s' },
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(JOB_DETAILS); // Simulated fetch

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. MINIMAL STICKY HEADER CAPABLE */}
      <div className="bg-slate-50 border-b border-slate-100 py-4 top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
           <ButtonBase 
             onClick={() => navigate('/jobs')}
             className="!rounded-xl !px-4 !py-2 !text-slate-500 hover:!text-slate-900 transition-all flex items-center gap-2 group"
           >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-xs font-black uppercase tracking-widest">Back to Inventory</span>
           </ButtonBase>
           <div className="flex gap-2">
              <IconButton size="small" className="!bg-white !border !border-slate-100"><FiShare2 size={16} /></IconButton>
              <IconButton size="small" className="!bg-white !border !border-slate-100"><FiBookmark size={16} /></IconButton>
           </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="bg-slate-50 pb-20 pt-10 px-4">
        <div className="max-w-7xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col md:flex-row items-start md:items-center gap-10"
           >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-white border border-slate-100 p-6 shadow-2xl shadow-indigo-500/5 rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center overflow-hidden">
                 <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">{job.title}</h1>
                    <Chip label={`${job.match}% MATCH`} className="!bg-indigo-600 !text-white !font-black !text-[10px] !rounded-lg !px-2" />
                 </div>
                 <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-500 font-bold">
                    <span className="text-indigo-600 text-lg">{job.company}</span>
                    <span className="flex items-center gap-2"><FiMapPin className="text-slate-400" /> {job.location}</span>
                    <span className="flex items-center gap-2"><FiClock className="text-slate-400" /> Posted {job.posted}</span>
                    <span className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg text-xs font-black">
                       <FiUsers className="mr-1" /> {job.applicants} Applicants
                    </span>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* 3. DUAL COLUMN DETAILS HUB */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
           
           {/* LEFT: MAIN CONTENT */}
           <div className="flex-1 space-y-12">
              
              <div className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-sm">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-8 pb-4 border-b border-slate-50">Role Perspective</h2>
                 <p className="text-xl text-slate-600 leading-[1.8] font-medium whitespace-pre-line">
                    {job.description}
                 </p>
              </div>

              <div className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-sm">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-10 flex items-center gap-3">
                    Minimum Intel Required <FiTrendingUp className="text-indigo-600" />
                 </h2>
                 <div className="space-y-6">
                    {job.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                         <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <FiCheckCircle size={20} />
                         </div>
                         <p className="text-lg font-bold text-slate-700 leading-snug">{req}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-[40px] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden group">
                 <FiZap className="absolute top-1/2 right-0 -translate-y-1/2 text-white/5 text-[200px] group-hover:rotate-12 transition-transform duration-700" />
                 <h2 className="text-2xl font-black tracking-tight uppercase mb-12 relative z-10">Vault Benefits</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {job.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-300 font-bold group/item">
                         <div className="p-2 rounded-lg bg-white/10 text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                           <FiZap size={14} />
                         </div>
                         <span>{benefit}</span>
                      </div>
                    ))}
                 </div>
              </div>

           </div>

           {/* RIGHT: STICKY SIDEBAR */}
           <aside className="w-full lg:w-[420px] shrink-0 sticky top-[100px] space-y-8">
              
              {/* PRIMARY APPLY CARD */}
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="mb-10 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                       <FiDollarSign className="text-indigo-600" /> Estimated Reward
                    </p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">{job.salary}</p>
                    <Chip label="High-Demand Role" size="small" className="!mt-4 !bg-rose-50 !text-rose-500 !font-black !text-[9px] !rounded-lg" />
                 </div>

                 <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiBriefcase /> Tenure</span>
                       <span className="text-sm font-black text-slate-900">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiTrendingUp /> Experience</span>
                       <span className="text-sm font-black text-slate-900">{job.experience}</span>
                    </div>
                 </div>

                 <ButtonBase className="!w-full !rounded-[24px] !bg-slate-900 !text-white !py-5 !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    <FiZap className="fill-white" /> Easy Apply Now
                 </ButtonBase>
                 <ButtonBase className="!w-full !mt-3 !rounded-[24px] !bg-white !text-slate-900 !py-5 !font-black !uppercase !tracking-widest !border-2 !border-slate-900 hover:!bg-slate-50 transition-all">
                    Save to Vault
                 </ButtonBase>

                 <p className="mt-8 text-[10px] text-center font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <FiAlertCircle className="text-amber-500" /> Apply before expiration
                 </p>
              </div>

              {/* COMPANY INTEL CARD */}
              <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Company Intelligence</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center">
                       <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                       <p className="font-black text-slate-900 uppercase tracking-tight">{job.company}</p>
                       <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5"><FiGlobe /> technova.ai</p>
                    </div>
                 </div>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                    {job.companyInfo.about}
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Size</p>
                       <p className="text-[10px] font-black text-slate-900">{job.companyInfo.size}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Founded</p>
                       <p className="text-[10px] font-black text-slate-900">{job.companyInfo.founded}</p>
                    </div>
                 </div>
              </div>

              {/* SIMILAR JOBS FEED */}
              <div className="space-y-4">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest ml-4">Similar Flow</h3>
                 {SIMILAR_JOBS.map(s => (
                   <ButtonBase 
                     key={s.id} 
                     onClick={() => navigate(`/jobs/${s.id}`)}
                     className="!w-full !bg-white !rounded-3xl !p-6 !border !border-slate-100 hover:!border-indigo-100 hover:!shadow-lg transition-all !justify-start !text-left group"
                   >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <img src={s.logo} alt={s.company} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                           <p className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">{s.title}</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.company} • {s.location}</p>
                        </div>
                      </div>
                   </ButtonBase>
                 ))}
              </div>

           </aside>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;
