/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useSSRStyles } from '../useSSRStyles';
import { StyleManager } from '@/internals/styled-system/style-manager';
import { StyleCollector } from '@/internals/styled-system/style-collector';

describe('useSSRStyles', () => {
  beforeEach(() => {
    // Reset StyleManager
    StyleManager.setCollector(null);
  });

  afterEach(() => {
    StyleManager.setCollector(null);
  });

  describe('Configuration', () => {
    it('should use user-provided collector', () => {
      const customCollector = new StyleCollector('custom-nonce');

      const TestComponent = () => {
        const { collector } = useSSRStyles({ collector: customCollector });
        expect(collector).toBe(customCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should not create collector when disabled', () => {
      const TestComponent = () => {
        const { collector, styleElement } = useSSRStyles({ enabled: false });
        expect(collector).toBeUndefined();
        expect(styleElement).toBeNull();
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should accept nonce option', () => {
      const customCollector = new StyleCollector('custom-nonce');

      const TestComponent = () => {
        const { collector } = useSSRStyles({
          collector: customCollector,
          nonce: 'test-nonce'
        });
        expect(collector).toBe(customCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });
});
