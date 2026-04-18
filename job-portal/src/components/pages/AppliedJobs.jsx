import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiArrowRight,
  FiFileText,
  FiInbox
} from 'react-icons/fi';
import { ButtonBase, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled, Skeleton } from '@mui/material';
import axios from 'axios';

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

const steps = ['Applied', 'Review', 'Interview', 'Decision'];

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7001/api/applications/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApps = applications.filter(app => 
    app.job?.title?.toLowerCase().includes(filter.toLowerCase()) ||
    app.job?.company?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const getStep = (status) => {
    switch (status) {
      case 'Applied': return 0;
      case 'Review': return 1;
      case 'Interview': return 2;
      case 'Accepted':
      case 'Rejected': return 3;
      default: return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 pt-10 px-4">
      {/* 1. TRACKING HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Real-time Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Application <span className="text-indigo-600">Terminal</span>
          </h1>
          <p className="mt-4 text-slate-500 font-bold max-w-xl leading-relaxed">
            Monitor every opportunity. Our high-fidelity tracking system keeps you updated on every stage of your application journey.
          </p>
        </motion.div>

        <div className="flex items-center gap-4 bg-white p-3 rounded-[24px] shadow-sm border border-slate-100">
           <div className="px-6 py-2 text-center border-r border-slate-100">
              <p className="text-2xl font-black text-slate-900 leading-none">{applications.length}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Total</p>
           </div>
           <div className="px-6 py-2 text-center">
              <p className="text-2xl font-black text-indigo-600 leading-none">
                {applications.filter(a => ['Review', 'Interview'].includes(a.status)).length}
              </p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">In Progress</p>
           </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER HUB */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-5 py-3.5 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
          <FiSearch className="text-slate-400 mr-3 text-lg" />
          <input 
            type="text" 
            placeholder="Search by role or company..." 
            className="bg-transparent outline-none w-full text-sm font-bold text-slate-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* 3. TRACKING LIST */}
      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={160} className="!rounded-[40px]" />)
        ) : filteredApps.length > 0 ? (
          <AnimatePresence>
            {filteredApps.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[40px] p-8 md:p-12 border border-slate-50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 px-10 py-1.5 translate-x-[35%] translate-y-[100%] rotate-45 text-[10px] font-black uppercase tracking-[0.2em] transform-gpu ${app.status === 'Rejected' ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'}`}>
                  {app.status}
                </div>

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12">
                  <div className="flex gap-8 items-center min-w-[300px]">
                    <div className="w-20 h-20 rounded-[28px] bg-slate-50 border border-slate-100 flex items-center justify-center p-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      <Avatar src={app.job?.company?.logo} sx={{ width: '100%', height: '100%', borderRadius: '16px' }}>{app.job?.company?.name?.charAt(0)}</Avatar>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-tight mb-2">{app.job?.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-bold text-slate-400 uppercase tracking-tight">
                        <span className="text-slate-900 font-extrabold">{app.job?.company?.name}</span>
                        <span className="flex items-center gap-1.5"><FiMapPin /> {app.job?.location}</span>
                        <span className="flex items-center gap-1.5"><FiClock /> {new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-2xl px-4 md:px-10">
                     <Stepper alternativeLabel activeStep={getStep(app.status)} connector={<QontoConnector />}>
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

                  <div className="flex items-center gap-3 ml-auto xl:ml-0">
                    <ButtonBase className="!rounded-2xl !bg-slate-50 !p-4 !text-slate-400 hover:!bg-indigo-50 hover:!text-indigo-600 transition-all border border-slate-100">
                       <FiFileText size={22} />
                    </ButtonBase>
                    <ButtonBase className="!rounded-[20px] !bg-slate-900 !text-white !px-8 !py-4 !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-sm flex items-center gap-2">
                       View Details <FiArrowRight />
                    </ButtonBase>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="bg-white rounded-[48px] p-20 text-center border border-dashed border-slate-200">
             <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-300 mx-auto mb-6">
                <FiInbox size={48} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Terminal Offline</h2>
             <p className="text-slate-400 font-bold mt-2 max-w-md mx-auto">
               You haven't initiated any application streams. Discover jobs and start your journey.
             </p>
             <ButtonBase className="!mt-10 !rounded-2xl !bg-indigo-600 !px-10 !py-4 !text-sm !font-black !uppercase !tracking-widest !text-white hover:!bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
                Explore All Jobs
             </ButtonBase>
          </div>
        )}
      </div>

    </div>
  );
};

export default AppliedJobs;
