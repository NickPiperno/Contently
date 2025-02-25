# Contently

A content management platform built with React, Vite, and AWS services.

## Features

- User authentication with Auth0
- Content creation and management
- Responsive design with Bootstrap
- Modern React patterns with hooks and context

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Auth0 account for authentication

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contently.git
   cd contently
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Auth0:
   - Create an account at [Auth0](https://auth0.com/)
   - Create a new application (Single Page Application)
   - Configure the callback URLs (e.g., http://localhost:3000)
   - Note your Auth0 domain and client ID

4. Create a `.env` file based on `.env.example`:
   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_CALLBACK_URL=http://localhost:3000
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
contently/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── services/       # API and service integrations
│   ├── styles/         # Global styles and theme
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── index.tsx       # Entry point
│   └── vite-env.d.ts   # Vite type declarations
├── .env.example        # Example environment variables
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Auth0 Authentication

This project uses Auth0 for user authentication. The authentication flow includes:

1. **Sign Up**: Users can create a new account with email and password or social providers
2. **Sign In**: Authenticated access with email and password or social providers
3. **Password Reset**: Users can reset their password if forgotten

The authentication state is managed through the `AuthContext` which provides:
- Current user information
- Authentication status
- Methods for sign in, sign up, sign out, etc.

Protected routes in the application check the authentication state and redirect unauthenticated users to the login page.

## Customizing Auth0

To customize the authentication flow:

1. Modify the Auth0 application settings in the [Auth0 Dashboard](https://manage.auth0.com/)
2. Update the `AuthContext` to handle additional authentication scenarios
3. Adjust the `AuthPage` component to support new authentication UI requirements

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 