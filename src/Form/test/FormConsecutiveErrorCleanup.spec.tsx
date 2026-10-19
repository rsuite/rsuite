import { describe, it } from 'vitest';
import { labels, controlledLabels, cleanupCase } from './consecutiveErrorCleanupFixtures';

describe('Form consecutive explicit error cleanup', () => {
  for (const label of labels) {
    for (const operation of [
      'clear twice',
      'reset then clear twice',
      'clear all then clear field',
      'default reset then clear field',
      'separate events'
    ]) {
      it(`${operation} preserves the accepted snapshot for ${label}`, () =>
        cleanupCase(label, operation));
    }
  }

  for (const label of controlledLabels) {
    it(`composes consecutive cleanup in StrictMode for ${label}`, () =>
      cleanupCase(label, 'clear twice', true));
  }
});
