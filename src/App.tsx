// Main App component: Assembles all sections of the portfolio

// App component definition

// Render main sections: Hero, Skills, Projects, and Contact
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import IOSApps from './components/IOSApps';
import IOSAppDetails from './components/IOSAppDetails'; // Assuming IOSAppDetails is a component
import PrivacyPolicy from './components/PrivacyPolicy'; // Assuming PrivacyPolicy is a component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white">
              <div className="relative">
                <Hero />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black"></div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent"></div>
                <IOSApps />
                <Skills />
                <Projects />
                <Contact />
              </div>
            </div>
          }
        />
        <Route path="/ios-apps/:id" element={<IOSAppDetails />} />
        <Route path="/ios-apps/:id/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/ios-apps" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
