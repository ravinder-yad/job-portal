import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiTrendingUp, FiPieChart, FiPenTool, FiHeart, FiBriefcase, FiDatabase, FiHeadphones } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 1, name: 'IT & Software', icon: <FiMonitor />, count: '2,435' },
  { id: 2, name: 'Digital Marketing', icon: <FiTrendingUp />, count: '1,230' },
  { id: 3, name: 'Finance & Accounts', icon: <FiPieChart />, count: '945' },
  { id: 4, name: 'Design & Creative', icon: <FiPenTool />, count: '1,820' },
  { id: 5, name: 'Healthcare', icon: <FiHeart />, count: '632' },
  { id: 6, name: 'HR & Management', icon: <FiBriefcase />, count: '540' },
  { id: 7, name: 'Data Science', icon: <FiDatabase />, count: '1,023' },
  { id: 8, name: 'Customer Support', icon: <FiHeadphones />, count: '3,210' },
];

const JobCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    // Navigate to jobs with category keyword
    navigate(`/jobs?keyword=${encodeURIComponent(name)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Category</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Choose from the most highly sought-after domains and kickstart your dream career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white border border-gray-100 hover:border-indigo-100 rounded-[32px] p-6 sm:p-8 flex items-center gap-5 cursor-pointer group hover:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-2xl transition-all duration-500 shadow-sm">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-black text-slate-900 group-hover:text-white transition-colors uppercase tracking-tight text-sm">{cat.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 group-hover:text-slate-400">{cat.count} Specialized Roles</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JobCategories;
