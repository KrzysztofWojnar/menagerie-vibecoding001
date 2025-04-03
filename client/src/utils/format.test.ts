import { describe, it, expect } from 'vitest';
import { formatDate, calculateDistance, formatNameAndAge, truncateString } from './format';

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2023-01-15');
    expect(formatDate(date)).toBe('January 15, 2023');
  });
});

describe('calculateDistance', () => {
  it('calculates distance between two points', () => {
    // New York approximate coordinates
    const lat1 = 40.7128;
    const lon1 = -74.0060;
    
    // Los Angeles approximate coordinates
    const lat2 = 34.0522;
    const lon2 = -118.2437;
    
    // Approximate distance between NY and LA is around 2450 miles
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    
    // Allow for some approximation in the calculation
    expect(distance).toBeGreaterThan(2400);
    expect(distance).toBeLessThan(2500);
  });
  
  it('returns 0 for identical points', () => {
    const lat = 40.7128;
    const lon = -74.0060;
    
    expect(calculateDistance(lat, lon, lat, lon)).toBe(0);
  });
});

describe('formatNameAndAge', () => {
  it('formats name and age correctly', () => {
    expect(formatNameAndAge('Fluffy', 3)).toBe('Fluffy, 3');
    expect(formatNameAndAge('Oliver', 5)).toBe('Oliver, 5');
  });
});

describe('truncateString', () => {
  it('does not truncate strings shorter than maxLength', () => {
    expect(truncateString('Hello', 10)).toBe('Hello');
  });
  
  it('truncates strings longer than maxLength', () => {
    expect(truncateString('Hello, world!', 5)).toBe('Hello...');
  });
  
  it('handles empty strings', () => {
    expect(truncateString('', 5)).toBe('');
  });
});