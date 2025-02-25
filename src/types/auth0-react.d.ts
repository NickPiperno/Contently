// src/types/auth0-react.d.ts
declare module '@auth0/auth0-react' {
  import { ComponentType, Context, ReactNode } from 'react';

  export interface Auth0ContextInterface<TUser extends User = User> {
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: Error;
    user?: TUser;
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>;
    getAccessTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
    getIdTokenClaims: () => Promise<IdToken>;
    loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
    loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
    logout: (options?: LogoutOptions) => void;
  }

  export interface AppState {
    returnTo?: string;
    [key: string]: any;
  }

  export interface Auth0RedirectLoginOptions {
    authorizationParams?: {
      [key: string]: any;
      audience?: string;
      scope?: string;
      screen_hint?: string;
    };
    appState?: AppState;
    fragment?: string;
  }

  export type RedirectLoginOptions = Auth0RedirectLoginOptions;

  export interface Auth0PopupLoginOptions {
    authorizationParams?: {
      [key: string]: any;
      audience?: string;
      scope?: string;
    };
    appState?: AppState;
    fragment?: string;
    timeoutInSeconds?: number;
  }

  export type PopupLoginOptions = Auth0PopupLoginOptions;

  export interface LogoutOptions {
    clientId?: string;
    logoutParams?: {
      [key: string]: any;
      returnTo?: string;
      federated?: boolean;
    };
  }

  export interface GetTokenSilentlyOptions {
    authorizationParams?: {
      [key: string]: any;
      audience?: string;
      scope?: string;
    };
    cacheMode?: 'on' | 'off';
    detailedResponse?: boolean;
    timeoutInSeconds?: number;
  }

  export interface GetTokenWithPopupOptions {
    authorizationParams?: {
      [key: string]: any;
      audience?: string;
      scope?: string;
    };
    timeoutInSeconds?: number;
  }

  export interface IdToken {
    __raw: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: string;
    updated_at?: string;
    iss?: string;
    aud?: string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    azp?: string;
    nonce?: string;
    auth_time?: string;
    at_hash?: string;
    c_hash?: string;
    acr?: string;
    amr?: string;
    sub_jwk?: string;
    cnf?: string;
    sid?: string;
    [key: string]: any;
  }

  export interface User {
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: string;
    updated_at?: string;
    sub?: string;
    [key: string]: any;
  }

  export interface Auth0ProviderOptions {
    domain: string;
    clientId: string;
    authorizationParams?: {
      [key: string]: any;
      audience?: string;
      scope?: string;
      redirect_uri?: string;
      connection?: string;
      max_age?: number;
    };
    useRefreshTokens?: boolean;
    useRefreshTokensFallback?: boolean;
    cacheLocation?: 'memory' | 'localstorage';
    skipRedirectCallback?: boolean;
    children?: ReactNode;
    onRedirectCallback?: (appState?: AppState) => void;
  }

  export const Auth0Provider: ComponentType<Auth0ProviderOptions>;
  export const Auth0Context: Context<Auth0ContextInterface>;
  export const useAuth0: <TUser extends User = User>() => Auth0ContextInterface<TUser>;
  export const withAuth0: <P extends Auth0ContextInterface, R = Omit<P, keyof Auth0ContextInterface>>(
    Component: ComponentType<P>
  ) => ComponentType<R>;
  export const withAuthenticationRequired: <P extends object>(
    Component: ComponentType<P>,
    options?: {
      returnTo?: string | (() => string);
      onRedirecting?: () => JSX.Element;
      loginOptions?: RedirectLoginOptions;
    }
  ) => ComponentType<P>;
} 