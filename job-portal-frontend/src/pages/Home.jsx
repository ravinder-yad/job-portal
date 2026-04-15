import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactCountUp from 'react-countup';
import {
  HiBriefcase, HiTrendingUp, HiCheckCircle, HiSparkles,
  HiLocationMarker, HiCurrencyDollar, HiOfficeBuilding,
  HiUserGroup, HiCalendar, HiChip, HiColorSwatch,
  HiChartBar, HiCash, HiShieldCheck, HiLightningBolt,
  HiGlobeAlt, HiMail, HiPhone, HiChevronRight,
} from 'react-icons/hi';
import { FiUsers, FiAperture, FiSearch, FiMapPin, FiDollarSign, FiThumbsUp } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

// Ensure CountUp works with default export
const CountUp = ReactCountUp.default || ReactCountUp;

const Home = () => {
  const [hoveredJob, setHoveredJob] = useState(null);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Stats data
  const stats = [
    { label: 'Live Jobs', value: 12450, icon: HiBriefcase, color: 'violet', suffix: '+' },
    { label: 'Active Companies', value: 5280, icon: HiTrendingUp, color: 'teal', suffix: '+' },
    { label: 'Global Candidates', value: 84500, icon: FiUsers, color: 'orange', suffix: '+' },
    { label: 'Monthly Hires', value: 1280, icon: HiCheckCircle, color: 'pink', suffix: '+' },
  ];

  // Categories
  const categories = [
    { name: 'Technology', jobs: '2.4k open', icon: HiChip, color: 'violet' },
    { name: 'Design', jobs: '1.8k open', icon: HiColorSwatch, color: 'pink' },
    { name: 'Marketing', jobs: '1.9k open', icon: HiChartBar, color: 'teal' },
    { name: 'Finance', jobs: '1.2k open', icon: HiCash, color: 'emerald' },
  ];

  // Featured jobs
  const featuredJobs = [
    {
      title: 'Senior Frontend Engineer',
      company: 'Linear',
      location: 'Remote',
      salary: '$140k - $180k',
      logo: 'https://cdn.brandfetch.io/linear.app/fallback/lettermark/theme/dark/h/512/w/512/v/6?t=1667576596489'
    },
    {
      title: 'Product Designer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      logo: 'https://cdn.brandfetch.io/vercel.com/fallback/lettermark/theme/dark/h/512/w/512/v/6?t=1667576596489'
    },
    {
      title: 'Backend Engineer (Go)',
      company: 'Stripe',
      location: 'London, UK',
      salary: '$130k - $190k',
      logo: 'https://cdn.brandfetch.io/stripe.com/fallback/lettermark/theme/dark/h/512/w/512/v/6?t=1667576596489'
    },
    {
      title: 'DevOps Lead',
      company: 'Netlify',
      location: 'Austin, TX',
      salary: '$150k - $200k',
      logo: 'https://cdn.brandfetch.io/netlify.com/fallback/lettermark/theme/dark/h/512/w/512/v/6?t=1667576596489'
    },
  ];

  // Top companies
  const topCompanies = [
    { name: 'Google', jobs: 342, logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', jobs: 287, logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Amazon', jobs: 512, logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Apple', jobs: 198, logo: 'https://logo.clearbit.com/apple.com' },
  ];

  // Why choose us
  const benefits = [
    { title: 'Verified Jobs', desc: 'Every job is manually screened for authenticity.', icon: HiShieldCheck, color: 'violet' },
    { title: 'AI Matching', desc: 'Smart algorithm matches you with relevant roles.', icon: HiChip, color: 'teal' },
    { title: 'Fast Apply', desc: 'Apply in one click with your saved profile.', icon: HiLightningBolt, color: 'amber' },
    { title: 'Global Reach', desc: 'Remote & onsite jobs from 50+ countries.', icon: HiGlobeAlt, color: 'sky' },
  ];

  // How it works steps
  const steps = [
    { step: '01', title: 'Create Profile', desc: 'Sign up & build your professional profile.', icon: HiUserGroup },
    { step: '02', title: 'Search Jobs', desc: 'Browse thousands of roles by skills or location.', icon: FiSearch },
    { step: '03', title: 'Apply', desc: 'Submit applications with one click.', icon: HiMail },
    { step: '04', title: 'Get Hired', desc: 'Connect with employers & land your dream job.', icon: HiCheckCircle },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Frontend Developer', text: 'HireHub helped me find a remote job at my dream company in just 2 weeks!', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Michael Chen', role: 'Product Manager', text: 'The AI job recommendations are incredibly accurate. Best platform out there.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Priya Patel', role: 'UX Designer', text: 'I love the easy apply feature. Landed 3 interviews in my first week.', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">🔥 2,500+ New Jobs Today</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
              Find Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Dream Job</span> Effortlessly.
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg">
              The #1 platform for tech professionals. Connect with top companies and grow your career with HireHub.
            </p>
            {/* Search Bar - Two inputs + button */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                <FiSearch className="text-slate-400" />
                <input type="text" placeholder="Job title or skills..." className="bg-transparent outline-none w-full text-sm font-medium" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
                <FiMapPin className="text-slate-400" />
                <input type="text" placeholder="Location (remote or city)" className="bg-transparent outline-none w-full text-sm font-medium" />
              </div>
              <button className="bg-violet-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-violet-700 transition-all whitespace-nowrap">
                Search Jobs
              </button>
            </div>
            <div className="flex gap-4 mt-6 text-sm text-slate-400">
              <span>✨ Popular: </span>
              <button className="hover:text-violet-600">Remote</button>
              <button className="hover:text-violet-600">Frontend</button>
              <button className="hover:text-violet-600">Product</button>
            </div>
          </motion.div>

          {/* Right side illustration - decorative */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="hidden lg:block">
            <div className="relative">
              <div className="bg-gradient-to-br from-violet-100 to-indigo-100 rounded-[3rem] p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="space-y-4">
                    {featuredJobs.slice(0, 3).map((job, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-3 border border-slate-100 rounded-xl hover:shadow-md transition">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center p-1">
                          <img src={job.logo} alt={job.company} className="object-contain w-full" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-xs font-bold text-violet-600">{job.company}</div>
                          <div className="text-sm font-black text-slate-800">{job.title}</div>
                        </div>
                        <div className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">Verified</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 bg-${stat.color}-100 text-${stat.color}-600 rounded-2xl flex items-center justify-center text-2xl`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl font-black text-slate-900">
                    <CountUp end={stat.value} duration={2.5} />{stat.suffix}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== CATEGORIES SECTION ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Popular Categories</h2>
            <p className="text-slate-500 mt-2">Explore jobs by industry</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl transition-all cursor-pointer">
                  <div className={`w-12 h-12 mb-4 bg-${cat.color}-100 text-${cat.color}-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-1">{cat.name}</h3>
                  <div className="text-slate-400 font-medium text-sm">{cat.jobs}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURED JOBS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Featured Jobs</h2>
              <p className="text-slate-500 mt-2">Handpicked opportunities for you</p>
            </div>
            <Link to="/jobs" className="text-violet-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">View all <HiChevronRight /></Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                onMouseEnter={() => setHoveredJob(idx)}
                onMouseLeave={() => setHoveredJob(null)}
                className={`bg-white border border-slate-100 rounded-2xl p-5 transition-all duration-300 ${hoveredJob === idx ? 'shadow-xl -translate-y-1' : 'shadow-sm'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center p-2">
                    <img src={job.logo} alt={job.company} className="object-contain w-full h-full" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">Full-time</span>
                </div>
                <h3 className="font-black text-slate-800 mt-4">{job.title}</h3>
                <div className="text-sm text-slate-500 mt-1">{job.company}</div>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                  <HiLocationMarker /> <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <HiCurrencyDollar /> <span>{job.salary}</span>
                </div>
                <button className="w-full mt-4 py-2 rounded-xl border border-violet-200 text-violet-600 font-bold text-sm hover:bg-violet-50 transition-all">
                  Quick Apply
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TOP COMPANIES ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Top Companies Hiring Now</h2>
            <p className="text-slate-500 mt-2">Join industry leaders</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topCompanies.map((company, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center p-3 mb-4">
                  <img src={company.logo} alt={company.name} className="object-contain w-full h-full" />
                </div>
                <h3 className="font-black text-slate-800">{company.name}</h3>
                <div className="text-xs text-slate-400 mt-1">{company.jobs} open jobs</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Why Choose Us?</h2>
            <p className="text-slate-500 mt-2">We make job hunting simple and effective</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="text-center p-6 rounded-2xl hover:shadow-md transition-all">
                  <div className={`w-16 h-16 mx-auto bg-${benefit.color}-100 text-${benefit.color}-600 rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">How It Works</h2>
            <p className="text-slate-500 mt-2">Four simple steps to your next career</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="relative bg-white p-6 rounded-2xl shadow-sm text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-black">{step.step}</div>
                  <div className="mt-4 mb-3 flex justify-center">
                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Loved by Job Seekers</h2>
            <p className="text-slate-500 mt-2">Real stories from our community</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-black text-slate-800">{testimonial.name}</h4>
                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">★★★★★</div>
                <p className="text-slate-600 text-sm italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to Start Your Journey?</h2>
          <p className="text-violet-100 mb-8 text-lg max-w-xl mx-auto">Join thousands of professionals who found their dream jobs through HireHub.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-3 bg-white text-violet-600 rounded-xl font-black shadow-lg hover:shadow-xl transition-all">Create Account</Link>
            <Link to="/jobs" className="px-8 py-3 bg-violet-500 text-white rounded-xl font-black border border-violet-400 hover:bg-violet-700 transition-all">Browse Jobs</Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-violet-600 rounded-lg">
                <HiBriefcase size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black text-white">HireHub</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">Connecting talent with opportunity worldwide.</p>
            <div className="flex space-x-4">
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="hover:text-white">Post a Job</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © 2026 HireHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;