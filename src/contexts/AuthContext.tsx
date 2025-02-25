import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Define the shape of the user object
interface User {
  email: string;
  name?: string;
  picture?: string;
  sub?: string;
  [key: string]: any;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  error: null,
  setError: () => {},
});

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component that wraps the application and provides authentication state
 * @param children - The child components to render
 * @returns The AuthProvider component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = React.useState<string | null>(null);
  
  // Use Auth0 hooks
  const { 
    user: auth0User, 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout 
  } = useAuth0();

  // Map Auth0 user to our User interface
  const user: User | null = auth0User ? {
    email: auth0User.email || '',
    name: auth0User.name,
    picture: auth0User.picture,
    sub: auth0User.sub,
    ...auth0User
  } : null;

  /**
   * Sign in a user with Auth0
   */
  const handleSignIn = () => {
    try {
      setError(null);
      loginWithRedirect();
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    }
  };

  /**
   * Sign up a new user with Auth0
   * Note: With Auth0, sign up is typically handled through the same flow as sign in
   */
  const handleSignUp = () => {
    try {
      setError(null);
      loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup'
        }
      });
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
    }
  };

  /**
   * Sign out the current user
   */
  const handleSignOut = () => {
    try {
      setError(null);
      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    }
  };

  // The value to be provided to consumers of the context
  const value = {
    user,
    isAuthenticated,
    isLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @returns The auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 