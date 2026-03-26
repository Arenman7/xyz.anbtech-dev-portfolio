const capabilities = [
  'ios development',
  'game development',
];

const AboutSection = () => (
  <section id="about" className="py-20 px-6 scroll-mt-16 transition-colors duration-700 bg-black">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-sm text-zinc-500 mb-8"><span className="text-y">&gt;</span> about</h2>

      <div className="space-y-4 text-zinc-400 max-w-xl">
        <p>
          anbtech is a small development studio focused on building useful apps
          and fun games. Based in Las Vegas, NV.
        </p>
      </div>

      <div className="mt-8 space-y-1 text-sm text-zinc-500">
        {capabilities.map((cap) => (
          <p key={cap}>- {cap}</p>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
