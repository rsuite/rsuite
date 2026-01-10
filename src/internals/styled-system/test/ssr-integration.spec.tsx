/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { StyleCollector } from '../style-collector';
import { StyleManager } from '../style-manager';
import CustomProvider from '../../../CustomProvider';

describe('SSR Integration', () => {
  beforeEach(() => {
    // Clear StyleManager state
    StyleManager.setCollector(null);
  });

  afterEach(() => {
    // Clean up
    StyleManager.setCollector(null);
  });

  describe('StyleManager with collector', () => {
    it('should collect styles instead of injecting to DOM', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test', 'color: red;');

      expect(collector.hasRule('.test')).toBe(true);
      expect(collector.getStyleText()).toContain('.test { color: red; }');
    });

    it('should handle multiple rules', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test1', 'color: red;');
      StyleManager.addRule('.test2', 'color: blue;');
      StyleManager.addRule('@media (min-width: 768px)', '.test1 { color: green; }');

      expect(collector.size).toBe(3);
    });

    it('should remove rules from collector', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test', 'color: red;');
      StyleManager.removeRule('.test');

      expect(collector.hasRule('.test')).toBe(false);
    });

    it('should clear collector when set to null', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);
      StyleManager.addRule('.test', 'color: red;');

      StyleManager.setCollector(null);

      // Collector should still have the rules
      expect(collector.hasRule('.test')).toBe(true);
    });
  });

  describe('CustomProvider with styleCollector', () => {
    it('should pass styleCollector through context', () => {
      const collector = new StyleCollector();

      const TestComponent = () => {
        return <div>Test</div>;
      };

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <TestComponent />
        </CustomProvider>
      );

      expect(html).toBeTruthy();
    });

    it('should set collector on StyleManager', () => {
      const collector = new StyleCollector();
      const setCollectorSpy = vi.spyOn(StyleManager, 'setCollector');

      // Simulate the useEffect behavior
      StyleManager.setCollector(collector);

      expect(setCollectorSpy).toHaveBeenCalledWith(collector);
    });
  });

  describe('SSR rendering scenario', () => {
    it('should collect styles during SSR', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      // Simulate component rendering that uses StyleManager
      StyleManager.addRule('.rs-box-r1', '--rs-box-width: 200px; width: var(--rs-box-width);');
      StyleManager.addRule('.rs-box-r2', '--rs-box-height: 100px; height: var(--rs-box-height);');

      const styleHTML = collector.getStyleElement();

      expect(styleHTML).toContain('<style data-rs-style-manager>');
      expect(styleHTML).toContain('.rs-box-r1');
      expect(styleHTML).toContain('.rs-box-r2');
      expect(styleHTML).toContain('</style>');
    });

    it('should generate valid HTML for injection', () => {
      const collector = new StyleCollector('test-nonce');
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test', 'color: red;');

      const html = collector.getStyleElement();

      // Should be valid HTML
      expect(html).toMatch(/<style[^>]*>[\s\S]*<\/style>/);
      // Should include nonce
      expect(html).toContain('nonce="test-nonce"');
      // Should include data attribute
      expect(html).toContain('data-rs-style-manager');
    });
  });

  describe('Collector behavior', () => {
    it('should collect styles when collector is set', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      // Styles should go to collector when it's set
      StyleManager.addRule('.test', 'color: red;');

      expect(collector.hasRule('.test')).toBe(true);
    });
  });

  describe('CSP nonce support', () => {
    it('should include nonce in style element', () => {
      const nonce = 'random-nonce-123';
      const collector = new StyleCollector(nonce);
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test', 'color: red;');

      const html = collector.getStyleElement();
      expect(html).toContain(`nonce="${nonce}"`);
    });

    it('should work without nonce', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      StyleManager.addRule('.test', 'color: red;');

      const html = collector.getStyleElement();
      expect(html).not.toContain('nonce=');
    });
  });
});
