import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Contently/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-powered content strategy platform/i)).toBeInTheDocument();
  });
}); 