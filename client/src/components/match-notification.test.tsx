import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MatchNotification from './match-notification';
import { Animal } from '../types/animal';

// Mock the auth store
vi.mock('../store/auth-store', () => ({
  useAuthStore: () => ({
    user: {
      id: 1,
      username: 'testuser',
      name: 'Test User',
      species: 'Dog',
      age: 4,
      avatar: 'https://placekitten.com/200/200',
      speciesPreferences: ['Cat', 'Dog'],
      createdAt: new Date()
    }
  })
}));

// Mock framer-motion to avoid test errors
vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('MatchNotification', () => {
  const mockAnimal: Animal = {
    id: 2,
    username: 'testmatch',
    name: 'Match Animal',
    species: 'Cat',
    age: 3,
    bio: 'This is a test bio',
    avatar: 'https://placekitten.com/300/300',
    speciesPreferences: ['Dog'],
    createdAt: new Date()
  };

  it('renders the match notification with correct content', () => {
    render(
      <MatchNotification 
        matchedAnimal={mockAnimal} 
        onClose={vi.fn()} 
        onSendMessage={vi.fn()} 
      />
    );
    
    // Check that the match title is displayed
    expect(screen.getByText("It's a Menagerie Match!")).toBeInTheDocument();
    
    // Check that the match description is displayed
    expect(screen.getByText(`You and ${mockAnimal.name} like each other`)).toBeInTheDocument();
    
    // Check that the avatars are displayed
    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(2);
    
    // Check that the buttons are displayed
    expect(screen.getByText('Send Message')).toBeInTheDocument();
    expect(screen.getByText('Keep Swiping')).toBeInTheDocument();
  });

  it('calls onSendMessage when send message button is clicked', () => {
    const onSendMessageMock = vi.fn();
    
    render(
      <MatchNotification 
        matchedAnimal={mockAnimal} 
        onClose={vi.fn()} 
        onSendMessage={onSendMessageMock} 
      />
    );
    
    // Find and click the send message button
    const sendMessageButton = screen.getByText('Send Message');
    fireEvent.click(sendMessageButton);
    
    // Check that onSendMessage was called
    expect(onSendMessageMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when keep swiping button is clicked', () => {
    const onCloseMock = vi.fn();
    
    render(
      <MatchNotification 
        matchedAnimal={mockAnimal} 
        onClose={onCloseMock} 
        onSendMessage={vi.fn()} 
      />
    );
    
    // Find and click the keep swiping button
    const keepSwipingButton = screen.getByText('Keep Swiping');
    fireEvent.click(keepSwipingButton);
    
    // Check that onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});