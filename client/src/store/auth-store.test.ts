import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './auth-store';
import { Animal } from '../types/animal';

// Reset the store before each test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    setUser: (user) => useAuthStore.setState({ user, isAuthenticated: true }),
    clearUser: () => useAuthStore.setState({ user: null, isAuthenticated: false }),
  });
});

describe('AuthStore', () => {
  it('should initialize with null user and isAuthenticated as false', () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
  
  it('should set the user and update isAuthenticated to true', () => {
    const mockUser: Animal = {
      id: 1,
      username: 'testuser',
      name: 'Test User',
      species: 'Dog',
      age: 3,
      avatar: 'https://placekitten.com/200/200',
      speciesPreferences: ['Cat'],
      createdAt: new Date()
    };
    
    // Call the setUser action
    useAuthStore.getState().setUser(mockUser);
    
    // Get the updated state
    const { user, isAuthenticated } = useAuthStore.getState();
    
    // Verify state was updated correctly
    expect(user).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
  });
  
  it('should clear the user and update isAuthenticated to false', () => {
    // First set a user
    const mockUser: Animal = {
      id: 1,
      username: 'testuser',
      name: 'Test User',
      species: 'Dog',
      age: 3,
      avatar: 'https://placekitten.com/200/200',
      speciesPreferences: ['Cat'],
      createdAt: new Date()
    };
    
    useAuthStore.getState().setUser(mockUser);
    
    // Verify user was set
    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    // Call the clearUser action
    useAuthStore.getState().clearUser();
    
    // Get the updated state
    const { user, isAuthenticated } = useAuthStore.getState();
    
    // Verify state was updated correctly
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});