import React from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiSearch, FiSend, FiCheckCircle } from 'react-icons/fi';

const STEPS = [
  { id: 1, title: 'Create Account', description: 'Sign up and build your profile in minutes.', icon: <FiUserPlus /> },
  { id: 2, title: 'Search Jobs', description: 'Find roles that match your skills perfectly.', icon: <FiSearch /> },
  { id: 3, title: 'Apply Easily', description: 'Submit applications directly to top companies.', icon: <FiSend /> },
  { id: 4, title: 'Get Hired', description: 'Clear interviews and start your new career.', icon: <FiCheckCircle /> },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Works</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your journey to the perfect job is simple, fast, and transparent.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-indigo-100 via-indigo-300 to-purple-100 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                key={step.id} 
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/50 flex items-center justify-center text-3xl text-indigo-600 mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-purple-500 group-hover:text-white transition-all duration-300 relative">
                  {step.icon}
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center border-4 border-white shadow-sm">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
