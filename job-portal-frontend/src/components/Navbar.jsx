import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiHome,
  HiBriefcase,
  HiInformationCircle,
  HiPhone,
  HiOutlineLogin,
  HiUserAdd,
  HiMenu,
  HiX,
  HiPlusCircle,
  HiViewGrid,
  HiUserCircle,
  HiSearch,
} from 'react-icons/hi';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { FiSearch } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsChatDots } from 'react-icons/bs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authStatus, setAuthStatus] = useState('guest'); // 'guest', 'candidate', 'employer'
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const location = useLocation();

  const roleDropdownRef = useRef(null);
  const searchModalRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals/dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setIsSearchModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search modal on escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsSearchModalOpen(false);
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when mobile menu or search modal is open
  useEffect(() => {
    if (isOpen || isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSearchModalOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <HiHome size={18} /> },
    { name: 'Jobs', path: '/jobs', icon: <HiBriefcase size={18} /> },
    { name: 'Companies', path: '/companies', icon: <HiMiniBuildingOffice size={18} /> },
    { name: 'About', path: '/about', icon: <HiInformationCircle size={18} /> },
    { name: 'Contact', path: '/contact', icon: <HiPhone size={18} /> },
  ];

  // Categories for search modal
  const searchCategories = [
    'Technology',
    'Healthcare',
    'Finance',
    'Marketing',
    'Education',
    'Remote',
    'Design',
    'Sales',
  ];

  const LogoIcon = () => (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="relative">
        <div className="p-2.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-100 flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <HiBriefcase size={22} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-400 border-2 border-white rounded-full shadow-sm" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-2xl font-[1000] text-slate-800 tracking-tighter leading-none mb-1">Hire</span>
          <span className="text-2xl font-[1000] text-violet-600 tracking-tighter leading-none mb-1">Hub</span>
        </div>
        <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none ml-0.5">Connect & Grow</span>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
            ? 'bg-white/80 backdrop-blur-md border-violet-100 shadow-lg'
            : 'bg-white border-transparent shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <LogoIcon />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                          ? 'bg-violet-50 text-violet-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-violet-600'
                        }`}
                    >
                      <span className="opacity-70">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Button - Opens Centered Modal */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 rounded-lg transition-all duration-200 text-slate-500 hover:bg-slate-100 hover:text-violet-600"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>

              {/* Guest View */}
              {authStatus === 'guest' && (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors"
                  >
                    Login
                  </Link>

                  {/* Register Dropdown */}
                  <div className="relative" ref={roleDropdownRef}>
                    <button
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 bg-violet-600 rounded-lg shadow-md text-white text-sm font-semibold transition-all hover:bg-violet-700 hover:scale-105 active:scale-95"
                    >
                      <HiUserAdd size={16} />
                      <span>Register</span>
                      <MdKeyboardArrowDown size={16} />
                    </button>

                    {showRoleDropdown && (
                      <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-slideDown">
                        <button
                          onClick={() => {
                            setAuthStatus('candidate');
                            setShowRoleDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors flex items-center space-x-2"
                        >
                          <HiUserCircle size={18} />
                          <span>As Candidate</span>
                        </button>
                        <button
                          onClick={() => {
                            setAuthStatus('employer');
                            setShowRoleDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors flex items-center space-x-2"
                        >
                          <HiMiniBuildingOffice size={18} />
                          <span>As Employer</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Candidate View */}
              {authStatus === 'candidate' && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-500 hover:text-violet-600 relative transition-colors">
                    <IoNotificationsOutline size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <button className="p-2 text-slate-500 hover:text-violet-600 transition-colors">
                    <BsChatDots size={19} />
                  </button>
                  <button
                    onClick={() => setAuthStatus('guest')}
                    className="flex items-center space-x-2 pl-3 ml-1 border-l border-slate-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600 font-semibold shadow-sm overflow-hidden">
                      <img
                        src="https://i.pravatar.cc/100?img=7"
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <MdKeyboardArrowDown size={18} className="text-slate-400 group-hover:text-violet-500" />
                  </button>
                </div>
              )}

              {/* Employer View */}
              {authStatus === 'employer' && (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/post-job"
                    className="hidden md:flex items-center space-x-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-teal-100 transition-all"
                  >
                    <HiPlusCircle size={18} />
                    <span>Post Job</span>
                  </Link>
                  <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors">
                    <HiViewGrid size={20} />
                  </button>
                  <button
                    onClick={() => setAuthStatus('guest')}
                    className="flex items-center space-x-2 pl-3 ml-1 border-l border-slate-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-600 font-semibold shadow-sm overflow-hidden">
                      <img
                        src="https://i.pravatar.cc/100?img=3"
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <MdKeyboardArrowDown size={18} className="text-slate-400 group-hover:text-teal-500" />
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Centered Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all animate-fadeIn">
          <div
            ref={searchModalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all animate-scaleIn"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">Search Jobs & Companies</h3>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <HiX size={24} />
                </button>
              </div>

              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-violet-400 focus:bg-white outline-none rounded-xl py-3 pl-10 pr-4 text-slate-700 transition-all"
                  autoFocus
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-600 mb-3">Popular Categories</p>
                <div className="flex flex-wrap gap-2">
                  {searchCategories.map((category) => (
                    <button
                      key={category}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-violet-100 hover:text-violet-700 transition-colors"
                      onClick={() => {
                        // Optionally set search input value or navigate
                        console.log(`Selected category: ${category}`);
                        setIsSearchModalOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="w-full py-2.5 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer (unchanged) */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-center">
                <LogoIcon />
              </div>
            </div>

            <div className="flex-1 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 px-6 py-4 text-base font-semibold transition-all ${location.pathname === link.path
                      ? 'bg-violet-50 text-violet-600 border-r-4 border-violet-600'
                      : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="opacity-60">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 space-y-3">
              {authStatus === 'guest' ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg font-semibold bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiOutlineLogin size={18} />
                    <span>Login</span>
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setAuthStatus('candidate');
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 py-3 bg-violet-600 rounded-lg font-semibold text-white hover:bg-violet-700 transition-colors"
                    >
                      <HiUserCircle size={18} />
                      <span>Candidate</span>
                    </button>
                    <button
                      onClick={() => {
                        setAuthStatus('employer');
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 py-3 bg-teal-600 rounded-lg font-semibold text-white hover:bg-teal-700 transition-colors"
                    >
                      <HiMiniBuildingOffice size={18} />
                      <span>Employer</span>
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAuthStatus('guest');
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;