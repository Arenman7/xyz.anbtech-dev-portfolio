import { ReactNode, useCallback } from 'react';
import Logo from './Logo';

const navItems = [
  { label: 'work', href: '#work', color: 'hover:text-x' },
  { label: 'about', href: '#about', color: 'hover:text-y' },
  { label: 'contact', href: '#contact', color: 'hover:text-z' },
];

const StudioLayout = ({ children }: { children: ReactNode }) => {
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth' });

    el.classList.remove('section-highlight');
    // force reflow so re-adding the class restarts the animation
    void el.offsetWidth;
    el.classList.add('section-highlight');
    el.addEventListener('animationend', () => {
      el.classList.remove('section-highlight');
    }, { once: true });
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <Logo />
          </a>
          <nav className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-zinc-500 ${item.color} transition-colors`}
              >
                [{item.label}]
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <Logo className="text-sm" />
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default StudioLayout;
