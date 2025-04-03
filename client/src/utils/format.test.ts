import { describe, it, expect } from 'vitest';
import { formatDate, calculateDistance, formatNameAndAge, truncateString } from './format';

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2023-01-15T12:00:00');
    expect(formatDate(date)).toBe('January 15, 2023');
  });
});

describe('calculateDistance', () => {
  it('calculates distance between two points', () => {
    // New York to Los Angeles (approximate coordinates)
    const distance = calculateDistance(40.7128, -74.0060, 34.0522, -118.2437);
    // Should be around 2,451 miles, but we'll allow some buffer
    expect(distance).toBeGreaterThan(2400);
    expect(distance).toBeLessThan(2500);
  });

  it('returns 0 for identical points', () => {
    const distance = calculateDistance(40.7128, -74.0060, 40.7128, -74.0060);
    expect(distance).toBe(0);
  });
});

describe('formatNameAndAge', () => {
  it('formats name and age correctly', () => {
    expect(formatNameAndAge('Fluffy', 3)).toBe('Fluffy, 3');
  });
});

describe('truncateString', () => {
  it('does not truncate strings shorter than maxLength', () => {
    expect(truncateString('Hello', 10)).toBe('Hello');
  });

  it('truncates strings longer than maxLength', () => {
    expect(truncateString('Hello World', 8)).toBe('Hello...');
  });

  it('handles empty strings', () => {
    expect(truncateString('', 5)).toBe('');
  });
});