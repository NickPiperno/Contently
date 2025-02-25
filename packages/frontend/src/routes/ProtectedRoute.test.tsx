import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route, MemoryRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a test version of ProtectedRoute since it's not exported from index.tsx
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

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    isLoading: false
  })
}));

// Mock the LoadingSpinner component
vi.mock('../components/LoadingSpinner', () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>
}));

describe('ProtectedRoute', () => {
  it('redirects when user is not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );
    
    // Should redirect to home and render home page
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });
  
  it('shows loading spinner when authentication is loading', () => {
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: true
    });
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Checking authentication/i)).toBeInTheDocument();
  });
  
  it('renders children when user is authenticated', () => {
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false
    });
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });
}); 