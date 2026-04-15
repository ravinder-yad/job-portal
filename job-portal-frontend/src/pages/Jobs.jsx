import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiMapPin, FiBriefcase, FiDollarSign, FiHeart,
  FiFilter, FiX, FiClock, FiTrendingUp, FiCheckCircle,
  FiBookmark, FiShare2, FiEye, FiSliders, FiChevronDown
} from 'react-icons/fi';
import {
  HiOutlineLocationMarker, HiOutlineOfficeBuilding,
  HiOutlineCalendar, HiOutlineCurrencyDollar,
  HiOutlineSparkles, HiOutlineBadgeCheck
} from 'react-icons/hi';
import { Toaster, toast } from 'react-hot-toast';

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    salaryRange: '',
    experience: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Expanded jobs data (with realistic data)
  const jobsData = [
    {
      id: 1,
      title: "Senior UI/UX Designer",
      company: "Linear",
      logo: "https://logo.clearbit.com/linear.app",
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      salaryNum: 150000,
      type: "Full-time",
      tags: ["Figma", "Design Systems", "UI/UX"],
      isUrgent: true,
      fitScore: 95,
      experience: "5+ years",
      posted: "2 days ago",
      postedDate: new Date(Date.now() - 2 * 86400000),
      description: "Join the design team at Linear and help build the next generation of software tools. We're looking for someone with a sharp eye for detail and a deep understanding of user behavior.",
      requirements: ["5+ years of UI/UX design experience", "Expert in Figma and design systems", "Portfolio demonstrating complex applications"]
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Vercel",
      logo: "https://logo.clearbit.com/vercel.com",
      location: "Remote",
      salary: "$140k - $210k",
      salaryNum: 175000,
      type: "Remote",
      tags: ["Node.js", "TypeScript", "AWS"],
      isUrgent: false,
      fitScore: 88,
      experience: "3+ years",
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 86400000),
      description: "Scale the web with Vercel. We need experts in distributed systems and high-performance APIs to join our core backend team.",
      requirements: ["3+ years backend development", "Strong Node.js and TypeScript", "Experience with AWS or similar cloud"]
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Stripe",
      logo: "https://logo.clearbit.com/stripe.com",
      location: "London, UK",
      salary: "$110k - $160k",
      salaryNum: 135000,
      type: "Full-time",
      tags: ["Strategy", "Payments", "SQL"],
      isUrgent: true,
      fitScore: 82,
      experience: "4+ years",
      posted: "3 days ago",
      postedDate: new Date(Date.now() - 3 * 86400000),
      description: "Lead the payments infrastructure team at Stripe. You will define the roadmap for our global expansion and collaborate with top-tier engineers.",
      requirements: ["4+ years product management", "Experience in fintech or payments", "Strong analytical skills"]
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Shopify",
      logo: "https://logo.clearbit.com/shopify.com",
      location: "Toronto, Canada",
      salary: "$100k - $140k",
      salaryNum: 120000,
      type: "Full-time",
      tags: ["React", "Next.js", "Tailwind"],
      isUrgent: false,
      fitScore: 91,
      experience: "2+ years",
      posted: "5 days ago",
      postedDate: new Date(Date.now() - 5 * 86400000),
      description: "Build amazing e-commerce experiences for millions of merchants. We're looking for passionate frontend engineers who love React and modern web technologies.",
      requirements: ["2+ years React", "Experience with Next.js", "Strong CSS/Tailwind skills"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Netflix",
      logo: "https://logo.clearbit.com/netflix.com",
      location: "Los Gatos, CA",
      salary: "$150k - $220k",
      salaryNum: 185000,
      type: "Hybrid",
      tags: ["K8s", "Terraform", "AWS"],
      isUrgent: true,
      fitScore: 86,
      experience: "5+ years",
      posted: "1 day ago",
      postedDate: new Date(Date.now() - 1 * 86400000),
      description: "Help us scale the world's leading streaming service. You'll work on infrastructure, reliability, and automation at massive scale.",
      requirements: ["5+ years DevOps", "Kubernetes and Terraform expertise", "AWS certification a plus"]
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Meta",
      logo: "https://logo.clearbit.com/meta.com",
      location: "Menlo Park, CA",
      salary: "$130k - $190k",
      salaryNum: 160000,
      type: "Full-time",
      tags: ["Python", "SQL", "ML"],
      isUrgent: false,
      fitScore: 79,
      experience: "3+ years",
      posted: "2 weeks ago",
      postedDate: new Date(Date.now() - 14 * 86400000),
      description: "Drive data-informed decisions across Facebook, Instagram, and WhatsApp. Strong analytical skills and experience with A/B testing required.",
      requirements: ["3+ years data science", "Python and SQL proficiency", "Experience with machine learning models"]
    },
    {
      id: 7,
      title: "Mobile Engineer (iOS)",
      company: "Spotify",
      logo: "https://logo.clearbit.com/spotify.com",
      location: "Stockholm, Sweden",
      salary: "$100k - $150k",
      salaryNum: 125000,
      type: "Remote",
      tags: ["Swift", "UIKit", "Combine"],
      isUrgent: false,
      fitScore: 84,
      experience: "3+ years",
      posted: "4 days ago",
      postedDate: new Date(Date.now() - 4 * 86400000),
      description: "Join the iOS team at Spotify to build features that millions use daily.",
      requirements: ["3+ years iOS development", "Swift and UIKit expertise", "Experience with reactive programming"]
    },
    {
      id: 8,
      title: "Security Engineer",
      company: "Cloudflare",
      logo: "https://logo.clearbit.com/cloudflare.com",
      location: "Austin, TX",
      salary: "$130k - $180k",
      salaryNum: 155000,
      type: "Full-time",
      tags: ["Cybersecurity", "Go", "Zero Trust"],
      isUrgent: true,
      fitScore: 92,
      experience: "4+ years",
      posted: "6 days ago",
      postedDate: new Date(Date.now() - 6 * 86400000),
      description: "Protect the internet's infrastructure. Work on cutting-edge security products.",
      requirements: ["4+ years security engineering", "Experience with Go or Rust", "Knowledge of network protocols"]
    }
  ];

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      // Search term (title, company, tags)
      const matchesSearch = !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Location term
      const matchesLocation = !locationTerm ||
        job.location.toLowerCase().includes(locationTerm.toLowerCase()) ||
        (locationTerm.toLowerCase() === 'remote' && job.type === 'Remote');

      // Job type filter
      const matchesType = filters.jobType.length === 0 || filters.jobType.includes(job.type);

      // Experience filter
      const matchesExp = !filters.experience || job.experience === filters.experience;

      // Salary filter (simplified - just if salaryNum within range)
      let matchesSalary = true;
      if (filters.salaryRange) {
        const [min, max] = filters.salaryRange.split('-').map(v => parseInt(v) * 1000);
        if (min && job.salaryNum < min) matchesSalary = false;
        if (max && job.salaryNum > max) matchesSalary = false;
      }

      return matchesSearch && matchesLocation && matchesType && matchesExp && matchesSalary;
    });
  }, [searchTerm, locationTerm, filters, jobsData]);

  // Sorting
  const sortedJobs = useMemo(() => {
    const jobs = [...filteredJobs];
    switch (sortBy) {
      case 'newest':
        return jobs.sort((a, b) => b.postedDate - a.postedDate);
      case 'salary_high':
        return jobs.sort((a, b) => b.salaryNum - a.salaryNum);
      case 'salary_low':
        return jobs.sort((a, b) => a.salaryNum - b.salaryNum);
      case 'fit_score':
        return jobs.sort((a, b) => b.fitScore - a.fitScore);
      default: // relevance (default order)
        return jobs;
    }
  }, [filteredJobs, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const currentJobs = sortedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationTerm, filters, sortBy]);

  const handleSaveJob = (id) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jid => jid !== id));
      toast.success('Job removed from saved', { icon: '🗑️' });
    } else {
      setSavedJobs([...savedJobs, id]);
      toast.success('Job saved successfully!', { icon: '💾' });
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'jobType') {
        const newTypes = prev.jobType.includes(value)
          ? prev.jobType.filter(t => t !== value)
          : [...prev.jobType, value];
        return { ...prev, jobType: newTypes };
      }
      return { ...prev, [type]: value };
    });
  };

  const clearFilters = () => {
    setFilters({ jobType: [], salaryRange: '', experience: '' });
    setSearchTerm('');
    setLocationTerm('');
    setSortBy('relevance');
    toast.success('All filters cleared');
  };

  const handleApplyNow = (job) => {
    toast.success(`Applied to ${job.title} at ${job.company}`, { icon: '🎉' });
    setSelectedJob(null);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen pt-24 pb-16">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      {/* Hero Search Section - Two inputs */}
      <section className="bg-white border-b border-slate-100 py-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-slate-900 mb-3">Find Your <span className="text-violet-600">Dream Job</span></h1>
            <p className="text-slate-500 font-medium">Search thousands of jobs from top companies worldwide</p>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl">
              <FiSearch className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                className="w-full py-4 bg-transparent outline-none font-semibold text-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl">
              <FiMapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Location (city, state, or 'remote')"
                className="w-full py-4 bg-transparent outline-none font-semibold text-slate-700"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
            <button className="bg-gradient-to-r from-violet-600 to-violet-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar - Sticky */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 flex items-center gap-2">
                  <FiSliders size={18} /> Filters
                </h3>
                <button onClick={clearFilters} className="text-xs font-bold text-violet-600 hover:underline">
                  Clear all
                </button>
              </div>

              <div className="space-y-6">
                {/* Keywords Search */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Keywords</h4>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Job title or company" 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:border-violet-400 shadow-sm transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Location</h4>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="City, state, zip" 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:border-violet-400 shadow-sm transition-all"
                      value={locationTerm}
                      onChange={(e) => setLocationTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Employment Type Dropdown */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Employment Type</h4>
                  <div className="relative">
                    <select 
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 appearance-none focus:outline-none focus:border-violet-400 shadow-sm transition-all cursor-pointer"
                      value={filters.jobType[0] || ""}
                      onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value ? [e.target.value] : [] }))}
                    >
                      <option value="">Any type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Experience Level</h4>
                  <select
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 appearance-none focus:outline-none focus:border-violet-400 shadow-sm transition-all cursor-pointer"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <option value="">All levels</option>
                    <option value="0-2 years">Entry (0-2 years)</option>
                    <option value="2-5 years">Mid (2-5 years)</option>
                    <option value="5+ years">Senior (5+ years)</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Salary Range</h4>
                  <select
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 appearance-none focus:outline-none focus:border-violet-400 shadow-sm transition-all cursor-pointer"
                    value={filters.salaryRange}
                    onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                  >
                    <option value="">Any salary</option>
                    <option value="0-100">$0 - $100k</option>
                    <option value="100-150">$100k - $150k</option>
                    <option value="150-200">$150k - $200k</option>
                    <option value="200-500">$200k+</option>
                  </select>
                </div>

                {/* Active filters summary */}
                {(filters.jobType.length > 0 || filters.salaryRange || filters.experience || searchTerm || locationTerm) && (
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {filters.jobType.map(type => (
                        <span key={type} className="text-xs px-2 py-1 bg-violet-50 text-violet-600 rounded-full flex items-center gap-1">
                          {type}
                          <button onClick={() => handleFilterChange('jobType', type)} className="ml-1 hover:text-violet-800">×</button>
                        </span>
                      ))}
                      {filters.salaryRange && (
                        <span className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-full flex items-center gap-1">
                          💰 Up to ${filters.salaryRange.split('-')[1]}k
                          <button onClick={() => handleFilterChange('salaryRange', '')} className="ml-1 hover:text-teal-800">×</button>
                        </span>
                      )}
                      {filters.experience && (
                        <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full flex items-center gap-1">
                          💼 {filters.experience}
                          <button onClick={() => handleFilterChange('experience', '')} className="ml-1 hover:text-orange-800">×</button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full flex items-center gap-1">
                          🔍 {searchTerm}
                          <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-indigo-800">×</button>
                        </span>
                      )}
                      {locationTerm && (
                        <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                          📍 {locationTerm}
                          <button onClick={() => setLocationTerm('')} className="ml-1 hover:text-emerald-800">×</button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Sorting and Count Bar */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {sortedJobs.length} {sortedJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Showing {currentJobs.length} of {sortedJobs.length} opportunities
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">Sort by:</span>
                <select
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-violet-400"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Most relevant</option>
                  <option value="newest">Newest first</option>
                  <option value="salary_high">Highest salary</option>
                  <option value="salary_low">Lowest salary</option>
                  <option value="fit_score">Best fit score</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-5">
              {currentJobs.map(job => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Logo */}
                    <div className="w-16 h-16 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=Logo'} />
                    </div>

                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-slate-900">{job.title}</h3>
                        {job.isUrgent && (
                          <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase px-2 py-1 rounded-full flex items-center gap-1">
                            <FiTrendingUp size={12} /> Urgent
                          </span>
                        )}
                        <span className="bg-teal-50 text-teal-600 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                          <FiCheckCircle size={12} /> {job.fitScore}% Match
                        </span>
                      </div>

                      <p className="text-slate-700 font-bold mb-3">{job.company}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><FiDollarSign size={14} /> {job.salary}</span>
                        <span className="flex items-center gap-1"><FiClock size={14} /> {job.type}</span>
                        <span className="flex items-center gap-1"><HiOutlineCalendar size={14} /> {job.posted}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-bold bg-slate-50 text-slate-600 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-3 justify-end items-center">
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className={`p-3 rounded-xl transition-all ${savedJobs.includes(job.id) ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}
                        title="Save job"
                      >
                        <FiHeart className={savedJobs.includes(job.id) ? 'fill-current' : ''} size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-violet-600 transition-all"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${currentPage === i + 1
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* No results */}
            {sortedJobs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <FiSearch className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-xl font-black text-slate-700 mb-2">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="mt-4 text-violet-600 font-bold underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all z-10"
              >
                <FiX size={20} />
              </button>

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 bg-white rounded-xl border border-slate-100 shadow-md flex items-center justify-center p-3">
                    <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">{selectedJob.title}</h2>
                    <p className="text-lg font-bold text-violet-600">{selectedJob.company}</p>
                    <div className="flex gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><FiMapPin size={14} /> {selectedJob.location}</span>
                      <span className="flex items-center gap-1"><FiDollarSign size={14} /> {selectedJob.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Job details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-black text-slate-800 mb-2 flex items-center gap-2">
                      <HiOutlineSparkles size={18} /> Job Description
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800 mb-2 flex items-center gap-2">
                      <HiOutlineBadgeCheck size={18} /> Requirements
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Experience</p>
                      <p className="font-bold text-slate-800">{selectedJob.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Job Type</p>
                      <p className="font-bold text-slate-800">{selectedJob.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Posted</p>
                      <p className="font-bold text-slate-800">{selectedJob.posted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Match Score</p>
                      <p className="font-bold text-teal-600">{selectedJob.fitScore}%</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-sm font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => handleApplyNow(selectedJob)}
                      className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => handleSaveJob(selectedJob.id)}
                      className={`px-6 py-4 rounded-xl font-bold transition-all ${savedJobs.includes(selectedJob.id)
                        ? 'bg-rose-100 text-rose-600 border-rose-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-500'
                        }`}
                    >
                      <FiBookmark size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;