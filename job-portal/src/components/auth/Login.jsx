import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/useAuth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      login({
        token: data.token,
        user: data.user,
      });

      setSuccess(data.message || 'Login successful.');
      setTimeout(() => {
        if (data.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/profile');
        }
      }, 700);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Log in to access your saved jobs, applications, and recommendations."
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Sign in</h2>
        <p className="text-slate-500 font-medium">Please enter your details to continue.</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>

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
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:font-normal placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <FiLock className="text-xl" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
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

        {/* Remember me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-600 cursor-pointer">
            Remember me for 30 days
          </label>
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

        {/* Login Button */}
        <div className="pt-2">
          <ButtonBase
            type="submit"
            disabled={!email || !password || isSubmitting}
            className={`!w-full !rounded-xl !py-4 !text-sm !font-bold transition-all ${(!email || !password || isSubmitting)
                ? '!bg-slate-100 !text-slate-400'
                : '!bg-gradient-to-r !from-indigo-600 !to-indigo-500 !text-white hover:!shadow-lg hover:!shadow-indigo-500/30 hover:-translate-y-0.5'
              }`}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </ButtonBase>
        </div>

      </form>

      {/* Divider */}
      <div className="mt-8 mb-6 flex items-center">
        <div className="flex-1 border-t border-slate-200"></div>
        <span className="px-4 text-sm font-bold text-slate-400">OR</span>
        <div className="flex-1 border-t border-slate-200"></div>
      </div>

      {/* Google Login */}
      <ButtonBase className="!w-full !rounded-xl !bg-white !border !border-slate-200 !py-3.5 hover:!bg-slate-50 transition-colors flex items-center justify-center gap-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5" preserveAspectRatio="xMidYMid meet">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span className="font-bold text-slate-700 text-sm">Continue with Google</span>
      </ButtonBase>

      {/* Switch Link */}
      <p className="mt-8 text-center text-sm font-medium text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
          Sign up
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Login;
