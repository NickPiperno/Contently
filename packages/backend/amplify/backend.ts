import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { userPreferencesFunction } from './functions/userPreferences/resource';
import { api } from './api/resource';

/**
 * Main backend definition that combines all resources
 * Note: We're using Auth0 for authentication instead of Cognito
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  // Auth is handled by Auth0, not Cognito
  data,
  storage,
  userPreferencesFunction,
  // API endpoints are defined in the function configuration
});

// Note: Custom infrastructure for DynamoDB tables is defined in custom-infrastructure.ts
// This will be integrated during the Amplify deployment process using CDK directly
