import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Code, BarChart } from 'lucide-react';
import ExpandedProject from './ExpandedProject';
import { BentoBox } from './BentoBox';

// Helper function to get gradient classes for technology tags
const getTagGradient = (tech: string) => {
  const gradients: { [key: string]: string } = {
    React: 'from-blue-400 to-blue-600',
    'Node.js': 'from-green-400 to-green-600',
    MongoDB: 'from-green-500 to-green-700',
    Express: 'from-gray-400 to-gray-600',
    'Vue.js': 'from-emerald-400 to-emerald-600',
    Firebase: 'from-yellow-400 to-yellow-600',
    Vuex: 'from-green-400 to-green-600',
    'Tailwind CSS': 'from-cyan-400 to-cyan-600',
    'D3.js': 'from-orange-400 to-orange-600',
    TypeScript: 'from-blue-500 to-blue-700',
    'Material-UI': 'from-indigo-400 to-indigo-600',
  };
  return gradients[tech] || 'from-gray-400 to-gray-600';
};

// Projects component: Displays a list of projects in a grid layout
const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Updated projects array with images
  const projects = [
    {
      title: 'E-commerce Platform',
      description:
        'A full-stack e-commerce solution built with React and Node.js',
      longDescription:
        'This e-commerce platform provides a seamless shopping experience with features like user authentication, product catalog, shopping cart, and secure checkout process. The frontend is built with React for a responsive UI, while the backend uses Node.js and Express for robust API endpoints. MongoDB is used for efficient data storage and retrieval.',
      icon: <Globe size={48} />,
      date: 'Aug 15, 2023',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://ecommerce-platform-demo.netlify.app',
      images: [
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      title: 'Task Management App',
      description:
        'A productivity app with real-time updates using Vue and Firebase',
      longDescription:
        'This task management application helps users organize their work efficiently. It features real-time updates, allowing for collaborative task management. The app is built with Vue.js for a reactive frontend, Vuex for state management, and Firebase for backend services including authentication and real-time database.',
      icon: <Code size={48} />,
      date: 'Oct 3, 2023',
      technologies: ['Vue.js', 'Firebase', 'Vuex', 'Tailwind CSS'],
      link: 'https://github.com/yourusername/task-management-app',
      images: [
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      ],
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard built with D3.js and React',
      longDescription:
        'This data visualization dashboard presents complex datasets in an intuitive, interactive format. Built with React and D3.js, it offers various chart types and filtering options. The use of TypeScript ensures type safety, while Material-UI provides a sleek, responsive design.',
      icon: <BarChart size={48} />,
      date: 'Dec 20, 2023',
      technologies: ['React', 'D3.js', 'TypeScript', 'Material-UI'],
      link: 'https://github.com/yourusername/data-viz-dashboard',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
      ],
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');

    const drawMeshGradient = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
    };

    drawMeshGradient();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="projects" className="relative py-24">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
          My Projects
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <BentoBox
                className="bg-gradient-radial from-gray-800 to-gray-900 p-6 backdrop-blur-sm bg-opacity-20 border border-opacity-5 border-white transition-all duration-300 hover:glow cursor-pointer"
                inspectStrength={0.8}
                zIndex={hoveredIndex === index ? 10 : 1}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(index)}
              >
                <div className="flex flex-col h-full justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-10"></div>
                  <div className="relative z-10 w-full flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div
                        className={`transition-transform duration-300 mr-4 ${
                          hoveredIndex === index ? 'scale-110' : ''
                        }`}
                      >
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-semibold">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getTagGradient(
                              tech
                            )}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.date}
                      </div>
                    </div>
                  </div>
                </div>
              </BentoBox>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-16 text-center">
          <motion.a
            href="https://github.com/arenman7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full border border-white hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More Projects on GitHub
          </motion.a>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject !== null && (
          <ExpandedProject
            project={projects[selectedProject]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
