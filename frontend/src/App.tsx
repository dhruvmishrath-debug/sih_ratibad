import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientPortal from './pages/PatientPortal';
import PharmacyPortal from './pages/PharmacyPortal';

// --- Components ---

// --- Pages ---


// --- App ---

export default function App() {
  return (
    <GoogleOAuthProvider clientId="373246222051-3lkjpv7pbreoos757dn5csp6f3gmm2al.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hospital" element={<HospitalDashboard />} />
              <Route path="/pharmacy" element={<PharmacyPortal />} />
              <Route path="/patient" element={<PatientPortal />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
