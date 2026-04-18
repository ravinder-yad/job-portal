import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiShield, 
  FiSettings, 
  FiBell, 
  FiSave, 
  FiLock, 
  FiMail, 
  FiCpu,
  FiActivity,
  FiGlobe,
  FiImage
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { settingService } from '../../services/settingService';
import { useAuth } from '../../context/useAuth';

const AdminSettings = () => {
  const { user: authUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form States
  const [profileData, setProfileData] = useState({ name: authUser?.name || '', email: authUser?.email || '' });
  const [securityData, setSecurityData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [systemData, setSystemData] = useState({
    maintenanceMode: false,
    allowPublicRegistration: true,
    defaultJobStatus: 'open'
  });
  const [notifData, setNotifData] = useState({
    emailNotifications: true,
    newUserNotification: true,
    newJobNotification: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { user, system } = await settingService.getSettings();
      setProfileData({ name: user.name, email: user.email });
      setSystemData({
        maintenanceMode: system.maintenanceMode,
        allowPublicRegistration: system.allowPublicRegistration,
        defaultJobStatus: system.defaultJobStatus
      });
      setNotifData({
        emailNotifications: system.emailNotifications,
        newUserNotification: system.newUserNotification,
        newJobNotification: system.newJobNotification
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      if (activeTab === 'Profile') {
        const res = await settingService.updateProfile({ name: profileData.name });
        updateUser({ name: res.user.name });
        setSuccess('Profile updated successfully');
      } else if (activeTab === 'Security') {
        if (securityData.newPassword !== securityData.confirmPassword) {
            throw new Error("Passwords do not match");
        }
        await settingService.updateSecurity(securityData);
        setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setSuccess('Password updated successfully');
      } else if (activeTab === 'System') {
        await settingService.updateSystem(systemData);
        setSuccess('System settings updated');
      } else if (activeTab === 'Notifications') {
        await settingService.updateSystem(notifData);
        setSuccess('Notification preferences updated');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const InputLabel = ({ children }) => (
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{children}</label>
  );

  const FormCard = ({ title, description, children }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-sm"
    >
      <div className="mb-10">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-400 font-bold text-sm mt-1">{description}</p>
      </div>
      <form onSubmit={handleSave} className="space-y-8">
        {children}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-blue-300 flex items-center justify-center gap-3"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <FiSave />}
            Save {activeTab} Changes
          </button>
        </div>
      </form>
    </motion.div>
  );

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-100 transition-all">
      <div>
        <h4 className="font-black text-slate-900 text-sm">{label}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">{description}</p>
      </div>
      <button 
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-14 h-8 rounded-full relative transition-all ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      
      {/* 🚀 Header */}
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h2>
        <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Global Platform Configuration</p>
      </header>

      {/* 🎛️ Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-[28px] w-fit overflow-x-auto no-scrollbar">
        {[
          { id: 'Profile', icon: FiUser },
          { id: 'Security', icon: FiShield },
          { id: 'System', icon: FiCpu },
          { id: 'Notifications', icon: FiBell }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-6 py-3 rounded-[22px] text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === t.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <t.icon /> {t.id}
          </button>
        ))}
      </div>

      {/* 🔔 Alert Area */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black border border-emerald-100 flex items-center gap-2">
            <FiActivity /> {success}
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black border border-rose-100 flex items-center gap-2">
            <FiShield /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📄 Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'Profile' && (
          <FormCard title="Profile Information" description="Update your administrative identity across the platform.">
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-10 group cursor-pointer">
                 <div className="w-24 h-24 bg-slate-100 rounded-[32px] border-4 border-white shadow-xl flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:border-blue-50 transition-all">
                    <FiUser className="text-4xl" />
                    <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                       <FiImage className="text-white text-xl" />
                    </div>
                 </div>
                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-4">Change Photo</span>
              </div>
              <div>
                <InputLabel>Full Name</InputLabel>
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <InputLabel>Email Address (Read-only)</InputLabel>
                <input 
                  type="email" 
                  value={profileData.email} 
                  readOnly
                  className="w-full px-6 py-4 bg-slate-100 border border-slate-100 rounded-2xl font-bold text-slate-400 outline-none"
                />
              </div>
            </div>
          </FormCard>
        )}

        {activeTab === 'Security' && (
          <FormCard title="Secure Access" description="Keep your administrative account safe with high-entropy passwords.">
            <div className="space-y-6">
              <div>
                <InputLabel>Current Password</InputLabel>
                <input 
                  type="password" 
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputLabel>New Password</InputLabel>
                  <input 
                    type="password" 
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <InputLabel>Confirm Password</InputLabel>
                  <input 
                    type="password" 
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </FormCard>
        )}

        {activeTab === 'System' && (
          <FormCard title="Platform Controls" description="Global flags to tune the entire marketplace engine.">
            <div className="space-y-4">
              <Toggle 
                label="Maintenance Mode" 
                description="Toggle offline state for maintenance" 
                checked={systemData.maintenanceMode}
                onChange={(val) => setSystemData({...systemData, maintenanceMode: val})}
              />
              <Toggle 
                label="Public Registration" 
                description="Allow new users to create accounts" 
                checked={systemData.allowPublicRegistration}
                onChange={(val) => setSystemData({...systemData, allowPublicRegistration: val})}
              />
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                 <InputLabel>Default Job Status</InputLabel>
                 <div className="flex gap-4">
                    {['open', 'closed'].map(s => (
                       <button 
                        key={s}
                        type="button"
                        onClick={() => setSystemData({...systemData, defaultJobStatus: s})}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${systemData.defaultJobStatus === s ? 'bg-white border-blue-100 text-blue-600 shadow-sm' : 'bg-slate-100 border-transparent text-slate-400 hover:text-slate-600'}`}
                       >
                          {s}
                       </button>
                    ))}
                 </div>
              </div>
            </div>
          </FormCard>
        )}

        {activeTab === 'Notifications' && (
          <FormCard title="Alert Preferences" description="Configure when and how you receive administrative updates.">
            <div className="space-y-4">
              <Toggle 
                label="Email Notifications" 
                description="Receive daily system digests" 
                checked={notifData.emailNotifications}
                onChange={(val) => setNotifData({...notifData, emailNotifications: val})}
              />
              <Toggle 
                label="New User Alerts" 
                description="Notify when a new user registers" 
                checked={notifData.newUserNotification}
                onChange={(val) => setNotifData({...notifData, newUserNotification: val})}
              />
              <Toggle 
                label="New Job Alerts" 
                description="Notify when a new job is posted" 
                checked={notifData.newJobNotification}
                onChange={(val) => setNotifData({...notifData, newJobNotification: val})}
              />
            </div>
          </FormCard>
        )}
      </div>

    </div>
  );
};

export default AdminSettings;
