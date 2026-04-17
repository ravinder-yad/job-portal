import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders, FiCheck, FiStar } from 'react-icons/fi';
import { ButtonBase } from '@mui/material';

import CompanyCard from '../companies/CompanyCard';
import ReviewCard from '../companies/ReviewCard';

// Dummy Data
const MOCK_COMPANIES = [
  { id: 1, name: 'TechNova Innovations', industry: 'Software & Cloud', location: 'San Francisco, CA', rating: 4.8, tagline: 'Building the next generation of intuitive developer tools and cloud infrastructure.', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcBmJYUYj67mXeSfDXSDJ5Q8TpVUbAsmQpg&s', openJobs: 12, hiringNow: true, isFollowing: false },
  { id: 2, name: 'CreativSpace', industry: 'Design & Media', location: 'New York, NY', rating: 4.5, tagline: 'A global agency empowering brands with cutting-edge visual and digital experiences.', logo: 'https://logo.clearbit.com/figma.com', openJobs: 5, hiringNow: false, isFollowing: true },
  { id: 3, name: 'HealthSync', industry: 'Healthcare Tech', location: 'Remote', rating: 4.9, tagline: 'Revolutionizing patient care through AI-driven analytics and telemedicine platforms.', logo: 'https://logo.clearbit.com/github.com', openJobs: 24, hiringNow: true, isFollowing: false },
  { id: 4, name: 'FinTrust', industry: 'Financial Services', location: 'London, UK', rating: 4.2, tagline: 'Secure and transparent financial solutions for the modern decentralized economy.', logo: 'https://logo.clearbit.com/stripe.com', openJobs: 8, hiringNow: false, isFollowing: false },
];

const MOCK_REVIEWS = [
  { id: 1, name: 'Sarah Jenkins', role: 'Frontend Engineer', company: 'TechNova Innovations', avatar: 'https://i.pravatar.cc/150?img=47', rating: 5, verified: true, text: 'Incredible engineering culture. You are surrounded by brilliant people who are always willing to help. Management is incredibly transparent about company goals.', pros: '+ Amazing work-life balance\n+ High salary & bonuses\n+ Great tech stack', cons: '- Performance expectations are extremely high\n- Fast-paced environment can be stressful', helpful: 124 },
  { id: 2, name: 'David Chen', role: 'Product Manager', company: 'CreativSpace', avatar: 'https://i.pravatar.cc/150?img=11', rating: 4, verified: true, text: 'A highly creative environment where bold ideas are rewarded. The benefits package is standard, but the actual work you get to do is portfolio-defining.', pros: '+ Creative freedom\n+ Cool office space', cons: '- Lower base salary compared to big tech\n- Slower promotion cycles', helpful: 89 },
  { id: 3, name: 'Ananya Sharma', role: 'Data Scientist', company: 'HealthSync', avatar: 'https://i.pravatar.cc/150?img=32', rating: 5, verified: true, text: 'Working here feels like actually making a difference in the world. The leadership truly cares about employee wellbeing. Best remote culture I have experienced.', pros: '+ Meaningful work\n+ 100% Remote flexibility\n+ Unlimited PTO that you can actually use', cons: '- Onboarding process is a bit chaotic\n- Dealing with healthcare compliance slows down deployment', helpful: 210 },
  { id: 4, name: 'Michael Ross', role: 'Backend Developer', company: 'FinTrust', avatar: 'https://i.pravatar.cc/150?img=68', rating: 3, verified: false, text: 'Good place to learn standard enterprise architecture, but can feel a bit bureaucratic. If you like stability, it is great. If you want a fast-moving startup, this isn\'t it.', pros: '+ Very stable\n+ Great pension plan', cons: '- Legacy codebase in some departments\n- Lots of middle management', helpful: 45 },
];

const Companies = () => {
  const [activeReviewFilter, setActiveReviewFilter] = useState('Latest');

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      
      {/* 1. TOP SEARCH & FILTER HEADER */}
      <div className="bg-indigo-900 border-t border-indigo-800 text-white pb-20 pt-16 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Find Companies You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Trust</span>
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-10">
            Read real reviews, explore work cultures, and discover your next great workplace before you even apply.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center pl-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-indigo-500 transition-colors">
              <FiSearch className="text-slate-400 text-xl shrink-0" />
              <input 
                type="text" 
                placeholder="Search company name or industry..." 
                className="w-full bg-transparent outline-none pl-3 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-indigo-500 transition-colors">
              <select className="w-full bg-transparent outline-none text-slate-700 font-medium cursor-pointer appearance-none">
                <option value="">All Industries</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            
            <ButtonBase className="!bg-indigo-600 hover:!bg-indigo-700 !text-white !font-bold !rounded-xl !px-10 !py-4 transition-all whitespace-nowrap">
              Find Companies
            </ButtonBase>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Quick Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all">
            <FiSliders /> Filters
          </button>
          <button className="bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm text-sm font-bold text-slate-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all flex items-center gap-2">
            <FiStar className="text-amber-500 fill-amber-500" /> 4+ Ratings
          </button>
          <button className="bg-indigo-600 px-5 py-2.5 rounded-full shadow-sm text-sm font-bold text-white transition-all flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Hiring Now
          </button>
          <button className="hidden sm:flex bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all items-center gap-2">
            🦄 Startups
          </button>
        </div>

        {/* 2. COMPANY CARDS GRID */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              Featured Companies
              <span className="block text-sm font-medium text-slate-500 mt-1">Discover top-tier workplaces actively hiring.</span>
            </h2>
            <a href="#" className="hidden sm:block text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">View All Companies &rarr;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_COMPANIES.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>

      </div>

      {/* 3. REVIEWS WALL (GAME CHANGER) */}
      <div className="bg-indigo-50 border-y border-indigo-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                What Employees Say
              </h2>
              <p className="text-lg font-medium text-slate-600">
                Unfiltered reviews from verified professionals.
              </p>
            </div>

            {/* Review Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['Latest', 'Highest Rated', 'Developer Roles', 'Management'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveReviewFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    activeReviewFilter === filter 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'bg-white text-slate-600 border border-indigo-100 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Layout for Reviews (using columns) */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {MOCK_REVIEWS.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {MOCK_REVIEWS.slice().reverse().map(review => ( // duplicating to show masonry effect
              <ReviewCard key={`dup-${review.id}`} review={review} />
            ))}
          </div>

          <div className="mt-12 text-center">
             <ButtonBase className="!rounded-xl !bg-white !border-2 !border-indigo-100 !text-indigo-600 hover:!border-indigo-600 hover:!bg-indigo-50 !px-8 !py-3 font-bold transition-all shadow-sm">
                Load More Reviews
             </ButtonBase>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Companies;
