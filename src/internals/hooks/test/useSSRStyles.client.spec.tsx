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
    it('should handle user-provided collector on client', () => {
      const customCollector = new StyleCollector('client-nonce');

      const TestComponent = () => {
        const { collector } = useSSRStyles({ collector: customCollector });

        // User-provided collector should be passed through
        expect(collector).toBe(customCollector);

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should return null style element when no collector provided', () => {
      const TestComponent = () => {
        const { styleElement } = useSSRStyles();

        // Without a collector, no style element should be returned
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
    it('should respect enabled flag', () => {
      const TestComponent = () => {
        const { collector, styleElement } = useSSRStyles({ enabled: false });

        expect(collector).toBeUndefined();
        expect(styleElement).toBeNull();

        return <div>Test</div>;
      };

      render(<TestComponent />);
    });

    it('should work with user-provided collector and generate style element', () => {
      const collector = new StyleCollector();
      collector.addRule('.client-test', 'padding: 5px;');

      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ collector });

        // Should have a style element with the collector's styles
        expect(styleElement).not.toBeNull();

        return (
          <>
            {styleElement}
            <div>Test</div>
          </>
        );
      };

      const { container } = render(<TestComponent />);
      
      // Verify the style element is in the DOM
      const styleTag = container.querySelector('style[data-rs-style-manager]');
      expect(styleTag).not.toBeNull();
    });
  });
});
