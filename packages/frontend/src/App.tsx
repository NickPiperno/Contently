// src/App.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

/**
 * Main App component that serves as the dashboard for authenticated users
 * @returns The dashboard component
 */
function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample data for the dashboard
  const recentContent = [
    { id: 1, title: 'Getting Started with Contently', type: 'Blog Post', date: '2024-03-01', status: 'Published' },
    { id: 2, title: 'March Newsletter', type: 'Newsletter', date: '2024-03-10', status: 'Draft' },
    { id: 3, title: 'Product Update Announcement', type: 'Social Media', date: '2024-03-15', status: 'Scheduled' }
  ];
  
  return (
    <Container className="py-4">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 bg-primary text-white shadow">
            <Card.Body className="p-4">
              <Row>
                <Col md={8}>
                  <h1 className="display-4 fw-bold mb-3">Welcome to Contently</h1>
                  <p className="lead mb-4">
                    Your AI-powered content strategy platform. Create, manage, and optimize your content with the help of advanced AI tools.
                  </p>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="text-primary fw-semibold"
                    onClick={() => navigate('/editor')}
                  >
                    Create New Content
                  </Button>
                </Col>
                <Col md={4} className="d-none d-md-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div style={{ fontSize: '8rem', opacity: 0.8 }}>📝</div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="display-4 fw-bold text-primary mb-2">12</div>
              <div className="text-muted">Published Content</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="display-4 fw-bold text-warning mb-2">5</div>
              <div className="text-muted">Draft Content</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="display-4 fw-bold text-info mb-2">3</div>
              <div className="text-muted">Scheduled Content</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Content */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Content</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => navigate('/calendar')}
                >
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContent.map(item => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.type}</td>
                        <td>{item.date}</td>
                        <td>
                          <span className={`badge ${
                            item.status === 'Published' ? 'bg-success' : 
                            item.status === 'Draft' ? 'bg-warning' : 'bg-info'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-decoration-none p-0 me-2"
                            onClick={() => navigate('/editor')}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* AI Insights */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">AI Content Insights</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                Based on your content performance, here are some AI-powered insights to improve your strategy:
              </p>
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h6 className="fw-bold">Content Gap Analysis</h6>
                      <p className="small text-muted">
                        Consider creating more tutorial content as it has shown higher engagement rates.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <Card className="h-100 border">
                    <Card.Body>
                      <h6 className="fw-bold">Optimal Posting Times</h6>
                      <p className="small text-muted">
                        Your audience is most active on Tuesdays and Thursdays between 10am-2pm.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 border">
                    <Card.Body>
                      <h6 className="fw-bold">Content Recommendations</h6>
                      <p className="small text-muted">
                        Try incorporating more visual elements in your next posts to increase engagement.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App; 