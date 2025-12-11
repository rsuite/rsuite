/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import Box from '@/internals/Box/Box';
import CustomProvider from '@/CustomProvider';
import { StyleManager } from '@/internals/styled-system/style-manager';
import {
  createStyleCollector,
  extractStyles,
  extractStyleText,
  extractStyleHTML,
  renderWithStyles
} from '../index';

describe('SSR API', () => {
  describe('createStyleCollector', () => {
    it('Should create a style collector without nonce', () => {
      const collector = createStyleCollector();
      expect(collector).toBeDefined();
      expect(typeof collector.addRule).toBe('function');
      expect(typeof collector.getStyleElement).toBe('function');
    });

    it('Should create a style collector with nonce', () => {
      const nonce = 'test-nonce-123';
      const collector = createStyleCollector(nonce);
      expect(collector).toBeDefined();

      StyleManager.setCollector(collector);

      // Render with the collector
      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="100px">Test</Box>
        </CustomProvider>
      );

      const styles = collector.getStyleElement();
      StyleManager.setCollector(null);

      expect(styles).toContain(`nonce="${nonce}"`);
    });
  });

  describe('extractStyles', () => {
    it('Should extract styles as HTML string with style tag', () => {
      const collector = createStyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="200px" padding="20px">
            Content
          </Box>
        </CustomProvider>
      );

      const styles = extractStyles(collector);
      StyleManager.setCollector(null);

      expect(styles).toContain('<style');
      expect(styles).toContain('data-rs-style-manager');
      expect(styles).toContain('</style>');
      expect(styles).toContain('--rs-box-w: 200px');
      expect(styles).toContain('--rs-box-p: 20px');
    });
  });

  describe('extractStyleText', () => {
    it('Should extract styles as plain CSS text without style tag', () => {
      const collector = createStyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box width="150px">Content</Box>
        </CustomProvider>
      );

      const css = extractStyleText(collector);
      StyleManager.setCollector(null);

      expect(css).not.toContain('<style');
      expect(css).not.toContain('</style>');
      expect(css).toContain('--rs-box-w: 150px');
      expect(css).toContain('.rs-box-');
    });
  });

  describe('extractStyleHTML', () => {
    it('Should extract styles as dangerouslySetInnerHTML object', () => {
      const collector = createStyleCollector();
      StyleManager.setCollector(collector);

      renderToString(
        <CustomProvider styleCollector={collector}>
          <Box margin="10px">Content</Box>
        </CustomProvider>
      );

      const styleHTML = extractStyleHTML(collector);
      StyleManager.setCollector(null);

      expect(styleHTML).toHaveProperty('__html');
      expect(typeof styleHTML.__html).toBe('string');
      expect(styleHTML.__html).toContain('--rs-box-m: 10px');
    });
  });

  describe('renderWithStyles', () => {
    it('Should render app and extract styles in one step', () => {
      const { html, styles, css, collector } = renderWithStyles(collector =>
        renderToString(
          <CustomProvider styleCollector={collector}>
            <Box width="300px" padding="15px">
              Test Content
            </Box>
          </CustomProvider>
        )
      );

      // Verify HTML
      expect(html).toContain('Test Content');
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('rs-box-');

      // Verify styles (with style tag)
      expect(styles).toContain('<style');
      expect(styles).toContain('data-rs-style-manager');
      expect(styles).toContain('--rs-box-w: 300px');
      expect(styles).toContain('--rs-box-p: 15px');

      // Verify CSS (without style tag)
      expect(css).not.toContain('<style');
      expect(css).toContain('--rs-box-w: 300px');

      // Verify collector is returned
      expect(collector).toBeDefined();
    });

    it('Should support CSP nonce option', () => {
      const nonce = 'secure-nonce-456';

      const { styles } = renderWithStyles(
        collector =>
          renderToString(
            <CustomProvider styleCollector={collector} csp={{ nonce }}>
              <Box width="100px">Secure Content</Box>
            </CustomProvider>
          ),
        { nonce }
      );

      expect(styles).toContain(`nonce="${nonce}"`);
    });

    it('Should handle multiple Box components', () => {
      const { html, styles } = renderWithStyles(collector =>
        renderToString(
          <CustomProvider styleCollector={collector}>
            <div>
              <Box width="100px">Box 1</Box>
              <Box width="200px">Box 2</Box>
              <Box width="300px">Box 3</Box>
            </div>
          </CustomProvider>
        )
      );

      expect(html).toContain('Box 1');
      expect(html).toContain('Box 2');
      expect(html).toContain('Box 3');

      expect(styles).toContain('--rs-box-w: 100px');
      expect(styles).toContain('--rs-box-w: 200px');
      expect(styles).toContain('--rs-box-w: 300px');
    });

    it('Should handle responsive styles', () => {
      const { styles } = renderWithStyles(collector =>
        renderToString(
          <CustomProvider styleCollector={collector}>
            <Box width={{ xs: '100%', md: '50%', lg: '300px' }}>Responsive Box</Box>
          </CustomProvider>
        )
      );

      expect(styles).toContain('--rs-box-w: 100%');
      expect(styles).toContain('@media (min-width: 768px)');
      expect(styles).toContain('--rs-box-w: 50%');
      expect(styles).toContain('@media (min-width: 992px)');
      expect(styles).toContain('--rs-box-w: 300px');
    });
  });

  describe('Integration: Complete SSR workflow', () => {
    it('Should produce valid HTML structure for SSR', () => {
      const { html: appHtml, styles } = renderWithStyles(collector =>
        renderToString(
          <CustomProvider styleCollector={collector}>
            <Box as="main" width="100%" maxWidth="1200px" margin="0 auto">
              <Box as="header" padding="20px">
                <Box as="h1" fontSize="24px">
                  Page Title
                </Box>
              </Box>
              <Box as="section" padding="20px">
                Main Content
              </Box>
            </Box>
          </CustomProvider>
        )
      );

      // Build complete HTML
      const fullHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Test Page</title>
            ${styles}
          </head>
          <body>
            <div id="root">${appHtml}</div>
          </body>
        </html>
      `;

      // Verify structure
      expect(fullHTML).toContain('<!DOCTYPE html>');
      expect(fullHTML).toContain('<html>');
      expect(fullHTML).toContain('<head>');
      expect(fullHTML).toContain('<style');
      expect(fullHTML).toContain('data-rs-style-manager');
      expect(fullHTML).toContain('</style>');
      expect(fullHTML).toContain('</head>');
      expect(fullHTML).toContain('<body>');
      expect(fullHTML).toContain('<main');
      expect(fullHTML).toContain('Page Title');
      expect(fullHTML).toContain('Main Content');
      expect(fullHTML).toContain('</body>');
      expect(fullHTML).toContain('</html>');

      // Verify styles are in head before body content
      const styleIndex = fullHTML.indexOf('<style');
      const bodyIndex = fullHTML.indexOf('<body>');
      expect(styleIndex).toBeLessThan(bodyIndex);
    });
  });
});
