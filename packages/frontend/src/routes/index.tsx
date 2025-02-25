// src/routes/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import CalendarPage from '../pages/CalendarPage';
import EditorPage from '../pages/EditorPage';
import SettingsPage from '../pages/SettingsPage';
import LandingPage from '../pages/LandingPage';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import MainLayout from '../components/MainLayout';

/**
 * Protected route component that redirects to home if not authenticated
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * Main routing configuration for the application
 * @returns The router component with defined routes
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <App />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <CalendarPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/editor" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <EditorPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Root router component that wraps the application with AuthProvider
 */
const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter; 