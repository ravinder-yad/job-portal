import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiMapPin, FiBriefcase, FiUsers, FiStar,
  FiCheckCircle, FiChevronRight, FiFilter, FiExternalLink,
  FiTrendingUp, FiArrowRight, FiHeart, FiSliders, FiChevronDown,
  FiX, FiBookmark, FiGlobe, FiAward, FiBell
} from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';

const Companies = () => {
  // Search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [sortBy, setSortBy] = useState('mostJobs');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  // Favorites & follows
  const [favorites, setFavorites] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // for modal

  // Expanded companies data (matching your original but enhanced)
  const companiesData = [
    {
      id: 1,
      name: "Linear",
      logo: "https://logo.clearbit.com/linear.app",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "50-249",
      rating: 4.8,
      jobsCount: 12,
      isVerified: true,
      tagline: "The issue tracker that you'll actually enjoy using.",
      isFeatured: true,
      openPositions: ["Senior UI/UX Designer", "Frontend Engineer", "Product Manager"],
      about: "Linear is a modern issue tracking system built for high-performing teams. We believe in beautiful design and fast workflows.",
      founded: 2019,
      website: "https://linear.app"
    },
    {
      id: 2,
      name: "Vercel",
      logo: "https://logo.clearbit.com/vercel.com",
      industry: "Cloud & DevOps",
      location: "Remote",
      size: "250-499",
      rating: 4.9,
      jobsCount: 8,
      isVerified: true,
      tagline: "Develop. Preview. Ship. The platform for frontend teams.",
      isFeatured: true,
      openPositions: ["Backend Engineer", "DevOps Lead", "Solutions Architect"],
      about: "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.",
      founded: 2015,
      website: "https://vercel.com"
    },
    {
      id: 3,
      name: "Stripe",
      logo: "https://logo.clearbit.com/stripe.com",
      industry: "Fintech",
      location: "London, UK",
      size: "1000+",
      rating: 4.7,
      jobsCount: 45,
      isVerified: true,
      tagline: "Financial infrastructure for the internet.",
      isFeatured: true,
      openPositions: ["Product Manager", "Data Scientist", "Security Engineer"],
      about: "Stripe builds economic infrastructure for the internet. Businesses of every size use our software to accept payments and manage their operations.",
      founded: 2010,
      website: "https://stripe.com"
    },
    {
      id: 4,
      name: "Shopify",
      logo: "https://logo.clearbit.com/shopify.com",
      industry: "E-commerce",
      location: "Toronto, Canada",
      size: "5000+",
      rating: 4.6,
      jobsCount: 32,
      isVerified: true,
      tagline: "Making commerce better for everyone.",
      isFeatured: false,
      openPositions: ["Frontend Developer", "Mobile Lead", "QA Engineer"],
      about: "Shopify is a leading global commerce company, providing tools to start, grow, market, and manage a retail business.",
      founded: 2004,
      website: "https://shopify.com"
    },
    {
      id: 5,
      name: "Meta",
      logo: "https://logo.clearbit.com/meta.com",
      industry: "Social Media",
      location: "Menlo Park, CA",
      size: "10000+",
      rating: 4.2,
      jobsCount: 110,
      isVerified: true,
      tagline: "Building the future of social connection.",
      isFeatured: false,
      openPositions: ["Research Scientist", "Infrastructure Engineer", "Content Designer"],
      about: "Meta builds technologies that help people connect, find communities, and grow businesses.",
      founded: 2004,
      website: "https://meta.com"
    },
    {
      id: 6,
      name: "Netflix",
      logo: "https://logo.clearbit.com/netflix.com",
      industry: "Entertainment",
      location: "Los Gatos, CA",
      size: "5000+",
      rating: 4.5,
      jobsCount: 15,
      isVerified: true,
      tagline: "See what's next. Watch anywhere. Cancel anytime.",
      isFeatured: false,
      openPositions: ["SRE", "Data Engineer", "Android Engineer"],
      about: "Netflix is the world's leading streaming entertainment service with over 200 million paid memberships.",
      founded: 1997,
      website: "https://netflix.com"
    },
    {
      id: 7,
      name: "Cloudflare",
      logo: "https://logo.clearbit.com/cloudflare.com",
      industry: "Cybersecurity",
      location: "San Francisco, CA",
      size: "1000-5000",
      rating: 4.7,
      jobsCount: 22,
      isVerified: true,
      tagline: "Helping build a better internet.",
      isFeatured: false,
      openPositions: ["Network Engineer", "Product Marketer", "Technical Writer"],
      about: "Cloudflare powers and protects 25 million internet properties, from Fortune 500s to individual creators.",
      founded: 2009,
      website: "https://cloudflare.com"
    },
    {
      id: 8,
      name: "Framer",
      logo: "https://logo.clearbit.com/framer.com",
      industry: "Design Tools",
      location: "Amsterdam, NL",
      size: "50-249",
      rating: 4.9,
      jobsCount: 5,
      isVerified: true,
      tagline: "The site builder for developers and designers.",
      isFeatured: true,
      openPositions: ["React Developer", "Design Advocate", "Community Manager"],
      about: "Framer is the best way to create and publish responsive websites, powered by React.",
      founded: 2014,
      website: "https://framer.com"
    },
    {
      id: 9,
      name: "GitHub",
      logo: "https://logo.clearbit.com/github.com",
      industry: "Technology",
      location: "Remote",
      size: "1000+",
      rating: 4.8,
      jobsCount: 28,
      isVerified: true,
      tagline: "Where the world builds software.",
      isFeatured: false,
      openPositions: ["Platform Engineer", "Security Analyst", "Product Designer"],
      about: "GitHub is the complete developer platform to build, scale, and deliver secure software.",
      founded: 2008,
      website: "https://github.com"
    },
    {
      id: 10,
      name: "Notion",
      logo: "https://logo.clearbit.com/notion.so",
      industry: "Productivity",
      location: "San Francisco, CA",
      size: "250-499",
      rating: 4.9,
      jobsCount: 14,
      isVerified: true,
      tagline: "One workspace. Every team.",
      isFeatured: true,
      openPositions: ["Mobile Engineer", "Growth Lead", "Data Analyst"],
      about: "Notion brings together notes, docs, wikis, and projects — a single source of truth for teams.",
      founded: 2013,
      website: "https://notion.so"
    }
  ];

  // Filtering logic
  const filteredCompanies = useMemo(() => {
    return companiesData.filter(company => {
      const matchesSearch = !searchTerm ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !locationTerm ||
        company.location.toLowerCase().includes(locationTerm.toLowerCase()) ||
        (locationTerm.toLowerCase() === 'remote' && company.location === 'Remote');
      const matchesIndustry = !industryFilter || company.industry === industryFilter;
      const matchesSize = !sizeFilter || company.size === sizeFilter;
      return matchesSearch && matchesLocation && matchesIndustry && matchesSize;
    });
  }, [searchTerm, locationTerm, industryFilter, sizeFilter]);

  // Sorting logic
  const sortedCompanies = useMemo(() => {
    const companies = [...filteredCompanies];
    switch (sortBy) {
      case 'mostJobs':
        return companies.sort((a, b) => b.jobsCount - a.jobsCount);
      case 'topRated':
        return companies.sort((a, b) => b.rating - a.rating);
      case 'aToZ':
        return companies.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return companies;
    }
  }, [filteredCompanies, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedCompanies.length / companiesPerPage);
  const currentCompanies = sortedCompanies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationTerm, industryFilter, sizeFilter, sortBy]);

  // Toggle favorite (save)
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fid => fid !== id));
      toast.success("Removed from saved companies", { icon: '💔' });
    } else {
      setFavorites([...favorites, id]);
      toast.success("Company saved to favorites!", { icon: '⭐' });
    }
  };

  // Toggle follow
  const toggleFollow = (id) => {
    if (followed.includes(id)) {
      setFollowed(followed.filter(fid => fid !== id));
      toast.success("Unfollowed company", { icon: '👋' });
    } else {
      setFollowed([...followed, id]);
      toast.success("Now following company – you'll get job alerts", { icon: '🔔' });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationTerm('');
    setIndustryFilter('');
    setSizeFilter('');
    setSortBy('mostJobs');
    toast.success("All filters cleared");
  };

  const getIndustryOptions = () => {
    return [...new Set(companiesData.map(c => c.industry))];
  };

  // Render rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FiStar key={`full-${i}`} className="fill-amber-400 text-amber-400" size={14} />
        ))}
        {halfStar && <FiStar className="fill-amber-400 text-amber-400" size={14} style={{ clipPath: 'inset(0 50% 0 0)' }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FiStar key={`empty-${i}`} className="text-slate-300" size={14} />
        ))}
        <span className="ml-1 text-xs font-bold text-slate-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen pt-24 pb-20">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      {/* Hero Header with dual search */}
      <section className="bg-white border-b border-slate-100 py-16 px-4 mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter"
          >
            Discover World-Class <span className="bg-gradient-to-r from-violet-600 to-teal-500 bg-clip-text text-transparent">Companies</span>
          </motion.h1>
          <p className="text-slate-500 font-medium text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Find your perfect workplace where you can grow, innovate, and thrive alongside industry leaders.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
            <div className="flex-1 flex items-center px-5 py-4 bg-slate-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100 transition-all">
              <FiSearch className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Company name or industry..."
                className="w-full bg-transparent outline-none font-semibold text-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-5 py-4 bg-slate-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100 transition-all">
              <FiMapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Location (city, state, or Remote)"
                className="w-full bg-transparent outline-none font-semibold text-slate-700"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
            <button
              onClick={clearFilters}
              className="px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
            >
              Clear
            </button>
            <button className="bg-gradient-to-r from-violet-600 to-violet-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Companies - Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 mb-20 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-1">🔥 Top Hiring Partners</h2>
            <p className="text-slate-400 text-sm font-medium">Companies actively hiring right now</p>
          </div>
          <button className="text-sm font-bold text-slate-400 flex items-center gap-1 hover:text-violet-600 transition-all">
            View all <FiChevronRight size={14} />
          </button>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
          {companiesData.filter(c => c.isFeatured).map(company => (
            <motion.div
              key={company.id}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-80 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-white rounded-xl border border-slate-100 shadow-sm p-2 flex items-center justify-center">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">{company.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    {company.isVerified && <span className="text-teal-600 flex items-center gap-0.5"><FiCheckCircle size={12} /> Verified</span>}
                    <span className="text-slate-400">{company.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{company.tagline}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-violet-600">{company.jobsCount} open roles</span>
                {renderStars(company.rating)}
              </div>
              <button
                onClick={() => setSelectedCompany(company)}
                className="w-full py-3 bg-violet-50 text-violet-600 rounded-xl font-bold text-sm hover:bg-violet-600 hover:text-white transition-all"
              >
                View Jobs
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Grid + Sidebar */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 flex items-center gap-2">
                  <FiSliders size={18} /> Filters
                </h3>
                {(industryFilter || sizeFilter || searchTerm || locationTerm) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-violet-600 hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Industry Filter */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Industry</h4>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:border-violet-400"
                      value={industryFilter}
                      onChange={(e) => setIndustryFilter(e.target.value)}
                    >
                      <option value="">All Industries</option>
                      {getIndustryOptions().map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Company Size</h4>
                  <div className="space-y-2.5">
                    {["50-249", "250-499", "1000+", "5000+", "10000+"].map(size => (
                      <label key={size} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="companySize"
                          className="w-4 h-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded-full"
                          checked={sizeFilter === size}
                          onChange={() => setSizeFilter(size)}
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-violet-600">{size} employees</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Active filters summary */}
                {(industryFilter || sizeFilter) && (
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {industryFilter && (
                        <span className="text-xs px-2 py-1 bg-violet-50 text-violet-600 rounded-full flex items-center gap-1">
                          {industryFilter}
                          <button onClick={() => setIndustryFilter('')} className="ml-1 hover:text-violet-800">×</button>
                        </span>
                      )}
                      {sizeFilter && (
                        <span className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-full flex items-center gap-1">
                          {sizeFilter}
                          <button onClick={() => setSizeFilter('')} className="ml-1 hover:text-teal-800">×</button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Companies Grid */}
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{sortedCompanies.length} Companies Found</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Discover top industry players</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Sort by:</span>
                <select
                  className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-violet-400"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="mostJobs">Most Jobs</option>
                  <option value="topRated">Top Rated</option>
                  <option value="aToZ">A–Z</option>
                </select>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {currentCompanies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCompanies.map((company) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={company.id}
                      whileHover={{ y: -6 }}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
                    >
                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                          onClick={() => toggleFollow(company.id)}
                          className={`p-2 rounded-xl transition-all ${followed.includes(company.id)
                              ? 'bg-teal-50 text-teal-600'
                              : 'bg-slate-50 text-slate-400 hover:bg-teal-50 hover:text-teal-600'
                            }`}
                          title={followed.includes(company.id) ? "Unfollow" : "Follow"}
                        >
                          <FiBell size={16} />
                        </button>
                        <button
                          onClick={() => toggleFavorite(company.id)}
                          className={`p-2 rounded-xl transition-all ${favorites.includes(company.id)
                              ? 'bg-rose-50 text-rose-500'
                              : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500'
                            }`}
                          title={favorites.includes(company.id) ? "Unsave" : "Save"}
                        >
                          <FiHeart className={favorites.includes(company.id) ? 'fill-current' : ''} size={16} />
                        </button>
                      </div>

                      <div className="flex items-start gap-5">
                        {/* Logo */}
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-100 shadow-sm p-2 flex items-center justify-center flex-shrink-0">
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-contain"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=Logo'}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-xl font-black text-slate-900">{company.name}</h3>
                            {company.isVerified && (
                              <FiCheckCircle className="text-teal-500" size={16} title="Verified Employer" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 mb-3">
                            <span className="flex items-center gap-1"><FiBriefcase size={12} /> {company.industry}</span>
                            <span className="flex items-center gap-1"><FiMapPin size={12} /> {company.location}</span>
                            <span className="flex items-center gap-1"><FiUsers size={12} /> {company.size}</span>
                          </div>
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{company.tagline}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-violet-600">{company.jobsCount} jobs</span>
                              {renderStars(company.rating)}
                            </div>
                            <button
                              onClick={() => setSelectedCompany(company)}
                              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-violet-600 transition-all"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <FiBriefcase size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">No companies found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your search or filters</p>
                  <button onClick={clearFilters} className="mt-4 text-violet-600 font-bold underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </AnimatePresence>

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
          </div>
        </div>
      </main>

      {/* Trust Banner / CTA */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-12 md:p-16 rounded-3xl text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tighter">
              Become a <span className="text-teal-400">Featured Partner</span>
            </h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
              Boost your employer brand and attract top tech talent by becoming a featured hiring partner on <span className="font-black text-white">HireHub</span>.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-teal-400 hover:text-slate-900 transition-all hover:scale-105 shadow-lg">
              Partner with us <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Company Details Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all z-10"
              >
                <FiX size={20} />
              </button>

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 bg-white rounded-xl border border-slate-100 shadow-md p-3 flex items-center justify-center">
                    <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                      {selectedCompany.name}
                      {selectedCompany.isVerified && <FiCheckCircle className="text-teal-500" size={20} />}
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><FiMapPin size={14} /> {selectedCompany.location}</span>
                      <span className="flex items-center gap-1"><FiUsers size={14} /> {selectedCompany.size} employees</span>
                      <span className="flex items-center gap-1"><FiGlobe size={14} /> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="hover:text-violet-600">website</a></span>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mb-6">
                  <h3 className="font-black text-slate-800 mb-2 flex items-center gap-2">
                    <FiAward size={18} /> About
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{selectedCompany.about}</p>
                  <p className="text-xs text-slate-400 mt-2">Founded {selectedCompany.founded}</p>
                </div>

                {/* Open Positions */}
                <div className="mb-6">
                  <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2">
                    <FiBriefcase size={18} /> Open Positions ({selectedCompany.jobsCount})
                  </h3>
                  <div className="space-y-2">
                    {selectedCompany.openPositions.map((position, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="font-semibold text-slate-700">{position}</span>
                        <button className="text-xs font-bold text-violet-600 hover:underline">Apply →</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {renderStars(selectedCompany.rating)}
                    <span className="text-sm text-slate-500">({selectedCompany.rating} average)</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleFollow(selectedCompany.id)}
                      className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${followed.includes(selectedCompany.id)
                          ? 'bg-teal-100 text-teal-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-teal-100 hover:text-teal-700'
                        }`}
                    >
                      {followed.includes(selectedCompany.id) ? 'Following' : 'Follow'}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedCompany.id)}
                      className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${favorites.includes(selectedCompany.id)
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600'
                        }`}
                    >
                      {favorites.includes(selectedCompany.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar hide styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Companies;