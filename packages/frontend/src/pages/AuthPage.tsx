import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Authentication page component that handles user login and signup with Auth0
 * @returns The AuthPage component
 */
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated, isLoading, error } = useAuth();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <LoadingSpinner message="Checking authentication status..." />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Welcome to Contently
            </Card.Header>
            <Card.Body className="text-center">
              <p className="mb-4">
                Please sign in or sign up to continue to your content management dashboard.
              </p>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <div className="d-grid gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
                
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={() => signUp()}
                >
                  Sign Up
                </Button>
              </div>
              
              <p className="mt-4 text-muted">
                Secure authentication powered by Auth0
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage; 