import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './AuthPage';

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: vi.fn(),
    signUp: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    error: null
  })
}));

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('AuthPage', () => {
  it('renders the login and signup buttons', () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to Contently/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
  
  it('calls signIn when Sign In button is clicked', () => {
    const mockSignIn = vi.fn();
    
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      signIn: mockSignIn,
      signUp: vi.fn(),
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Sign In'));
    expect(mockSignIn).toHaveBeenCalled();
  });
  
  it('calls signUp when Sign Up button is clicked', () => {
    const mockSignUp = vi.fn();
    
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      signIn: vi.fn(),
      signUp: mockSignUp,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Sign Up'));
    expect(mockSignUp).toHaveBeenCalled();
  });
  
  it('shows loading spinner when authentication is loading', () => {
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      signIn: vi.fn(),
      signUp: vi.fn(),
      isAuthenticated: false,
      isLoading: true,
      error: null
    });
    
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Checking authentication status/i)).toBeInTheDocument();
  });
  
  it('displays error message when authentication fails', () => {
    // Override the mock
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      signIn: vi.fn(),
      signUp: vi.fn(),
      isAuthenticated: false,
      isLoading: false,
      error: 'Authentication failed'
    });
    
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Authentication failed/i)).toBeInTheDocument();
  });
  
  it('redirects to dashboard when already authenticated', () => {
    const mockNavigate = vi.fn();
    vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
    
    // Override the mock to simulate authenticated state
    vi.mocked(require('../contexts/AuthContext').useAuth).mockReturnValue({
      signIn: vi.fn(),
      signUp: vi.fn(),
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
    
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
    
    // Check that navigate was called with the dashboard path
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
}); 