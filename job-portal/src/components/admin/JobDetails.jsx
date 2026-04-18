import React from 'react';
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiCalendar, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiCheckCircle, 
  FiList,
  FiActivity
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const MOCK_CANDIDATES = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', experience: '3 yrs', status: 'In Review' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', experience: '5 yrs', status: 'Interview' },
  { id: 3, name: 'Anish Kumar', email: 'anish@example.com', experience: '1 yr', status: 'Rejected' },
];

const MOCK_TASKS = [
  { id: 1, title: 'Screen First 20 Resumes', completed: true },
  { id: 2, title: 'Schedule Technical Rounds', completed: false },
  { id: 3, title: 'Final HR Discussion', completed: false },
];

const JobDetails = ({ job, onClose, onEdit }) => {
  if (!job) return null;

  const DetailItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">
        <Icon />
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
          <h1 className="text-xl font-bold text-slate-900">Job Dashboard</h1>
        </div>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <FiEdit2 /> Edit Listing
        </button>
      </header>

      <main className="max-w-3xl mx-auto mt-10 px-6 space-y-8">
        
        {/* Header Information */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-4">
                 {job.company.logo ? (
                    <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-contain" />
                 ) : (
                    <span className="text-4xl font-black text-blue-600">{job.company.name[0]}</span>
                 )}
              </div>
              <div className="text-center md:text-left flex-1">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className={`px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100`}>
                       Active
                    </span>
                    {(job.isFeatured || job.featured) && (
                       <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                          Featured
                       </span>
                    )}
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{job.title}</h2>
                 <p className="text-blue-600 font-bold mb-6">{job.company.name} • {job.location}</p>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                    <DetailItem label="Type" value={job.jobType} icon={FiBriefcase} />
                    <DetailItem label="Salary" value={`₹${job.salary?.min} - ₹${job.salary?.max}`} icon={FiDollarSign} />
                    <DetailItem label="Experience" value={job.experience} icon={FiActivity} />
                    <DetailItem label="Posted" value="2 days ago" icon={FiCalendar} />
                 </div>
              </div>
           </div>
        </div>

        {/* Section 1: Description */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Job Description</h3>
           <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line">
              {job.description}
           </p>
        </section>

        {/* Section 2: Tasks & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Hiring Tasks</h3>
              <div className="space-y-3">
                 {MOCK_TASKS.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.completed ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200'}`}>
                          {task.completed && <FiCheckCircle className="text-[10px]" />}
                       </div>
                       <span className={`text-xs font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.title}</span>
                    </div>
                 ))}
              </div>
           </section>
           <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                 {job.skills?.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black border border-slate-100">
                       {skill}
                    </span>
                 ))}
              </div>
           </section>
        </div>

        {/* Section 3: Applicants */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recent Applicants</h3>
              <span className="text-[10px] font-black text-blue-600">{MOCK_CANDIDATES.length} Total</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Candidate</th>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                       <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {MOCK_CANDIDATES.map(c => (
                       <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4">
                             <div>
                                <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                                <p className="text-[10px] text-slate-400">{c.email}</p>
                             </div>
                          </td>
                          <td className="px-8 py-4">
                             <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border
                                ${c.status === 'In Review' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                  c.status === 'Interview' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                  'bg-rose-50 text-rose-600 border-rose-100'}
                             `}>
                                {c.status}
                             </span>
                          </td>
                          <td className="px-8 py-4 text-right">
                             <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                                Review
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

      </main>
    </motion.div>
  );
};

export default JobDetails;
