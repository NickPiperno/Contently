import React from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

/**
 * Settings page component that allows users to manage their account and preferences
 * @returns The SettingsPage component
 */
const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5">Settings</h1>
          <p className="lead text-muted">
            Manage your account and preferences
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Tabs defaultActiveKey="profile" className="mb-4">
                <Tab eventKey="profile" title="Profile">
                  <Row>
                    <Col md={3} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div className="mb-3">
                          {user?.picture ? (
                            <img 
                              src={user.picture} 
                              alt="Profile" 
                              className="rounded-circle" 
                              style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                            />
                          ) : (
                            <div 
                              className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                              style={{ width: '120px', height: '120px', fontSize: '2.5rem' }}
                            >
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <Button variant="outline-primary" size="sm">Change Photo</Button>
                      </div>
                    </Col>
                    
                    <Col md={9}>
                      <Form>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control type="text" defaultValue={user?.name || ''} />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" defaultValue={user?.email || ''} readOnly />
                              <Form.Text className="text-muted">
                                Email cannot be changed
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Tell us about yourself" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Company/Organization</Form.Label>
                          <Form.Control type="text" placeholder="Your company or organization" />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button variant="primary">Save Changes</Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                
                <Tab eventKey="preferences" title="Preferences">
                  <Form>
                    <h5 className="mb-3">Content Preferences</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Default Content Type</Form.Label>
                      <Form.Select>
                        <option>Blog Post</option>
                        <option>Social Media</option>
                        <option>Newsletter</option>
                        <option>Website Copy</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Default Categories</Form.Label>
                      <Form.Select multiple>
                        <option>Marketing</option>
                        <option>Product</option>
                        <option>Industry News</option>
                        <option>Tutorial</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Hold Ctrl (or Cmd) to select multiple categories
                      </Form.Text>
                    </Form.Group>
                    
                    <h5 className="mb-3">Notification Settings</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="email-notifications"
                        label="Email Notifications"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Receive email notifications for important updates
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Check 
                        type="switch"
                        id="content-reminders"
                        label="Content Schedule Reminders"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Receive reminders about upcoming content deadlines
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary">Save Preferences</Button>
                    </div>
                  </Form>
                </Tab>
                
                <Tab eventKey="security" title="Security">
                  <Form>
                    <h5 className="mb-3">Password</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end mb-4">
                      <Button variant="primary">Update Password</Button>
                    </div>
                    
                    <h5 className="mb-3">Two-Factor Authentication</h5>
                    
                    <Form.Group className="mb-4">
                      <Form.Check 
                        type="switch"
                        id="two-factor"
                        label="Enable Two-Factor Authentication"
                      />
                      <Form.Text className="text-muted">
                        Add an extra layer of security to your account
                      </Form.Text>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="primary">Save Security Settings</Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage; 