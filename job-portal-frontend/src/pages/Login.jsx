import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiLock, FiEye, FiEyeOff, 
  FiSmartphone, FiChevronRight, FiBriefcase,
  FiArrowLeft, FiCheckCircle
} from 'react-icons/fi';
import { FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('email'); // 'email' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Authentication
    setTimeout(() => {
      setLoading(false);
      toast.success(loginMode === 'email' ? 'Welcome back, User!' : 'OTP Verified Successfully!', {
        icon: '🔐',
        style: {
          borderRadius: '16px',
          background: '#111827',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
      navigate('/');
    }, 1500);
  };

  const socialLogins = [
    { name: 'Google', icon: <FaGoogle />, color: 'hover:bg-red-50 hover:text-red-600 hover:border-red-100' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden min-h-[700px]"
      >
        
        {/* ========== LEFT SIDE: BRANDING ========== */}
        <div className="hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br from-violet-600 to-indigo-700 text-white relative h-full">
           <div className="relative z-10">
              <Link to="/" className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 mb-12 hover:bg-white/20 transition-all">
                 <FiArrowLeft /> <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
              </Link>

              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-8 border border-white/10">
                 <FiBriefcase size={40} className="text-white" />
              </div>

              <h1 className="text-6xl font-[1000] tracking-tighter leading-[0.9] mb-8">
                 Welcome <br /> 
                 <span className="text-teal-300">Back!</span>
              </h1>
              
              <p className="text-violet-100 text-xl font-bold max-w-sm mb-12 leading-relaxed opacity-80">
                 Login to continue your journey and find the perfect career opportunity waiting for you.
              </p>

              <div className="space-y-6">
                 {[
                   'Personalized job recommendations',
                   'Instantly apply with saved resume',
                   'Direct chat with top recruiters'
                 ].map((text, i) => (
                    <div key={i} className="flex items-center space-x-3">
                       <FiCheckCircle className="text-teal-400" />
                       <span className="text-sm font-bold opacity-90">{text}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Decorative Blobs */}
           <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-[80px]" />
        </div>

        {/* ========== RIGHT SIDE: LOGIN FORM ========== */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative bg-white">
           <div className="max-w-md mx-auto w-full">
              
              {/* Header */}
              <div className="mb-10 text-center lg:text-left">
                 <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter mb-2">Member Login</h2>
                 <p className="text-slate-500 font-bold">
                    Don’t have an account? <Link to="/register" className="text-violet-600 hover:underline">Sign up for free</Link>
                 </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                 <button 
                  onClick={() => setLoginMode('email')}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMode === 'email' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    Email
                 </button>
                 <button 
                  onClick={() => setLoginMode('otp')}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMode === 'otp' ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    OTP / Phone
                 </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                 <AnimatePresence mode="wait">
                    {loginMode === 'email' ? (
                       <motion.div 
                        key="email"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                       >
                          <div className="space-y-2">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                             <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -track-y-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                <input 
                                  type="email" 
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                  placeholder="name@company.com" 
                                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all"
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-black text-violet-600 uppercase tracking-widest hover:underline">Forgot?</button>
                             </div>
                             <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                <input 
                                  type={showPassword ? "text" : "password"} 
                                  required
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                  placeholder="••••••••" 
                                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all"
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600"
                                >
                                   {showPassword ? <FiEyeOff /> : <FiEye />}
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
                        className="space-y-4"
                       >
                          <div className="space-y-2">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                             <div className="relative group">
                                <FiSmartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                                <input 
                                  type="tel" 
                                  required
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                  placeholder="+91 XXXXX XXXXX" 
                                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all"
                                />
                             </div>
                             <button type="button" className="w-full text-center text-[10px] font-black text-violet-600 uppercase tracking-widest py-2 hover:underline">Send OTP</button>
                          </div>

                          <div className="space-y-2">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Enter OTP</label>
                             <input 
                               type="text" 
                               maxLength="6"
                               value={formData.otp}
                               onChange={(e) => setFormData({...formData, otp: e.target.value})}
                               placeholder="1 2 3 4 5 6" 
                               className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-center text-2xl tracking-[0.5em] text-slate-700 outline-none focus:border-violet-600 focus:bg-white transition-all"
                             />
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>

                 {/* Remember Me */}
                 <div className="flex items-center px-1">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 border-slate-200" />
                    <label htmlFor="remember" className="ml-2 text-sm font-bold text-slate-500 cursor-pointer">Remember me for 30 days</label>
                 </div>

                 {/* Submit Button */}
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-violet-600 to-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-violet-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                 >
                    {loading ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <>
                          <span>Login Securely</span>
                          <FiChevronRight size={18} />
                       </>
                    )}
                 </button>
              </form>

              {/* Social Login Section */}
              <div className="mt-12">
                 <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute inset-0 flex items-center">
                       <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <span className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Or login with</span>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    {socialLogins.map((social, i) => (
                       <button 
                        key={i}
                        className={`flex items-center justify-center space-x-3 py-4 border border-slate-100 rounded-2xl transition-all duration-300 ${social.color}`}
                       >
                          <span className="text-xl">{social.icon}</span>
                          <span className="text-xs font-black uppercase tracking-widest">{social.name}</span>
                       </button>
                    ))}
                 </div>
              </div>

           </div>
           
           {/* Footer Quote */}
           <div className="mt-12 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                 Protected by HireHub Security Systems
              </p>
           </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
