import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationBar from '../components/navigation-bar';

// Mock the location and set functions
let currentLocation = '/home';
const mockSetLocation = vi.fn((path) => {
  currentLocation = path;
});

// Mock wouter
vi.mock('wouter', () => ({
  useLocation: () => [currentLocation, mockSetLocation]
}));

// Mock react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: []
  })
}));

describe('Routing with Navigation Bar', () => {
  beforeEach(() => {
    // Reset the mock functions and location
    vi.clearAllMocks();
    currentLocation = '/home';
  });
  
  it('routes to home when home button is clicked', () => {
    render(<NavigationBar activePath="/profile" />);
    
    // Find the home button (first button)
    const homeButton = screen.getAllByRole('button')[0];
    
    // Click the home button
    fireEvent.click(homeButton);
    
    // Check that the location was updated
    expect(mockSetLocation).toHaveBeenCalledWith('/home');
  });
  
  it('routes to matches when matches button is clicked', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Find the matches button (second button)
    const matchesButton = screen.getAllByRole('button')[1];
    
    // Click the matches button
    fireEvent.click(matchesButton);
    
    // Check that the location was updated
    expect(mockSetLocation).toHaveBeenCalledWith('/matches');
  });
  
  it('routes to matches when messages button is clicked', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Find the messages button (third button)
    const messagesButton = screen.getAllByRole('button')[2];
    
    // Click the messages button
    fireEvent.click(messagesButton);
    
    // Check that the location was updated (messages currently routes to matches)
    expect(mockSetLocation).toHaveBeenCalledWith('/matches');
  });
  
  it('routes to profile when profile button is clicked', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Find the profile button (fourth button)
    const profileButton = screen.getAllByRole('button')[3];
    
    // Click the profile button
    fireEvent.click(profileButton);
    
    // Check that the location was updated
    expect(mockSetLocation).toHaveBeenCalledWith('/profile');
  });
  
  it('applies active styles to the correct button', () => {
    // Render with home active
    render(<NavigationBar activePath="/home" />);
    
    // Get all buttons
    const buttons = screen.getAllByRole('button');
    
    // Check that the home button has the primary class
    expect(buttons[0].className).toContain('text-primary');
    expect(buttons[1].className).not.toContain('text-primary');
    expect(buttons[2].className).not.toContain('text-primary');
    expect(buttons[3].className).not.toContain('text-primary');
    
    // Render with matches active
    render(<NavigationBar activePath="/matches" />);
    
    // Get all buttons again
    const buttonsWithMatchesActive = screen.getAllByRole('button');
    
    // Check that the matches button has the primary class
    expect(buttonsWithMatchesActive[0].className).not.toContain('text-primary');
    expect(buttonsWithMatchesActive[1].className).toContain('text-primary');
    expect(buttonsWithMatchesActive[2].className).not.toContain('text-primary');
    expect(buttonsWithMatchesActive[3].className).not.toContain('text-primary');
  });
});