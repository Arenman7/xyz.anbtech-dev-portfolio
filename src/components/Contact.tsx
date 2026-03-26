import { Mail, Github } from 'lucide-react';

const contactLinks = [
  { href: 'mailto:aren@anbtech.xyz', icon: Mail, label: 'aren@anbtech.xyz' },
  { href: 'https://github.com/arenman7', icon: Github, label: 'github' },
];

const Contact = () => (
  <section id="contact" className="py-20 px-6 scroll-mt-16 transition-colors duration-700 bg-zinc-950">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-sm text-zinc-500 mb-8"><span className="text-z">&gt;</span> contact</h2>

      <div className="space-y-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors text-sm group"
          >
            <link.icon size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
