import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { iOSApps } from '../data/iOSApps';
import {
  ChevronLeft,
  ExternalLink,
  ChevronRight,
  ChevronLeftIcon,
  ChevronRightIcon,
  HelpCircle,
  Mail,
  Github,
  Briefcase,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { iOSPrivacyPolicies } from '../data/iOSPrivacyPolicies';
import Contact from './Contact';
import { getAppScreenshots } from '../data/appScreenshots';

interface Screenshot {
  image: string;
  title: string;
  description: string;
}

const IOSAppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = iOSApps.find((app) => app.id === id);
  const hasPrivacyPolicy = iOSPrivacyPolicies.some(
    (policy) => policy.id === id
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const screenshots = getAppScreenshots(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const appsSection = document.getElementById('apps');
      if (appsSection) {
        appsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-2xl text-white">App not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <a
              href="/"
              onClick={handleBackToPortfolio}
              className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </a>
            {hasPrivacyPolicy && (
              <Link
                to={`/ios-apps/${id}/privacy-policy`}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* App Preview */}
            <motion.div 
              className="relative lg:justify-self-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={app.imageUrl}
                alt={app.title}
                className="w-full h-auto rounded-2xl shadow-2xl border border-zinc-800/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent rounded-2xl" />
            </motion.div>

            {/* App Info */}
            <div className="lg:max-w-xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
                  {app.title}
                </h1>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  {app.description}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {app.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-sm text-sm text-zinc-300 border border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                {app.appStoreLink && (
                  <a
                    href={app.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
                  >
                    Download on App Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <a
                  href="mailto:support@anbtech.xyz"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  Support
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section className="py-24 bg-gradient-to-b from-zinc-900/50 to-zinc-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              App Experience
            </h2>
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image Display */}
                <div className="relative">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-[600px] w-full flex items-center justify-center"
                  >
                    <img
                      src={screenshots[currentImageIndex].image}
                      alt={screenshots[currentImageIndex].title}
                      className="max-w-full max-h-full w-auto h-auto object-cover rounded-2xl shadow-2xl border border-zinc-800/50"
                    />
                  </motion.div>
                  
                  {/* Mobile Navigation Controls */}
                  <div className="lg:hidden mt-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex justify-center gap-2">
                        {screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? 'bg-blue-500'
                                : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                            aria-label={`Go to screenshot ${index + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={previousImage}
                          className="w-32 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <ChevronLeftIcon className="w-5 h-5" />
                          Previous
                        </button>
                        <button
                          onClick={nextImage}
                          className="w-32 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                        >
                          Next
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6 relative min-h-[400px]">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <h3 className="text-2xl font-semibold mb-4">
                      {screenshots[currentImageIndex].title}
                    </h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {screenshots[currentImageIndex].description}
                    </p>
                  </motion.div>
                  
                  {/* Desktop Navigation Controls */}
                  <div className="absolute bottom-0 left-0 right-0 hidden lg:block">
                    <div className="w-[272px] flex flex-col space-y-4">
                      <div className="flex justify-center gap-2">
                        {screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? 'bg-blue-500'
                                : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                            aria-label={`Go to screenshot ${index + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={previousImage}
                          className="w-32 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <ChevronLeftIcon className="w-5 h-5" />
                          Previous
                        </button>
                        <button
                          onClick={nextImage}
                          className="w-32 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                        >
                          Next
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {app.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors group"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.header}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default IOSAppDetails;
