import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiTarget, FiEye, FiUsers, FiBriefcase,
  FiSearch, FiTrendingUp, FiCheckCircle, FiGithub,
  FiTwitter, FiLinkedin, FiMail, FiArrowRight,
  FiZap, FiShield, FiHeart, FiAward, FiGlobe,
  FiMapPin, FiClock
} from 'react-icons/fi';
import { HiUserGroup, HiOfficeBuilding } from 'react-icons/hi';

const About = () => {
  // Stats data
  const stats = [
    { label: 'Active Jobs', value: '10K+', icon: <FiBriefcase size={24} />, color: 'bg-violet-50 text-violet-600' },
    { label: 'Top Companies', value: '5K+', icon: <HiOfficeBuilding size={24} />, color: 'bg-teal-50 text-teal-600' },
    { label: 'Job Seekers', value: '8K+', icon: <HiUserGroup size={24} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Successful Hires', value: '1K+', icon: <FiZap size={24} />, color: 'bg-amber-50 text-amber-600' },
  ];

  // Core values / Why choose us
  const coreValues = [
    { title: 'Verified Jobs', desc: 'Every job listing is manually verified to ensure trust and reliability.', icon: <FiShield /> },
    { title: 'Fast Hiring', desc: 'Smart matching algorithm connects talent with companies in record time.', icon: <FiZap /> },
    { title: 'Easy Application', desc: 'Apply to dream jobs with a single click and manage applications easily.', icon: <FiCheckCircle /> },
    { title: 'Career Growth', desc: 'Access resources and insights to help you grow professionally.', icon: <FiTrendingUp /> },
  ];

  // Team members
  const team = [
    { name: 'Arjun Sharma', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg', socials: ['linkedin', 'twitter', 'github'] },
    { name: 'Sanya Malhotra', role: 'Head of Design', img: 'https://randomuser.me/api/portraits/women/68.jpg', socials: ['linkedin', 'twitter'] },
    { name: 'Rohan Gupta', role: 'Lead Developer', img: 'https://randomuser.me/api/portraits/men/45.jpg', socials: ['github', 'linkedin'] },
    { name: 'Priya Singh', role: 'Product Manager', img: 'https://randomuser.me/api/portraits/women/89.jpg', socials: ['linkedin'] },
  ];

  // How it works steps
  const steps = [
    { id: '01', title: 'Create Profile', desc: 'Sign up and build your professional identity to stand out.', icon: <HiUserGroup /> },
    { id: '02', title: 'Search Jobs', desc: 'Use smart filters to find roles that match your skills and interests.', icon: <FiSearch /> },
    { id: '03', title: 'Quick Apply', desc: 'Submit applications directly with your saved resume in one click.', icon: <FiCheckCircle /> },
    { id: '04', title: 'Get Hired', desc: 'Ace the interview and land your dream job with our support.', icon: <FiAward /> },
  ];

  // Helper for social icons
  const getSocialIcon = (name) => {
    switch (name) {
      case 'linkedin': return <FiLinkedin />;
      case 'twitter': return <FiTwitter />;
      case 'github': return <FiGithub />;
      default: return null;
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen pt-24 pb-12 overflow-x-hidden">

      {/* ========== HERO SECTION ========== */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-violet-50 text-violet-600 rounded-full text-xs font-black uppercase tracking-widest mb-8"
          >
            <FiZap /> <span>Our Journey</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-none mb-8"
          >
            Connecting <span className="text-violet-600">Talent</span> with <br />
            Global <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Opportunities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12"
          >
            HireHub is more than just a job portal. We are a bridge between dreams and reality, helping thousands of professionals find their perfect workplace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/jobs" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-violet-600 hover:-translate-y-1 transition-all">
              Explore Open Jobs
            </Link>
            <Link to="/contact" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-100/30 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* ========== OUR STORY SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tighter mb-8 leading-tight">
              Started with a vision to build <span className="text-teal-600">The Modern Workspace.</span>
            </h2>
            <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
              <p>
                In 2024, our founders noticed a massive gap in how tech talent was being discovered. Traditional portals were noisy, slow, and lacked the "human" touch needed for creative hires.
              </p>
              <p>
                HireHub was born out of a small garage with a big mission: to automate the boring parts of hiring so both talent and companies can focus on what they do best—building the future.
              </p>
              <p>
                Today, we serve thousands of job seekers and hundreds of top companies, helping them connect faster, smarter, and more meaningfully than ever before.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="Our Team"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 flex items-center space-x-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                <FiHeart size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">99.9%</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION & VISION CARDS ========== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-6">
              <FiTarget size={30} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tighter">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To empower every professional on the planet by providing a transparent, fast, and intelligent platform for career discovery. No more endless scrolls, just perfect matches.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <FiEye size={30} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tighter">Our Vision</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To become the default infrastructure for the global labor market, where location is no longer a barrier and talent is the only currency that matters.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                {stat.icon}
              </div>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tighter mb-2">{stat.value}</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-4">Core Strengths</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Why Professionals Choose Us</h3>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">We've built a platform that puts your career first</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl bg-slate-50 hover:bg-white transition-all border border-transparent hover:border-slate-100 group"
              >
                <div className="text-3xl text-slate-400 group-hover:text-teal-500 transition-colors mb-5">
                  {value.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tighter">{value.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-4">Executive Board</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Meet the Visionaries</h3>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">The passionate people behind HireHub's success</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-40 h-40 mb-5 p-1.5 border-2 border-dashed border-slate-200 rounded-full group-hover:border-violet-400 transition-all group-hover:rotate-6 duration-500">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-1">{member.name}</h4>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">{member.role}</p>
              <div className="flex gap-3">
                {member.socials.map((social, j) => (
                  <a key={j} href="#" className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all shadow-sm">
                    {getSocialIcon(social)}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="bg-slate-900 py-28 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-xs font-black text-teal-400 uppercase tracking-[0.3em] mb-4">Process Roadmap</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">Simple Steps to Your Success</h3>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">Land your career in 4 simple steps with our streamlined recruitment flow.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                <div className="text-7xl font-extrabold text-white/5 absolute -top-8 -left-4 group-hover:text-violet-500/10 transition-colors">{step.id}</div>
                <div className="relative pt-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-teal-400 mb-5 group-hover:bg-teal-500/20 transition-colors">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50" />
                    {step.title}
                  </h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-violet-600 to-indigo-600 p-12 md:p-20 rounded-3xl text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-6">Ready to Start Your Journey?</h2>
            <p className="text-violet-100 font-medium text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of users who have found their professional home through HireHub. Explore jobs or post your mission as an employer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-white text-violet-600 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all">
                Get Started Now
              </Link>
              <Link to="/post-job" className="w-full sm:w-auto px-10 py-4 bg-violet-700/30 text-white rounded-xl font-black text-sm uppercase tracking-wider border border-white/20 hover:bg-violet-700/50 transition-all flex items-center justify-center gap-2">
                Post a Job <FiArrowRight />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-violet-600 rounded-lg">
                  <FiBriefcase size={20} className="text-white" />
                </div>
                <span className="text-2xl font-black text-slate-900">HireHub</span>
              </div>
              <p className="text-slate-500 text-sm max-w-md">Connecting talent with opportunity worldwide. The modern job platform for developers, designers, and creators.</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><FiTwitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><FiLinkedin size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><FiGithub size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><FiMail size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-black text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/about" className="hover:text-violet-600">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-violet-600">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-violet-600">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/help" className="hover:text-violet-600">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-violet-600">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-violet-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-10 pt-6 text-center text-xs text-slate-400">
            © 2026 HireHub. All rights reserved. Built for the global workforce.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;