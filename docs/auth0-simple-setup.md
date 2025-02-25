# docs/simple-auth0-setup.md

# Simple Auth0 Setup Guide

This document provides a straightforward approach to setting up Auth0 for the Contently application.

## 1. Basic Auth0 Setup

### Create an Auth0 Application

1. Sign up for an Auth0 account at [auth0.com](https://auth0.com/)
2. Create a new application:
   - Go to **Applications > Applications**
   - Click **Create Application**
   - Name it "Contently"
   - Select "Single Page Application"
   - Click **Create**

### Configure Application Settings

1. In your application settings:
   - Add Allowed Callback URLs: `http://localhost:3000/callback, https://contently.com/callback`
   - Add Allowed Logout URLs: `http://localhost:3000, https://contently.com`
   - Add Allowed Web Origins: `http://localhost:3000, https://contently.com`
   - Click **Save Changes**

### Set Up API

1. Go to **Applications > APIs**
2. Click **Create API**
3. Name it "Contently API"
4. Set the Identifier to `https://api.contently.com`
5. Click **Create**

## 2. Role-Based Access Control (Simple Version)

### Create Roles

1. Go to **User Management > Roles**
2. Create three basic roles:
   - **Admin**: Full access
   - **Editor**: Content creation and management
   - **Viewer**: Read-only access

### Assign Roles to Users

1. Go to **User Management > Users**
2. Select a user
3. Go to the **Roles** tab
4. Click **Assign Roles**
5. Select the appropriate role
6. Click **Assign**

## 3. Social Login (Optional)

### Google Login

1. Go to **Authentication > Social**
2. Click on Google
3. Follow the setup wizard to configure Google credentials
4. Enable the connection

### GitHub Login

1. Go to **Authentication > Social**
2. Click on GitHub
3. Follow the setup wizard to configure GitHub credentials
4. Enable the connection

## 4. Frontend Integration

Add Auth0 to your React application:

```bash
npm install @auth0/auth0-react
```

Configure the Auth0 provider in your app:

```jsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="your-domain.auth0.com"
    clientId="your-client-id"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://api.contently.com"
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
```

## 5. Backend Integration

Configure your API Gateway to use a JWT authorizer:

1. In API Gateway, create a JWT authorizer
2. Set the issuer URL to `https://your-domain.auth0.com/`
3. Set the audience to `https://api.contently.com`

## 6. Testing

1. **Login Test**: Try logging in with different users
2. **Role Test**: Verify that users with different roles see appropriate UI elements
3. **API Test**: Verify that API calls include the JWT token and permissions are enforced

## That's it!

This simplified approach covers the essential Auth0 configuration without overwhelming complexity. You can always add more advanced features as needed. 

## Deployment to AWS Amplify

When you're ready to deploy your application to AWS Amplify, please refer to the [Auth0 Amplify Deployment Guide](./auth0-amplify-deployment.md) for specific instructions on:

- Configuring Auth0 for your Amplify environment
- Setting up environment variables in Amplify
- Handling multiple deployment environments
- Troubleshooting common Auth0-Amplify integration issues 

## Adding Role Information to Tokens

For your application to use these roles and permissions, you need to add them to the JWT tokens. Create an Auth0 Rule:

```javascript
function(user, context, callback) {
  const namespace = 'https://contently.com';

  // Add roles to tokens
  if (context.authorization && context.authorization.roles) {
    const assignedRoles = context.authorization.roles;

    if (context.idToken) {
      context.idToken[`${namespace}/roles`] = assignedRoles;
    }
    
    if (context.accessToken) {
      context.accessToken[`${namespace}/roles`] = assignedRoles;
    }
  }

  callback(null, user, context);
} 