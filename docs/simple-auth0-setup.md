## Automating with Auth0 Management API

Yes, you can automate this process instead of using the console! Auth0 provides a Management API that allows you to script everything:

```javascript
// Example using Node.js and axios
const axios = require('axios');
const ManagementClient = require('auth0').ManagementClient;

// Initialize the client
const management = new ManagementClient({
  domain: 'your-domain.auth0.com',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  scope: 'read:roles create:roles update:roles read:users update:users'
});

// Create a role
management.roles.create({
  name: 'Admin',
  description: 'Administrator role with full access'
}).then(role => {
  console.log('Role created:', role);
  
  // Assign permissions to the role
  return management.roles.addPermissions(role.id, {
    permissions: [
      { resource_server_identifier: 'https://api.contently.com', permission_name: 'create:items' },
      { resource_server_identifier: 'https://api.contently.com', permission_name: 'update:items' },
      { resource_server_identifier: 'https://api.contently.com', permission_name: 'delete:items' }
    ]
  });
}).then(() => {
  console.log('Permissions assigned to role');
});