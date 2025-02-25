import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that provides consistent navigation and structure
 * @param children - The content to render within the layout
 * @returns The MainLayout component
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  
  // Helper function to determine if a nav link is active
  const isActive = (path: string) => location.pathname === path;
  
  // Handle logout
  const handleLogout = () => {
    signOut();
    navigate('/');
  };
  
  // Handle new content button click
  const handleNewContent = () => {
    navigate('/editor');
    setExpanded(false);
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        bg="white" 
        expand="lg" 
        className="shadow-sm py-2" 
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4">
            Contently
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'active fw-semibold' : ''}
                onClick={() => setExpanded(false)}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/calendar" 
                className={isActive('/calendar') ? 'active fw-semibold' : ''}
                onClick={() => setExpanded(false)}
              >
                Calendar
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/editor" 
                className={isActive('/editor') ? 'active fw-semibold' : ''}
                onClick={() => setExpanded(false)}
              >
                Editor
              </Nav.Link>
            </Nav>
            
            <div className="d-flex align-items-center">
              <Button 
                variant="primary" 
                size="sm" 
                className="me-3"
                onClick={handleNewContent}
              >
                + New Content
              </Button>
              
              <Dropdown align="end">
                <Dropdown.Toggle 
                  as="div" 
                  id="user-dropdown" 
                  className="d-flex align-items-center cursor-pointer"
                >
                  {user?.picture ? (
                    <Image 
                      src={user.picture} 
                      alt="Profile" 
                      roundedCircle 
                      width={36} 
                      height={36} 
                      className="border" 
                    />
                  ) : (
                    <div 
                      className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '36px', height: '36px' }}
                    >
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </Dropdown.Toggle>
                
                <Dropdown.Menu className="shadow-sm border-0">
                  <Dropdown.Item disabled className="text-muted">
                    Signed in as <strong>{user?.email}</strong>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    as={Link} 
                    to="/settings"
                    onClick={() => setExpanded(false)}
                  >
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <main className="flex-grow-1 bg-light">
        {children}
      </main>
      
      <footer className="bg-white py-3 border-top">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              &copy; {new Date().getFullYear()} Contently. All rights reserved.
            </div>
            <div>
              <Nav className="small">
                <Nav.Link href="#" className="px-2">Privacy</Nav.Link>
                <Nav.Link href="#" className="px-2">Terms</Nav.Link>
                <Nav.Link href="#" className="px-2">Help</Nav.Link>
              </Nav>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout; 