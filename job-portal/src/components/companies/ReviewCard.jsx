import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiThumbsUp, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const ReviewCard = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasLiked, setHasLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setHelpfulCount(c => c - 1);
      setHasLiked(false);
    } else {
      setHelpfulCount(c => c + 1);
      setHasLiked(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
    >
      {/* User Info Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 border-2 border-white shadow-sm shrink-0">
            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 line-clamp-1">
              {review.name}
              {review.verified && <FiCheckCircle className="text-emerald-500 text-sm" title="Verified Employee" />}
            </h4>
            <p className="text-xs font-medium text-slate-500">{review.role}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md shrink-0">
          <span className="font-bold text-amber-700 text-sm mr-1">{review.rating}</span>
          <FiStar className="text-amber-500 fill-amber-500 text-sm" />
        </div>
      </div>

      <h5 className="text-sm font-bold text-indigo-600 mb-2">{review.company}</h5>

      {/* Review Text */}
      <div className="mb-5">
        <p className={`text-slate-600 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
          "{review.text}"
        </p>
        {review.text.length > 150 && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-indigo-600 text-xs font-bold mt-1 hover:underline outline-none"
          >
            {expanded ? 'Show less' : 'Read more...'}
          </button>
        )}
      </div>

      {/* Pros & Cons */}
      <div className="space-y-3 p-4 bg-slate-50 rounded-xl mb-5 border border-slate-100">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">Pros</span>
          <p className="text-sm text-slate-700 font-medium whitespace-pre-line">{review.pros}</p>
        </div>
        <hr className="border-slate-200" />
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1 block">Cons</span>
          <p className="text-sm text-slate-700 font-medium whitespace-pre-line">{review.cons}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-md transition-colors ${hasLiked ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <FiThumbsUp className={hasLiked ? 'fill-current' : ''} /> 
          Helpful ({helpfulCount})
        </button>
        
        <button className="text-slate-400 hover:text-rose-500 p-1.5 rounded-full hover:bg-rose-50 transition-colors" title="Report Review">
          <FiAlertCircle />
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
