// packages/backend/amplify/functions/userPreferences/handler.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  GetCommand, 
  PutCommand 
} from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const TABLE_NAME = process.env.USER_PREFERENCES_TABLE || 'UserPreferences';

/**
 * Lambda function handler for managing user preferences
 * Supports GET and POST operations to retrieve and update user preferences
 * Works with Auth0 authentication
 */
export const handler = async (event: any) => {
  try {
    // Extract user information from Auth0 token in the request
    // The Auth0 user ID will be available in the event.requestContext.authorizer
    const auth = event.requestContext?.authorizer;
    const userId = auth?.claims?.sub || auth?.jwt?.claims?.sub;
    
    if (!userId) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized - User ID not found in token' }),
      };
    }

    // Handle different HTTP methods
    if (event.httpMethod === 'GET') {
      // Retrieve user preferences
      const params = {
        TableName: TABLE_NAME,
        Key: { userId },
      };

      const { Item } = await ddbDocClient.send(new GetCommand(params));
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // CORS support
        },
        body: JSON.stringify(Item || { userId, preferences: {} }),
      };
    } 
    else if (event.httpMethod === 'POST') {
      // Update user preferences
      const body = JSON.parse(event.body || '{}');
      const preferences = body.preferences || {};
      
      const params = {
        TableName: TABLE_NAME,
        Item: {
          userId,
          preferences,
          updatedAt: new Date().toISOString(),
        },
      };

      await ddbDocClient.send(new PutCommand(params));
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // CORS support
        },
        body: JSON.stringify({ 
          message: 'Preferences updated successfully',
          preferences 
        }),
      };
    }
    
    // Method not supported
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS support
      },
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS support
      },
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: (error as Error).message 
      }),
    };
  }
}; 