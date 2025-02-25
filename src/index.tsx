import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import AppRouter from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import './styles/theme.css';
import './styles/bootstrap-custom.css';

/**
 * Entry point for the React application
 * Renders the main App component to the DOM using React 18's createRoot API
 * Wrapped with Auth0Provider for authentication
 */
const container = document.getElementById('root');
const root = createRoot(container!);

// Auth0 configuration
const domain = import.meta.env.VITE_AUTH0_DOMAIN || '';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;

// Check if Auth0 is properly configured
if (!domain || !clientId) {
  console.warn('Auth0 configuration is incomplete. Authentication will not work.');
  console.log('Please set the following environment variables:');
  console.log('- VITE_AUTH0_DOMAIN');
  console.log('- VITE_AUTH0_CLIENT_ID');
}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      <AppRouter />
    </Auth0Provider>
  </React.StrictMode>
);
