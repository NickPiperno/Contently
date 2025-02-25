# Infrastructure as Code (IaC) in Contently

This document explains how our AWS infrastructure is defined and managed using code in the Contently project. We use AWS Amplify Gen 2 with TypeScript to define our cloud resources.

## Overview

Infrastructure as Code (IaC) allows us to define, provision, and manage our AWS resources using code rather than manual processes. This approach provides several benefits:

- **Reproducibility**: Infrastructure can be consistently deployed across environments
- **Version Control**: Changes to infrastructure can be tracked and reviewed
- **Automation**: Deployment can be automated through CI/CD pipelines
- **Documentation**: The code itself serves as documentation for our infrastructure

## Directory Structure

Our infrastructure code is organized in the following structure:

```
packages/backend/amplify/
├─ data/                  # Data storage resources (DynamoDB)
│  └─ resource.ts         # Data resource definition
├─ storage/               # File storage resources (S3)
│  └─ resource.ts         # Storage resource definition
├─ functions/             # Lambda functions
│  └─ userPreferences/    # User preferences function
│     ├─ resource.ts      # Function resource definition
│     └─ handler.ts       # Function implementation
├─ api/                   # API Gateway resources
│  └─ resource.ts         # API resource definition
├─ backend.ts             # Main backend definition
├─ package.json           # Dependencies
└─ tsconfig.json          # TypeScript configuration
```

## Authentication with Auth0

We use Auth0 for authentication instead of AWS Cognito. The integration between Auth0 and our AWS resources is configured as follows:

1. **Frontend Integration**: The React application uses Auth0 React SDK to handle authentication flows.
2. **API Authorization**: API Gateway endpoints use JWT authorizers configured to validate Auth0 tokens.
3. **Lambda Functions**: Lambda functions extract user information from Auth0 tokens in the request context.

For more details on the Auth0 configuration, see [auth0-amplify-deployment.md](./auth0-amplify-deployment.md).

## Resource Definitions

### Data Storage (DynamoDB)

Data models and DynamoDB tables are defined in `packages/backend/amplify/data/resource.ts`. This includes the Todo model and any other data models needed by the application.

### File Storage (S3)

S3 bucket for file uploads is defined in `packages/backend/amplify/storage/resource.ts`. Access control is configured to work with our Auth0 authentication through IAM roles.

### Lambda Functions

Custom backend logic is implemented as Lambda functions in the `packages/backend/amplify/functions/` directory. Each function has:
- A resource definition file (`resource.ts`) that defines the function's configuration
- A handler file (`handler.ts`) that contains the function's implementation

Our Lambda functions are designed to work with Auth0 authentication by extracting user information from the JWT tokens passed in the request.

### API Gateway

REST API endpoints are defined in `packages/backend/amplify/api/resource.ts`. These endpoints expose our Lambda functions to the frontend and are configured to use JWT authorizers for Auth0 tokens.

## Main Backend Definition

All resources are combined in the main backend definition file `packages/backend/amplify/backend.ts`. This file imports all resource definitions and exports them as a single backend configuration.

## Deployment

Our infrastructure is deployed using the AWS Amplify CLI. The deployment process is automated through our CI/CD pipeline defined in `.github/workflows/amplify-deploy.yml`.

### Local Deployment

To deploy the infrastructure locally:

1. Install the AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure your AWS credentials:
   ```bash
   amplify configure
   ```

3. Deploy the backend:
   ```bash
   npm run amplify-push
   ```

### CI/CD Deployment

Our GitHub Actions workflow automatically deploys the infrastructure when changes are pushed to the main or develop branches. The workflow:

1. Builds and tests the application
2. Deploys the backend resources using the Amplify CLI
3. Deploys the frontend to AWS Amplify Hosting

## Making Changes

To make changes to the infrastructure:

1. Modify the appropriate resource definition file
2. Test the changes locally using `npm run amplify-push`
3. Commit and push the changes to trigger the CI/CD pipeline

## Best Practices

- Keep resource definitions modular and focused on a single responsibility
- Use TypeScript types for type safety and better IDE support
- Document any non-obvious configuration choices
- Test infrastructure changes in a development environment before deploying to production
- Use environment variables for environment-specific configuration

## References

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/gen2/)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- [Auth0 Documentation](https://auth0.com/docs/)
- [Infrastructure as Code Best Practices](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/infrastructure-as-code.html) 