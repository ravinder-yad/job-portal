import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const JobFilters = ({ className = '', onClose }) => {
  const [salaryRange, setSalaryRange] = useState(30); // in thousands

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 h-fit ${className}`}>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center">
          <FiFilter className="mr-2 text-indigo-600" /> Filters
        </h2>
        
        {/* Mobile close button */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
            <FiX className="text-xl" />
          </button>
        )}
      </div>

      <div className="space-y-8">
        
        {/* Working Schedule */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Working Schedule</h3>
          <div className="space-y-3">
            {['Full-time', 'Part-time', 'Freelance', 'Internship'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors cursor-pointer"
                  defaultChecked={type === 'Full-time'}
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Experience Level */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Experience Level</h3>
          <div className="space-y-3">
            {['Fresher', '1 - 3 Years', '3 - 5 Years', '5+ Years'].map((exp, i) => (
              <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="experience"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                  defaultChecked={i === 1}
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">{exp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Salary Range */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Salary Range</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              Min ₹{salaryRange}k
            </span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="150" 
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:h-2"
          />
          <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
            <span>₹10k</span>
            <span>₹150k+</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Location Type */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Work Mode</h3>
          <div className="space-y-3">
            {['On-site', 'Remote', 'Hybrid'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors cursor-pointer"
                  defaultChecked={type === 'Remote'}
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Skills Tag Input */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100 flex items-center gap-1 cursor-pointer hover:bg-indigo-100">
              React <FiX />
            </span>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100 flex items-center gap-1 cursor-pointer hover:bg-indigo-100">
              Node.js <FiX />
            </span>
          </div>
          <input 
            type="text" 
            placeholder="Type to add skills..." 
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-700" 
          />
        </div>

      </div>

      <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-800 hover:text-slate-800 hover:bg-slate-50 transition-all">
        Reset Filters
      </button>
    </div>
  );
};

export default JobFilters;
