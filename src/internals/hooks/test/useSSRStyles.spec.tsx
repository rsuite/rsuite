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
    it('should use user-provided collector with StyleManager', () => {
      const customCollector = new StyleCollector('test-nonce');

      const TestComponent = () => {
        useSSRStyles({ collector: customCollector });
        
        // Add a rule through StyleManager to verify integration
        StyleManager.addRule('.test-integration', 'color: blue;');
        
        // Verify the rule was collected
        expect(customCollector.hasRule('.test-integration')).toBe(true);
        expect(customCollector.getStyleText()).toContain('color: blue');
        
        return <div>Test</div>;
      };

      // Set collector before render for the test
      StyleManager.setCollector(customCollector);
      renderToString(<TestComponent />);
    });

    it('should not set collector when disabled', () => {
      const TestComponent = () => {
        const { collector, styleElement } = useSSRStyles({ enabled: false });
        expect(collector).toBeUndefined();
        expect(styleElement).toBeNull();
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });

  describe('Collector Management', () => {
    it('should use user-provided collector', () => {
      const customCollector = new StyleCollector();

      const TestComponent = () => {
        const { collector } = useSSRStyles({ collector: customCollector });
        // Should use the provided collector, not create a new one
        expect(collector).toBe(customCollector);
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });

    it('should handle nonce in user-provided collector', () => {
      const customCollector = new StyleCollector('custom-nonce');

      const TestComponent = () => {
        const { collector } = useSSRStyles({ collector: customCollector });
        expect(collector).toBe(customCollector);
        
        // Verify nonce is used when generating style element
        const styleHTML = collector.getStyleElement();
        expect(styleHTML).toContain('nonce="custom-nonce"');
        
        return <div>Test</div>;
      };

      renderToString(<TestComponent />);
    });
  });

  describe('Style Element Generation', () => {
    it('should generate style element with collected styles from user collector', () => {
      const collector = new StyleCollector();
      
      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ collector });

        // Add a style through the collector
        collector.addRule('.test-class', 'color: red;');

        return (
          <>
            {styleElement}
            <div>Test</div>
          </>
        );
      };

      const html = renderToString(<TestComponent />);

      // Verify HTML contains the style
      expect(html).toContain('color: red');
      expect(html).toContain('.test-class');
    });

    it('should generate style element with nonce attribute', () => {
      const collector = new StyleCollector('test-nonce-123');
      
      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ collector, nonce: 'test-nonce-123' });

        // Add a style through the collector
        collector.addRule('.nonce-test', 'display: block;');

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
      const collector = new StyleCollector();
      
      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ collector });

        // Add multiple styles through the collector
        collector.addRule('.rule1', 'color: blue;');
        collector.addRule('.rule2', 'background: white;');
        collector.addRule('@media (min-width: 768px)', '.rule1 { color: green; }');

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

  describe('Integration with StyleManager', () => {
    it('should collect styles through StyleManager when collector is provided', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      const TestComponent = () => {
        useSSRStyles({ collector });

        // Add rules through StyleManager
        StyleManager.addRule('.integration-test', 'margin: 10px;');

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);

      // Verify the collector received the styles
      expect(collector.hasRule('.integration-test')).toBe(true);
      expect(collector.getStyleText()).toContain('margin: 10px');
    });

    it('should handle empty collector', () => {
      const collector = new StyleCollector();

      const TestComponent = () => {
        const { styleElement } = useSSRStyles({ collector });

        return (
          <>
            {styleElement}
            <div>Test</div>
          </>
        );
      };

      const html = renderToString(<TestComponent />);

      // Empty collector should still render a style tag (empty)
      expect(html).toContain('data-rs-style-manager');
    });
  });
});
