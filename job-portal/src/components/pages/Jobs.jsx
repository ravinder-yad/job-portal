import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiSearch,
  FiMapPin,
  FiFilter,
  FiHeart,
  FiClock,
  FiZap,
  FiChevronRight,
  FiTrendingUp,
  FiBriefcase,
  FiDollarSign,
  FiX,
  FiLoader,
  FiStar,
  FiCheckCircle
} from 'react-icons/fi';
import { 
  ButtonBase, 
  Slider, 
  Checkbox, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Chip, 
  IconButton, 
  Drawer,
  CircularProgress
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { JobCardSkeleton } from '../common/SkeletonLoaders';
import { ButtonLoader } from '../common/Loader';

const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [searchParams] = useSearchParams();
  
  // Data States
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filter States (initialized from URL if available)
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [salaryRange, setSalaryRange] = useState([0, 2000000]); 
  const [selectedType, setSelectedType] = useState('All');
  const [experience, setExperience] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  // Sticky Search Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsSearchSticky(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // API Fetch Logic
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:7001/api/jobs/all', {
        params: {
          keyword,
          location,
          jobType: selectedType,
          experience,
          minSalary: salaryRange[0],
          maxSalary: salaryRange[1],
          sort: sortBy
        }
      });
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [keyword, location, selectedType, experience, salaryRange, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchJobs();
    }, 500);
    return () => clearTimeout(debounce);
  }, [fetchJobs]);

  const handleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:7001/api/saved', { jobId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Handle success notification
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-8 last:mb-0">
      <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* 1. HERO SEARCH HUB */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dream Career.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12">
                Discover the next step in your professional journey with our AI-powered marketplace.
              </p>
           </motion.div>

           <div className={`max-w-4xl mx-auto transition-all duration-300 ${isSearchSticky ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] z-50 shadow-2xl scale-95' : ''}`}>
              <div className="bg-white rounded-[32px] p-2 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-2">
                 <div className="flex flex-1 items-center px-6 h-14 w-full">
                    <FiSearch className="text-slate-400 mr-4 text-xl" />
                    <input 
                      type="text" 
                      placeholder="Job title, keywords, or skills..." 
                      className="bg-transparent outline-none w-full text-lg font-bold text-slate-700 placeholder:text-slate-400"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                 </div>
                 <div className="hidden md:block w-px h-10 bg-slate-100 mx-2"></div>
                 <div className="flex flex-1 items-center px-6 h-14 w-full">
                    <FiMapPin className="text-slate-400 mr-4 text-xl" />
                    <input 
                      type="text" 
                      placeholder="Location or 'Remote'..." 
                      className="bg-transparent outline-none w-full text-lg font-bold text-slate-700 placeholder:text-slate-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                 </div>
                 <ButtonBase 
                   onClick={fetchJobs}
                   className="!w-full md:!w-auto !rounded-[24px] !bg-indigo-600 !text-white !px-12 !h-14 !font-black !uppercase !tracking-widest hover:!bg-slate-900 transition-all shadow-lg"
                 >
                    Search
                 </ButtonBase>
              </div>
              
              {!isSearchSticky && (
                <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Trending:</span>
                  {['React Developer', 'UI/UX Design', 'Remote Jobs', 'Node.js', 'Fintech'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setKeyword(tag)}
                      className="px-4 py-1.5 rounded-full bg-slate-100/50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white hover:border-indigo-300 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>

      {/* 2. DUAL PANE HUB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Results Info & Mobile Toggle */}
        <div className="flex items-center justify-between mb-10 px-2">
           <div>
              <p className="text-sm font-black text-slate-400 tracking-[0.1em] uppercase">Result Intelligence: <span className="text-slate-900">{jobs.length} Opportunities Identified</span></p>
           </div>
           <div className="flex items-center gap-6 text-sm font-black text-slate-700">
              <div className="hidden md:flex items-center gap-3">
                 <span className="text-slate-400 text-xs uppercase tracking-widest">Sort By:</span>
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-transparent border-none focus:ring-0 cursor-pointer text-indigo-600 font-black uppercase tracking-widest"
                 >
                    <option value="latest">Latest</option>
                    <option value="salary_high">Salary High</option>
                    <option value="salary_low">Salary Low</option>
                    <option value="relevance">Relevance</option>
                 </select>
              </div>
              <ButtonBase 
                onClick={() => setMobileFilterOpen(true)}
                className="lg:!hidden !rounded-2xl !bg-white !border !border-slate-200 !px-4 !py-3 !text-xs !font-black !uppercase !tracking-widest !text-slate-600"
              >
                <FiFilter className="mr-2" /> 
                { (keyword || location || selectedType !== 'All' || experience !== 'All') ? <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span> : null }
                Filters
              </ButtonBase>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT: DESKTOP STICKY FILTER PANEL */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-[64px]">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10"><FiFilter size={100} /></div>
               
               <FilterSection title="Job Type">
                  <div className="flex flex-col gap-2">
                     {['All', 'Full-time', 'Part-time', 'Remote', 'Internship'].map(type => (
                       <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="jobType"
                            checked={selectedType === type}
                            onChange={() => setSelectedType(type)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedType === type ? 'border-indigo-600' : 'border-slate-200 group-hover:border-indigo-300'}`}>
                             {selectedType === type && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                          </div>
                          <span className={`text-sm font-bold transition-all ${selectedType === type ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                            {type}
                          </span>
                       </label>
                     ))}
                  </div>
               </FilterSection>

               <FilterSection title="Salary Range (per annum)">
                  <div className="px-2 mt-4">
                    <Slider 
                      value={salaryRange} 
                      onChange={(e, val) => setSalaryRange(val)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={5000000}
                      step={100000}
                      sx={{ color: '#4f46e5' }}
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">
                      <span>₹0</span>
                      <span>₹{salaryRange[1]/100000}L+</span>
                    </div>
                  </div>
               </FilterSection>

               <FilterSection title="Experience">
                  <div className="flex flex-col gap-2">
                     {['All', 'Fresher', '1-3 years', '3-5 years', '5+ years'].map(lvl => (
                       <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="experience"
                            checked={experience === lvl}
                            onChange={() => setExperience(lvl)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${experience === lvl ? 'border-indigo-600' : 'border-slate-200 group-hover:border-indigo-300'}`}>
                             {experience === lvl && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                          </div>
                          <span className={`text-sm font-bold transition-all ${experience === lvl ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                            {lvl}
                          </span>
                       </label>
                     ))}
                  </div>
               </FilterSection>

               <ButtonBase 
                 onClick={() => {
                   setKeyword('');
                   setLocation('');
                   setSelectedType('All');
                   setExperience('All');
                   setSalaryRange([0, 5000000]);
                 }}
                 className="!w-full !mt-8 !py-4 !rounded-2xl !bg-slate-50 !border !border-slate-100 !text-xs !font-black !uppercase !tracking-widest !text-slate-400 hover:!text-rose-500 hover:!bg-rose-50 hover:!border-rose-100 transition-all"
               >
                  Reset Framework
               </ButtonBase>
            </div>
          </aside>

          {/* RIGHT: JOB STREAM FEED */}
          <div className="flex-1 w-full relative">
            
            {loading && jobs.length === 0 && (
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 text-center text-rose-500">
                <FiX className="mx-auto mb-4 text-4xl" />
                <p className="font-bold">{error}</p>
                <button onClick={fetchJobs} className="mt-4 text-xs font-black uppercase underline tracking-widest">Retry Connection</button>
              </div>
            )}

            {!loading && jobs.length === 0 && (
              <div className="bg-white rounded-[40px] border border-slate-100 p-20 text-center shadow-sm">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-6">
                    <FiSearch size={48} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">No Matching Intel</h3>
                 <p className="text-slate-400 font-medium">Try adjusting your filters or search terms.</p>
              </div>
            )}

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-[32px] p-6 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative cursor-pointer"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    {/* Top Layer: Logo + Title + Action */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex gap-6 items-start">
                         {/* Logo Section */}
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-500 shadow-sm shrink-0">
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
                            <FiBriefcase className="text-slate-300 text-2xl" />
                          )}
                        </div>

                        {/* Title & Stats Section */}
                        <div className="flex-1 min-w-0">
                           <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate max-w-[200px] sm:max-w-md">
                                {job.title}
                              </h3>
                              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                                 {(() => {
                                    if (!user?.skills || !job.skills) return '85%';
                                    const userSkills = user.skills.map(s => s.toLowerCase());
                                    const matched = job.skills.filter(s => userSkills.includes(s.toLowerCase())).length;
                                    const percent = Math.floor((matched / Math.max(job.skills.length, 1)) * 100);
                                    return `${Math.max(percent, 60)}%`;
                                 })()} Match
                              </span>
                           </div>

                           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                              <span className="text-indigo-600 font-extrabold">{job.company?.name || 'Confident Company'}</span>
                              <span className="flex items-center gap-1.5"><FiMapPin className="text-slate-300" /> {job.location}</span>
                              <span className="flex items-center gap-1.5"><FiBriefcase className="text-slate-300" /> {job.jobType}</span>
                           </div>
                        </div>
                      </div>

                      {/* Right Section: Salary & Apply */}
                      <div className="flex items-center md:items-start justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                         <div className="md:text-right">
                            <p className="text-lg font-black text-slate-900 tracking-tight leading-none">
                               ₹{(job.salary?.min/100000).toFixed(0)}L - ₹{(job.salary?.max/100000).toFixed(0)}L
                            </p>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-1 hover:text-indigo-400 transition-colors">CTC Per Annum</span>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            <ButtonBase 
                              className="!rounded-2xl !bg-slate-900 !text-white !px-6 !py-3 !text-[11px] !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-md flex items-center gap-2 group/btn shrink-0"
                            >
                               <FiZap className="fill-white" /> Apply Now
                            </ButtonBase>
                            <div 
                              className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all cursor-pointer shadow-sm shrink-0" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveJob(job._id);
                              }}
                            >
                               <FiHeart size={18} />
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* Footer Layer: Skills + Badges */}
                    <div className="mt-6 pt-5 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                       <div className="flex flex-wrap gap-2">
                          {(job.skills || []).slice(0, 3).map(skill => (
                            <span key={skill} className="px-3 py-1 rounded-lg bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                               {skill}
                            </span>
                          ))}
                          {job.skills?.length > 3 && (
                            <span className="px-3 py-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                              +{job.skills.length - 3} More
                            </span>
                          )}
                       </div>

                       <div className="flex items-center gap-4">
                          {job.applicantsCount > 10 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {job.applicantsCount} Applicants
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                             <FiClock /> {new Date(job.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                             <FiChevronRight size={16} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Logic Placeholder */}
            {jobs.length > 0 && (
              <div className="py-16 flex flex-col items-center gap-4">
                 <ButtonLoader 
                   loading={loading}
                   className="!rounded-[24px] !bg-white !border !border-slate-200 !px-12 !py-5 !font-black !uppercase !tracking-widest !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 hover:!border-indigo-100 transition-all shadow-sm"
                 >
                    Load More Inventory
                 </ButtonLoader>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discovery Engine Ready</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        anchor="bottom"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{
          sx: { borderRadius: '40px 40px 0 0', height: '80vh', p: 4 }
        }}
      >
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Filters</h3>
           <IconButton onClick={() => setMobileFilterOpen(false)} className="!bg-slate-100"><FiX /></IconButton>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-12">
           <FilterSection title="Salary Expectation">
              <Slider 
                value={salaryRange} 
                onChange={(e, val) => setSalaryRange(val)} 
                min={0}
                max={5000000}
                step={100000}
                sx={{ color: '#4f46e5' }} 
              />
           </FilterSection>

           <FilterSection title="Employment Mode">
              <div className="grid grid-cols-2 gap-3">
                 {['All', 'Full-time', 'Part-time', 'Remote', 'Internship'].map(type => (
                   <ButtonBase
                     key={type}
                     onClick={() => setSelectedType(type)}
                     className={`!rounded-2xl !py-4 !border !text-[10px] !font-black !uppercase !tracking-widest transition-all ${selectedType === type ? '!bg-indigo-600 !text-white !border-indigo-600' : '!bg-white !text-slate-400 !border-slate-100'}`}
                   >
                     {type}
                   </ButtonBase>
                 ))}
              </div>
           </FilterSection>

           <FilterSection title="Experience Level">
              <div className="grid grid-cols-2 gap-3">
                 {['All', 'Fresher', '1-3 years', '3-5 years', '5+ years'].map(lvl => (
                   <ButtonBase
                     key={lvl}
                     onClick={() => setExperience(lvl)}
                     className={`!rounded-2xl !py-4 !border !text-[10px] !font-black !uppercase !tracking-widest transition-all ${experience === lvl ? '!bg-indigo-600 !text-white !border-indigo-600' : '!bg-white !text-slate-400 !border-slate-100'}`}
                   >
                     {lvl}
                   </ButtonBase>
                 ))}
              </div>
           </FilterSection>
        </div>

        <ButtonBase 
          onClick={() => setMobileFilterOpen(false)}
          className="!w-full !mt-8 !rounded-[32px] !bg-slate-900 !text-white !py-6 !font-black !uppercase !tracking-widest shadow-2xl"
        >
           Apply Strategic Configuration
        </ButtonBase>
      </Drawer>

    </div>
  );
};

export default Jobs;
