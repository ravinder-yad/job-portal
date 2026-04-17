import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiEdit2,
  FiBriefcase,
  FiStar,
  FiPlus,
  FiCheckCircle,
  FiTrendingUp
} from 'react-icons/fi';
import { ButtonBase, Avatar, LinearProgress } from '@mui/material';

const SKILLS = [
  { name: 'React.js Architecture', level: 95, color: 'bg-indigo-500' },
  { name: 'Node.js & Express', level: 88, color: 'bg-emerald-500' },
  { name: 'UI/UX System Design', level: 92, color: 'bg-purple-500' },
  { name: 'TypeScript / Next.js', level: 85, color: 'bg-sky-500' },
];

const EXPERIENCE = [
  { role: 'Senior Frontend Engineer', company: 'TechNova', period: '2022 - Present', desc: 'Leading the flagship dashboard redesign and state management architecture.' },
  { role: 'Product Designer', company: 'CreativeSpace', period: '2020 - 2022', desc: 'Developed the universal design system used by 12+ product teams.' },
];

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-10">
      
      {/* 1. IDENTITY COVER & AVATAR */}
      <div className="relative">
         {/* Cover */}
         <div className="h-64 md:h-80 rounded-[48px] bg-gradient-to-tr from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute top-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
         </div>

         {/* Identity Card Overlay */}
         <div className="px-8 md:px-12 -mt-24 md:-mt-28 relative z-10">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
               
               <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="relative group">
                     <Avatar 
                       src="https://i.pravatar.cc/300?img=12" 
                       sx={{ width: 160, height: 160, border: '8px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                       className="group-hover:scale-105 transition-transform duration-500"
                     />
                     <ButtonBase className="!absolute !bottom-2 !right-2 !bg-indigo-600 !text-white !p-3 !rounded-2xl !shadow-xl hover:!scale-110 !transition-all">
                        <FiEdit2 />
                     </ButtonBase>
                  </div>
                  <div className="pt-4">
                     <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-3">Johnathan <span className="text-indigo-600">Sloane</span></h1>
                     <p className="text-lg font-bold text-slate-500 uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
                        <FiBriefcase className="text-indigo-600" /> Lead Frontend Architect • London, UK
                     </p>
                     <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                        <ButtonBase className="!rounded-xl !bg-slate-50 !p-3.5 !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 transition-all border border-slate-100"><FiLinkedin size={20} /></ButtonBase>
                        <ButtonBase className="!rounded-xl !bg-slate-50 !p-3.5 !text-slate-600 hover:!bg-indigo-50 hover:!text-indigo-600 transition-all border border-slate-100"><FiGithub size={20} /></ButtonBase>
                        <div className="w-px h-10 bg-slate-100 mx-2"></div>
                        <ButtonBase className="!rounded-2xl !bg-slate-900 !text-white !px-8 !font-black !uppercase !tracking-widest !text-[10px] hover:!bg-indigo-600 transition-all shadow-lg shadow-slate-200">View Public CV</ButtonBase>
                     </div>
                  </div>
               </div>

               <div className="bg-indigo-50 rounded-[32px] p-6 text-center border border-indigo-100 min-w-[200px]">
                  <p className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-1">Profile Pulse</p>
                  <p className="text-4xl font-black text-indigo-900 leading-none">85%</p>
                  <span className="text-[10px] font-bold text-indigo-600 mt-2 block">Top 5% Talent</span>
               </div>

            </div>
         </div>
      </div>

      {/* 2. MAIN HUB: BIOGRAPHY & SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Left Column: Details & Experience */}
         <div className="lg:col-span-2 space-y-10">
            
            {/* Biography */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><FiUser size={120} /></div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                  Professional <span className="text-indigo-600">DNA</span>
               </h2>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Passionate Frontend Architect with over 8 years of experience building scalable design systems and high-performance web solutions. Specialized in React ecosystem, micro-frontends, and crafting "pixel-perfect" user experiences that bridge the gap between human intuition and digital complexity. 
               </p>
            </section>

            {/* Experience Timeline */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Career Journey</h2>
                  <ButtonBase className="!rounded-full !bg-slate-50 !p-3 !text-indigo-600 hover:!bg-indigo-50 transition-all"><FiPlus /></ButtonBase>
               </div>
               <div className="space-y-12">
                  {EXPERIENCE.map((exp, index) => (
                    <div key={index} className="flex gap-8 group">
                       <div className="flex flex-col items-center">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                             {exp.company[0]}
                          </div>
                          {index !== EXPERIENCE.length - 1 && <div className="w-1 flex-1 bg-slate-100 my-2 rounded-full"></div>}
                       </div>
                       <div className="pb-4">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{exp.role}</h3>
                          <p className="text-sm font-bold text-slate-500 mt-1">{exp.company} • {exp.period}</p>
                          <p className="mt-4 text-slate-600 font-medium leading-relaxed max-w-xl">{exp.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

         </div>

         {/* Right Column: Skill Matrix & Contact */}
         <div className="space-y-10">
            
            {/* Skill Matrix */}
            <section className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700"><FiTrendingUp size={140} /></div>
               <h2 className="text-xl font-black tracking-tight mb-8">Skill Matrix</h2>
               <div className="space-y-8">
                  {SKILLS.map((skill) => (
                    <div key={skill.name}>
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{skill.name}</span>
                          <span className="text-xs font-black text-indigo-400">{skill.level}%</span>
                       </div>
                       <LinearProgress 
                         variant="determinate" 
                         value={skill.level} 
                         sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: '#6366f1' } }} 
                       />
                    </div>
                  ))}
               </div>
               <ButtonBase className="!w-full !mt-12 !rounded-2xl !bg-white/10 !py-4 !text-[10px] !font-black !uppercase !tracking-widest hover:!bg-white/20 transition-all">
                  Manage Knowledge Base
               </ButtonBase>
            </section>

            {/* Contact Intel */}
            <section className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm">
               <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Communication Info</h2>
               <div className="space-y-6">
                  {[
                    { icon: FiMail, val: 'john.sloane@tech.co' },
                    { icon: FiPhone, val: '+44 020 7946 0852' },
                    { icon: FiMapPin, val: 'Canary Wharf, London' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group cursor-pointer">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-100">
                          <item.icon />
                       </div>
                       <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item.val}</span>
                    </div>
                  ))}
               </div>
            </section>
            
            {/* Profile Boost */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[40px] p-10 text-white shadow-xl flex items-center gap-6 group cursor-pointer transition-all hover:scale-[1.03]">
               <div className="shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"><FiStar className="fill-white" /></div>
               <div>
                  <p className="font-black text-lg leading-tight uppercase tracking-tight">Elite Profile <br/>Certification</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-indigo-200 mt-2 flex items-center gap-1.5">Acquired <FiCheckCircle /></p>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
};

export default Profile;
