import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCamera, 
  FiPlus, FiX, FiCheckCircle, FiFileText, 
  FiExternalLink, FiPlusCircle, FiTrash2, FiSave, FiBriefcase, FiAlertCircle
} from 'react-icons/fi';
import { ButtonBase, Avatar, LinearProgress, Skeleton, IconButton } from '@mui/material';
import { getAssetUrl } from '../../utils/assets';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Refs for uploads
  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await profileService.updateProfile(profileData);
      setEditMode(false);
      await fetchProfile();
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSaving(true);
    try {
      const data = await profileService.uploadPhoto(file);
      await fetchProfile();
      updateUser({ profileImage: data.profileImage }); // Update navbar avatar
    } catch (error) {
      console.error("Error uploading photo", error);
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSaving(true);
    try {
      await profileService.uploadResume(file);
      await fetchProfile();
    } catch (error) {
      console.error("Error uploading resume", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (skill) => {
    const currentSkills = [...(profileData.skills || [])];
    const index = currentSkills.indexOf(skill);
    if (index > -1) {
      currentSkills.splice(index, 1);
    } else {
      currentSkills.push(skill);
    }
    setProfileData({ ...profileData, skills: currentSkills });
  };

  const addExperience = () => {
    const newExp = { company: '', role: '', duration: '', description: '' };
    setProfileData({ ...profileData, experience: [...(profileData.experience || []), newExp] });
  };

  const removeExperience = (index) => {
    const currentExp = [...profileData.experience];
    currentExp.splice(index, 1);
    setProfileData({ ...profileData, experience: currentExp });
  };

  const updateExperience = (index, field, value) => {
    const currentExp = [...profileData.experience];
    currentExp[index][field] = value;
    setProfileData({ ...profileData, experience: currentExp });
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto pt-12 px-6">
       <Skeleton variant="circular" width={120} height={120} className="mx-auto mb-8" />
       <Skeleton variant="text" height={60} width="60%" className="mx-auto" />
       <Skeleton variant="rounded" height={400} className="mt-12 !rounded-[32px]" />
    </div>
  );

  if (!profileData) return (
    <div className="max-w-4xl mx-auto pt-20 px-6 text-center">
       <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FiAlertCircle size={40} />
       </div>
       <h1 className="text-2xl font-black text-slate-900 uppercase">Architecture Sync Failed</h1>
       <p className="text-slate-500 font-bold mt-2">We couldn't retrieve your professional DNA. Please check your connection or backend configuration.</p>
       <ButtonBase 
         onClick={fetchProfile}
         className="!mt-8 !rounded-2xl !bg-slate-900 !text-white !px-10 !py-4 !text-xs !font-black !uppercase !tracking-widest hover:!bg-indigo-600 transition-all shadow-xl shadow-slate-200"
       >
          Retry Connection
       </ButtonBase>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-32 pt-12 px-6 relative">
      
      {/* 1. COMPLETION HEADER */}
      <div className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative group cursor-pointer" onClick={() => imageInputRef.current?.click()}>
                 <Avatar 
                   src={getAssetUrl(profileData.profileImage)} 
                   sx={{ width: 140, height: 140, bgcolor: '#4f46e5', fontSize: '48px', fontWeight: 900, border: '6px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                 >
                    {profileData.name?.charAt(0).toUpperCase()}
                 </Avatar>
                 <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <FiCamera className="text-white text-2xl" />
                 </div>
                 <input type="file" hidden ref={imageInputRef} onChange={handlePhotoUpload} accept="image/*" />
              </div>
              
              <div className="flex-1 w-full">
                  <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">{profileData.name}</h1>
                        <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">{profileData.email}</p>
                      </div>
                      <ButtonBase 
                        onClick={() => editMode ? handleUpdate() : setEditMode(true)}
                        className={`!rounded-2xl !px-8 !py-3.5 !text-xs !font-black !uppercase !tracking-widest transition-all ${editMode ? '!bg-emerald-600 !text-white' : '!bg-slate-900 !text-white hover:!bg-indigo-600'}`}
                      >
                         {saving ? 'Processing...' : editMode ? <><FiSave className="mr-2" /> Save Profile</> : <><FiEdit3 className="mr-2" /> Edit Digital CV</>}
                      </ButtonBase>
                  </div>
                  
                  <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Architecture Strength</span>
                          <span className="text-sm font-black text-indigo-600">{profileData.completion}%</span>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={profileData.completion} 
                        sx={{ height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#4f46e5' } }} 
                      />
                      <p className="text-[9px] font-bold text-slate-400 mt-2 flex items-center gap-1.5 uppercase">
                         <FiCheckCircle className="text-emerald-500" /> Complete profile to boost discovery by 300%
                      </p>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
          
          {/* 2. PERSONAL INTEL */}
          <section className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8 uppercase flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span> Basic Intelligence
              </h2>
              
              <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location</label>
                          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
                              <FiMapPin className="text-slate-400" />
                              <input 
                                disabled={!editMode}
                                value={profileData.location || ''}
                                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                placeholder="e.g., New Delhi, India"
                                className="bg-transparent outline-none w-full text-sm font-black text-slate-700 placeholder:text-slate-300" 
                              />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Protocol</label>
                          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
                              <FiPhone className="text-slate-400" />
                              <input 
                                disabled={!editMode}
                                value={profileData.phone || ''}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                placeholder="+91 00000 00000"
                                className="bg-transparent outline-none w-full text-sm font-black text-slate-700 placeholder:text-slate-300" 
                              />
                          </div>
                      </div>
                  </div>
                  
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Professional DNA (Bio)</label>
                      <textarea 
                        disabled={!editMode}
                        rows={4}
                        value={profileData.bio || ''}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full bg-slate-50 rounded-2xl p-4 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 resize-none"
                        placeholder="Describe your professional journey and key achievements..."
                      />
                  </div>
              </div>
          </section>

          {/* 3. SKILL STACK */}
          <section className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8 uppercase flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span> Skill Matrix
              </h2>
              
              <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                      {(profileData.skills || []).map((skill) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          key={skill} 
                          className="px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2 group"
                        >
                           {skill}
                           {editMode && <FiX className="cursor-pointer hover:text-rose-500" onClick={() => toggleSkill(skill)} />}
                        </motion.div>
                      ))}
                      {editMode && (
                        <div className="relative">
                            <input 
                              placeholder="Type and enter..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  toggleSkill(e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              className="px-5 py-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-400 min-w-[140px]" 
                            />
                        </div>
                      )}
                  </AnimatePresence>
                  {!profileData.skills?.length && !editMode && (
                    <p className="text-sm font-bold text-slate-300 italic">No skill modules initiated.</p>
                  )}
              </div>
          </section>

          {/* 4. CAREER FLOW (EXPERIENCE) */}
          <section className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span> Experience Flow
                  </h2>
                  {editMode && (
                    <ButtonBase onClick={addExperience} className="!text-indigo-600 !text-xs !font-black !uppercase !tracking-widest flex items-center gap-2 hover:!text-indigo-700">
                       <FiPlusCircle /> Add Milestone
                    </ButtonBase>
                  )}
              </div>

              <div className="space-y-10">
                  {profileData.experience?.length > 0 ? (
                    profileData.experience.map((exp, idx) => (
                      <div key={idx} className="relative pl-10 group">
                          {/* Timeline vertical bar */}
                          {idx !== profileData.experience.length - 1 && (
                            <div className="absolute left-[7px] top-10 bottom-[-40px] w-0.5 bg-slate-100 rounded-full"></div>
                          )}
                          <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-4 border-indigo-600 bg-white z-10"></div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-1">
                                  <input 
                                    disabled={!editMode}
                                    value={exp.role || ''}
                                    onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                                    placeholder="Milestone Role (e.g. Lead Designer)"
                                    className={`bg-transparent outline-none w-full text-lg font-black tracking-tight uppercase ${editMode ? 'text-indigo-600 border-b border-dashed border-indigo-200' : 'text-slate-900'}`}
                                  />
                                  <input 
                                    disabled={!editMode}
                                    value={exp.company || ''}
                                    onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                                    placeholder="Organization Hub"
                                    className={`bg-transparent outline-none w-full text-sm font-bold ${editMode ? 'text-slate-600 border-b border-dashed border-slate-200' : 'text-slate-400 uppercase tracking-widest'}`}
                                  />
                                  <input 
                                    disabled={!editMode}
                                    value={exp.duration || ''}
                                    onChange={(e) => updateExperience(idx, 'duration', e.target.value)}
                                    placeholder="Temporal Window (e.g. 2022 - Present)"
                                    className={`bg-transparent outline-none w-full text-[10px] font-black uppercase tracking-widest ${editMode ? 'text-slate-400 border-b border-dashed border-slate-200' : 'text-slate-300'}`}
                                  />
                              </div>
                              <div className="relative">
                                  <textarea 
                                    disabled={!editMode}
                                    value={exp.description || ''}
                                    onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                                    className="w-full bg-slate-50/50 rounded-2xl p-4 text-xs font-bold text-slate-500 leading-relaxed outline-none border border-transparent focus:bg-white focus:border-indigo-100 resize-none"
                                    placeholder="Describe your core contributions..."
                                    rows={4}
                                  />
                                  {editMode && (
                                    <IconButton 
                                      onClick={() => removeExperience(idx)}
                                      className="!absolute !-top-2 !-right-2 !bg-white !shadow-lg !border !border-slate-100 !text-rose-400 hover:!text-rose-600"
                                      size="small"
                                    >
                                      <FiTrash2 size={14} />
                                    </IconButton>
                                  )}
                              </div>
                          </div>
                      </div>
                    ))
                  ) : !editMode && (
                    <div className="text-center py-10 bg-slate-50 rounded-[24px] border border-dashed border-slate-200">
                        <FiBriefcase className="mx-auto text-slate-300 mb-4" size={32} />
                        <p className="text-sm font-bold text-slate-400">Your career flow is empty.</p>
                    </div>
                  )}
              </div>
          </section>

          {/* 5. RESUME PROTOCOL */}
          <section className="bg-slate-950 rounded-[32px] p-10 md:p-14 text-white relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left">
                      <h2 className="text-2xl font-black tracking-tight leading-loose uppercase">Strategic <span className="text-indigo-400">PDF</span> Resume</h2>
                      <p className="text-slate-400 font-medium text-sm max-w-sm mt-1">
                        Ensure your resume is optimized for ATS sensors. High clarity PDFs are prioritized by recruiters.
                      </p>
                      
                      {profileData.resume && (
                        <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <FiFileText className="text-indigo-400" />
                                <span className="text-xs font-black uppercase tracking-widest max-w-[120px] truncate">{profileData.resumeName || 'resume.pdf'}</span>
                            </div>
                            <ButtonBase 
                              href={getAssetUrl(profileData.resume)} 
                              target="_blank"
                              className="!rounded-2xl !bg-indigo-600 !p-3.5 hover:!bg-indigo-500 transition-all shadow-lg"
                            >
                               <FiExternalLink />
                            </ButtonBase>
                        </div>
                      )}
                  </div>
                  
                  <div className="flex flex-col gap-4 w-full md:w-auto">
                      <ButtonBase 
                        onClick={() => resumeInputRef.current?.click()}
                        className="!rounded-2xl !bg-white !text-slate-900 !px-10 !py-4.5 !text-[11px] !font-black !uppercase !tracking-widest hover:!bg-indigo-400 hover:!text-white transition-all shadow-xl"
                      >
                         {profileData.resume ? 'Update Intelligence' : 'Upload Resume Protocol'}
                      </ButtonBase>
                      <input type="file" hidden ref={resumeInputRef} onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-center">MAX FILE SIZE 10MB • FORMAT PDF/DOCX</p>
                  </div>
              </div>
              
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                 <FiFileText size={240} />
              </div>
          </section>

      </div>
      
      {/* 6. GLOBAL SAVING OVERLAY */}
      <AnimatePresence>
          {saving && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center pointer-events-none"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-1 w-20 bg-slate-100 rounded-full overflow-hidden relative">
                        <motion.div 
                          animate={{ x: [-100, 100] }} 
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="absolute inset-0 bg-indigo-600" 
                        />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Encrypting Changes...</span>
                </div>
            </motion.div>
          )}
      </AnimatePresence>

    </div>
  );
};

const FiEdit3 = ({ className }) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

export default Profile;
