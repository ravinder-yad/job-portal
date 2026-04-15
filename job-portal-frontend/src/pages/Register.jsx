import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiLock, FiUser, FiSmartphone, 
  FiCheckCircle, FiArrowLeft, FiChevronRight,
  FiEye, FiEyeOff, FiShield, FiClock
} from 'react-icons/fi';
import { HiOfficeBuilding } from 'react-icons/hi';
import { FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Form, 1: OTP
  const [role, setRole] = useState('candidate');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 to 3
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[0-9]/.test(formData.password) && /[a-z]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
      return;
    }
    
    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep(1);
      toast.success('OTP sent to ' + (formData.phone || 'your phone'), {
        icon: '📱',
        duration: 4000,
        style: { borderRadius: '12px', background: '#111827', color: '#fff' }
      });
      // Mock OTP Notification
      setTimeout(() => {
        toast('Your mock OTP is: 123456', { icon: '🔑', duration: 6000 });
      }, 1000);
    }, 1500);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.otp !== '123456') {
      toast.error('Invalid OTP! Please try 123456', {
        style: { borderRadius: '12px', background: '#EF4444', color: '#fff' }
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Account Created! Welcome to HireHub', {
        icon: '🎉',
        style: { borderRadius: '16px', background: '#111827', color: '#fff', fontWeight: 'bold' }
      });
      navigate('/login');
    }, 1500);
  };

  const benefits = [
    { title: 'Wide Search', desc: 'Find your dream job from 10k+ active listings.', icon: <FiShield /> },
    { title: 'Match Making', desc: 'Smarter matching algorithm for better roles.', icon: <FiCheckCircle /> },
    { title: 'Direct Reach', desc: 'Talk directly to people before you apply.', icon: <FiMail /> }
  ];

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-slate-200';
    if (passwordStrength === 1) return 'bg-red-400';
    if (passwordStrength === 2) return 'bg-amber-400';
    return 'bg-teal-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'Too Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 pt-24 pb-12 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden min-h-[750px]"
      >
        
        {/* ========== LEFT SIDE: BRANDING ========== */}
        <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-500 text-white relative h-full">
           <div className="relative z-10">
              <Link to="/" className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 mb-12 hover:bg-white/20 transition-all">
                 <FiArrowLeft /> <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
              </Link>

              <h1 className="text-6xl font-[1000] tracking-tighter leading-[0.9] mb-12">
                 Join the <br /> 
                 <span className="text-teal-200">Community.</span>
              </h1>
              
              <div className="space-y-10">
                 {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-5 group">
                       <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-all border border-white/10 text-teal-300">
                          {benefit.icon}
                       </div>
                       <div>
                          <h4 className="font-black text-xl mb-1">{benefit.title}</h4>
                          <p className="text-white/60 font-bold text-sm leading-relaxed max-w-[240px]">{benefit.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Decorative Blobs */}
           <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-[80px]" />
        </div>

        {/* ========== RIGHT SIDE: REGISTER FORM / OTP ========== */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative bg-white overflow-hidden">
           <AnimatePresence mode="wait">
              {step === 0 ? (
                 <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-md mx-auto w-full"
                 >
                    {/* Header */}
                    <div className="mb-8 text-center lg:text-left">
                       <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter mb-2">Create Account</h2>
                       <p className="text-slate-500 font-bold">
                          Already have an account? <Link to="/login" className="text-violet-600 hover:underline">Log in now</Link>
                       </p>
                    </div>

                    {/* Role Selection */}
                    <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
                       <button 
                        onClick={() => setRole('candidate')}
                        className={`flex items-center justify-center space-x-2 flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'candidate' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                       >
                          <FiUser /> <span>Candidate</span>
                       </button>
                       <button 
                        onClick={() => setRole('employer')}
                        className={`flex items-center justify-center space-x-2 flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'employer' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                       >
                          <HiOfficeBuilding /> <span>Employer</span>
                       </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleInitialSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                              <div className="relative group">
                                 <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                 <input 
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="John Doe" 
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all text-sm"
                                 />
                              </div>
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                              <div className="relative group">
                                 <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                 <input 
                                    type="tel" required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    placeholder="+91 88888 88888" 
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all text-sm"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                           <div className="relative group">
                              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                              <input 
                                 type="email" required
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 placeholder="john@example.com" 
                                 className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all text-sm"
                              />
                           </div>
                        </div>

                        <div className="space-y-1.5 relative">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Choose Password</label>
                           <div className="relative group">
                              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                              <input 
                                 type={showPassword ? "text" : "password"} required
                                 value={formData.password}
                                 onChange={(e) => setFormData({...formData, password: e.target.value})}
                                 placeholder="••••••••" 
                                 className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all text-sm"
                              />
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600 transition-colors">
                                 {showPassword ? <FiEyeOff /> : <FiEye />}
                              </button>
                           </div>
                           {/* Strength Meter */}
                           <div className="mt-2 flex items-center space-x-2 px-1">
                              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(passwordStrength + 1) * 25}%` }}
                                    className={`h-full ${getStrengthColor()} transition-colors duration-500`}
                                 />
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-wider ${passwordStrength === 3 ? 'text-teal-600' : 'text-slate-400'}`}>
                                 {getStrengthText()}
                              </span>
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                           <div className="relative group">
                              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                              <input 
                                 type="password" required
                                 value={formData.confirmPassword}
                                 onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                 placeholder="••••••••" 
                                 className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all text-sm"
                              />
                           </div>
                        </div>

                       <div className="flex items-start px-1">
                          <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded text-violet-600 border-slate-200" />
                          <label htmlFor="terms" className="ml-2 text-[11px] font-bold text-slate-500 leading-tight">
                            I agree to the <span className="text-violet-600 underline">Terms</span> & <span className="text-violet-600 underline">Privacy Policy</span>
                          </label>
                       </div>

                       <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4.5 bg-gradient-to-r from-violet-600 to-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-violet-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 py-4"
                       >
                          {loading ? (
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                             <>
                                <span>Get Started</span>
                                <FiChevronRight size={18} />
                             </>
                          )}
                       </button>
                    </form>

                    {/* Socials */}
                    <div className="mt-10">
                       <div className="relative flex items-center justify-center mb-6">
                          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                          <span className="relative px-3 bg-white text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Or join with</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-widest">
                          <button className="flex items-center justify-center space-x-2 py-3.5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                             <FaGoogle className="text-red-500" /> <span>Google</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 py-3.5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                             <FaLinkedinIn className="text-blue-600" /> <span>LinkedIn</span>
                          </button>
                       </div>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-md mx-auto w-full text-center"
                 >
                    <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-violet-600 text-3xl">
                       <FiSmartphone />
                    </div>
                    
                    <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter mb-4">Verification</h2>
                    <p className="text-slate-500 font-bold mb-10 px-6">
                       We've sent a 6-digit verification code to <span className="text-slate-900">{formData.phone}</span>. Please enter it below.
                    </p>

                    <form onSubmit={handleOtpSubmit} className="space-y-10">
                       <input 
                          type="text" 
                          required
                          maxLength="6"
                          value={formData.otp}
                          onChange={(e) => setFormData({...formData, otp: e.target.value})}
                          placeholder="0 0 0 0 0 0" 
                          className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-black text-center text-4xl tracking-[0.6em] text-violet-600 outline-none focus:bg-white focus:border-violet-600 transition-all shadow-inner"
                       />

                       <div className="space-y-4">
                          <button 
                           type="submit" 
                           disabled={loading}
                           className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                          >
                             {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             ) : (
                                <>
                                   <span>Verify & Complete</span>
                                   <FiCheckCircle size={18} />
                                </>
                             )}
                          </button>

                          <div className="flex items-center justify-center space-x-2 text-slate-400 py-4">
                             <FiClock size={16} />
                             <span className="text-xs font-black uppercase tracking-widest">Resend in <span className="text-slate-900">00:59</span></span>
                          </div>

                          <button 
                           type="button" 
                           onClick={() => setStep(0)}
                           className="text-xs font-black text-violet-600 uppercase tracking-widest hover:underline"
                          >
                             Edit phone number?
                          </button>
                       </div>
                    </form>
                 </motion.div>
              )}
           </AnimatePresence>

           {/* Footer Branding */}
           <div className="mt-12 text-center opacity-30">
              <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                 HireHub Secure Onboarding v2.0
              </p>
           </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Register;
