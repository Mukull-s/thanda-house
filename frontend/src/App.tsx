import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AgeVerification from './components/AgeVerification';
import { UserProvider } from './UserContext';
import { useState } from 'react';

import './App.css'

const AgeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAgeVerified] = useState(() => {
    return localStorage.getItem('ageVerified') === 'true' || sessionStorage.getItem('ageVerified') === 'true';
  });
  
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
              <AgeProtectedRoute>
                <Dashboard />
              </AgeProtectedRoute>
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
