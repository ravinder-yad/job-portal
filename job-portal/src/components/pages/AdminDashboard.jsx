import React, { useState, useEffect } from 'react';
import { ButtonBase, IconButton, Avatar, Tooltip } from '@mui/material';
import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiPlus,
  FiTrash2,
  FiMoreVertical,
  FiSearch,
  FiMapPin,
  FiShield,
  FiGrid,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPieChart,
  FiEdit2
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/useAuth';
import { adminService } from '../../services/adminService';
import AddJobModal from '../admin/AddJobModal';

const AdminDashboard = ({ defaultTab = 'Overview' }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update activeTab when defaultTab prop changes (for route changes)
  useEffect(() => {
     setActiveTab(defaultTab);
  }, [defaultTab]);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // List data for Jobs/Users/Companies
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const tabs = ['Overview', 'Jobs', 'Users', 'Companies'];

  const fetchStats = async () => {
    try {
      const statsData = await adminService.getDashboardStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let result;
      switch(tab) {
        case 'Users': result = await adminService.getAllUsers(); break;
        case 'Jobs': result = await adminService.getAllJobs(); break;
        case 'Companies': result = await adminService.getAllCompanies(); break;
        default: result = [];
      }
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${tab}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab !== 'Overview') {
      fetchData(activeTab);
    }
  }, [activeTab]);

  const handleSaveJob = async (formData) => {
    try {
      if (editingItem) {
        await adminService.updateJob(editingItem._id, formData);
      } else {
        await adminService.createJob(formData);
      }
      fetchData('Jobs');
      fetchStats();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Save job error:", error);
      throw error;
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    
    try {
      if (type === 'Users') await adminService.deleteUser(id);
      else if (type === 'Jobs') await adminService.deleteJob(id);
      else if (type === 'Companies') await adminService.deleteCompany(id);
      
      // Refresh data
      fetchData(activeTab);
      fetchStats();
    } catch (err) {
      alert("Error deleting resource: " + (err.response?.data?.message || err.message));
    }
  };

  const filteredData = data.filter(item => {
    const search = searchQuery.toLowerCase();
    if (activeTab === 'Users') return item.name?.toLowerCase().includes(search) || item.email?.toLowerCase().includes(search);
    if (activeTab === 'Jobs') return item.title?.toLowerCase().includes(search) || item.company?.name?.toLowerCase().includes(search);
    if (activeTab === 'Companies') return item.name?.toLowerCase().includes(search) || item.location?.toLowerCase().includes(search);
    return true;
  });

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
          <ButtonBase 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="!rounded-xl !bg-indigo-600 !px-6 !py-3 !text-sm !font-black !text-white !shadow-lg !shadow-indigo-100 hover:!bg-indigo-700 hover:!scale-[1.02] transition-all"
          >
            <FiPlus className="mr-2" /> Global Action
          </ButtonBase>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="mb-10 flex items-center gap-1">
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
        <AnimatePresence mode="wait">
          {activeTab === 'Overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Stats Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Active Jobs', value: stats?.totalJobs || '0', icon: FiBriefcase, color: 'bg-indigo-50 text-indigo-600', note: `${stats?.newJobs || '0'} posted this week` },
                  { label: 'Total Users', value: stats?.totalUsers || '0', icon: FiUsers, color: 'bg-emerald-50 text-emerald-600', note: `${stats?.newUsers || '0'} new joined` },
                  { label: 'Companies', value: stats?.totalCompanies || '0', icon: FiShield, color: 'bg-amber-50 text-amber-600', note: 'All verified' },
                  { label: 'System Health', value: '100%', icon: FiTrendingUp, color: 'bg-rose-50 text-rose-600', note: 'Peak efficiency' },
                ].map((stat) => (
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
                    <div className="mt-6">
                      <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                        {stat.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Section */}
              <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">
                <div className="rounded-3xl border border-white bg-white p-8 shadow-sm">
                   <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900">Platform Intelligence</h2>
                      <FiTrendingUp className="text-indigo-500" />
                   </div>
                   <div className="py-20 text-center">
                      <FiPieChart className="text-5xl text-slate-100 mx-auto mb-4" />
                      <p className="text-sm font-bold text-slate-400">Activity analytics engine is processing real-time data...</p>
                   </div>
                </div>

                <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-200">
                  <h3 className="text-lg font-black">System Terminal</h3>
                  <div className="mt-6 space-y-4">
                    {[
                      { name: 'Database', status: 'Healthy' },
                      { name: 'API Services', status: 'Healthy' },
                      { name: 'Storage', status: 'Healthy' }
                    ].map(sys => (
                      <div key={sys.name} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-400">{sys.name}</span>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black uppercase text-emerald-400">{sys.status}</span>
                           <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ButtonBase className="!mt-8 !w-full !rounded-xl !bg-indigo-600 !py-3.5 !text-[10px] !font-black !uppercase !tracking-widest hover:!bg-indigo-700 transition-all">
                    Re-Sync Modules
                  </ButtonBase>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-3xl border border-white bg-white shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{activeTab} Repository</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Total identified: {filteredData.length}</p>
                </div>
                <div className="flex items-center bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                  <FiSearch className="text-slate-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-bold w-full sm:w-64" 
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Basic Info</th>
                      {activeTab === 'Users' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>}
                      {activeTab === 'Jobs' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Company</th>}
                      {activeTab === 'Companies' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Industry</th>}
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      [1,2,3].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-8 py-10 bg-slate-50/20"></td>
                        </tr>
                      ))
                    ) : filteredData.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              {activeTab === 'Users' ? (
                                <>
                                  <Avatar sx={{ bgcolor: item.role === 'admin' ? '#4f46e5' : '#e2e8f0', fontWeight: 900 }}>{item.name?.[0]}</Avatar>
                                  <div>
                                    <p className="font-black text-slate-900">{item.name}</p>
                                    <p className="text-xs font-bold text-slate-400">{item.email}</p>
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <p className="font-black text-slate-900">{item.title || item.name}</p>
                                  <p className="text-xs font-bold text-slate-400 flex items-center gap-1"><FiMapPin /> {item.location}</p>
                                </div>
                              )}
                           </div>
                        </td>
                        {activeTab === 'Users' && (
                          <td className="px-8 py-6">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${item.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                              {item.role}
                            </span>
                          </td>
                        )}
                        {activeTab === 'Jobs' && (
                          <td className="px-8 py-6 text-sm font-black text-indigo-600 truncate max-w-[150px]">
                            {item.company?.name || "N/A"}
                          </td>
                        )}
                        {activeTab === 'Companies' && (
                          <td className="px-8 py-6 text-sm font-bold text-slate-600">
                            {item.industry}
                          </td>
                        )}
                        <td className="px-8 py-6 text-sm font-bold text-slate-500 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                {activeTab === 'Jobs' && (
                                  <IconButton 
                                    size="small" 
                                    className="hover:!text-indigo-600 !bg-slate-100/50"
                                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                                  >
                                    <FiEdit2 />
                                  </IconButton>
                                )}
                                <IconButton size="small" className="hover:!text-indigo-600 !bg-slate-100/50"><FiMoreVertical /></IconButton>
                                <IconButton 
                                  size="small" 
                                  className="hover:!text-rose-600 hover:!bg-rose-50 !bg-slate-100/50"
                                  onClick={() => handleDelete(item._id, activeTab)}
                                >
                                  <FiTrash2 />
                                </IconButton>
                             </div>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AddJobModal 
        open={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSave={handleSaveJob}
        editingJob={activeTab === 'Jobs' ? editingItem : null}
      />
    </section>
  );
};

export default AdminDashboard;
