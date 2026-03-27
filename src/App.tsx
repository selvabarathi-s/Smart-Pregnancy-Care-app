import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';
import { Registration } from './pages/Registration';
import { SOS } from './pages/SOS';
import { Dashboard } from './pages/Dashboard';
import { ModuleView } from './pages/ModuleView';

const AppContent = () => {
  const { isRegistered } = useUser();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isRegistered ? <SOS /> : <Navigate to="/register" />} 
      />
      <Route 
        path="/register" 
        element={!isRegistered ? <Registration /> : <Navigate to="/" />} 
      />
      <Route 
        path="/dashboard" 
        element={isRegistered ? <Dashboard /> : <Navigate to="/register" />} 
      />
      <Route 
        path="/module/:type" 
        element={isRegistered ? <ModuleView /> : <Navigate to="/register" />} 
      />
    </Routes>
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
