import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight, FiCheckCircle, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';
import AuthLayout from './AuthLayout';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendLink = (e) => {
    e.preventDefault();
    if(email) setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if(entered.length === 4) setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Redirect to login or show success (dummy state)
    alert("Password reset successfully. Please log in.");
    window.location.href = '/login';
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Focus next logic could go here
  };

  return (
    <AuthLayout 
      title="Reset Password 🔐" 
      subtitle="Don't worry, it happens to the best of us."
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
          {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'New Password'}
        </h2>
        <p className="text-slate-500 font-medium">
          {step === 1 
            ? 'Enter your email and we\'ll send you a reset code.' 
            : step === 2 
            ? `We sent a 4-digit code to ${email}`
            : 'Create a strong, secure new password.'}
        </p>
      </div>

      {step === 1 && (
        <form className="space-y-6" onSubmit={handleSendLink}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <FiMail className="text-xl" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:font-normal placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <ButtonBase 
            type="submit"
            disabled={!email}
            className={`!w-full !rounded-xl !py-4 !text-sm !font-bold transition-all flex items-center justify-center gap-2 ${
              !email 
              ? '!bg-slate-100 !text-slate-400' 
              : '!bg-gradient-to-r !from-indigo-600 !to-indigo-500 !text-white hover:!shadow-lg hover:!shadow-indigo-500/30'
            }`}
          >
            Send Reset Code <FiArrowRight className="text-lg" />
          </ButtonBase>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-6" onSubmit={handleVerifyOTP}>
          <div className="flex gap-4 justify-between mt-4">
            {otp.map((digit, index) => (
              <input 
                key={index}
                type="text" 
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                className="w-16 h-16 text-center text-2xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            ))}
          </div>
          
          <div className="flex justify-center text-sm font-bold text-slate-500 mt-2">
            Didn't receive code? <button type="button" className="text-indigo-600 hover:text-indigo-700 ml-1">Resend OTP</button>
          </div>

          <ButtonBase 
            type="submit"
            disabled={otp.join('').length < 4}
            className={`!w-full !rounded-xl !py-4 !text-sm !font-bold transition-all ${
              otp.join('').length < 4 
              ? '!bg-slate-100 !text-slate-400' 
              : '!bg-gradient-to-r !from-indigo-600 !to-indigo-500 !text-white hover:!shadow-lg hover:!shadow-indigo-500/30'
            }`}
          >
            Verify OTP
          </ButtonBase>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">New Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <FiLock className="text-xl" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Create a strong password" 
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Confirm Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <FiCheckCircle className="text-xl" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Repeat password" 
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
                required
              />
            </div>
          </div>

          <ButtonBase 
            type="submit"
            className="!w-full !rounded-xl !py-4 !text-sm !font-bold transition-all !bg-gradient-to-r !from-indigo-600 !to-indigo-500 !text-white hover:!shadow-lg hover:!shadow-indigo-500/30 mt-4"
          >
            Update Password
          </ButtonBase>
        </form>
      )}

      {/* Switch Link */}
      <div className="mt-8 text-center text-sm font-medium text-slate-600 flex justify-center items-center">
        {step > 1 && (
           <button onClick={() => setStep(step - 1)} className="font-bold text-indigo-600 hover:text-indigo-700 mr-4">
             &larr; Back
           </button>
        )}
        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
          Return to Login
        </Link>
      </div>

    </AuthLayout>
  );
};

export default ForgotPassword;
