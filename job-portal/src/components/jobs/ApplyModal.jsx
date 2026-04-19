import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiUpload, FiCheckCircle, FiFileText, 
  FiUser, FiMail, FiPhone, FiSend, FiLoader
} from 'react-icons/fi';
import { ButtonBase, TextField, IconButton, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/useAuth';
import { getAssetUrl } from '../../utils/assets';

const ApplyModal = ({ job, onClose }) => {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    coverLetter: '',
    resume: user?.resume || ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      let resumeUrl = formData.resume;

      // 1. If a new file is uploaded, handle it first
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append('resume', selectedFile);
        const uploadRes = await axios.post('http://localhost:7001/api/user/upload-resume', fileData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        resumeUrl = uploadRes.data.resume;
      }

      // 2. Submit Application
      await axios.post('http://localhost:7001/api/applications/apply', {
        jobId: job._id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resume: resumeUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || "Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6">
           <IconButton onClick={onClose} className="!bg-slate-50 hover:!bg-rose-50 hover:!text-rose-500 transition-all"><FiX /></IconButton>
        </div>

        {success ? (
          <div className="p-12 text-center py-24">
             <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8">
                <FiCheckCircle size={48} />
             </div>
             <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase">Mission Accomplished!</h2>
             <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">Your intelligence briefing has been transmitted to the organization successfully.</p>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <div className="mb-10">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">Initialize Deployment</h2>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Applying for: <span className="text-indigo-600">{job.title}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Identity</label>
                     <div className="relative">
                        <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Comm Channel</label>
                     <div className="relative">
                        <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          required
                          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all"
                          placeholder="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Liaison</label>
                  <div className="relative">
                     <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                       required
                       className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all"
                       placeholder="Mobile Number"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Strategy & Vision (Cover Letter)</label>
                  <textarea 
                    className="w-full h-32 bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-700 outline-none focus:border-indigo-600 transition-all resize-none"
                    placeholder="Briefly describe your tactical advantage for this role..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                  />
               </div>

               {/* RESUME SECTION */}
               <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100/50">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg"><FiFileText size={24} /></div>
                        <div>
                           <p className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Intelligence File (Resume)</p>
                           <p className="text-[10px] font-bold text-slate-500 mt-1 max-w-[180px] truncate">
                             {selectedFile ? selectedFile.name : (formData.resume ? "Using Profile Resume" : "Upload required")}
                           </p>
                        </div>
                     </div>
                     <label className="cursor-pointer">
                        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        <span className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                           <FiUpload /> Change File
                        </span>
                     </label>
                  </div>
               </div>

               <ButtonBase 
                 type="submit"
                 disabled={loading}
                 className="!w-full !rounded-[24px] !bg-slate-900 !py-6 !font-black !uppercase !tracking-widest !text-white hover:!bg-indigo-600 transition-all shadow-xl disabled:!opacity-50"
               >
                  {loading ? <FiLoader className="animate-spin text-xl" /> : (
                    <span className="flex items-center gap-3"><FiSend /> Deploy Briefing</span>
                  )}
               </ButtonBase>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ApplyModal;
