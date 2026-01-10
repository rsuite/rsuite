/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import Box from '../Box';
import CustomProvider from '@/CustomProvider';

/**
 * Integration tests for Box SSR rendering
 * These tests verify the complete HTML output including both DOM elements and style tags
 * They simulate real SSR scenarios where CustomProvider automatically collects styles
 */
describe('Box SSR Integration', () => {
  describe('Complete HTML output', () => {
    it('Should render complete HTML with style tag for Box with width and padding', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box width="200px" padding="20px">
            Test Content
          </Box>
        </CustomProvider>
      );

      console.log(html);

      // Verify DOM element
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Test Content');
      expect(html).toContain('rs-box-');

      // Verify style tag exists
      expect(html).toContain('<style');
      expect(html).toContain('data-rs-style-manager');
      expect(html).toContain('</style>');

      // Verify CSS variables
      expect(html).toContain('--rs-box-w: 200px');
      expect(html).toContain('--rs-box-p: 20px');

      // Verify CSS properties
      expect(html).toContain('width: var(--rs-box-w)');
      expect(html).toContain('padding: var(--rs-box-p)');
    });

    it('Should render complete HTML with responsive styles and media queries', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box width={{ xs: '100%', md: '50%', lg: '300px' }} padding="10px">
            Responsive Box
          </Box>
        </CustomProvider>
      );

      // Verify DOM element
      expect(html).toContain('data-rs="box"');
      expect(html).toContain('Responsive Box');

      // Get complete HTML
      const completeHTML = html;

      // Verify base styles (xs)
      expect(completeHTML).toContain('--rs-box-w: 100%');
      expect(completeHTML).toContain('--rs-box-p: 10px');

      // Verify media queries
      expect(completeHTML).toContain('@media (min-width: 768px)');
      expect(completeHTML).toContain('--rs-box-w: 50%');
      expect(completeHTML).toContain('@media (min-width: 992px)');
      expect(completeHTML).toContain('--rs-box-w: 300px');
    });

    it('Should render complete HTML with CSP nonce', () => {
      const nonce = 'test-nonce-abc123';

      const html = renderToString(
        <CustomProvider forceSSR csp={{ nonce }}>
          <Box width="150px" margin="15px">
            Secure Content
          </Box>
        </CustomProvider>
      );

      // Get complete HTML
      const completeHTML = html;

      // Verify nonce in style tag
      expect(completeHTML).toContain(`nonce="${nonce}"`);
      expect(completeHTML).toContain('<style');
      expect(completeHTML).toContain('data-rs-style-manager');

      // Verify styles
      expect(completeHTML).toContain('--rs-box-w: 150px');
      expect(completeHTML).toContain('--rs-box-m: 15px');
    });

    it('Should render complete HTML with multiple Box components', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <div>
            <Box width="100px" padding="10px">
              Box 1
            </Box>
            <Box width="200px" margin="20px">
              Box 2
            </Box>
            <Box height="150px" backgroundColor="red">
              Box 3
            </Box>
          </div>
        </CustomProvider>
      );

      // Get complete HTML
      const completeHTML = html;

      // Verify all boxes in DOM
      expect(html).toContain('Box 1');
      expect(html).toContain('Box 2');
      expect(html).toContain('Box 3');

      // Verify all styles collected
      expect(completeHTML).toContain('--rs-box-w: 100px');
      expect(completeHTML).toContain('--rs-box-p: 10px');
      expect(completeHTML).toContain('--rs-box-w: 200px');
      expect(completeHTML).toContain('--rs-box-m: 20px');
      expect(completeHTML).toContain('--rs-box-h: 150px');
      expect(completeHTML).toContain('--rs-box-bgc: var(--rs-color-red)');

      // Verify multiple class names
      const classMatches = html.match(/rs-box-[a-z0-9]+/g);
      expect(classMatches).not.toBeNull();
      const uniqueClasses = [...new Set(classMatches)];
      expect(uniqueClasses.length).toBeGreaterThanOrEqual(3);
    });

    it('Should render complete HTML without styles when no box props provided', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box>Plain Content</Box>
        </CustomProvider>
      );

      // Verify DOM element (no data-rs attribute)
      expect(html).not.toContain('data-rs="box"');
      expect(html).toContain('Plain Content');

      // Get complete HTML
      const completeHTML = html;

      // Style element should be empty or not contain box styles
      if (completeHTML) {
        expect(completeHTML).not.toContain('--rs-box-');
      }
    });

    it('Should render complete HTML with nested components', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box padding="20px" backgroundColor="lightgray">
            <Box width="100%" margin="10px">
              Nested Box 1
            </Box>
            <Box display="flex" gap="10px">
              <Box flex="1">Flex Item 1</Box>
              <Box flex="1">Flex Item 2</Box>
            </Box>
          </Box>
        </CustomProvider>
      );

      // Get complete HTML
      const completeHTML = html;

      // Verify nested content
      expect(html).toContain('Nested Box 1');
      expect(html).toContain('Flex Item 1');
      expect(html).toContain('Flex Item 2');

      // Verify all styles collected
      expect(completeHTML).toContain('--rs-box-p: 20px');
      expect(completeHTML).toContain('--rs-box-bgc: lightgray');
      expect(completeHTML).toContain('--rs-box-w: 100%');
      expect(completeHTML).toContain('--rs-box-m: 10px');
      expect(completeHTML).toContain('--rs-box-display: flex');
      expect(completeHTML).toContain('--rs-box-gap: 10px');
    });

    it('Should render complete HTML with showFrom and hideFrom props', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <div>
            <Box showFrom="md" padding="10px">
              Show from MD
            </Box>
            <Box hideFrom="lg" margin="15px">
              Hide from LG
            </Box>
          </div>
        </CustomProvider>
      );

      // Get complete HTML
      const completeHTML = html;

      // Verify DOM attributes
      expect(html).toContain('data-visible-from="md"');
      expect(html).toContain('data-hidden-from="lg"');

      // Verify styles
      expect(completeHTML).toContain('--rs-box-p: 10px');
      expect(completeHTML).toContain('--rs-box-m: 15px');
    });

    it('Should generate valid HTML structure', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box width="300px" padding="25px" margin="10px">
            Valid HTML Test
          </Box>
        </CustomProvider>
      );

      const completeHTML = html;

      // Verify HTML structure
      expect(completeHTML).toMatch(/<style[^>]*data-rs-style-manager[^>]*>/);
      expect(completeHTML).toMatch(/<\/style>/);
      expect(completeHTML).toMatch(/<div[^>]*class="[^"]*rs-box-[^"]*"[^>]*>/);

      // Verify no unclosed tags or malformed HTML
      const styleOpenCount = (completeHTML.match(/<style/g) || []).length;
      const styleCloseCount = (completeHTML.match(/<\/style>/g) || []).length;
      expect(styleOpenCount).toBe(styleCloseCount);

      const divOpenCount = (completeHTML.match(/<div/g) || []).length;
      const divCloseCount = (completeHTML.match(/<\/div>/g) || []).length;
      expect(divOpenCount).toBe(divCloseCount);
    });
  });

  describe('Style consistency', () => {
    it('Should generate identical HTML for identical props across renders', () => {
      const html1 = renderToString(
        <CustomProvider forceSSR>
          <Box width="200px" padding="20px">
            Content 1
          </Box>
        </CustomProvider>
      );

      const html2 = renderToString(
        <CustomProvider forceSSR>
          <Box width="200px" padding="20px">
            Content 2
          </Box>
        </CustomProvider>
      );

      // Extract class names
      const classMatch1 = html1.match(/class="([^"]*rs-box-[^"]*)"/);
      const classMatch2 = html2.match(/class="([^"]*rs-box-[^"]*)"/);

      expect(classMatch1).not.toBeNull();
      expect(classMatch2).not.toBeNull();

      // Same props should generate same class name
      expect(classMatch1![1]).toBe(classMatch2![1]);

      // Styles should be identical (except content text)
      // Extract styles from HTML
      const styleMatch1 = html1.match(/<style[^>]*>([^<]*)<\/style>/);
      const styleMatch2 = html2.match(/<style[^>]*>([^<]*)<\/style>/);
      expect(styleMatch1).not.toBeNull();
      expect(styleMatch2).not.toBeNull();
      expect(styleMatch1![1]).toBe(styleMatch2![1]);
    });

    it('Should generate different HTML for different props', () => {
      const html1 = renderToString(
        <CustomProvider forceSSR>
          <Box width="200px">Content</Box>
        </CustomProvider>
      );

      const html2 = renderToString(
        <CustomProvider forceSSR>
          <Box width="300px">Content</Box>
        </CustomProvider>
      );

      // Extract class names
      const classMatch1 = html1.match(/class="([^"]*rs-box-[^"]*)"/);
      const classMatch2 = html2.match(/class="([^"]*rs-box-[^"]*)"/);

      expect(classMatch1).not.toBeNull();
      expect(classMatch2).not.toBeNull();

      // Different props should generate different class names
      expect(classMatch1![1]).not.toBe(classMatch2![1]);

      // Styles should be different
      expect(html1).toContain('--rs-box-w: 200px');
      expect(html2).toContain('--rs-box-w: 300px');
    });
  });

  describe('Real-world scenarios', () => {
    it('Should render a complete page layout with Box components', () => {
      const html = renderToString(
        <CustomProvider forceSSR>
          <Box as="main" width="100%" maxWidth="1200px" margin="0 auto" padding="20px">
            <Box as="header" padding="20px" backgroundColor="blue" color="white">
              <Box as="h1" fontSize="24px" margin="0">
                Page Title
              </Box>
            </Box>
            <Box as="section" padding="20px" marginTop="20px">
              <Box display="flex" gap="20px">
                <Box flex="1" padding="15px" backgroundColor="lightgray">
                  Sidebar
                </Box>
                <Box flex="3" padding="15px">
                  Main Content
                </Box>
              </Box>
            </Box>
            <Box as="footer" padding="20px" marginTop="20px" textAlign="center">
              Footer
            </Box>
          </Box>
        </CustomProvider>
      );

      const completeHTML = html;

      // Verify structure
      expect(html).toContain('<main');
      expect(html).toContain('<header');
      expect(html).toContain('<h1');
      expect(html).toContain('<section');
      expect(html).toContain('<footer');

      // Verify content
      expect(html).toContain('Page Title');
      expect(html).toContain('Sidebar');
      expect(html).toContain('Main Content');
      expect(html).toContain('Footer');

      // Verify styles
      expect(completeHTML).toContain('--rs-box-w: 100%');
      expect(completeHTML).toContain('--rs-box-maxw: 1200px');
      expect(completeHTML).toContain('--rs-box-bgc: var(--rs-color-blue)');
      expect(completeHTML).toContain('--rs-box-c: white');
      expect(completeHTML).toContain('--rs-box-display: flex');
      expect(completeHTML).toContain('--rs-box-flex: 1');
      expect(completeHTML).toContain('--rs-box-flex: 3');
      expect(completeHTML).toContain('--rs-box-ta: center');
    });
  });
});
