import React, { useRef, useEffect } from 'react';
import { Smartphone, Globe, Terminal, Palette } from 'lucide-react';
import { BentoBox } from './BentoBox';
import { motion } from 'framer-motion';

// Skills component: Displays the developer's skills in a visually appealing grid layout
const Skills: React.FC = () => {
  // Define an array of skill categories with their respective icons and items
  const skillAreas = [
    {
      name: 'iOS Development',
      icon: <Smartphone size={48} />,
      details: 'Crafting intuitive and performant iOS applications',
    },
    {
      name: 'Frontend',
      icon: <Globe size={48} />,
      details: 'Building responsive and interactive web experiences',
    },
    {
      name: 'Backend',
      icon: <Terminal size={48} />,
      details: 'Developing robust and scalable server-side solutions',
    },
    {
      name: 'UI/UX Design',
      icon: <Palette size={48} />,
      details: 'Creating visually appealing and user-centered designs',
    },
  ];

  const detailsRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLParagraphElement;
        let fontSize = 14; // Starting font size
        target.style.fontSize = `${fontSize}px`;

        while (target.scrollHeight > target.clientHeight && fontSize > 8) {
          fontSize -= 0.5;
          target.style.fontSize = `${fontSize}px`;
        }
      });
    });

    detailsRefs.current.forEach((ref) => {
      if (ref) {
        resizeObserver.observe(ref);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Render the Skills section
  return (
    <section id="skills" className="py-8 sm:py-12 md:py-24 bg-mesh-gradient">
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-16 text-gradient px-2 sm:px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {skillAreas.map((area, index) => (
          <motion.div
            key={area.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <BentoBox className="bg-gradient-radial from-gray-800 to-gray-900 p-4 md:p-6 backdrop-blur-sm bg-opacity-20 border border-opacity-5 border-white transition-all duration-300 hover:glow">
              <div className="flex flex-col items-center text-center h-full justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-10"></div>
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {area.icon}
                  </motion.div>
                  <motion.h3
                    className="text-xl md:text-2xl font-semibold mt-3 md:mt-4 mb-1 md:mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {area.name}
                  </motion.h3>
                  <motion.p
                    ref={(el) => (detailsRefs.current[index] = el)}
                    className="text-xs md:text-sm text-gray-400 h-16 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {area.details}
                  </motion.p>
                </div>
              </div>
            </BentoBox>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
