import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiChevronRight,
  FiFilter,
  FiSearch,
  FiArrowRight,
  FiFileText
} from 'react-icons/fi';
import { ButtonBase, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled } from '@mui/material';

// Styled Connector for the Timeline
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#4f46e5',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#4f46e5',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#e2e8f0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const APPS_DATA = [
  { 
    id: 1, 
    title: 'Senior Frontend Architect', 
    company: 'TechNova', 
    location: 'Remote', 
    date: 'Oct 12, 2026', 
    status: 'Interview', 
    step: 2,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcBmJYUYj67mXeSfDXSDJ5Q8TpVUbAsmQpg&s'
  },
  { 
    id: 2, 
    title: 'UX/UI Design Lead', 
    company: 'CreativeSpace', 
    location: 'New York', 
    date: 'Oct 08, 2026', 
    status: 'In Review', 
    step: 1,
    logo: 'https://cdn6.f-cdn.com/contestentries/1735047/31130405/5e4f6d2ad7797_thumbCard.jpg'
  },
  { 
    id: 3, 
    title: 'Full Stack Engineer', 
    company: 'DataFlow', 
    location: 'San Francisco', 
    date: 'Oct 02, 2026', 
    status: 'Rejected', 
    step: 1,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhc2CFE2uqCXv3fnsj4i2bOiACOEgrDDnzpA&s'
  },
];

const steps = ['Applied', 'Review', 'Interview', 'Decision'];

const AppliedJobs = () => {
  return (
    <div className="space-y-10 pb-20">
      {/* 1. TRACKING HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Real-time Tracking
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">Application <span className="text-indigo-600">Terminal</span></h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl leading-relaxed">
            Monitor your career trajectory. High-fidelity tracking for every opportunity you've claimed.
          </p>
        </motion.div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
           <div className="px-5 py-2 text-center border-r border-slate-100">
              <p className="text-xl font-black text-slate-900 leading-none">42</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Submitted</p>
           </div>
           <div className="px-5 py-2 text-center">
              <p className="text-xl font-black text-indigo-600 leading-none">08</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Active Flow</p>
           </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER HUB */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-3 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
          <FiSearch className="text-slate-400 mr-3" />
          <input type="text" placeholder="Filter by company or role..." className="bg-transparent outline-none w-full text-sm font-bold text-slate-700" />
        </div>
        <div className="flex gap-2">
          {['Active', 'Review', 'Archive'].map(tab => (
            <ButtonBase key={tab} className={`!rounded-xl !px-6 !py-3 !text-xs !font-black !uppercase !tracking-widest transition-all ${tab === 'Active' ? '!bg-indigo-600 !text-white' : '!bg-slate-50 !text-slate-500 hover:!bg-slate-100'}`}>
               {tab}
            </ButtonBase>
          ))}
        </div>
      </div>

      {/* 3. TRACKING LIST */}
      <div className="space-y-6">
        <AnimatePresence>
          {APPS_DATA.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[40px] p-8 md:p-12 border border-slate-50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden"
            >
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-10 py-1.5 translate-x-[35%] translate-y-[100%] rotate-45 text-[10px] font-black uppercase tracking-[0.2em] transform-gpu ${app.status === 'Rejected' ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'}`}>
                {app.status}
              </div>

              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12">
                
                {/* Left: Job Info */}
                <div className="flex gap-8 items-center min-w-[300px]">
                  <div className="w-20 h-20 rounded-[28px] bg-slate-50 border border-slate-100 flex items-center justify-center p-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-tight mb-2">{app.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-bold text-slate-400">
                      <span className="text-slate-900 font-black">{app.company}</span>
                      <span className="flex items-center gap-1.5"><FiMapPin /> {app.location}</span>
                      <span className="flex items-center gap-1.5"><FiClock /> {app.date}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Timeline */}
                <div className="flex-1 max-w-2xl px-4 md:px-10">
                   <Stepper alternativeLabel activeStep={app.step} connector={<QontoConnector />}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel 
                            StepIconComponent={({ active, completed }) => (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${completed ? 'bg-indigo-600 text-white shadow-lg' : active ? 'bg-white border-4 border-indigo-600 text-indigo-600 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                {completed ? <FiCheckCircle size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                              </div>
                            )}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">{label}</span>
                          </StepLabel>
                        </Step>
                      ))}
                   </Stepper>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 ml-auto xl:ml-0">
                  <ButtonBase className="!rounded-2xl !bg-slate-50 !p-4 !text-slate-400 hover:!bg-indigo-50 hover:!text-indigo-600 transition-all border border-slate-100">
                     <FiFileText size={22} />
                  </ButtonBase>
                  <ButtonBase className="!rounded-[20px] !bg-slate-900 !text-white !px-8 !py-4 !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-sm flex items-center gap-2">
                     Manage Flow <FiArrowRight />
                  </ButtonBase>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Info Tip */}
      <div className="bg-indigo-50 rounded-[40px] p-8 md:p-10 border border-indigo-100 flex flex-col md:row items-center gap-8 group">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-sm border border-slate-50">
             <FiBriefcase />
          </div>
          <div className="flex-1 text-center md:text-left">
             <p className="text-xl font-black text-indigo-900 tracking-tight">Active Response Intelligence</p>
             <p className="text-sm font-medium text-indigo-700 mt-1">Recruiters are most active between 9AM - 11AM in your timezone. Ensure your profile is updated before this window.</p>
          </div>
          <ButtonBase className="!rounded-2xl !bg-white !px-8 !py-4 !text-xs !font-black !uppercase !tracking-widest !text-indigo-600 shadow-sm hover:!shadow-md transition-all">
             Unlock Insights
          </ButtonBase>
      </div>

    </div>
  );
};

export default AppliedJobs;
