import { defineBackend } from '@aws-amplify/backend';
import { userPreferencesFunction } from '../functions/userPreferences/resource';

/**
 * Define REST API endpoints for our backend services
 * This creates API Gateway endpoints to expose our Lambda functions
 * Note: We're using Auth0 for authentication, not Cognito
 * @see https://docs.amplify.aws/gen2/build-a-backend/functions/rest-api/
 */
export const api = {
  // User preferences API endpoints
  preferences: {
    handler: userPreferencesFunction,
    routes: [
      {
        path: '/preferences',
        method: 'GET',
        // We'll configure Auth0 JWT authorizer in the AWS console
        // or through custom CloudFormation templates
        authorizationTypes: ['JWT'],
      },
      {
        path: '/preferences',
        method: 'POST',
        // We'll configure Auth0 JWT authorizer in the AWS console
        // or through custom CloudFormation templates
        authorizationTypes: ['JWT'],
      },
    ],
  },
}; 