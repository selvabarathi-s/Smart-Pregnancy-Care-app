import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { SOS } from './pages/SOS';
import { Dashboard } from './pages/Dashboard';
import { ModuleView } from './pages/ModuleView';
import { Home } from './pages/Home';
import { SafeCard } from './pages/SafeCard';

const EmergencyFloat = () => {
  const location = useLocation();
  if (location.pathname === '/dashboard') return null;

  return (
    <button
      onClick={() => window.location.assign('/sos')}
      className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-2xl border-4 border-white"
      aria-label="Emergency SOS"
    >
      SOS
    </button>
  );
};

const AppContent = () => {
  const { isRegistered } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!isRegistered ? <Registration /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isRegistered ? <Dashboard /> : <Navigate to="/register" />} />
        <Route path="/sos" element={isRegistered ? <SOS /> : <Navigate to="/register" />} />
        <Route path="/module/:type" element={isRegistered ? <ModuleView /> : <Navigate to="/register" />} />
        <Route path="/safe-card" element={isRegistered ? <SafeCard /> : <Navigate to="/register" />} />
      </Routes>
      <EmergencyFloat />
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
            <AppContent />
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}
