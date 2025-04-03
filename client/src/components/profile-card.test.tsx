import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileCard from './profile-card';
import { Animal } from '../types/animal';

// Create a mock animal for testing
const mockAnimal: Animal = {
  id: 1,
  username: 'testuser',
  name: 'Test Animal',
  species: 'Cat',
  age: 5,
  bio: 'This is a test bio',
  avatar: 'https://placekitten.com/200/200',
  speciesPreferences: ['Dog', 'Cat'],
  createdAt: new Date()
};

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

describe('ProfileCard', () => {
  it('renders the animal information correctly', () => {
    render(
      <ProfileCard 
        animal={mockAnimal} 
        isActive={true}
        onSwipeLeft={vi.fn()}
        onSwipeRight={vi.fn()}
      />
    );
    
    // Check that the animal name is displayed
    expect(screen.getByText('Test Animal, 5')).toBeInTheDocument();
    
    // Check that the species is displayed
    expect(screen.getByText('Cat')).toBeInTheDocument();
    
    // Check that the bio is displayed
    expect(screen.getByText('This is a test bio')).toBeInTheDocument();
    
    // Check that the avatar is displayed
    const avatar = screen.getByAltText('Test Animal profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://placekitten.com/200/200');
  });

  it('calls onSwipeLeft when the dislike button is clicked', () => {
    const onSwipeLeftMock = vi.fn();
    
    render(
      <ProfileCard 
        animal={mockAnimal} 
        isActive={true}
        onSwipeLeft={onSwipeLeftMock}
        onSwipeRight={vi.fn()}
      />
    );
    
    // Find and click the dislike button
    const dislikeButton = screen.getByRole('button', { name: /dislike/i });
    fireEvent.click(dislikeButton);
    
    // Check that onSwipeLeft was called
    expect(onSwipeLeftMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSwipeRight when the like button is clicked', () => {
    const onSwipeRightMock = vi.fn();
    
    render(
      <ProfileCard 
        animal={mockAnimal} 
        isActive={true}
        onSwipeLeft={vi.fn()}
        onSwipeRight={onSwipeRightMock}
      />
    );
    
    // Find and click the like button
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);
    
    // Check that onSwipeRight was called with the correct animal
    expect(onSwipeRightMock).toHaveBeenCalledTimes(1);
    expect(onSwipeRightMock).toHaveBeenCalledWith(mockAnimal);
  });

  it('applies active styles when isActive is true', () => {
    render(
      <ProfileCard 
        animal={mockAnimal} 
        isActive={true}
        onSwipeLeft={vi.fn()}
        onSwipeRight={vi.fn()}
      />
    );
    
    // The card should have a higher z-index when active
    const card = screen.getByTestId('profile-card');
    expect(card.className).toContain('z-10');
  });

  it('applies inactive styles when isActive is false', () => {
    render(
      <ProfileCard 
        animal={mockAnimal} 
        isActive={false}
        onSwipeLeft={vi.fn()}
        onSwipeRight={vi.fn()}
      />
    );
    
    // The card should have a lower z-index when inactive
    const card = screen.getByTestId('profile-card');
    expect(card.className).not.toContain('z-10');
  });
});