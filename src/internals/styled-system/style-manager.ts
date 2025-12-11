import type { StyleCollector } from './style-collector';

/**
 * StyleManager - A utility for managing CSS styles dynamically
 *
 * This manager creates and maintains a single style element in the document head
 * and provides methods to add, update, and remove CSS rules.
 * Supports CSP nonce for Content Security Policy compliance.
 *
 * For SSR: When a StyleCollector is set, styles are collected during server rendering
 * instead of being injected into the DOM.
 */

// Global style sheet manager
export const StyleManager = {
  styleElement: null as HTMLStyleElement | null,
  styleMap: new Map<string, string>(),
  nonce: undefined as string | undefined,
  collector: null as StyleCollector | null,

  /**
   * Initialize the style element if it doesn't exist
   * @param options - Optional configuration options
   * @param options.nonce - CSP nonce to apply to the style element
   * @returns The style element
   */
  init(options?: { nonce?: string }) {
    if (!this.styleElement && typeof document !== 'undefined') {
      // Check if SSR styles already exist in the DOM
      // If they do, don't create a new style element to avoid duplicates
      const existingSSRStyles = document.querySelector('[data-rs-style-manager]');
      if (existingSSRStyles) {
        // SSR styles exist, don't create a new element
        // Client-side dynamic styles are not needed when SSR styles are present
        return null;
      }

      this.styleElement = document.createElement('style');
      this.styleElement.setAttribute('data-rs-style-manager', '');

      // Apply CSP nonce if provided
      const nonce = options?.nonce || this.nonce;
      if (nonce) {
        this.styleElement.setAttribute('nonce', nonce);
        this.nonce = nonce; // Store for future use
      }

      document.head.appendChild(this.styleElement);
    }
    return this.styleElement;
  },

  /**
   * Set the CSP nonce for the style element
   * @param nonce - CSP nonce value
   */
  setNonce(nonce?: string): void {
    this.nonce = nonce;

    // Apply to existing style element if it exists
    if (this.styleElement && nonce) {
      this.styleElement.setAttribute('nonce', nonce);
    }
  },

  /**
   * Set the style collector for SSR
   * @param collector - StyleCollector instance or null to disable
   */
  setCollector(collector: StyleCollector | null): void {
    this.collector = collector;
  },

  /**
   * Add a CSS rule to the style sheet
   * @param selector - CSS selector
   * @param cssText - CSS properties and values
   * @param options - Optional configuration options
   * @param options.nonce - CSP nonce to apply to the style element
   */
  addRule(selector: string, cssText: string, options?: { nonce?: string }): void {
    // If collector is set (SSR mode), collect styles instead of injecting
    if (this.collector) {
      this.collector.addRule(selector, cssText);
      return;
    }

    // Client-side: inject into DOM
    this.init(options);
    if (!this.styleMap.has(selector) || this.styleMap.get(selector) !== cssText) {
      this.styleMap.set(selector, cssText);
      this.updateStyles();
    }
  },

  /**
   * Remove a CSS rule from the style sheet
   * @param selector - CSS selector to remove
   */
  removeRule(selector: string): void {
    // If collector is set (SSR mode), remove from collector
    if (this.collector) {
      this.collector.removeRule(selector);
      return;
    }

    // Client-side: remove from DOM
    if (this.styleMap.has(selector)) {
      this.styleMap.delete(selector);
      this.updateStyles();
    }
  },

  /**
   * Update the style element with all current rules
   */
  updateStyles(): void {
    if (!this.styleElement) return;

    let cssText = '';
    this.styleMap.forEach((rules, selector) => {
      cssText += `${selector} { ${rules} }\n`;
    });

    this.styleElement.textContent = cssText;
  },

  /**
   * Clear all rules from the style sheet
   */
  clearRules(): void {
    this.styleMap.clear();
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
  }
};

export default StyleManager;
