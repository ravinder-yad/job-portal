import React from 'react';
import { motion } from 'framer-motion';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900 z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-8 leading-tight"
        >
          Ready to leap into your next <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">great adventure?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
        >
          Join thousands of professionals who have already found their dream tech jobs. Create your profile today and get discovered.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <ButtonBase 
            onClick={() => navigate('/jobs')}
            className="!w-full sm:!w-auto !rounded-full !bg-white !text-indigo-900 !px-8 !py-4 !text-lg !font-bold hover:!scale-105 hover:!shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
          >
            Find Jobs Now
          </ButtonBase>
          <ButtonBase 
            onClick={() => navigate('/profile')}
            className="!w-full sm:!w-auto !rounded-full border-2 !border-white/20 !text-white !px-8 !py-4 !text-lg !font-bold hover:!bg-white/10 hover:!border-white/30 transition-all"
          >
            Upload Your Resume
          </ButtonBase>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
