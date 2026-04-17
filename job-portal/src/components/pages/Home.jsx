import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiCode, FiTrendingUp } from 'react-icons/fi';
import { ButtonBase, Avatar, AvatarGroup } from '@mui/material';

// Import new sections
import FeaturedJobs from '../home/FeaturedJobs';
import JobCategories from '../home/JobCategories';
import HowItWorks from '../home/HowItWorks';
import CTASection from '../home/CTASection';

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden bg-white">
        {/* Background blur effects */}
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 md:w-96 h-72 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* LEFT CONTENT */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              AI Job Match Enabled
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Build Your Career,<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600"> Not Just a Resume.</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              Discover jobs that match your skills, passion, and ambition. Connect with top companies and rewrite your future.
            </p>

            {/* Search Box */}
            <div className={`bg-white p-2 rounded-[2rem] border transition-all duration-300 flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto lg:mx-0 relative z-20 ${isFocused ? 'shadow-[0_8px_30px_rgb(79,70,229,0.15)] border-indigo-200' : 'shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-gray-100'}`}>
              <div className="flex items-center flex-1 w-full pl-4 h-12">
                 <FiSearch className="text-gray-400 mr-3 text-lg" />
                 <input 
                   type="text" 
                   placeholder="Job title, skills, or company" 
                   className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)} 
                 />
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-gray-200"></div>
              <div className="flex items-center flex-1 w-full pl-4 h-12 border-t border-gray-100 sm:border-0 pt-2 sm:pt-0">
                 <FiMapPin className="text-gray-400 mr-3 text-lg" />
                 <input 
                   type="text" 
                   placeholder="Location or 'Remote'" 
                   className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)} 
                 />
              </div>
              <ButtonBase className="!w-full sm:!w-auto !rounded-full !bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !h-12 !px-8 !font-semibold hover:!scale-[1.02] hover:!shadow-lg hover:!shadow-indigo-500/40 transition-all !mt-2 sm:!mt-0 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-indigo-500">
                 Find Jobs
              </ButtonBase>
            </div>

            {/* Popular Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-gray-500">
              <span className="font-medium mr-2 text-gray-600">Trending:</span>
              {['React', 'Remote', 'UI/UX Designer', 'Fresher', 'Python'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-50/80 hover:bg-white hover:text-indigo-600 border border-gray-200 rounded-full cursor-pointer transition-all hover:shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Trust Element & Secondary CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
               <div className="flex items-center gap-4">
                 <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 44, height: 44, border: '2px solid white' } }}>
                   <Avatar src="https://i.pravatar.cc/100?img=1" />
                   <Avatar src="https://i.pravatar.cc/100?img=2" />
                   <Avatar src="https://i.pravatar.cc/100?img=3" />
                   <Avatar src="https://i.pravatar.cc/100?img=4" />
                   <Avatar src="https://i.pravatar.cc/100?img=5" />
                 </AvatarGroup>
                 <div className="text-sm font-medium text-slate-700 text-left">
                   <span className="font-extrabold text-indigo-600 text-lg leading-none">10,000+</span><br/>
                   professionals hired
                 </div>
               </div>
               
               {/* Secondary CTA */}
               <div className="sm:ml-auto lg:ml-8 w-full sm:w-auto">
                 <ButtonBase className="!w-full sm:!w-auto !rounded-xl !border-2 !border-gray-200 !text-gray-700 !px-6 !py-3 !font-semibold hover:!border-indigo-600 hover:!text-indigo-700 hover:!bg-indigo-50/50 transition-all">
                   Upload Resume
                 </ButtonBase>
               </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto lg:mt-0"
          >
             {/* Visual Circle Wrapper */}
             <div className="relative aspect-square rounded-[3rem] sm:rounded-full bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50 mx-auto w-full max-w-[450px] lg:max-w-[500px] shadow-2xl overflow-hidden group border-[8px] border-white/80 backdrop-blur-sm">
               <motion.img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                 alt="Professional Woman"
                 className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-110"
                 initial={{ scale: 1.1 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 1.2 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent opacity-80"></div>
             </div>

             {/* Floating Icons */}
             <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 -left-2 md:-left-8 bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-3 backdrop-blur-md"
             >
               <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                 <FiBriefcase />
               </div>
               <div>
                 <p className="text-xs text-gray-500 font-medium">New Jobs</p>
                 <p className="text-sm font-bold text-gray-800">5k+ Today</p>
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 20, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-16 -right-2 md:-right-8 bg-white/90 p-4 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-3 backdrop-blur-md"
             >
               <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                 <FiTrendingUp />
               </div>
               <div>
                 <p className="text-xs text-gray-500 font-medium">Remote Roles</p>
                 <p className="text-sm font-bold text-gray-800">Going Fast 🔥</p>
               </div>
             </motion.div>
             
             <motion.div 
               animate={{ x: [0, 15, 0], rotate: [0, 10, 0] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -top-4 right-10 md:right-20 bg-white/90 p-3.5 rounded-full shadow-lg border border-white/50 hidden sm:flex items-center justify-center text-indigo-600 text-2xl backdrop-blur-md"
             >
               <FiCode />
             </motion.div>

          </motion.div>

        </div>
      </div>

      {/* 2. FEATURED JOBS */}
      <FeaturedJobs />

      {/* 3. JOB CATEGORIES */}
      <JobCategories />

      {/* 4. HOW IT WORKS */}
      <HowItWorks />

      {/* 5. CTA SECTION */}
      <CTASection />

    </>
  );
};

export default Home;
