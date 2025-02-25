import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
      picture: 'https://example.com/avatar.jpg'
    },
    signOut: vi.fn()
  })
}));

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/dashboard' })
  };
});

describe('MainLayout', () => {
  it('renders the navigation bar with logo', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Contently')).toBeInTheDocument();
  });
  
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });
  
  it('renders the user profile dropdown', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    // Find and click the user dropdown toggle
    const userDropdown = screen.getByAltText('Profile');
    fireEvent.click(userDropdown);
    
    // Check that dropdown items are displayed
    expect(screen.getByText('Signed in as')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
  
  it('renders the New Content button', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByText('+ New Content')).toBeInTheDocument();
  });
  
  it('renders the children content', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div data-testid="test-content">Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('renders the footer with copyright information', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Contently. All rights reserved.`)).toBeInTheDocument();
  });
  
  it('renders footer links', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });
}); 