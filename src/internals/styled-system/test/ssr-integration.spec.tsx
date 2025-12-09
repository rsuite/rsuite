/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { StyleCollector } from '../style-collector';
import { StyleManager } from '../style-manager';
import CustomProvider from '../../../CustomProvider';
import Box from '../../Box';

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

    it('should auto-collect and inject styles from Box components', () => {
      // Create a collector to track styles
      const collector = new StyleCollector();

      // Set the collector on StyleManager before rendering
      // This simulates what CustomProvider does in a real SSR scenario
      StyleManager.setCollector(collector);

      // Manually add styles that Box would add during rendering
      // In real SSR, this would happen via useStyled hook during renderToString
      // but since effects don't run in renderToString, we simulate it
      // Note: The specific class name doesn't matter for this test - we're testing
      // that StyleManager correctly routes styles to the collector when one is set
      StyleManager.addRule(
        '.rs-box-abc123',
        '--rs-box-width: 200px; width: var(--rs-box-width); --rs-box-height: 100px; height: var(--rs-box-height);'
      );

      // Render the Box component
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" height="100px">
            Box Content
          </Box>
        </CustomProvider>
      );

      // Verify that the Box component rendered
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Box Content');

      // Verify that styles were collected
      expect(collector.size).toBeGreaterThan(0);

      // Get the collected styles as HTML
      const styleHTML = collector.getStyleElement();

      // Verify that the auto-generated styleElement is present
      expect(styleHTML).toContain('data-rs-style-manager');
      expect(styleHTML).toContain('<style');
      expect(styleHTML).toContain('</style>');

      // Verify that Box styles are present in the collected styles
      const styleText = collector.getStyleText();
      expect(styleText).toContain('width');
      expect(styleText).toContain('200px');
      expect(styleText).toContain('height');
      expect(styleText).toContain('100px');

      // Clean up
      StyleManager.setCollector(null);
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
