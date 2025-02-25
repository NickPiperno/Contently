import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PageTransition from './PageTransition';

// Mock the react-transition-group components to avoid issues with testing transitions
vi.mock('react-transition-group', () => {
  const FakeSwitchTransition = ({ children }: { children: React.ReactNode }) => children;
  const FakeCSSTransition = ({ children }: { children: React.ReactNode }) => children;
  
  return {
    SwitchTransition: FakeSwitchTransition,
    CSSTransition: FakeCSSTransition
  };
});

describe('PageTransition', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div data-testid="test-content">Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('applies the correct CSS class to the wrapper', () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Content').parentElement).toHaveClass('page-transition-wrapper');
  });
  
  it('works with different routes', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route 
            path="/test" 
            element={
              <PageTransition>
                <div>Test Route Content</div>
              </PageTransition>
            } 
          />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Route Content')).toBeInTheDocument();
  });
  
  it('accepts custom transition properties', () => {
    render(
      <MemoryRouter>
        <PageTransition
          timeout={500}
          classNames="custom-transition"
          transitionKey="custom-key"
        >
          <div>Custom Transition Content</div>
        </PageTransition>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Custom Transition Content')).toBeInTheDocument();
  });
}); 