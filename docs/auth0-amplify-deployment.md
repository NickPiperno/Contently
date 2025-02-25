# Auth0 Configuration for AWS Amplify Deployment

This guide explains how to configure Auth0 for your Contently application when deploying to AWS Amplify.

## 1. Find Your Amplify App URL

When you deploy your application to AWS Amplify, it will be assigned a URL in one of these formats:

- **Default Amplify domain**: `https://[branch].[app-id].amplifyapp.com`
- **Custom domain** (if configured): `https://www.yourdomain.com`

You can find this URL in the AWS Amplify Console after deployment.

## 2. Update Auth0 Application Settings

1. **Log in to your Auth0 Dashboard**: https://manage.auth0.com/

2. **Navigate to Applications > Applications**

3. **Select your application**

4. **Update the following fields**:
   - **Allowed Callback URLs**: Add your Amplify URL
     ```
     http://localhost:3000, https://[your-amplify-url]
     ```
   
   - **Allowed Logout URLs**: Add your Amplify URL
     ```
     http://localhost:3000, https://[your-amplify-url]
     ```
   
   - **Allowed Web Origins**: Add your Amplify URL
     ```
     http://localhost:3000, https://[your-amplify-url]
     ```

5. **Save Changes**

## 3. Configure Environment Variables in Amplify

1. **Go to the AWS Amplify Console**

2. **Select your app**

3. **Navigate to Environment variables**

4. **Add the following variables**:
   - `VITE_AUTH0_DOMAIN`: Your Auth0 domain (e.g., `your-tenant.auth0.com`)
   - `VITE_AUTH0_CLIENT_ID`: Your Auth0 client ID
   - `VITE_AUTH0_CALLBACK_URL`: Your Amplify URL (e.g., `https://main.d1abc123def.amplifyapp.com`)

5. **Save**

## 4. Handling Multiple Environments

If you have multiple environments (development, staging, production), you have two options:

### Option 1: Multiple Auth0 Applications

Create a separate Auth0 application for each environment, with its own client ID and appropriate callback URLs.

### Option 2: Single Auth0 Application with Multiple URLs

Add all environment URLs to the allowed URLs lists in a single Auth0 application, and use environment variables to configure the correct callback URL for each environment.

## 5. Testing the Integration

1. **Deploy your application to Amplify**

2. **Visit your Amplify URL**

3. **Test the authentication flow**:
   - Sign up
   - Log in
   - Log out

4. **Check the Auth0 logs** for any errors

## Troubleshooting

### CORS Issues

If you encounter CORS errors:
- Verify that your Amplify URL is correctly added to the "Allowed Web Origins" in Auth0
- Check that the `VITE_AUTH0_CALLBACK_URL` environment variable matches exactly with what's configured in Auth0

### Redirect Issues

If redirects aren't working:
- Ensure the `VITE_AUTH0_CALLBACK_URL` is correctly set in your Amplify environment variables
- Verify that the URL is included in the "Allowed Callback URLs" in Auth0
- Check for any typos or missing protocols (https://)

### Login Loop

If you're stuck in a login loop:
- Check that your Auth0 domain and client ID are correct
- Verify that cookies are being properly set (check browser settings)
- Ensure your Auth0 application type is set to "Single Page Application" 