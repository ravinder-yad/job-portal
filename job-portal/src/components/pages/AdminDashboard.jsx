import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase, IconButton, Avatar, Tooltip } from '@mui/material';
import {
  FiBriefcase,
  FiUsers,
  FiTarget,
  FiCheckCircle,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiExternalLink,
  FiTrendingUp,
  FiPieChart,
  FiGrid,
  FiShield,
  FiSearch,
  FiMoreVertical,
  FiMail,
  FiMapPin,
  FiCalendar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/useAuth';

const stats = [
  { label: 'Active Jobs', value: '12', icon: FiBriefcase, color: 'bg-indigo-50 text-indigo-600', note: '3 posted this week' },
  { label: 'Total Users', value: '2,842', icon: FiUsers, color: 'bg-emerald-50 text-emerald-600', note: '124 new today' },
  { label: 'Pending Verification', value: '45', icon: FiShield, color: 'bg-amber-50 text-amber-600', note: '8 high priority' },
  { label: 'Platform Growth', value: '24%', icon: FiTrendingUp, color: 'bg-rose-50 text-rose-600', note: 'MOM increase' },
];

const mockJobs = [
  { id: 1, title: 'Senior Frontend Developer', status: 'Active', applicants: 48, postedAt: '2 days ago' },
  { id: 2, title: 'Product Designer', status: 'Active', applicants: 36, postedAt: '5 days ago' },
  { id: 3, title: 'Node.js Backend Engineer', status: 'Reviewing', applicants: 112, postedAt: '1 week ago' },
];

const mockUsers = [
  { id: 1, name: 'Aditya Sharma', email: 'aditya@example.com', role: 'user', joined: 'Oct 2025', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'admin', joined: 'Jan 2026', status: 'Active' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', role: 'user', joined: 'Feb 2026', status: 'Pending' },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  
  const tabs = ['Overview', 'Jobs', 'Users', 'Companies'];

  return (
    <section className="min-h-full bg-slate-50/50 px-4 py-8 lg:px-10">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-indigo-600">Administrator Console</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">System Control Center</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
            Welcome back, <span className="text-indigo-600 font-black">{user?.name || 'Admin'}</span>. You have full access to the platform's kernel.
          </p>
        </div>
        
        <div className="flex gap-3">
          <ButtonBase className="!rounded-xl !bg-white !px-6 !py-3 !text-sm !font-black !text-slate-700 !border !border-slate-200 hover:!bg-slate-50 transition-all">
            Audit Logs
          </ButtonBase>
          <ButtonBase className="!rounded-xl !bg-indigo-600 !px-6 !py-3 !text-sm !font-black !text-white !shadow-lg !shadow-indigo-100 hover:!bg-indigo-700 hover:!scale-[1.02] transition-all">
            <FiPlus className="mr-2" /> Quick Action
          </ButtonBase>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="mb-10 flex items-center gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-4 text-sm font-black transition-all ${
              activeTab === tab 
              ? 'text-indigo-600' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="admin-tab-bar"
                className="absolute bottom-0 left-0 h-1 w-full bg-indigo-600 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {activeTab === 'Overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group relative overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                      <h3 className="mt-3 text-3xl font-black text-slate-950">{stat.value}</h3>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                      <stat.icon className="text-xl" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {stat.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
              <div className="rounded-3xl border border-white bg-white p-8 shadow-sm">
                 <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900">Critical Pipeline</h2>
                    <FiTrendingUp className="text-indigo-500" />
                 </div>
                 <div className="space-y-6">
                    {mockJobs.map(job => (
                      <div key={job.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-all cursor-pointer">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                               <FiBriefcase className="text-indigo-600" />
                            </div>
                            <div>
                               <h4 className="font-black text-slate-900 text-sm">{job.title}</h4>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.status} • {job.postedAt}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="font-black text-indigo-600 text-lg">{job.applicants}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applicants</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-200">
                    <h3 className="text-lg font-black">System Status</h3>
                    <div className="mt-6 space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-400">Database</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-400">API Gateway</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-400">Auth Server</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                       </div>
                    </div>
                    <ButtonBase className="!mt-8 !w-full !rounded-xl !bg-indigo-600 !py-3 !text-xs !font-black hover:!bg-indigo-700 transition-all">
                       Run Health Check
                    </ButtonBase>
                 </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Users' && (
          <div className="rounded-3xl border border-white bg-white shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                   <h2 className="text-2xl font-black text-slate-900">User Directory</h2>
                   <p className="text-sm font-medium text-slate-500 mt-1">Manage global user base and administrative permissions.</p>
                </div>
                <div className="flex items-center bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                   <FiSearch className="text-slate-400 mr-3" />
                   <input type="text" placeholder="Search by name or email..." className="bg-transparent border-none outline-none text-sm font-bold w-full sm:w-64" />
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Control</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {mockUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <Avatar sx={{ bgcolor: user.role === 'admin' ? '#4f46e5' : '#e2e8f0', fontWeight: 900 }}>{user.name[0]}</Avatar>
                                 <div>
                                    <p className="font-black text-slate-900">{user.name}</p>
                                    <p className="text-xs font-bold text-slate-400">{user.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                 {user.role}
                              </span>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`flex items-center gap-1.5 text-xs font-black ${user.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                 <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                 {user.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-sm font-bold text-slate-500">{user.joined}</td>
                           <td className="px-8 py-6 text-right">
                              <IconButton size="small"><FiMoreVertical /></IconButton>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {(activeTab === 'Jobs' || activeTab === 'Companies') && (
           <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FiGrid className="text-3xl text-indigo-200" />
              </div>
              <h2 className="text-2xl font-black text-slate-950">Management Module: {activeTab}</h2>
              <p className="mt-2 text-sm font-medium text-slate-500 max-w-sm mx-auto">
                 The {activeTab} high-level management API integration is active. Connect with data models for advanced CRUD operations.
              </p>
              <ButtonBase className="!mt-8 !rounded-xl !bg-indigo-600 !text-white !px-8 !py-3.5 !text-sm !font-black shadow-lg shadow-indigo-100">
                 Sync {activeTab} Data
              </ButtonBase>
           </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
