# Deploying Contently to AWS Amplify

This guide provides step-by-step instructions for deploying the Contently application to AWS Amplify.

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Node.js and npm installed
- Amplify CLI installed globally (`npm install -g @aws-amplify/cli`)

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

## AWS Amplify Setup

### Option 1: Deploy from Git Repository

1. **Push your code to a Git repository** (GitHub, GitLab, BitBucket, etc.)

2. **Log in to the AWS Management Console**

3. **Navigate to AWS Amplify**

4. **Click "New app" > "Host web app"**

5. **Select your Git provider and repository**

6. **Configure build settings**:
   - The default settings should work as we have an `amplify.yml` file
   - You can add environment variables if needed (VITE_AWS_REGION, etc.)

7. **Click "Save and deploy"**

### Option 2: Manual Deployment with Amplify CLI (Gen 2)

1. **Make sure you have the latest Amplify CLI installed**:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize the backend if not already done**:
   ```bash
   npm run amplify-pull
   ```
   Or if starting from scratch:
   ```bash
   amplify init
   ```

3. **Generate the Amplify configuration**:
   ```bash
   npm run amplify-generate-outputs
   ```

4. **Deploy the backend resources**:
   ```bash
   npm run amplify-push
   ```

5. **Deploy the frontend**:
   ```bash
   npm run amplify-deploy
   ```

## Environment Variables

If you're not using the Amplify CLI to generate configuration files, you'll need to set these environment variables in the Amplify Console:

- `VITE_AWS_REGION`: The AWS region (e.g., us-east-1)
- `VITE_AUTH0_DOMAIN`: Your Auth0 domain
- `VITE_AUTH0_CLIENT_ID`: Your Auth0 client ID
- `VITE_AUTH0_CALLBACK_URL`: Your Auth0 callback URL

## Troubleshooting

### Missing AWS Exports File

If you see errors about missing `aws-exports.js`, make sure you've run:
```bash
amplify push
```

This will generate the necessary configuration files.

### Build Errors

If you encounter build errors:

1. Check the build logs in the Amplify Console
2. Verify that your `amplify.yml` file is correctly configured
3. Make sure all dependencies are properly installed

### Authentication Issues

If authentication isn't working:

1. Verify that your Auth0 application is properly configured
2. Check that the environment variables are correctly set
3. Ensure that the Amplify configuration in `src/index.tsx` is correct

## Continuous Deployment

AWS Amplify supports continuous deployment from your Git repository. Any changes pushed to your main branch (or configured branch) will automatically trigger a new deployment.

## Custom Domains

To set up a custom domain:

1. In the Amplify Console, go to your app
2. Click on "Domain management"
3. Click "Add domain"
4. Follow the prompts to configure your domain

## Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Auth0 Documentation](https://auth0.com/docs/)
- [Vite Documentation](https://vitejs.dev/guide/) 