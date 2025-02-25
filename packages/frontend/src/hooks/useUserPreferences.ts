import { useState, useEffect, useCallback } from 'react';
import { userPreferencesService, UserPreferences } from '../services/userPreferences';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook for managing user preferences
 * Provides methods to get and update user preferences
 * @returns Object with preferences and methods to update them
 */
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth();

  // Load preferences when the component mounts and the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPreferences();
    } else {
      // Reset preferences when user is not authenticated
      setPreferences({});
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load preferences from the API
  const loadPreferences = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const prefs = await userPreferencesService.getPreferences();
      setPreferences(prefs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load preferences'));
      console.error('Error loading preferences:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Update a specific preference
  const updatePreference = useCallback(async (key: string, value: any) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Update locally first for immediate UI feedback
      setPreferences(prev => ({
        ...prev,
        [key]: value
      }));
      
      // Then update on the server
      const updatedPrefs = await userPreferencesService.updatePreference(key, value);
      
      // Update with server response to ensure consistency
      setPreferences(updatedPrefs);
      
      return updatedPrefs;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to update preference: ${key}`));
      console.error(`Error updating preference ${key}:`, err);
      
      // Reload preferences to ensure UI is in sync with server
      await loadPreferences();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadPreferences]);

  // Save all preferences
  const savePreferences = useCallback(async (newPreferences: UserPreferences) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Update locally first for immediate UI feedback
      setPreferences(newPreferences);
      
      // Then update on the server
      const updatedPrefs = await userPreferencesService.savePreferences(newPreferences);
      
      // Update with server response to ensure consistency
      setPreferences(updatedPrefs);
      
      return updatedPrefs;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save preferences'));
      console.error('Error saving preferences:', err);
      
      // Reload preferences to ensure UI is in sync with server
      await loadPreferences();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadPreferences]);

  // Get a specific preference with a default value
  const getPreference = useCallback(<T>(key: string, defaultValue: T): T => {
    return preferences[key] !== undefined ? preferences[key] : defaultValue;
  }, [preferences]);

  return {
    preferences,
    loading,
    error,
    updatePreference,
    savePreferences,
    getPreference,
    reload: loadPreferences
  };
} 