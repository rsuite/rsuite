/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useSSRStyles } from '../useSSRStyles';
import { StyleManager } from '@/internals/styled-system/style-manager';
import { StyleCollector } from '@/internals/styled-system/style-collector';

describe('useSSRStyles (Client-side)', () => {
  beforeEach(() => {
    // Reset StyleManager
    StyleManager.setCollector(null);
  });

  afterEach(() => {
    StyleManager.setCollector(null);
    cleanup();
  });

  describe('Cleanup Behavior', () => {
    it('should not create collector on client-side', () => {
      const TestComponent = () => {
        const { collector, isSSR } = useSSRStyles();

        // Should not be in SSR environment
        expect(isSSR).toBe(false);
        // Should not have a collector on client
        expect(collector).toBeUndefined();

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should return null style element on client-side', () => {
      const TestComponent = () => {
        const { styleElement, isSSR } = useSSRStyles();

        expect(isSSR).toBe(false);
        expect(styleElement).toBeNull();

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should cleanup collector on unmount', () => {
      // Set a collector before mounting
      const testCollector = new StyleCollector();
      StyleManager.setCollector(testCollector);

      const TestComponent = () => {
        useSSRStyles();
        return <div>Test</div>;
      };

      const { unmount } = render(<TestComponent />);

      // Collector should still be set while mounted
      expect(StyleManager['collector']).toBe(testCollector);

      // Unmount the component
      unmount();

      // Collector should be cleaned up after unmount
      expect(StyleManager['collector']).toBeNull();
    });

    it('should handle user-provided collector on client', () => {
      const customCollector = new StyleCollector('client-nonce');

      const TestComponent = () => {
        const { collector, isSSR } = useSSRStyles({ collector: customCollector });

        expect(isSSR).toBe(false);
        // User-provided collector should be passed through even on client
        expect(collector).toBe(customCollector);

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should cleanup even when disabled', () => {
      // Set a collector before mounting
      const testCollector = new StyleCollector();
      StyleManager.setCollector(testCollector);

      const TestComponent = () => {
        useSSRStyles({ enabled: false });
        return <div>Test</div>;
      };

      const { unmount } = render(<TestComponent />);
      unmount();

      // Should still cleanup
      expect(StyleManager['collector']).toBeNull();
    });

    it('should cleanup on multiple mount/unmount cycles', () => {
      const TestComponent = () => {
        useSSRStyles();
        return <div>Test</div>;
      };

      // First mount/unmount
      const { unmount: unmount1 } = render(<TestComponent />);
      unmount1();
      expect(StyleManager['collector']).toBeNull();

      // Second mount/unmount
      const { unmount: unmount2 } = render(<TestComponent />);
      unmount2();
      expect(StyleManager['collector']).toBeNull();

      // Third mount/unmount
      const { unmount: unmount3 } = render(<TestComponent />);
      unmount3();
      expect(StyleManager['collector']).toBeNull();
    });
  });

  describe('Client-side Configuration', () => {
    it('should respect enabled flag on client', () => {
      const TestComponent = () => {
        const { collector, styleElement, isSSR } = useSSRStyles({ enabled: false });

        expect(isSSR).toBe(false);
        expect(collector).toBeUndefined();
        expect(styleElement).toBeNull();

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should not set collector on StyleManager on client', () => {
      const TestComponent = () => {
        useSSRStyles();

        // On client, StyleManager should not have a collector set by this hook
        // (unless it was already set before)
        return <div>Test</div>;
      };

      render(<TestComponent />);

      // Initially StyleManager collector should be null on client
      expect(StyleManager['collector']).toBeNull();
    });
  });
});
