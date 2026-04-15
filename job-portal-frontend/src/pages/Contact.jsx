import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin, FiMail, FiPhone, FiMessageSquare,
  FiSend, FiChevronDown, FiGlobe, FiClock,
  FiHelpCircle, FiMessageCircle, FiArrowRight,
  FiSearch, FiCheckCircle, FiTwitter, FiLinkedin, FiGithub,
  FiBriefcase
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const contactInfo = [
    {
      title: 'Our Office',
      detail: '123 Business Bay, Sector 62, Noida, UP - 201309',
      icon: <FiMapPin />,
      color: 'text-violet-600',
      bg: 'bg-violet-50'
    },
    {
      title: 'Email Us',
      detail: 'support@hirehub.com',
      secondary: 'hr@hirehub.com',
      icon: <FiMail />,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      title: 'Call Us',
      detail: '+91 98765 43210',
      secondary: 'Mon-Fri, 9am - 6pm',
      icon: <FiPhone />,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Live Chat',
      detail: 'Available 24/7',
      icon: <FiMessageSquare />,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      isButton: true
    }
  ];

  const faqs = [
    {
      q: 'How do I apply for a job?',
      a: 'Simply browse our "Jobs" page, select a position that matches your skills, and click the "Apply Now" button. You will need to upload your resume to complete the process.'
    },
    {
      q: 'How can I post a job as an employer?',
      a: 'Go to the "Post a Job" section from the navbar. You will need to create a company profile first, after which you can list as many openings as you need.'
    },
    {
      q: 'Is HireHub completely free for job seekers?',
      a: 'Yes, searching and applying for jobs is 100% free for all candidates. We believe talent discovery should never have a price tag.'
    },
    {
      q: 'What makes HireHub different from LinkedIn?',
      a: 'We focus exclusively on high-growth tech and creative startups. Our matching algorithm is optimized for skills and culture, not just keywords.'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent successfully! We’ll get back to you within 24 hours.', {
        icon: '🚀',
        duration: 4000,
        style: {
          borderRadius: '16px',
          background: '#111827',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen pt-24 pb-12 overflow-x-hidden">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 bg-violet-50 text-violet-600 rounded-full text-xs font-black uppercase tracking-widest mb-8"
        >
          <FiHelpCircle /> <span>Support Center</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-none mb-6"
        >
          Contact <span className="text-violet-600">Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed"
        >
          We're here to help you anytime. Reach out for support, partnerships, or any other queries.
        </motion.p>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter">{info.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-1">{info.detail}</p>
              {info.secondary && <p className="text-slate-400 text-xs font-medium">{info.secondary}</p>}
              {info.isButton && (
                <button className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-violet-600 transition-colors">
                  Start Chat
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

          {/* Contact Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter mb-3">Send a Message</h2>
            <p className="text-slate-500 font-medium mb-8">Our team usually responds within 2–4 hours during business days.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.name ? 'border-red-300' : 'border-slate-200'} rounded-xl font-medium text-slate-700 outline-none focus:border-violet-500 focus:bg-white transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-slate-200'} rounded-xl font-medium text-slate-700 outline-none focus:border-violet-500 focus:bg-white transition-all`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.subject ? 'border-red-300' : 'border-slate-200'} rounded-xl font-medium text-slate-700 outline-none focus:border-violet-500 focus:bg-white transition-all`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Message *</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.message ? 'border-red-300' : 'border-slate-200'} rounded-xl font-medium text-slate-700 outline-none focus:border-violet-500 focus:bg-white transition-all resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <FiSend size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Google Map Side */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.873612113132!2d77.38307431508122!3d28.57021098243772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef3b0f9d7d1d%3A0x2b6f5b6c5b6c5b6c!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin"
              className="w-full h-full min-h-[400px] lg:min-h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-4">Other Channels</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Choose how you contact us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Help Center', desc: 'Browse hundreds of articles and guides for candidates.', icon: <FiSearch />, link: '/help' },
            { label: 'Email Support', desc: 'Our team is just an email away at support@hirehub.com.', icon: <FiMail />, link: 'mailto:support@hirehub.com' },
            { label: 'Direct Chat', desc: 'Connect with our live agents for instant assistance.', icon: <FiMessageCircle />, link: '#' }
          ].map((item, i) => (
            <Link key={i} to={item.link} className="block">
              <div className="bg-white p-10 rounded-2xl border border-slate-100 text-center hover:bg-slate-900 transition-all group h-full">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400 group-hover:bg-white/10 group-hover:text-teal-400 transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-white mb-4">{item.label}</h4>
                <p className="text-slate-500 group-hover:text-slate-400 font-medium mb-8 text-sm">{item.desc}</p>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-600 group-hover:text-teal-400 underline decoration-2 underline-offset-8">
                  Explore Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-teal-600 uppercase tracking-[0.3em] mb-4">Quick Answers</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-black text-slate-800 tracking-tight">{faq.q}</span>
                <FiChevronDown className={`text-violet-600 transition-transform duration-300 flex-shrink-0 ${activeFaq === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-slate-900 p-12 md:p-16 rounded-3xl text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-6">Need quick help?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-slate-900 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-105 transition-all">
                Chat with us now
              </button>
              <a
                href="mailto:support@hirehub.com"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-xl font-black text-sm uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <FiMail /> support@hirehub.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Contact;