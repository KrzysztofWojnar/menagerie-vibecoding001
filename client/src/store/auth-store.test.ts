import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './auth-store';

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useAuthStore.getState();
    store.clearUser();
  });
  
  it('initializes with isAuthenticated as false', () => {
    const store = useAuthStore.getState();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBe(null);
  });
  
  it('sets user and updates isAuthenticated', () => {
    const store = useAuthStore.getState();
    const mockUser = {
      id: 1,
      username: 'testuser',
      name: 'Test User',
      species: 'Dog',
      age: 3,
      bio: 'This is a test bio',
      avatar: '/images/avatar1.png',
      speciesPreferences: ['Cat', 'Bird'],
      createdAt: new Date()
    };
    
    store.setUser(mockUser);
    
    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
  });
  
  it('clears user and updates isAuthenticated', () => {
    const store = useAuthStore.getState();
    const mockUser = {
      id: 1,
      username: 'testuser',
      name: 'Test User',
      species: 'Dog',
      age: 3,
      bio: 'This is a test bio',
      avatar: '/images/avatar1.png',
      speciesPreferences: ['Cat', 'Bird'],
      createdAt: new Date()
    };
    
    // First set the user
    store.setUser(mockUser);
    expect(store.isAuthenticated).toBe(true);
    
    // Then clear the user
    store.clearUser();
    
    expect(store.user).toBe(null);
    expect(store.isAuthenticated).toBe(false);
  });
});