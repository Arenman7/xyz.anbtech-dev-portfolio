import Logo from './Logo';

const HeroSection = () => (
  <section className="py-32 sm:py-40 px-6 bg-black">
    <div className="max-w-4xl mx-auto">
      <Logo className="text-5xl sm:text-7xl" />

      <p className="mt-8 text-zinc-500 text-sm sm:text-base">
        app &amp; game development studio
      </p>
    </div>
  </section>
);

export default HeroSection;
