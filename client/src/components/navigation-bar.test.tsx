import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationBar from './navigation-bar';

// Mock the wouter hook
vi.mock('wouter', () => ({
  useLocation: () => ['/home'],
  useRoute: () => [false],
}));

describe('NavigationBar', () => {
  const setLocationMock = vi.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setLocationMock.mockReset();
  });

  it('renders all navigation buttons', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Check that the home button is present
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    
    // Check that the matches button is present
    const matchesButton = screen.getAllByRole('button')[1]; // Second button is matches
    expect(matchesButton).toBeInTheDocument();
    
    // Check that the profile button is present (with fox icon)
    const profileButton = screen.getAllByRole('button')[2]; // Third button is profile
    expect(profileButton).toBeInTheDocument();
    expect(profileButton.querySelector('svg')).toBeInTheDocument();
  });

  it('highlights the active button', () => {
    render(<NavigationBar activePath="/profile" />);
    
    // The profile button should have the primary text color class
    const profileButton = screen.getAllByRole('button')[2]; // Third button is profile
    expect(profileButton.className).toContain('text-primary');
    
    // The home button should not have the primary text color class
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton.className).toContain('text-gray-400');
  });

  it('navigates when a button is clicked', () => {
    // Mock the setLocation function from useLocation hook
    vi.mock('wouter', () => ({
      useLocation: () => ['/', vi.fn().mockImplementation(setLocationMock)],
      useRoute: () => [false],
    }));

    render(<NavigationBar activePath="/home" />);
    
    // Click the profile button
    const profileButton = screen.getAllByRole('button')[2]; // Third button is profile
    fireEvent.click(profileButton);
    
    // Expect setLocation to be called with the correct path
    expect(setLocationMock).toHaveBeenCalledWith('/profile');
  });
});