import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll, chai } from 'vitest';
import chaiDom from 'chai-dom';

const expectedReactVersion = (
  import.meta as ImportMeta & { env: { VITE_RSUITE_REACT_VERSION?: string } }
).env.VITE_RSUITE_REACT_VERSION;

if (expectedReactVersion) {
  console.info('Browser React runtime', {
    expected: expectedReactVersion,
    react: React.version,
    reactDOM: ReactDOM.version
  });

  if (React.version !== expectedReactVersion || ReactDOM.version !== expectedReactVersion) {
    throw new Error(
      `Expected browser React/ReactDOM ${expectedReactVersion}, received ${React.version}/${ReactDOM.version}`
    );
  }

  if (
    expectedReactVersion === '19.3.0' &&
    !(React as typeof React & { Activity?: unknown }).Activity
  ) {
    throw new Error('React 19.3.0 browser tests require Activity');
  }
}

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
