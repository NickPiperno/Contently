import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * A loading spinner component to display during async operations
 * @param message - Optional message to display with the spinner
 * @returns The loading spinner component
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
      <Spinner animation="border" role="status" variant="primary" className="mb-2">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="text-center text-muted">{message}</p>
    </Container>
  );
};

export default LoadingSpinner; 