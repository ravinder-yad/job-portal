import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiSave, 
  FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const INDUSTRIES = ["IT & Software", "Digital Marketing", "Fintech", "Healthcare", "E-commerce", "Education", "Real Estate", "Other"];
const SIZES = ["1-10", "10-50", "50-200", "200-500", "500-1000", "1000+"];

const CompanyForm = ({ onClose, onSave, editingCompany = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'IT & Software',
    location: '',
    description: '',
    size: '10-50',
    foundedYear: new Date().getFullYear(),
    logo: '',
    banner: '',
    website: '',
    linkedin: '',
    email: '',
    phone: '',
    isFeatured: false,
    status: 'Active'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCompany) {
      setFormData({
        ...editingCompany
      });
    }
  }, [editingCompany]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
       try {
         await onSave(formData);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
    }, 600);
  };

  const loadSampleData = () => {
    setFormData({
      name: 'Cyberdyne Systems',
      industry: 'IT & Software',
      location: 'Silicon Valley, CA',
      description: 'Cyberdyne Systems is a global leader in artificial intelligence and robotics. We are dedicated to creating a safer future through advanced technology.',
      size: '500-1000',
      foundedYear: 1984,
      logo: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png',
      banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
      website: 'https://cyberdyne.systems',
      linkedin: 'linkedin.com/company/cyberdyne',
      email: 'hq@cyberdyne.systems',
      phone: '+1 (555) 000-800',
      isFeatured: true,
      status: 'Active'
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
          <h1 className="text-xl font-bold text-slate-900">{editingCompany ? 'Edit Company' : 'Add Company'}</h1>
        </div>
        <button 
          onClick={loadSampleData}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <FiZap /> Load Sample Data
        </button>
      </header>

      <main className="max-w-2xl mx-auto mt-10 px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Company Registration Form</h2>
            <p className="text-slate-500 font-bold">Simple, clean and effective branding.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">1. Identity</h3>
              <div>
                <InputLabel>Company Name *</InputLabel>
                <FormInput 
                  required 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Acme Corp" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Industry</InputLabel>
                  <select 
                    name="industry" 
                    value={formData.industry} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <InputLabel>Headquarters *</InputLabel>
                  <FormInput 
                    required 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="City, Country" 
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">2. Company Profile</h3>
              <div>
                <InputLabel>About the Company *</InputLabel>
                <textarea 
                  required 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={5}
                  placeholder="Tell us about your mission..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Team Size</InputLabel>
                  <select 
                    name="size" 
                    value={formData.size} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    {SIZES.map(s => <option key={s} value={s}>{s} Employees</option>)}
                  </select>
                </div>
                <div>
                  <InputLabel>Founded Year</InputLabel>
                  <FormInput 
                    type="number" 
                    name="foundedYear" 
                    value={formData.foundedYear} 
                    onChange={handleChange} 
                    placeholder="YYYY" 
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Media */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">3. Branding</h3>
              <div>
                <InputLabel>Logo URL</InputLabel>
                <FormInput 
                  name="logo" 
                  value={formData.logo} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                />
              </div>
              <div>
                <InputLabel>Banner Image URL</InputLabel>
                <FormInput 
                  name="banner" 
                  value={formData.banner} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                />
              </div>
            </div>

            {/* Section 4: Contact */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">4. Links & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>Website</InputLabel>
                  <FormInput 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange} 
                    placeholder="https://..." 
                  />
                </div>
                <div>
                  <InputLabel>LinkedIn</InputLabel>
                  <FormInput 
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleChange} 
                    placeholder="linkedin.com/..." 
                  />
                </div>
                <div>
                  <InputLabel>Contact Email</InputLabel>
                  <FormInput 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="hr@..." 
                  />
                </div>
                <div>
                  <InputLabel>Phone Number</InputLabel>
                  <FormInput 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+91 ..." 
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Settings */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-2">5. Visibility</h3>
              <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <h4 className="font-bold text-slate-900">Featured Company</h4>
                  <p className="text-xs text-slate-500">Show in priority list</p>
                </div>
                <input 
                  type="checkbox" 
                  name="isFeatured" 
                  checked={formData.isFeatured} 
                  onChange={handleChange}
                  className="w-6 h-6 accent-blue-600 cursor-pointer"
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
                {editingCompany ? 'Save Changes' : 'Register Company'}
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

export default CompanyForm;
