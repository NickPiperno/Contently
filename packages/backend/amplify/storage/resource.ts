import { defineStorage } from '@aws-amplify/backend';

/**
 * Define and configure your storage resource
 * This creates an S3 bucket for file uploads with appropriate access controls
 * Note: We're using Auth0 for authentication, but we'll configure the S3 bucket
 * to work with our Auth0 integration through IAM roles
 * @see https://docs.amplify.aws/gen2/build-a-backend/storage/
 */
export const storage = defineStorage({
  name: 'contentlyStorage',
}); 