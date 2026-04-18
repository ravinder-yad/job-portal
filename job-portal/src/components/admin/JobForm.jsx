import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiSave, 
  FiX,
  FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Internship", "Contract"];
const EXPERIENCE_LEVELS = ["Fresher", "1-3 years", "3-5 years", "5-8 years", "10+ years"];

const JobForm = ({ onClose, onSave, editingJob = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: { 
       name: '', 
       location: ''
    },
    location: '',
    jobType: 'Full-time',
    experience: 'Fresher',
    salary: { min: '', max: '' },
    skills: '', // Changed to string for simple comma separated input
    deadline: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
        skills: Array.isArray(editingJob.skills) ? editingJob.skills.join(', ') : editingJob.skills || '',
        salary: {
          min: editingJob.salary?.min || '',
          max: editingJob.salary?.max || ''
        },
        deadline: editingJob.deadline ? new Date(editingJob.deadline).toISOString().split('T')[0] : ''
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert skills back to array for API
    const processedData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    setTimeout(async () => {
       try {
         await onSave(processedData);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
    }, 600);
  };

  const loadSampleData = () => {
    setFormData({
      title: 'Software Developer Intern',
      description: 'Looking for a motivated intern to help build our next generation of web applications. You will work with React, Node.js and modern cloud technologies.',
      company: { 
         name: 'TechFlow Solutions', 
         location: 'Bangalore, India'
      },
      location: 'Hybrid',
      jobType: 'Internship',
      experience: 'Fresher',
      salary: { min: '15000', max: '25000' },
      skills: 'React, Javascript, CSS, Node.js',
      deadline: '2026-06-30'
    });
  };

  const InputLabel = ({ children }) => (
    <label className="block text-sm font-bold text-slate-700 mb-2">{children}</label>
  );

  const FormInput = (props) => (
    <input 
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    />
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
          <h1 className="text-xl font-bold text-slate-900">{editingJob ? 'Edit Job' : 'Post Job'}</h1>
        </div>
        <button 
          onClick={loadSampleData}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <FiZap /> Load Sample Data
        </button>
      </header>

      <main className="max-w-3xl mx-auto mt-10 px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Job Information Form</h2>
            <p className="text-slate-500 font-medium">Please fill out all the required fields to publish this job listing.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">1. Basic Details</h3>
              <div>
                <InputLabel>Job Title *</InputLabel>
                <FormInput 
                  required 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Frontend Developer" 
                />
              </div>
              <div>
                <InputLabel>Job Description *</InputLabel>
                <textarea 
                  required 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={6}
                  placeholder="Describe the roles and responsibilities..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Section 2: Company Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">2. Company Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Company Name *</InputLabel>
                  <FormInput 
                    required 
                    name="company.name" 
                    value={formData.company.name} 
                    onChange={handleChange} 
                    placeholder="Tech Corp" 
                  />
                </div>
                <div>
                  <InputLabel>Company Location *</InputLabel>
                  <FormInput 
                    required 
                    name="company.location" 
                    value={formData.company.location} 
                    onChange={handleChange} 
                    placeholder="City, State" 
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Job Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">3. Job Logistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Job Type *</InputLabel>
                  <select 
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <InputLabel>Experience *</InputLabel>
                  <select 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <InputLabel>Job Location (Specific) *</InputLabel>
                  <FormInput 
                    required 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="e.g. Remote, Mumbai, Hybrid" 
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Salary & Skills */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">4. Compensation & Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Min Salary (Monthly)</InputLabel>
                  <FormInput 
                    type="number" 
                    name="salary.min" 
                    value={formData.salary.min} 
                    onChange={handleChange} 
                    placeholder="₹ Min" 
                  />
                </div>
                <div>
                  <InputLabel>Max Salary (Monthly)</InputLabel>
                  <FormInput 
                    type="number" 
                    name="salary.max" 
                    value={formData.salary.max} 
                    onChange={handleChange} 
                    placeholder="₹ Max" 
                  />
                </div>
                <div className="md:col-span-2">
                  <InputLabel>Skills (Comma separated) *</InputLabel>
                  <FormInput 
                    required 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleChange} 
                    placeholder="e.g. React, JavaScript, Node.js" 
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Deadline */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">5. Settings</h3>
              <div>
                <InputLabel>Application Deadline</InputLabel>
                <input 
                  type="date" 
                  name="deadline" 
                  value={formData.deadline} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-blue-300 flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <FiSave />}
                {editingJob ? 'Save Changes' : 'Publish Job Listing'}
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </motion.div>
  );
};

export default JobForm;
