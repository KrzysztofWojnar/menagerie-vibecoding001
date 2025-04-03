// Import testing-library utilities
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add jest-dom custom matchers
expect.extend(matchers);

// Automatically clean up after each test
afterEach(() => {
  cleanup();
});