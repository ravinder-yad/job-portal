import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-white font-sans mt-[88px] md:mt-0">
      
      {/* LEFT SIDE (Visual) - Hidden on Mobile */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative flex-col justify-center px-12 xl:px-24 overflow-hidden">
        
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20">
              J
             </div>
             <span className="text-2xl font-extrabold tracking-tight">Jobify</span>
          </Link>
          
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            {title || "Welcome to Your Future 🚀"}
          </h1>
          <p className="text-indigo-200 text-xl font-medium max-w-md leading-relaxed">
            {subtitle || "Find jobs that match your dreams and build a career you love."}
          </p>

          {/* Decorative stats/badges that represent the "ecosystem" */}
          <div className="mt-16 flex gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-[200px]">
              <div className="text-3xl font-black mb-1">10k+</div>
              <div className="text-sm text-indigo-200 font-medium leading-snug">Companies hiring right now</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-[200px] translate-y-6">
              <div className="text-3xl font-black mb-1">85%</div>
              <div className="text-sm text-indigo-200 font-medium leading-snug">Average placement success rate</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>

    </div>
  );
};

export default AuthLayout;
