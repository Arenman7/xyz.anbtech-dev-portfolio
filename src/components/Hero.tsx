import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import StarField from './StarField';

// Hero component: Main landing section of the portfolio
const Hero: React.FC = () => {
  const [isHyperdrive, setIsHyperdrive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const holographicDuration = isHyperdrive ? '2s' : '8s';

  // Smooth scroll to the skills section
  const handleScrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle GitHub button click with animation
  const handleButtonClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      window.location.href = 'mailto:aren@anbtech.xyz';
    }, 1000);
  }, []);

  // Toggle pause/resume for starfield animation
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Render hero section with starfield, title, and buttons
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField isHyperdrive={isHyperdrive || isClicked} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-50 z-10"></div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-50 sm:hidden text-center">
        Psst...View this page on a computer, it's way cooler.
      </div>
      <button
        className="absolute top-4 right-4 p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors duration-300 z-30 border-2 border-white"
        onClick={togglePause}
        title={isPaused ? 'Resume animations' : 'Pause animations'}
      >
        {isPaused ? <Play size={24} /> : <Pause size={24} />}
      </button>
      <section className="h-screen flex flex-col justify-center items-center relative z-20">
        <motion.h1
          className="text-7xl font-extrabold mb-4 holographic-text"
          style={
            {
              '--holographic-duration': holographicDuration,
            } as React.CSSProperties
          }
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          ArenB
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-gray-300 max-w-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          AI Student | iOS Developer | Web Developer
        </motion.p>
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <button
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-0 border border-blue-500 hover:border-blue-400 space-button"
            onMouseEnter={() => setIsHyperdrive(true)}
            onMouseLeave={() => setIsHyperdrive(false)}
            onClick={handleButtonClick}
          >
            Email Me
          </button>
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 cool-tooltip">
            I'll respond!
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 text-white cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={handleScrollToSkills}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
