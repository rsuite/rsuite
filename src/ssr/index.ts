/**
 * RSuite SSR (Server-Side Rendering) utilities
 *
 * This module provides utilities for server-side rendering with RSuite components.
 * It simplifies the process of collecting and injecting styles during SSR.
 *
 * @example
 * ```tsx
 * import { createStyleCollector, extractStyles } from 'rsuite/ssr';
 *
 * const collector = createStyleCollector();
 * const html = renderToString(
 *   <CustomProvider styleCollector={collector}>
 *     <App />
 *   </CustomProvider>
 * );
 * const styles = extractStyles(collector);
 * ```
 */

import { StyleCollector } from '@/internals/styled-system/style-collector';
import { StyleManager } from '@/internals/styled-system/style-manager';

/**
 * Create a new style collector for SSR
 *
 * @param nonce - Optional CSP nonce for inline styles
 * @returns A style collector instance
 *
 * @example
 * ```tsx
 * const collector = createStyleCollector();
 * // or with CSP nonce
 * const collector = createStyleCollector('random-nonce-123');
 * ```
 */
export function createStyleCollector(nonce?: string): StyleCollector {
  return new StyleCollector(nonce);
}

/**
 * Extract styles from a collector as an HTML string
 *
 * @param collector - The style collector instance
 * @returns HTML string containing the style tag with collected styles
 *
 * @example
 * ```tsx
 * const styles = extractStyles(collector);
 * // Returns: '<style data-rs-style-manager>...</style>'
 * ```
 */
export function extractStyles(collector: StyleCollector): string {
  return collector.getStyleElement();
}

/**
 * Extract styles from a collector as plain CSS text (without style tag)
 *
 * @param collector - The style collector instance
 * @returns Plain CSS text
 *
 * @example
 * ```tsx
 * const cssText = extractStyleText(collector);
 * // Returns: '.rs-box-abc { width: 100px; }'
 * ```
 */
export function extractStyleText(collector: StyleCollector): string {
  return collector.getStyleText();
}

/**
 * Extract styles from a collector as an object suitable for dangerouslySetInnerHTML
 *
 * @param collector - The style collector instance
 * @returns Object with __html property
 *
 * @example
 * ```tsx
 * const styleHTML = extractStyleHTML(collector);
 * // Use in React: <style dangerouslySetInnerHTML={styleHTML} />
 * ```
 */
export function extractStyleHTML(collector: StyleCollector): { __html: string } {
  return collector.getStyleHTML();
}

/**
 * Render RSuite app with SSR and extract styles
 *
 * This is a convenience function that handles the entire SSR flow:
 * 1. Creates a style collector
 * 2. Renders your app with the collector
 * 3. Extracts the styles
 * 4. Returns both HTML and styles
 *
 * @param renderApp - Function that renders your app with the collector
 * @param options - Optional configuration
 * @returns Object containing app HTML and style HTML
 *
 * @example
 * ```tsx
 * import { renderToString } from 'react-dom/server';
 * import { renderWithStyles } from 'rsuite/ssr';
 *
 * const { html, styles } = renderWithStyles((collector) =>
 *   renderToString(
 *     <CustomProvider styleCollector={collector}>
 *       <App />
 *     </CustomProvider>
 *   )
 * );
 *
 * const fullHTML = `
 *   <!DOCTYPE html>
 *   <html>
 *     <head>${styles}</head>
 *     <body><div id="root">${html}</div></body>
 *   </html>
 * `;
 * ```
 */
export function renderWithStyles(
  renderApp: (collector: StyleCollector) => string,
  options?: {
    /**
     * CSP nonce for inline styles
     */
    nonce?: string;
  }
): {
  /**
   * Rendered app HTML
   */
  html: string;
  /**
   * Extracted styles as HTML string (includes <style> tag)
   */
  styles: string;
  /**
   * Extracted styles as plain CSS text (without <style> tag)
   */
  css: string;
  /**
   * The style collector instance (for advanced usage)
   */
  collector: StyleCollector;
} {
  const collector = createStyleCollector(options?.nonce);

  // Set collector to StyleManager for style collection
  // This ensures styles are collected even in test environments
  const previousCollector = StyleManager.collector;

  try {
    // Set collector before rendering
    StyleManager.setCollector(collector);

    // Render the app
    const html = renderApp(collector);

    // Extract styles
    const styles = extractStyles(collector);
    const css = extractStyleText(collector);

    return {
      html,
      styles,
      css,
      collector
    };
  } finally {
    // Restore previous collector
    StyleManager.setCollector(previousCollector);
  }
}

// Re-export StyleCollector type for advanced users
export type { StyleCollector };
