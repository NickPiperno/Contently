import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

/**
 * Calendar page component that displays content schedule in a calendar view
 * @returns The CalendarPage component
 */
const CalendarPage: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">Content Calendar</h1>
              <p className="lead text-muted">
                Plan and schedule your content strategy
              </p>
            </div>
            <Button variant="primary">+ New Content</Button>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">March 2024</h5>
                <div>
                  <Button variant="outline-secondary" size="sm" className="me-2">Today</Button>
                  <Button variant="outline-secondary" size="sm" className="me-2">Month</Button>
                  <Button variant="outline-secondary" size="sm" className="me-2">Week</Button>
                  <Button variant="outline-secondary" size="sm">Day</Button>
                </div>
              </div>
              
              {/* Calendar Placeholder */}
              <div className="border rounded p-3 text-center" style={{ height: '500px' }}>
                <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                  <div className="fw-bold">Sunday</div>
                  <div className="fw-bold">Monday</div>
                  <div className="fw-bold">Tuesday</div>
                  <div className="fw-bold">Wednesday</div>
                  <div className="fw-bold">Thursday</div>
                  <div className="fw-bold">Friday</div>
                  <div className="fw-bold">Saturday</div>
                </div>
                <div className="d-flex h-100 align-items-center justify-content-center">
                  <p className="text-muted">
                    Calendar component will be integrated here.
                    <br />
                    <small>We'll use a third-party calendar component that supports drag-and-drop functionality.</small>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Upcoming Content</Card.Title>
              <Card.Text>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Blog Post: AI Trends 2024</strong>
                      <div className="text-muted small">March 15, 2024</div>
                    </div>
                    <span className="badge bg-warning">Draft</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Newsletter: Monthly Update</strong>
                      <div className="text-muted small">March 20, 2024</div>
                    </div>
                    <span className="badge bg-info">Scheduled</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Social Media: Product Launch</strong>
                      <div className="text-muted small">March 25, 2024</div>
                    </div>
                    <span className="badge bg-info">Scheduled</span>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Content Ideas</Card.Title>
              <Card.Text>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Industry Analysis</strong>
                      <div className="text-muted small">Suggested by AI</div>
                    </div>
                    <Button variant="outline-primary" size="sm">Create</Button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Customer Success Story</strong>
                      <div className="text-muted small">Suggested by AI</div>
                    </div>
                    <Button variant="outline-primary" size="sm">Create</Button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <strong>Product Tutorial</strong>
                      <div className="text-muted small">Suggested by AI</div>
                    </div>
                    <Button variant="outline-primary" size="sm">Create</Button>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarPage; 