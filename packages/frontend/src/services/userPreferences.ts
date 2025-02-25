import { Amplify } from 'aws-amplify';

/**
 * Interface for user preferences
 */
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  fontSize?: 'small' | 'medium' | 'large';
  editorMode?: 'basic' | 'advanced';
  notifications?: {
    email?: boolean;
    push?: boolean;
    contentReminders?: boolean;
    marketingUpdates?: boolean;
  };
  contentDisplay?: {
    defaultView?: 'grid' | 'list';
    sortBy?: 'date' | 'title' | 'status';
    showCompleted?: boolean;
  };
  [key: string]: any; // Allow for additional custom preferences
}

/**
 * Service for managing user preferences
 * Uses the backend API to store and retrieve preferences in DynamoDB
 */
export const userPreferencesService = {
  /**
   * Get user preferences from the API
   * @returns Promise with user preferences
   */
  async getPreferences(): Promise<UserPreferences> {
    try {
      const response = await fetch('/api/preferences', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching preferences: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.preferences || {};
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return {};
    }
  },

  /**
   * Save user preferences to the API
   * @param preferences User preferences to save
   * @returns Promise with the saved preferences
   */
  async savePreferences(preferences: UserPreferences): Promise<UserPreferences> {
    try {
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({ preferences })
      });
      
      if (!response.ok) {
        throw new Error(`Error saving preferences: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.preferences;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  },

  /**
   * Update a specific preference
   * @param key Preference key to update
   * @param value New value for the preference
   * @returns Promise with the updated preferences
   */
  async updatePreference(key: string, value: any): Promise<UserPreferences> {
    try {
      // First get current preferences
      const currentPreferences = await this.getPreferences();
      
      // Update the specific preference
      const updatedPreferences = {
        ...currentPreferences,
        [key]: value
      };
      
      // Save the updated preferences
      return await this.savePreferences(updatedPreferences);
    } catch (error) {
      console.error(`Error updating preference ${key}:`, error);
      throw error;
    }
  },
  
  /**
   * Get the current auth token
   * @returns Promise with the auth token
   */
  async getAuthToken(): Promise<string> {
    try {
      // Get the current session from Auth0
      // This implementation will depend on your Auth0 setup
      // For example, if using the Auth0 React SDK:
      // const { getAccessTokenSilently } = useAuth0();
      // return await getAccessTokenSilently();
      
      // Placeholder implementation - replace with your actual Auth0 token retrieval
      const token = localStorage.getItem('auth0_token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  }
}; 