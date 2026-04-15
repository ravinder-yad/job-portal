import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiBriefcase, 
  HiMail, 
  HiPhone, 
  HiLocationMarker 
} from 'react-icons/hi';
import { 
  FiInstagram, 
  FiTwitter, 
  FiLinkedin, 
  FiFacebook,
  FiGithub
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careeers', path: '/careers' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    Resources: [
      { name: 'Find Jobs', path: '/jobs' },
      { name: 'Companies', path: '/companies' },
      { name: 'Salaries', path: '/salaries' },
      { name: 'Job Alerts', path: '/alerts' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Status', path: '/status' },
      { name: 'API Docs', path: '/api' },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-50/30 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-100 flex items-center justify-center text-white">
                <HiBriefcase size={22} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-[1000] text-slate-800 tracking-tighter">Hire</span>
                <span className="text-2xl font-[1000] text-violet-600 tracking-tighter">Hub</span>
              </div>
            </div>
            <p className="text-slate-500 font-medium mb-8 max-w-sm leading-relaxed">
              The world's #1 job portal for tech enthusiasts and top-tier companies. Connect, grow, and land your dream career with our AI-powered matchmaking.
            </p>
            <div className="flex space-x-4">
              {[FiInstagram, FiTwitter, FiLinkedin, FiFacebook, FiGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-100 hover:bg-violet-50 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-500 hover:text-violet-600 font-bold transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-bold text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="text-slate-900">&copy; {currentYear} HireHub Inc.</span>
            <span className="hidden md:inline">Managed by RK Tech</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
               <span>System Status: All systems go</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
