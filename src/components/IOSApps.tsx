import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { iOSApps, IOSApp } from '../data/iOSApps';
import { ChevronRight } from 'lucide-react';
import { BentoBox } from './BentoBox';
import {
  useNavigate,
  useLocation,
  useParams,
  useMatch,
} from 'react-router-dom';

const IOSAppCard: React.FC<{ app: IOSApp }> = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLearnMore = (e: React.MouseEvent) => {
    navigate(`/ios-apps/${app.id}`);
  };

  const handleAppStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the BentoBox click from triggering
  };

  return (
    <BentoBox
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLearnMore}
      inspectStrength={0.1}
      scaleStrength={1.01}
      shine={{ radius: 15, intensity: 0.05 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all h-full"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={app.imageUrl}
              alt={`${app.title} screenshot`}
              className="rounded-lg w-full h-auto object-contain shadow-lg max-h-[500px]"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-3xl font-bold text-white">{app.title}</h3>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {app.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {app.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <motion.div className="flex flex-col gap-3 w-36">
              <motion.div
                className="flex items-center justify-between text-white group cursor-pointer bg-zinc-800/80 hover:bg-zinc-700/80 px-4 py-2 rounded-lg w-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/ios-apps/${app.id}`);
                }}
              >
                <span className="text-lg">More Info</span>
                <ChevronRight size={20} />
              </motion.div>
              {app.appStoreLink && (
                <motion.a
                  href={app.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-white group cursor-pointer bg-blue-600/80 hover:bg-blue-500/80 px-4 py-2 rounded-lg w-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAppStoreClick}
                >
                  <span className="text-lg">App Store</span>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 1.5c4.687 0 8.5 3.813 8.5 8.5 0 4.687-3.813 8.5-8.5 8.5-4.687 0-8.5-3.813-8.5-8.5 0-4.687 3.813-8.5 8.5-8.5zM9.5 7.5v9l7-4.5-7-4.5z" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </BentoBox>
  );
};

const IOSApps: React.FC = () => {
  return (
    <section id="apps" className="relative py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 relative z-10 space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold mb-16 text-gradient">
            My iOS Applications
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Here are some of my iOS applications that I have built and published
            to the App Store.
          </p>
        </div>
        <div className="space-y-8">
          {iOSApps.map((app) => (
            <IOSAppCard key={app.id} app={app} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default IOSApps;
