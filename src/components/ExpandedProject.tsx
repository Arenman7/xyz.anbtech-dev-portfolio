import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface ExpandedProjectProps {
  project: {
    title: string;
    longDescription: string;
    technologies: string[];
    date: string;
    link?: string; // Make this optional
    image?: string;
  };
  onClose: () => void;
  githubLink: string;
}

const ExpandedProject: React.FC<ExpandedProjectProps> = ({
  project,
  onClose,
  githubLink,
}) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl max-w-4xl w-full mx-auto overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
          >
            <X size={24} />
          </button>
          {project.image && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
          )}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-300 mb-6">{project.longDescription}</p>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Technologies used:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Completed on: {project.date}
            </p>
            <div className="flex space-x-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={18} className="mr-2" />
                  View Live
                </a>
              )}
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                <Github size={18} className="mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedProject;
