import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

/**
 * FullPageLoader - Premium experience for initial app load or major transitions
 */
export const FullPageLoader = () => {
  const [loadingText, setLoadingText] = useState("Matching your skills...");
  const texts = [
    "Matching your skills...",
    "Finding top opportunities...",
    "Curating jobs for you...",
    "Almost there..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div className="relative">
        {/* Pulsing rings */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-indigo-100 scale-150"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-violet-100 scale-[2]"
        />
        
        {/* Core Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative bg-gradient-to-br from-indigo-600 to-violet-600 p-6 rounded-3xl shadow-2xl shadow-indigo-200"
        >
          <FiBriefcase className="text-4xl text-white" />
        </motion.div>
      </div>

      {/* Smart Text */}
      <div className="mt-12 h-8 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Subtle bottom text */}
      <p className="absolute bottom-10 text-gray-400 text-sm font-light tracking-widest uppercase">
        Job Portal Engine
      </p>
    </motion.div>
  );
};

/**
 * ButtonLoader - Integrated spinner for buttons
 */
export const ButtonLoader = ({ loading, children, ...props }) => {
  return (
    <button
      disabled={loading}
      className={`relative flex items-center justify-center transition-all ${loading ? 'opacity-90 cursor-not-allowed' : ''}`}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute left-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      <span className={loading ? 'pl-8' : ''}>
        {loading ? 'Processing...' : children}
      </span>
    </button>
  );
};

/**
 * TopBarLoader - YouTube style thin progress bar
 */
export const TopBarLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-[3px] bg-transparent overflow-hidden">
      <div className="h-full bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 animate-top-progress shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
    </div>
  );
};

/**
 * TypingLoader - For chat or messaging
 */
export const TypingLoader = () => {
  return (
    <div className="flex space-x-1 p-2 bg-gray-100 rounded-2xl rounded-bl-sm w-fit max-w-[60px] justify-center items-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
        />
      ))}
    </div>
  );
};

// Default export as a simple spinner for legacy support
const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
