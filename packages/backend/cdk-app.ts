// packages/backend/cdk-app.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCustomResources } from './amplify/custom-infrastructure';

/**
 * Custom CDK stack for Contently application
 * This stack defines resources that are not directly supported by Amplify Gen 2
 */
class ContentlyInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create custom resources
    const customResources = createCustomResources(this);
  }
}

// Create CDK app
const app = new cdk.App();

// Create stack
new ContentlyInfrastructureStack(app, 'ContentlyInfrastructureStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'Custom infrastructure for Contently application',
});

// Synthesize CloudFormation template
app.synth(); 