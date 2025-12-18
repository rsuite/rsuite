/**
 * StyleCollector - SSR style collection utility
 *
 * This class collects styles during server-side rendering and provides
 * methods to extract them as HTML for injection into the document.
 * It works in conjunction with StyleManager to ensure consistent
 * rendering between server and client.
 */

export class StyleCollector {
  private styles: Map<string, string> = new Map();
  private nonce?: string;

  constructor(nonce?: string) {
    this.nonce = nonce;
  }

  /**
   * Add a CSS rule to the collection
   * @param selector - CSS selector or media query
   * @param cssText - CSS properties and values
   */
  addRule(selector: string, cssText: string): void {
    if (!this.styles.has(selector) || this.styles.get(selector) !== cssText) {
      this.styles.set(selector, cssText);
    }
  }

  /**
   * Remove a CSS rule from the collection
   * @param selector - CSS selector to remove
   */
  removeRule(selector: string): void {
    this.styles.delete(selector);
  }

  /**
   * Check if a rule exists
   * @param selector - CSS selector to check
   */
  hasRule(selector: string): boolean {
    return this.styles.has(selector);
  }

  /**
   * Get all collected styles as a CSS string
   * @returns CSS text with all rules
   */
  getStyleText(): string {
    let cssText = '';
    this.styles.forEach((rules, selector) => {
      cssText += `${selector} { ${rules} }\n`;
    });
    return cssText;
  }

  /**
   * Get the style element HTML for SSR
   * @returns HTML string for the style element
   */
  getStyleElement(): string {
    const cssText = this.getStyleText();
    if (!cssText) return '';

    const nonceAttr = this.nonce ? ` nonce="${this.nonce}"` : '';
    return `<style data-rs-style-manager${nonceAttr}>${cssText}</style>`;
  }

  /**
   * Get styles as a React-compatible object for dangerouslySetInnerHTML
   * @returns Object with __html property
   */
  getStyleHTML(): { __html: string } {
    return { __html: this.getStyleText() };
  }

  /**
   * Clear all collected styles
   */
  clear(): void {
    this.styles.clear();
  }

  /**
   * Get the number of collected rules
   */
  get size(): number {
    return this.styles.size;
  }
}

export default StyleCollector;
