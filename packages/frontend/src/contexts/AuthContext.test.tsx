import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock Auth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(() => ({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    loginWithRedirect: vi.fn(),
    logout: vi.fn()
  }))
}));

// Test component that uses the auth context
const TestComponent = () => {
  const { isAuthenticated, signIn, signUp, signOut, error } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>
      {error && <div data-testid="error-message">{error}</div>}
      <button onClick={signIn}>Sign In</button>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides authentication state to children', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
  
  it('calls Auth0 loginWithRedirect when signIn is called', async () => {
    const mockLoginWithRedirect = vi.fn();
    
    // Override the mock
    const useAuth0 = vi.requireMock('@auth0/auth0-react').useAuth0;
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn()
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      fireEvent.click(screen.getByText('Sign In'));
    });
    
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });
  
  it('calls Auth0 loginWithRedirect with signup hint when signUp is called', async () => {
    const mockLoginWithRedirect = vi.fn();
    
    // Override the mock
    const useAuth0 = vi.requireMock('@auth0/auth0-react').useAuth0;
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn()
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      fireEvent.click(screen.getByText('Sign Up'));
    });
    
    expect(mockLoginWithRedirect).toHaveBeenCalledWith(
      expect.objectContaining({
        authorizationParams: expect.objectContaining({
          screen_hint: 'signup'
        })
      })
    );
  });
  
  it('calls Auth0 logout when signOut is called', async () => {
    const mockLogout = vi.fn();
    
    // Override the mock
    const useAuth0 = vi.requireMock('@auth0/auth0-react').useAuth0;
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      loginWithRedirect: vi.fn(),
      logout: mockLogout
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      fireEvent.click(screen.getByText('Sign Out'));
    });
    
    expect(mockLogout).toHaveBeenCalledWith(
      expect.objectContaining({
        logoutParams: expect.objectContaining({
          returnTo: expect.any(String)
        })
      })
    );
  });
  
  it('handles authentication errors', async () => {
    const mockLoginWithRedirect = vi.fn().mockImplementation(() => {
      throw new Error('Authentication failed');
    });
    
    // Override the mock
    const useAuth0 = vi.requireMock('@auth0/auth0-react').useAuth0;
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      loginWithRedirect: mockLoginWithRedirect,
      logout: vi.fn()
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      fireEvent.click(screen.getByText('Sign In'));
    });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Authentication failed');
  });
  
  it('provides user data when authenticated', () => {
    // Override the mock to simulate authenticated state
    const useAuth0 = vi.requireMock('@auth0/auth0-react').useAuth0;
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://example.com/avatar.jpg',
        sub: 'auth0|123456'
      },
      loginWithRedirect: vi.fn(),
      logout: vi.fn()
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
  });
}); 