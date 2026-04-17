import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiBriefcase } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/useAuth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user'); // 'user' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      login({
        token: data.token,
        user: data.user,
      });

      setSuccess(data.message || 'Account created successfully.');
      setTimeout(() => {
        if (data.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/profile');
        }
      }, 700);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Your Account 🚀" 
      subtitle="Join thousands of professionals and top companies connecting every day."
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Sign up</h2>
        <p className="text-slate-500 font-medium">Create an account to start your journey.</p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label 
            className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-all ${
              role === 'user' 
              ? 'border-indigo-600 bg-indigo-50/50' 
              : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            <input 
              type="radio" 
              name="role" 
              value="user" 
              className="peer sr-only" 
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${role === 'user' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-400'}`}>
              <FiUser className="text-xl" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${role === 'user' ? 'text-indigo-900' : 'text-slate-700'}`}>Job Seeker</h4>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Find jobs</p>
            </div>
          </label>

          <label 
            className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-all ${
              role === 'admin' 
              ? 'border-purple-600 bg-purple-50/50' 
              : 'border-slate-200 hover:border-purple-300'
            }`}
          >
            <input 
              type="radio" 
              name="role" 
              value="admin" 
              className="peer sr-only" 
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${role === 'admin' ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-slate-100 text-slate-400'}`}>
              <FiBriefcase className="text-xl" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${role === 'admin' ? 'text-purple-900' : 'text-slate-700'}`}>Admin</h4>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Hire talent</p>
            </div>
          </label>
        </div>

        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <FiUser className="text-xl" />
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:font-normal placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Email Input */}
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
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:font-normal placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <FiLock className="text-xl" />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password" 
              className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 placeholder:font-normal"
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

        {/* Password strength meter mock */}
        <div className="flex gap-1.5 mt-2">
          <div className="h-1.5 w-1/4 rounded-full bg-slate-200"></div>
          <div className="h-1.5 w-1/4 rounded-full bg-slate-200"></div>
          <div className="h-1.5 w-1/4 rounded-full bg-slate-200"></div>
          <div className="h-1.5 w-1/4 rounded-full bg-slate-200"></div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </p>
        )}

        {/* Register Button */}
        <div className="pt-4">
          <ButtonBase 
            type="submit"
            disabled={!name || !email || !password || isSubmitting}
            className={`!w-full !rounded-xl !py-4 !text-sm !font-bold transition-all ${
              (!name || !email || !password || isSubmitting)
                ? '!bg-slate-100 !text-slate-400'
                : '!bg-gradient-to-r !from-indigo-600 !to-indigo-500 !text-white hover:!shadow-lg hover:!shadow-indigo-500/30 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </ButtonBase>
        </div>

      </form>

      {/* Switch Link */}
      <p className="mt-8 text-center text-sm font-medium text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
          Sign in
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Register;
