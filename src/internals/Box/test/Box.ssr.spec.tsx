/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderToString } from 'react-dom/server';
import Box from '../Box';
import CustomProvider from '../../../CustomProvider';
import { StyleCollector } from '../../styled-system/style-collector';
import { StyleManager } from '../../styled-system/style-manager';

describe('Box SSR', () => {
  beforeEach(() => {
    // Clear StyleManager state before each test
    StyleManager.setCollector(null);
  });

  afterEach(() => {
    // Clean up after each test
    StyleManager.setCollector(null);
  });

  it('should render with data-rs attribute when box props are provided', () => {
    const html = renderToString(
      <Box width="200px" padding="20px">
        Test Content
      </Box>
    );

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Test Content');
  });

  it('should not have data-rs when no box props are provided', () => {
    const html = renderToString(<Box>Plain Content</Box>);

    // Should not have data-rs attribute
    expect(html).not.toContain('data-rs');
    expect(html).toContain('Plain Content');
  });

  it('should have data-rs when showFrom is provided', () => {
    const html = renderToString(<Box showFrom="md">Responsive Content</Box>);

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Content');
  });

  it('should have data-rs when hideFrom is provided', () => {
    const html = renderToString(<Box hideFrom="lg">Responsive Content</Box>);

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Content');
  });

  it('should render with responsive props', () => {
    const html = renderToString(
      <Box width={{ xs: '100%', md: '50%', lg: '300px' }} padding="20px">
        Responsive Box
      </Box>
    );

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Box');
  });

  describe('SSR Style Collection', () => {
    it('should collect and inject styles during SSR', () => {
      const collector = new StyleCollector();

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            Test
          </Box>
        </CustomProvider>
      );

      // Verify HTML contains the data-rs-style-manager attribute
      expect(html).toContain('data-rs-style-manager');

      // Verify CSS variables are in the collected styles (using abbreviated names)
      const styleText = collector.getStyleText();
      expect(styleText).toContain('--rs-box-w');
      expect(styleText).toContain('--rs-box-p');

      // Verify the actual CSS property usage
      expect(styleText).toContain('width: var(--rs-box-w)');
      expect(styleText).toContain('padding: var(--rs-box-p)');

      // Verify collector has accumulated styles
      expect(collector.size).toBeGreaterThan(0);
    });

    it('should include style tag with correct CSS in generated HTML', () => {
      const collector = new StyleCollector();

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="300px" margin="10px">
            Content
          </Box>
        </CustomProvider>
      );

      // Get the style element HTML from the collector
      const styleHTML = collector.getStyleElement();

      // Verify style element is present
      expect(styleHTML).toContain('<style');
      expect(styleHTML).toContain('data-rs-style-manager');
      expect(styleHTML).toContain('</style>');

      // Verify the CSS contains expected variables (using abbreviated names)
      expect(styleHTML).toContain('--rs-box-w');
      expect(styleHTML).toContain('--rs-box-m');
    });

    it('should correctly accumulate styles from multiple Box components', () => {
      const collector = new StyleCollector();

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            First Box
          </Box>
          <Box height="100px" margin="10px">
            Second Box
          </Box>
          <Box display="flex" gap="5px">
            Third Box
          </Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // Verify all CSS variables from different boxes are collected (using abbreviated names)
      expect(styleText).toContain('--rs-box-w');
      expect(styleText).toContain('--rs-box-p');
      expect(styleText).toContain('--rs-box-h');
      expect(styleText).toContain('--rs-box-m');
      expect(styleText).toContain('--rs-box-display');
      expect(styleText).toContain('--rs-box-gap');

      // Verify multiple styles are accumulated
      expect(collector.size).toBeGreaterThan(2);

      // Verify all content is present
      expect(html).toContain('First Box');
      expect(html).toContain('Second Box');
      expect(html).toContain('Third Box');
    });

    it('should support CSP nonce in style element', () => {
      const nonce = 'test-nonce-123';
      const collector = new StyleCollector(nonce);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="100px">Test</Box>
        </CustomProvider>
      );

      // Get the style element HTML from the collector
      const styleHTML = collector.getStyleElement();

      // Verify nonce is included in style element
      expect(styleHTML).toContain(`nonce="${nonce}"`);
      expect(styleHTML).toContain('data-rs-style-manager');

      // Verify styles were collected
      expect(collector.size).toBeGreaterThan(0);
    });

    it('should handle responsive Box props in SSR', () => {
      const collector = new StyleCollector();

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width={{ xs: '100%', md: '50%', lg: '300px' }} padding={{ xs: '10px', md: '20px' }}>
            Responsive
          </Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // Verify responsive styles are collected (using abbreviated names)
      expect(styleText).toContain('--rs-box-w');
      expect(styleText).toContain('--rs-box-p');

      // Verify media queries are generated
      expect(styleText).toContain('@media (min-width:');

      // Verify the CSS properties are correctly referenced
      expect(styleText).toContain('width: var(--rs-box-w)');
      expect(styleText).toContain('padding: var(--rs-box-p)');

      // Verify content and data attribute
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Responsive');
    });

    it('should not inject styles when Box has no style props', () => {
      const collector = new StyleCollector();

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box>Plain Content</Box>
        </CustomProvider>
      );

      // Box without props should not contribute styles
      // but CustomProvider may have its own styles
      expect(html).toContain('Plain Content');
      expect(html).not.toContain('data-rs="box"');
    });
  });
});
