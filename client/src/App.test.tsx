import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Mock fetch for auth check
global.fetch = vi.fn();

// Mock components
vi.mock('./pages/home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock('./pages/matches', () => ({
  default: () => <div data-testid="matches-page">Matches Page</div>
}));

vi.mock('./pages/profile', () => ({
  default: () => <div data-testid="profile-page">Profile Page</div>
}));

vi.mock('./pages/not-found', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>
}));

// Mock wouter
let currentLocation = '/';
const mockSetLocation = vi.fn((newLocation) => {
  currentLocation = newLocation;
});

vi.mock('wouter', () => ({
  Switch: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Route: ({ path, component: Component }: { path: string; component: React.ComponentType }) => 
    currentLocation === path ? <Component /> : null,
  useLocation: () => [currentLocation, mockSetLocation]
}));

// Mock auth store
vi.mock('./store/auth-store', () => ({
  useAuthStore: () => ({
    isAuthenticated: false,
    setUser: vi.fn(),
    user: null,
    clearUser: vi.fn()
  })
}));

// Mock components/ui/toaster
vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster" />
}));

describe('App', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient();
    
    // Reset the mocks
    vi.clearAllMocks();
    
    // Mock fetch to return unauthenticated by default
    (global.fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(null)
    });
    
    // Reset location
    currentLocation = '/';
  });
  
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // At minimum, it should render the toaster
    expect(screen.getByTestId('toaster')).not.toBeNull();
  });
  
  it('redirects to / when not authenticated', async () => {
    // Mock fetch for unauthenticated response
    (global.fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(null)
    });
    
    // Start at /profile
    currentLocation = '/profile';
    
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // It should try to redirect back to /
    await waitFor(() => {
      expect(mockSetLocation).toHaveBeenCalledWith('/');
    });
  });
  
  it('redirects to /home when authenticated and at /', async () => {
    // Mock the auth store to return authenticated
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      setUser: vi.fn(),
      user: { id: 1, username: 'test', name: 'Test User', species: 'Dog', age: 3, avatar: '', speciesPreferences: [], createdAt: new Date() },
      clearUser: vi.fn()
    });
    
    // Mock fetch for authenticated response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, username: 'test' })
    });
    
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // It should redirect to /home
    await waitFor(() => {
      expect(mockSetLocation).toHaveBeenCalledWith('/home');
    });
  });
  
  it('renders the home page at /home route', async () => {
    // Mock authenticated user
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      setUser: vi.fn(),
      user: { id: 1, username: 'test', name: 'Test User', species: 'Dog', age: 3, avatar: '', speciesPreferences: [], createdAt: new Date() },
      clearUser: vi.fn()
    });
    
    // Set location to /home
    currentLocation = '/home';
    
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // Home page should be rendered
    expect(screen.getByTestId('home-page')).not.toBeNull();
  });
});

// Helper type to make TypeScript happy with our mocks
function useAuthStore() {
  return {
    isAuthenticated: false,
    setUser: vi.fn(),
    user: null,
    clearUser: vi.fn()
  };
}