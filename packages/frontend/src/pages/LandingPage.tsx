import React from 'react';
import { Container, Row, Col, Button, Card, Nav, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/landing-page.css';

/**
 * Public landing page component shown to unauthenticated users
 * @returns The LandingPage component
 */
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle authentication actions
  const handleSignIn = () => {
    signIn();
  };
  
  const handleSignUp = () => {
    signUp();
  };
  
  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky-header">
        <Container>
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="logo">
              <Image 
                src="https://contently.com/wp-content/themes/contently-new/images/logo/logo.png" 
                alt="Contently Logo" 
                height="40" 
                className="d-inline-block align-top"
              />
            </div>
            <Nav>
              <Button 
                variant="outline-primary" 
                className="me-2"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                variant="primary"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Nav>
          </div>
        </Container>
      </header>
      
      {/* Hero Section */}
      <section className="hero-section text-white">
        <Container>
          <Row className="align-items-center py-4">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">AI-Powered Content Strategy</h1>
              <p className="lead mb-4">
                Create, manage, and optimize your content with the help of advanced AI tools. 
                Streamline your content workflow and drive better results.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="cta-button"
                  onClick={handleSignUp}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <img 
                  src="https://cdn.pixabay.com/photo/2022/11/09/09/34/content-7580158_1280.png" 
                  alt="Content Strategy" 
                  className="img-fluid rounded-lg shadow-lg"
                  style={{ maxWidth: '90%' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose Contently?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm feature-card hover-shadow transition">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="feature-icon">📊</div>
                  </div>
                  <Card.Title className="fw-bold feature-title">AI-Powered Insights</Card.Title>
                  <Card.Text>
                    Get intelligent recommendations to improve your content strategy based on performance data and audience engagement metrics.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm feature-card hover-shadow transition">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="feature-icon">📝</div>
                  </div>
                  <Card.Title className="fw-bold feature-title">Smart Content Editor</Card.Title>
                  <Card.Text>
                    Create engaging content with our AI-assisted editor that helps optimize for readability, SEO, and audience engagement.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm feature-card hover-shadow transition">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <div className="feature-icon">📅</div>
                  </div>
                  <Card.Title className="fw-bold feature-title">Content Calendar</Card.Title>
                  <Card.Text>
                    Plan and schedule your content with an intuitive calendar that keeps your strategy organized and your team aligned.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5 testimonial-section">
        <Container>
          <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 testimonial-card shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3 testimonial-stars">
                    ★★★★★
                  </div>
                  <Card.Text className="mb-3 fst-italic">
                    "Contently has transformed our content strategy. The AI insights have helped us increase engagement by 45% and save countless hours of planning."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="testimonial-avatar text-white rounded-circle me-2">
                      JD
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">Jane Doe</p>
                      <p className="mb-0 small text-muted">Marketing Director</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 testimonial-card shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3 testimonial-stars">
                    ★★★★★
                  </div>
                  <Card.Text className="mb-3 fst-italic">
                    "The content calendar feature has streamlined our workflow and improved team collaboration significantly. We're now publishing twice as much content."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="testimonial-avatar text-white rounded-circle me-2">
                      JS
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">John Smith</p>
                      <p className="mb-0 small text-muted">Content Manager</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 testimonial-card shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3 testimonial-stars">
                    ★★★★★
                  </div>
                  <Card.Text className="mb-3 fst-italic">
                    "The AI-assisted editor has helped us create more engaging content in half the time. Our audience engagement metrics have never been better!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="testimonial-avatar text-white rounded-circle me-2">
                      SJ
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">Sarah Johnson</p>
                      <p className="mb-0 small text-muted">Content Creator</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section text-white">
        <Container className="text-center py-4">
          <h2 className="mb-4 fw-bold">Ready to Transform Your Content Strategy?</h2>
          <p className="lead mb-4">Join thousands of content creators who are already using Contently.</p>
          <Button 
            variant="light" 
            size="lg" 
            className="cta-button px-4 py-2"
            onClick={handleSignUp}
          >
            Get Started for Free
          </Button>
        </Container>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <Image 
                src="https://contently.com/wp-content/themes/contently-new/images/logo/logo.png" 
                alt="Contently Logo" 
                className="footer-logo mb-2"
              />
              <p className="text-muted mb-0">
                AI-powered content strategy platform
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="mb-0 text-muted">
                &copy; {new Date().getFullYear()} Contently. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage; 