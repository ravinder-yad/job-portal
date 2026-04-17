import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 pt-20 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* 1. BRAND + ABOUT */}
          <div className="sm:col-span-2 md:col-span-12 lg:col-span-3 lg:pr-8">
            <Link to="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <svg 
                className="w-10 h-10 transition-all duration-300 group-hover:scale-[1.1] group-hover:-rotate-6 drop-shadow-sm" 
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#footer-grad)" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#footer-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="footer-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Jobify
              </span>
            </Link>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Connecting top-tier talent with the world's most innovative companies. Your next opportunity starts here.
            </p>
            
            {/* SOCIAL ICONS */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white hover:scale-110 transition-all shadow-sm">
                <FiLinkedin />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all shadow-sm">
                <FiTwitter />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-indigo-500 hover:text-white hover:scale-110 transition-all shadow-sm">
                <FiInstagram />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all shadow-sm">
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Quick Links
              <span className="ml-2 w-8 h-[2px] bg-indigo-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-indigo-400 hover:underline decoration-indigo-400 underline-offset-4 transition-all flex items-center group"><FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Home</Link></li>
              <li><Link to="/jobs" className="hover:text-indigo-400 hover:underline decoration-indigo-400 underline-offset-4 transition-all flex items-center group"><FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-indigo-400 hover:underline decoration-indigo-400 underline-offset-4 transition-all flex items-center group"><FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Companies</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 hover:underline decoration-indigo-400 underline-offset-4 transition-all flex items-center group"><FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> About Us</Link></li>
              <li><Link to="#" className="hover:text-indigo-400 hover:underline decoration-indigo-400 underline-offset-4 transition-all flex items-center group"><FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Contact</Link></li>
            </ul>
          </div>

          {/* 3. JOB LINKS */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Job Links
              <span className="ml-2 w-8 h-[2px] bg-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Browse Jobs</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Remote Jobs <span className="ml-2 text-[10px] py-0.5 px-2 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">Hot</span></Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Part-time Jobs</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Fresher Jobs</Link></li>
            </ul>
          </div>

          {/* 4. SUPPORT */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Support
              <span className="ml-2 w-8 h-[2px] bg-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* 5. NEWSLETTER */}
          <div className="sm:col-span-2 md:col-span-8 md:col-start-3 lg:col-span-3 lg:col-start-10 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
            <h3 className="text-white font-bold text-lg mb-2 flex items-center relative z-10">
              Newsletter
            </h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">
              Get the latest jobs directly in your inbox. No spam, ever.
            </p>
            <form className="relative z-10 space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-slate-500" />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl outline-none text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
              <ButtonBase className="!w-full !rounded-xl !bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !py-3 !text-sm !font-bold hover:!shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:!scale-[1.02] transition-all">
                Subscribe Now
              </ButtonBase>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Jobify Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="w-1 h-1 rounded-full bg-slate-700 self-center"></div>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <div className="w-1 h-1 rounded-full bg-slate-700 self-center hidden sm:block"></div>
            <Link to="#" className="hover:text-white transition-colors hidden sm:block">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;