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

  describe('StyleManager Integration', () => {
    it('should set collector on StyleManager during SSR', () => {
      const TestComponent = () => {
        useSSRStyles();
        // Verify StyleManager has a collector set
        expect(StyleManager['collector']).toBeDefined();
        expect(StyleManager['collector']).not.toBeNull();
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should set user-provided collector on StyleManager', () => {
      const customCollector = new StyleCollector('test-nonce');

      const TestComponent = () => {
        useSSRStyles({ collector: customCollector });
        // Verify StyleManager has the custom collector
        expect(StyleManager['collector']).toBe(customCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should not set collector when disabled', () => {
      const TestComponent = () => {
        useSSRStyles({ enabled: false });
        // Verify StyleManager has no collector
        expect(StyleManager['collector']).toBeNull();
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });

  describe('Auto-created Collector', () => {
    it('should auto-create collector during SSR when not provided', () => {
      const TestComponent = () => {
        const { collector } = useSSRStyles();
        // Verify collector was auto-created
        expect(collector).toBeDefined();
        expect(collector).toBeInstanceOf(StyleCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should auto-create collector with nonce option', () => {
      const TestComponent = () => {
        const { collector } = useSSRStyles({ nonce: 'auto-nonce' });
        expect(collector).toBeDefined();
        expect(collector).toBeInstanceOf(StyleCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should not auto-create collector when user provides one', () => {
      const customCollector = new StyleCollector();

      const TestComponent = () => {
        const { collector } = useSSRStyles({ collector: customCollector });
        // Should use the provided collector, not create a new one
        expect(collector).toBe(customCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });

  describe('Style Element Generation', () => {
    it('should generate style element with collected styles', () => {
      const TestComponent = () => {
        const { styleElement } = useSSRStyles();

        // Add a style through StyleManager during render
        StyleManager.addRule('.test-class', 'color: red;');

        expect(styleElement).toBeTruthy();
        expect(styleElement).not.toBeNull();

        return <div>Test</div>;
      };

      const html = renderToString(<TestComponent />);

      // Verify HTML contains the style
      expect(html).toContain('color: red');
      expect(html).toContain('.test-class');
    });

    it('should generate style element with nonce attribute', () => {
      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ nonce: 'test-nonce-123' });

        // Add a style through StyleManager
        StyleManager.addRule('.nonce-test', 'display: block;');

        expect(styleElement).toBeTruthy();

        return (
          <>
            {styleElement}
            <div>Test</div>
          </>
        );
      };

      const html = renderToString(<TestComponent />);

      // Verify nonce is in the rendered HTML
      expect(html).toContain('nonce="test-nonce-123"');
      expect(html).toContain('data-rs-style-manager');
    });

    it('should generate style element with multiple rules', () => {
      const TestComponent = () => {
        const { styleElement } = useSSRStyles();

        // Add multiple styles
        StyleManager.addRule('.rule1', 'color: blue;');
        StyleManager.addRule('.rule2', 'background: white;');
        StyleManager.addRule('@media (min-width: 768px)', '.rule1 { color: green; }');

        return (
          <>
            {styleElement}
            <div>Test</div>
          </>
        );
      };

      const html = renderToString(<TestComponent />);

      // Verify all rules are in the output
      expect(html).toContain('.rule1');
      expect(html).toContain('color: blue');
      expect(html).toContain('.rule2');
      expect(html).toContain('background: white');
      expect(html).toContain('@media (min-width: 768px)');
    });

    it('should return null style element when disabled', () => {
      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ enabled: false });
        expect(styleElement).toBeNull();
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });

  describe('SSR Environment Detection', () => {
    it('should detect SSR environment', () => {
      const TestComponent = () => {
        const { isSSR } = useSSRStyles();
        expect(isSSR).toBe(true);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should create collector only in SSR environment', () => {
      const TestComponent = () => {
        const { collector, isSSR } = useSSRStyles();

        if (isSSR) {
          expect(collector).toBeDefined();
        } else {
          expect(collector).toBeUndefined();
        }

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });
});
