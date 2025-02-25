import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

/**
 * Dashboard page component that displays user's content overview and analytics
 * @returns The DashboardPage component
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5">Dashboard</h1>
          <p className="lead text-muted">
            Welcome back, {user?.name || 'Content Creator'}! Here's an overview of your content.
          </p>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Content Overview</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Published</span>
                  <span className="badge bg-success">12</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Drafts</span>
                  <span className="badge bg-warning">5</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Scheduled</span>
                  <span className="badge bg-info">3</span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Performance</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Views</span>
                  <span className="badge bg-primary">1,245</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Engagement</span>
                  <span className="badge bg-primary">18%</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Conversions</span>
                  <span className="badge bg-primary">3.2%</span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>AI Insights</Card.Title>
              <Card.Text>
                <p className="mb-2">Top performing topics:</p>
                <ul className="list-unstyled">
                  <li className="mb-1">• Product tutorials</li>
                  <li className="mb-1">• Industry trends</li>
                  <li>• Customer success stories</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Recent Content</Card.Title>
              <Card.Text>
                <p className="text-muted">Your most recent content will appear here.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage; 