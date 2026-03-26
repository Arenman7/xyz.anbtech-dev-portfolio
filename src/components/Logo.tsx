const Logo = ({ className = 'text-2xl' }: { className?: string }) => (
  <span className={`font-mono font-bold ${className}`}>
    <span className="text-white">anbtech</span>
    <span className="text-zinc-500">.</span>
    <span className="text-x">x</span>
    <span className="text-y">y</span>
    <span className="text-z">z</span>
  </span>
);

export default Logo;
