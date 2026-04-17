import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiDollarSign, FiBookmark } from 'react-icons/fi';
import { ButtonBase, Chip } from '@mui/material';

const JOBS = [
  { id: 1, title: 'Senior React Developer', company: 'TechNova', location: 'Remote', salary: '$120k - $150k', type: 'Full-time', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQcBmJYUYj67mXeSfDXSDJ5Q8TpVUbAsmQpg&s', tags: ['React', 'Next.js'] },
  { id: 2, title: 'UX/UI Designer', company: 'CreativSpace', location: 'New York, NY', salary: '$90k - $110k', type: 'Full-time', logo: 'https://cdn6.f-cdn.com/contestentries/1735047/31130405/5e4f6d2ad7797_thumbCard.jpg', tags: ['Figma', 'Prototyping'] },
  { id: 3, title: 'Backend Engineer (Node.js)', company: 'DataFlow', location: 'San Francisco, CA', salary: '$130k - $160k', type: 'Contract', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhc2CFE2uqCXv3fnsj4i2bOiACOEgrDDnzpA&s', tags: ['Node.js', 'AWS'] },
  { id: 4, title: 'Product Manager', company: 'VisionaryInc', location: 'London, UK', salary: '£70k - £90k', type: 'Full-time', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_ojNN3vgVBwwpK8_EbDKwyCqdHTrrmMt6A&s', tags: ['Agile', 'Strategy'] },
];

const FeaturedJobs = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Jobs</span>
            </h2>
            <p className="text-slate-600 text-lg">Your next career move is just one click away.</p>
          </div>
          <ButtonBase className="!hidden sm:!inline-flex !rounded-lg !text-indigo-600 !font-semibold hover:!bg-indigo-50 !px-4 !py-2 transition-colors">
            View All Jobs →
          </ButtonBase>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOBS.map((job, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
                </div>
                <button className="text-gray-300 hover:text-indigo-500 transition-colors p-1">
                  <FiBookmark className="text-xl" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h3>
                <p className="text-sm font-medium text-slate-500">{job.company}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="mr-2 text-gray-400" /> {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-2 text-gray-400" /> {job.type}
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <FiDollarSign className="mr-2 text-indigo-500" /> {job.salary}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <ButtonBase className="!w-full !rounded-xl !bg-indigo-50 !text-indigo-600 hover:!bg-indigo-600 hover:!text-white !py-2.5 !font-semibold transition-colors">
                Quick Apply
              </ButtonBase>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <ButtonBase className="!rounded-lg !text-indigo-600 !font-semibold hover:!bg-indigo-50 !px-4 !py-2 transition-colors">
            View All Jobs →
          </ButtonBase>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;
