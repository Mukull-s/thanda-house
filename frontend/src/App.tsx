import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AgeVerification from './components/AgeVerification';
import { UserProvider, useUser } from './UserContext';
import { useEffect, useState } from 'react';

import './App.css'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const [isAgeVerified] = useState(() => localStorage.getItem('ageVerified') === 'true');

  if (loading) return null; // or a loading spinner
  if (!isAgeVerified) return <Navigate to="/" replace />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AgeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAgeVerified] = useState(() => localStorage.getItem('ageVerified') === 'true');
  
  if (!isAgeVerified) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Age verification is the default route */}
          <Route path="/" element={<AgeVerification />} />
          
          {/* These routes require age verification */}
          <Route 
            path="/login" 
            element={
              <AgeProtectedRoute>
                <Login />
              </AgeProtectedRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <AgeProtectedRoute>
                <Register />
              </AgeProtectedRoute>
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Catch all other routes and redirect to age verification */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
