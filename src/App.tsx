// Main App component: Assembles all sections of the portfolio

// App component definition

// Render main sections: Hero, Skills, Projects, and Contact
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <Hero />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent"></div>
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
