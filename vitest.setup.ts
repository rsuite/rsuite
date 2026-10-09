import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll, chai } from 'vitest';
import chaiDom from 'chai-dom';

// Configure Chai
chai.use(chaiDom);

// Clean up test environment
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  // Mock console.error to catch React errors
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});
