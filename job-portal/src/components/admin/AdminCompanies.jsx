import React, { useState, useEffect } from 'react';
import {
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiMapPin, 
  FiFilter, 
  FiStar, 
  FiUpload, 
  FiRefreshCw, 
  FiGlobe,
  FiAward,
  FiGrid,
  FiActivity,
  FiZap,
  FiBriefcase,
  FiChevronRight
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';

const StatsCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[28px] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] flex items-center gap-5 border border-slate-100 relative overflow-hidden h-full"
  >
    <div 
      className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shrink-0"
      style={{ backgroundColor: `${color}10`, color: color }}
    >
      {icon}
    </div>
    <div className="z-10">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h4>
        {trend && (
           <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
              {trend}
           </span>
        )}
      </div>
    </div>
    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-5 pointer-events-none" style={{ backgroundColor: color }} />
  </motion.div>
);

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [view, setView] = useState('list'); // 'list' | 'add' | 'edit' | 'details'
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllCompanies();
      setCompanies(data || []);
    } catch (error) {
      console.error("Fetch companies error:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (view === 'edit') {
        await adminService.updateCompany(selectedCompany._id, formData);
      } else {
        await adminService.createCompany(formData);
      }
      fetchCompanies();
      setView('list');
      setSelectedCompany(null);
    } catch (error) {
      console.error("Save company error:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company? All associated jobs may also be affected.")) {
      try {
        await adminService.deleteCompany(id);
        setCompanies(prev => prev.filter(c => c._id !== id));
      } catch (error) {
        console.error("Delete company error:", error);
      }
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.status === 'Active').length,
    featured: companies.filter(c => c.isFeatured).length,
    industries: [...new Set(companies.map(c => c.industry))].length
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-0 min-h-screen bg-[#f8fafc]">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 md:p-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-linear-to-br from-slate-900 to-indigo-600 bg-clip-text text-transparent italic">
                  Companies Directory 🏢
                </h1>
                <p className="text-slate-500 font-bold">Manage recruiter identities and brand presence.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { setSelectedCompany(null); setView('add'); }} className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all">
                  <FiPlus className="text-lg" /> Add Company
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatsCard title="Total Entities" value={stats.total} icon={<FiBriefcase />} color="#6366f1" trend="+5 new" />
              <StatsCard title="Verified Active" value={stats.active} icon={<FiAward />} color="#10b981" trend="98%" />
              <StatsCard title="Featured" value={stats.featured} icon={<FiStar />} color="#f59e0b" trend="Premium" />
              <StatsCard title="Industries" value={stats.industries} icon={<FiGrid />} color="#ec4899" />
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm mb-12 flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative w-full lg:w-1/3">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search company by name or city..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex gap-4 items-center w-full lg:w-2/3 lg:justify-end">
                <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)} className="px-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-700 font-black text-sm outline-none cursor-pointer">
                   <option value="All">All Industries</option>
                </select>
                <button onClick={() => { setSearchTerm(''); setIndustryFilter('All'); }} className="p-3.5 text-slate-400 hover:text-indigo-600 transition-colors"><FiRefreshCw /></button>
                <div className="px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest">{filteredCompanies.length} Registered</div>
              </div>
            </div>

            {/* Grid Results */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {loading ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-white rounded-[40px] border border-slate-100 animate-pulse" />
               )) : filteredCompanies.map(company => (
                  <motion.div 
                    key={company._id} 
                    variants={itemVariants} 
                    onClick={() => { setSelectedCompany(company); setView('details'); }}
                    className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all relative overflow-hidden cursor-pointer active:scale-95"
                  >
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                           {company.logo ? <img src={company.logo} alt={company.name} className="w-full h-full object-contain" /> : <FiBriefcase className="text-slate-200 text-2xl" />}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={(e) => { e.stopPropagation(); setSelectedCompany(company); setView('edit'); }} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"><FiEdit2 /></button>
                           <button onClick={(e) => { e.stopPropagation(); handleDelete(company._id); }} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"><FiTrash2 /></button>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div>
                           <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{company.name}</h3>
                           <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-1"><FiMapPin /> {company.location}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase">{company.industry}</span>
                           <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase">{company.size || '10-50'} Employees</span>
                        </div>
                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                           <div className="flex gap-3">
                              {company.website && <FiGlobe className="text-slate-300" />}
                              {company.isFeatured && <FiZap className="text-amber-400" />}
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                              Details Explorer <FiChevronRight />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
          </motion.div>
        )}

        {view === 'add' && <CompanyForm onClose={() => setView('list')} onSave={handleSave} />}
        {view === 'edit' && <CompanyForm editingCompany={selectedCompany} onClose={() => setView('list')} onSave={handleSave} />}
        {view === 'details' && <CompanyDetails company={selectedCompany} onClose={() => setView('list')} onEdit={() => setView('edit')} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminCompanies;
