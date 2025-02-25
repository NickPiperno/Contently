import React from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';

/**
 * Editor page component that provides content creation and editing functionality
 * @returns The EditorPage component
 */
const EditorPage: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">Content Editor</h1>
              <p className="lead text-muted">
                Create and edit your content with AI assistance
              </p>
            </div>
            <div>
              <Button variant="outline-secondary" className="me-2">Save Draft</Button>
              <Button variant="primary">Publish</Button>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter title" 
                    className="form-control-lg border-0 px-0" 
                    style={{ fontSize: '1.5rem' }}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Add a brief description or subtitle" 
                    className="border-0 px-0"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <Tabs defaultActiveKey="write" className="mb-3">
                <Tab eventKey="write" title="Write">
                  <Form.Group>
                    <Form.Control 
                      as="textarea" 
                      rows={15} 
                      placeholder="Start writing your content here..." 
                      className="border-0 px-0"
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="preview" title="Preview">
                  <div className="p-3 border rounded">
                    <p className="text-muted text-center">
                      Content preview will appear here
                    </p>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Content Settings</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Content Type</Form.Label>
                  <Form.Select>
                    <option>Blog Post</option>
                    <option>Social Media</option>
                    <option>Newsletter</option>
                    <option>Website Copy</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Categories</Form.Label>
                  <Form.Select>
                    <option>Marketing</option>
                    <option>Product</option>
                    <option>Industry News</option>
                    <option>Tutorial</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control type="text" placeholder="Add tags separated by commas" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Schedule</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>AI Assistant</Card.Title>
              <Card.Text>
                <p className="mb-3">Get AI-powered suggestions to improve your content.</p>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" size="sm">Generate Title Ideas</Button>
                  <Button variant="outline-primary" size="sm">Improve Readability</Button>
                  <Button variant="outline-primary" size="sm">Optimize for SEO</Button>
                  <Button variant="outline-primary" size="sm">Suggest Related Topics</Button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditorPage; 