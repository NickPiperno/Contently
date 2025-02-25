import { Construct } from 'constructs';
import { 
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  RemovalPolicy,
  CfnOutput
} from 'aws-cdk-lib';
import { defineBackend } from '@aws-amplify/backend';

/**
 * Custom infrastructure resources for the Contently application
 * This file defines AWS resources that are not directly supported by Amplify Gen 2
 * 
 * @param scope The CDK construct scope
 * @returns The custom resources
 */
export function createCustomResources(scope: Construct) {
  // Create the UserPreferences DynamoDB table
  const userPreferencesTable = new dynamodb.Table(scope, 'UserPreferencesTable', {
    tableName: 'UserPreferences',
    partitionKey: {
      name: 'userId',
      type: dynamodb.AttributeType.STRING
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // On-demand capacity
    removalPolicy: RemovalPolicy.RETAIN, // Prevent accidental deletion
    pointInTimeRecovery: true, // Enable point-in-time recovery for data protection
  });

  // Add GSI for querying by updatedAt if needed in the future
  userPreferencesTable.addGlobalSecondaryIndex({
    indexName: 'UpdatedAtIndex',
    partitionKey: {
      name: 'userId',
      type: dynamodb.AttributeType.STRING
    },
    sortKey: {
      name: 'updatedAt',
      type: dynamodb.AttributeType.STRING
    },
    projectionType: dynamodb.ProjectionType.ALL
  });

  // Output the table name for reference
  new CfnOutput(scope, 'UserPreferencesTableName', {
    value: userPreferencesTable.tableName,
    description: 'The name of the UserPreferences table',
    exportName: 'UserPreferencesTableName'
  });

  // Output the table ARN for reference
  new CfnOutput(scope, 'UserPreferencesTableArn', {
    value: userPreferencesTable.tableArn,
    description: 'The ARN of the UserPreferences table',
    exportName: 'UserPreferencesTableArn'
  });

  // Find the userPreferences Lambda function by its logical ID
  // Note: The actual function name will be determined during deployment
  // This is a placeholder that will need to be updated with the correct function reference
  const userPreferencesFunction = lambda.Function.fromFunctionName(
    scope,
    'UserPreferencesFunction',
    'userPreferences'
  );

  // Grant the Lambda function read/write access to the table
  userPreferencesTable.grantReadWriteData(userPreferencesFunction);

  // Return the created resources
  return {
    userPreferencesTable
  };
} 