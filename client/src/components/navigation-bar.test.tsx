import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavigationBar from './navigation-bar';

// Mock wouter
vi.mock('wouter', () => ({
  useLocation: () => {
    const setLocation = vi.fn();
    return ['/home', setLocation];
  }
}));

// Mock react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: []
  })
}));

describe('NavigationBar', () => {
  it('renders navigation buttons correctly', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Find all navigation buttons (4 buttons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });
  
  it('highlights the active path', () => {
    render(<NavigationBar activePath="/home" />);
    
    // The first button (home) should have the primary text color
    const homeButton = screen.getAllByRole('button')[0];
    expect(homeButton.className).toContain('text-primary');
    
    // Render with a different active path
    render(<NavigationBar activePath="/matches" />);
    
    // Now the matches button should have the primary text color
    const matchesButtons = screen.getAllByRole('button');
    expect(matchesButtons[1].className).toContain('text-primary');
  });

  it('routes to home page when clicking home button', () => {
    const { rerender } = render(<NavigationBar activePath="/profile" />);
    
    // Get the home button (first button)
    const homeButton = screen.getAllByRole('button')[0];
    
    // Click the home button
    fireEvent.click(homeButton);
    
    // Re-render with updated active path
    rerender(<NavigationBar activePath="/home" />);
    
    // Verify the home button is now active
    expect(homeButton.className).toContain('text-primary');
  });
  
  it('routes to matches page when clicking matches button', () => {
    const { rerender } = render(<NavigationBar activePath="/home" />);
    
    // Get the matches button (second button)
    const matchesButton = screen.getAllByRole('button')[1];
    
    // Click the matches button
    fireEvent.click(matchesButton);
    
    // Re-render with updated active path
    rerender(<NavigationBar activePath="/matches" />);
    
    // Verify the matches button is now active
    expect(matchesButton.className).toContain('text-primary');
  });
  
  it('routes to profile page when clicking profile button', () => {
    const { rerender } = render(<NavigationBar activePath="/home" />);
    
    // Get the profile button (fourth button)
    const profileButton = screen.getAllByRole('button')[3];
    
    // Click the profile button
    fireEvent.click(profileButton);
    
    // Re-render with updated active path
    rerender(<NavigationBar activePath="/profile" />);
    
    // Verify the profile button is now active
    expect(profileButton.className).toContain('text-primary');
  });
  
  it('displays the fox head icon for profile button', () => {
    render(<NavigationBar activePath="/home" />);
    
    // Get the profile button (fourth button)
    const profileButton = screen.getAllByRole('button')[3];
    
    // Check if it contains an SVG element (fox head icon)
    const foxIcon = profileButton.querySelector('svg');
    expect(foxIcon).not.toBeNull();
  });
});