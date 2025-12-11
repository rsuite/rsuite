/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderToString } from 'react-dom/server';
import Box from '../Box';
import CustomProvider from '@/CustomProvider';
import { StyleManager } from '@/internals/styled-system/style-manager';
import { StyleCollector } from '@/internals/styled-system/style-collector';

describe('Box SSR', () => {
  beforeEach(() => {
    StyleManager.setCollector(null);
  });

  afterEach(() => {
    StyleManager.setCollector(null);
  });

  describe('DOM attributes', () => {
    it('Should render with data-rs attribute when box props are provided', () => {
      const collector = new StyleCollector();
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            Test Content
          </Box>
        </CustomProvider>
      );

      // Should have data-rs attribute
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Test Content');
    });

    it('Should not have data-rs when no box props are provided', () => {
      const collector = new StyleCollector();
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box>Plain Content</Box>
        </CustomProvider>
      );

      // Should not have data-rs attribute
      expect(html).not.toContain('data-rs="box"');
      expect(html).toContain('Plain Content');
    });

    it('Should have data-rs when showFrom is provided', () => {
      const collector = new StyleCollector();
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box showFrom="md">Responsive Content</Box>
        </CustomProvider>
      );

      // Should have data-rs attribute
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Responsive Content');
    });

    it('Should have data-rs when hideFrom is provided', () => {
      const collector = new StyleCollector();
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box hideFrom="lg">Responsive Content</Box>
        </CustomProvider>
      );

      // Should have data-rs attribute
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Responsive Content');
    });

    it('Should render with responsive props', () => {
      const collector = new StyleCollector();
      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width={{ xs: '100%', md: '50%', lg: '300px' }} padding="20px">
            Responsive Box
          </Box>
        </CustomProvider>
      );

      // Should have data-rs attribute
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Responsive Box');
    });
  });

  describe('Style collection', () => {
    it('Should collect CSS variables for width and padding', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            Styled Content
          </Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // Should contain CSS variable definitions (using abbreviated names)
      expect(styleText).toContain('--rs-box-w: 200px');
      expect(styleText).toContain('--rs-box-p: 20px');

      // Should contain CSS property assignments using variables
      expect(styleText).toContain('width: var(--rs-box-w)');
      expect(styleText).toContain('padding: var(--rs-box-p)');
    });

    it('Should collect margin CSS variables', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box margin="10px" marginTop="20px">
            Margin Content
          </Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // CSS variables use abbreviated names (m for margin, mt for marginTop)
      expect(styleText).toContain('--rs-box-m: 10px');
      expect(styleText).toContain('--rs-box-mt: 20px');
      expect(styleText).toContain('margin: var(--rs-box-m)');
      expect(styleText).toContain('margin-top: var(--rs-box-mt)');
    });

    it('Should collect responsive styles with media queries', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width={{ xs: '100%', md: '50%', lg: '300px' }}>Responsive Content</Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // Should have base style with xs value (using abbreviated name)
      expect(styleText).toContain('--rs-box-w: 100%');

      // Should have media queries for md and lg breakpoints
      expect(styleText).toContain('@media (min-width: 768px)');
      expect(styleText).toContain('--rs-box-w: 50%');
      expect(styleText).toContain('@media (min-width: 992px)');
      expect(styleText).toContain('--rs-box-w: 300px');
    });

    it('Should include CSP nonce in style element', () => {
      const collector = new StyleCollector('test-nonce-123');
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector} csp={{ nonce: 'test-nonce-123' }}>
          <Box width="100px">CSP Content</Box>
        </CustomProvider>
      );

      const styleElement = collector.getStyleElement();
      expect(styleElement).toContain('nonce="test-nonce-123"');
    });

    it('Should generate consistent class names for same props', () => {
      const collector1 = new StyleCollector();
      StyleManager.setCollector(collector1);

      const html1 = renderToString(
        <CustomProvider styleCollector={collector1}>
          <Box width="200px" padding="20px">
            Box 1
          </Box>
        </CustomProvider>
      );

      const collector2 = new StyleCollector();
      StyleManager.setCollector(collector2);

      const html2 = renderToString(
        <CustomProvider styleCollector={collector2}>
          <Box width="200px" padding="20px">
            Box 2
          </Box>
        </CustomProvider>
      );

      // Extract class names from both renders
      const classMatch1 = html1.match(/class="([^"]*rs-box-[^"]*)/);
      const classMatch2 = html2.match(/class="([^"]*rs-box-[^"]*)/);

      expect(classMatch1).not.toBeNull();
      expect(classMatch2).not.toBeNull();

      // Same props Should generate same class name
      expect(classMatch1![1]).toBe(classMatch2![1]);
    });

    it('Should generate different class names for different props', () => {
      const collector1 = new StyleCollector();
      StyleManager.setCollector(collector1);

      const html1 = renderToString(
        <CustomProvider styleCollector={collector1}>
          <Box width="200px">Box 1</Box>
        </CustomProvider>
      );

      const collector2 = new StyleCollector();
      StyleManager.setCollector(collector2);

      const html2 = renderToString(
        <CustomProvider styleCollector={collector2}>
          <Box width="300px">Box 2</Box>
        </CustomProvider>
      );

      // Extract class names from both renders
      const classMatch1 = html1.match(/class="([^"]*rs-box-[^"]*)/);
      const classMatch2 = html2.match(/class="([^"]*rs-box-[^"]*)/);

      expect(classMatch1).not.toBeNull();
      expect(classMatch2).not.toBeNull();

      // Different props Should generate different class names
      expect(classMatch1![1]).not.toBe(classMatch2![1]);
    });

    it('Should not collect styles when no box props are provided', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box>Plain Content</Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();
      // Should not contain box-specific styles
      expect(styleText).not.toContain('--rs-box-');
    });

    it('Should collect styles for multiple Box components', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      const html = renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="100px" padding="10px">
            Box 1
          </Box>
          <Box width="200px" margin="20px">
            Box 2
          </Box>
        </CustomProvider>
      );

      const styleText = collector.getStyleText();

      // Should contain styles for both boxes (using abbreviated names)
      expect(styleText).toContain('--rs-box-w: 100px');
      expect(styleText).toContain('--rs-box-p: 10px');
      expect(styleText).toContain('--rs-box-w: 200px');
      expect(styleText).toContain('--rs-box-m: 20px');

      // Should have two different class names in HTML
      const classMatches = html.match(/rs-box-[a-z0-9]+/g);
      expect(classMatches).not.toBeNull();
      // Filter unique class names
      const uniqueClasses = [...new Set(classMatches)];
      expect(uniqueClasses.length).toBeGreaterThanOrEqual(2);
    });

    it('Should generate valid style element HTML', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            Content
          </Box>
        </CustomProvider>
      );

      const styleElement = collector.getStyleElement();

      // Should be valid HTML
      expect(styleElement).toMatch(/<style[^>]*>[\s\S]*<\/style>/);
      // Should include data attribute
      expect(styleElement).toContain('data-rs-style-manager');
    });

    it('Should generate correct style HTML object for dangerouslySetInnerHTML', () => {
      const collector = new StyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px">Content</Box>
        </CustomProvider>
      );

      const styleHTML = collector.getStyleHTML();

      expect(styleHTML).toHaveProperty('__html');
      expect(styleHTML.__html).toContain('--rs-box-w: 200px');
    });
  });
});
