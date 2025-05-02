import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AgeVerification from './components/AgeVerification';
import { UserProvider } from './UserContext';
import { useState } from 'react';

import './App.css'

const AgeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAgeVerified = localStorage.getItem('ageVerified') === 'true' || sessionStorage.getItem('ageVerified') === 'true';
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
          <Route path="/" element={<AgeVerification />} />
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
            path="/home"
            element={
              <AgeProtectedRoute>
                <Home />
              </AgeProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
