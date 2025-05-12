import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import chai from 'chai';
import chaiDom from 'chai-dom';
import sinonChai from 'sinon-chai';

// Configure Chai
chai.use(chaiDom);
chai.use(sinonChai);

if (typeof window !== 'undefined') {
  (window as any).sinon = { spy: vi.fn, stub: vi.fn };
}

// Clean up test environment
afterEach(cleanup);
