import React from 'react';
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiMapPin, 
  FiGlobe, 
  FiMail, 
  FiPhone, 
  FiUsers, 
  FiCalendar,
  FiBriefcase,
  FiAward
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const CompanyDetails = ({ company, onClose, onEdit }) => {
  if (!company) return null;

  const InfoCard = ({ label, value, icon: Icon, color }) => (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-50 min-h-screen pb-20 font-sans"
    >
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><FiArrowLeft className="text-xl" /></button>
          <h1 className="text-xl font-bold text-slate-900">Company Profile</h1>
        </div>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </header>

      <main className="max-w-3xl mx-auto mt-10 px-6 space-y-8">
        
        {/* Header Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-4">
                 {company.logo ? (
                    <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                 ) : (
                    <span className="text-4xl font-black text-blue-600">{company.name[0]}</span>
                 )}
              </div>
              <div className="text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                       Verified Company
                    </span>
                    {company.isFeatured && (
                       <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                          Featured
                       </span>
                    )}
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{company.name}</h2>
                 <p className="text-blue-600 font-bold mb-4">{company.industry}</p>
                 <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 font-bold text-sm italic">
                    <span className="flex items-center gap-2"><FiMapPin /> {company.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-2"><FiCalendar /> Founded {company.foundedYear}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <InfoCard label="Industry" value={company.industry} icon={FiAward} color="blue" />
           <InfoCard label="Team Size" value={`${company.size} Members`} icon={FiUsers} color="emerald" />
           <InfoCard label="Location" value={company.location} icon={FiMapPin} color="amber" />
        </div>

        {/* About Section */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Company Brief</h3>
           <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line">
              {company.description || "No corporate briefing provided."}
           </p>
        </section>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Digital presence</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <FiGlobe className="text-blue-600" />
                    <a href={company.website} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-900 hover:text-blue-600 truncate">{company.website || 'No website'}</a>
                 </div>
                 <div className="flex items-center gap-4">
                    <FiMail className="text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">{company.email || 'No email provided'}</span>
                 </div>
              </div>
           </section>
           <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Direct Support</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <FiPhone className="text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">{company.phone || 'No phone provided'}</span>
                 </div>
                 <div className="flex items-center gap-4 text-slate-400 italic">
                    <FiBriefcase />
                    <span className="text-xs font-bold">12 Active Job Listings</span>
                 </div>
              </div>
           </section>
        </div>

        {/* Footer Actions */}
        <div className="text-center pt-8">
           <button 
              className="px-8 py-3 bg-white border border-slate-200 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-sm"
              onClick={onClose}
           >
              Return to Catalog
           </button>
        </div>

      </main>
    </motion.div>
  );
};

export default CompanyDetails;
