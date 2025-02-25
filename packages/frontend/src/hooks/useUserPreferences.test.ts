import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { useUserPreferences } from './useUserPreferences';
import { userPreferencesService } from '../services/userPreferences';
import { useAuth } from '../contexts/AuthContext';

// Mock the dependencies
vi.mock('../services/userPreferences', () => ({
  userPreferencesService: {
    getPreferences: vi.fn(),
    savePreferences: vi.fn(),
    updatePreference: vi.fn()
  }
}));

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

describe('useUserPreferences', () => {
  // Setup default mocks
  beforeEach(() => {
    // Mock authenticated user
    (useAuth as any).mockReturnValue({
      isAuthenticated: true
    });

    // Mock preferences service
    (userPreferencesService.getPreferences as any).mockResolvedValue({
      theme: 'light',
      fontSize: 'medium'
    });

    (userPreferencesService.savePreferences as any).mockImplementation(
      (prefs: any) => Promise.resolve(prefs)
    );

    (userPreferencesService.updatePreference as any).mockImplementation(
      (key: string, value: any) => Promise.resolve({ theme: 'light', fontSize: 'medium', [key]: value })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should load preferences when authenticated', async () => {
    const { result } = renderHook(() => useUserPreferences());
    
    // Initially loading
    expect(result.current.loading).toBe(true);
    
    // Wait for loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // After loading
    expect(result.current.preferences).toEqual({
      theme: 'light',
      fontSize: 'medium'
    });
    expect(userPreferencesService.getPreferences).toHaveBeenCalledTimes(1);
  });

  test('should not load preferences when not authenticated', async () => {
    // Mock unauthenticated user
    (useAuth as any).mockReturnValue({
      isAuthenticated: false
    });

    const { result } = renderHook(() => useUserPreferences());
    
    // Should not be loading and have empty preferences
    expect(result.current.loading).toBe(false);
    expect(result.current.preferences).toEqual({});
    expect(userPreferencesService.getPreferences).not.toHaveBeenCalled();
  });

  test('should update a preference', async () => {
    const { result } = renderHook(() => useUserPreferences());
    
    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    await act(async () => {
      await result.current.updatePreference('theme', 'dark');
    });
    
    expect(userPreferencesService.updatePreference).toHaveBeenCalledWith('theme', 'dark');
    expect(result.current.preferences.theme).toBe('dark');
  });

  test('should save all preferences', async () => {
    const { result } = renderHook(() => useUserPreferences());
    
    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    const newPreferences = {
      theme: 'dark' as const,
      fontSize: 'large' as const,
      notifications: {
        email: true
      }
    };
    
    await act(async () => {
      await result.current.savePreferences(newPreferences);
    });
    
    expect(userPreferencesService.savePreferences).toHaveBeenCalledWith(newPreferences);
    expect(result.current.preferences).toEqual(newPreferences);
  });

  test('should get a preference with default value', async () => {
    const { result } = renderHook(() => useUserPreferences());
    
    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Existing preference
    expect(result.current.getPreference('theme', 'system')).toBe('light');
    
    // Non-existing preference
    expect(result.current.getPreference('language', 'en')).toBe('en');
  });

  test('should handle errors when loading preferences', async () => {
    // Mock error
    const error = new Error('Failed to load');
    (userPreferencesService.getPreferences as any).mockRejectedValue(error);
    
    const { result } = renderHook(() => useUserPreferences());
    
    // Wait for error to be set
    await waitFor(() => expect(result.current.error).not.toBeNull());
    
    expect(result.current.error).toEqual(error);
    expect(result.current.loading).toBe(false);
  });

  test('should handle errors when updating preferences', async () => {
    const { result } = renderHook(() => useUserPreferences());
    
    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Mock error for update
    const error = new Error('Failed to update');
    (userPreferencesService.updatePreference as any).mockRejectedValue(error);
    
    await act(async () => {
      try {
        await result.current.updatePreference('theme', 'dark');
      } catch (e) {
        // Expected error
      }
    });
    
    expect(result.current.error).toEqual(error);
    expect(userPreferencesService.getPreferences).toHaveBeenCalledTimes(2); // Initial + reload after error
  });
}); 