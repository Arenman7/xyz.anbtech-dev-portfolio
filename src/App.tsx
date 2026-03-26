import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudioLayout from './components/StudioLayout';
import HomePage from './components/HomePage';
import IOSAppDetails from './components/IOSAppDetails';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StudioLayout>
              <HomePage />
            </StudioLayout>
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
