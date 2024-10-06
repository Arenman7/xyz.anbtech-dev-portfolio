import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Briefcase } from 'lucide-react';

// Contact component: Displays contact information and social links
const Contact: React.FC = () => {
  // Array of contact links with their respective details
  const contactLinks = [
    { href: 'mailto:aren@anbtech.xyz', icon: Mail, label: 'Email' },
    { href: 'https://github.com/arenman7', icon: Github, label: 'GitHub' },
    {
      href: 'https://www.upwork.com/freelancers/~0161e65ab6b6be86c7?mp_source=share',
      icon: Briefcase,
      label: 'Upwork',
    },
  ];

  return (
    // Contact section with gradient background
    <section className="py-20 bg-mesh-gradient">
      {/* Section title */}
      <h2 className="text-4xl font-bold text-center mb-6 text-gradient">
        Let's Connect
      </h2>
      {/* Section description */}
      <p className="text-center mb-12 max-w-2xl mx-auto text-gray-300">
        I'm always open to new opportunities, collaborations, or just a friendly
        chat. <br />
        Send me an email or message me on Upwork!
      </p>
      {/* Contact links container */}
      <motion.div
        className="flex flex-wrap justify-center gap-8"
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
        {contactLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="group flex flex-col items-center text-gray-400 hover:text-blue-400 transition-all duration-50"
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            {/* Icon container with hover effect */}
            <div className="p-4 bg-gray-800 rounded-full group-hover:bg-gray-700 transition-colors duration-300">
              <link.icon size={32} />
            </div>
            {/* Link label */}
            <span className="mt-2 text-sm font-medium">{link.label}</span>
          </motion.a>
        ))}
      </motion.div>
      {/* Additional contact information */}
      <p className="text-center mt-12 text-gray-400">
        Based in Las Vegas, NV • Available for remote work worldwide
      </p>
    </section>
  );
};

export default Contact;
