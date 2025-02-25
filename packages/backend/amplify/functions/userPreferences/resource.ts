import { defineFunction } from '@aws-amplify/backend';

/**
 * Define a Lambda function for handling user preferences
 * This function will store and retrieve user preferences from DynamoDB
 * @see https://docs.amplify.aws/gen2/build-a-backend/functions/
 */
export const userPreferencesFunction = defineFunction({
  name: 'userPreferences',
  entry: './handler.ts',
}); 