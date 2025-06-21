import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import StyleManager from '../style-manager';

describe('StyleManager', () => {
  let mockStyleElement: any;
  let mockHead: any;
  let originalDocumentCreateElement: any;
  let originalDocumentHead: any;

  beforeEach(() => {
    // Save original document methods
    originalDocumentCreateElement = document.createElement;
    originalDocumentHead = document.head;

    // Reset StyleManager state
    StyleManager.styleElement = null;
    StyleManager.styleMap.clear();
    StyleManager.nonce = undefined;

    // Mock style element
    mockStyleElement = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(),
      textContent: ''
    };

    // Mock document head
    mockHead = {
      appendChild: vi.fn()
    };

    // Mock document methods
    document.createElement = vi.fn().mockReturnValue(mockStyleElement) as any;
    Object.defineProperty(document, 'head', {
      configurable: true,
      get: () => mockHead
    });
  });

  afterEach(() => {
    // Restore original document methods
    document.createElement = originalDocumentCreateElement;
    Object.defineProperty(document, 'head', {
      configurable: true,
      get: () => originalDocumentHead
    });
    vi.clearAllMocks();
  });

  it('Should initialize style element when init is called', () => {
    const result = StyleManager.init();

    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(mockStyleElement.setAttribute).toHaveBeenCalledWith('data-rs-style-manager', '');
    expect(mockHead.appendChild).toHaveBeenCalledWith(mockStyleElement);
    expect(result).toBe(mockStyleElement);
    expect(StyleManager.styleElement).toBe(mockStyleElement);
  });

  it('Should apply nonce when provided', () => {
    const nonce = 'test-nonce';
    StyleManager.init({ nonce });

    expect(mockStyleElement.setAttribute).toHaveBeenCalledWith('nonce', nonce);
    expect(StyleManager.nonce).toBe(nonce);
  });

  it('Should set nonce and apply to existing style element', () => {
    // Initialize first
    StyleManager.init();

    // Then set nonce
    StyleManager.setNonce('new-nonce');

    expect(mockStyleElement.setAttribute).toHaveBeenCalledWith('nonce', 'new-nonce');
    expect(StyleManager.nonce).toBe('new-nonce');
  });

  it('Should add CSS rule to style sheet', () => {
    StyleManager.addRule('.test-selector', 'color: red;');

    expect(StyleManager.styleMap.has('.test-selector')).toBe(true);
    expect(StyleManager.styleMap.get('.test-selector')).toBe('color: red;');
    expect(mockStyleElement.textContent).toContain('.test-selector { color: red; }');
  });

  it('Should update existing CSS rule', () => {
    // Add initial rule
    StyleManager.addRule('.test-selector', 'color: red;');

    // Update rule
    StyleManager.addRule('.test-selector', 'color: blue;');

    expect(StyleManager.styleMap.get('.test-selector')).toBe('color: blue;');
    expect(mockStyleElement.textContent).toContain('.test-selector { color: blue; }');
    expect(mockStyleElement.textContent).not.toContain('color: red;');
  });

  it('Should not update if rule content is the same', () => {
    // Add initial rule
    StyleManager.addRule('.test-selector', 'color: red;');

    // Mock to track calls
    const updateStylesSpy = vi.spyOn(StyleManager, 'updateStyles');

    // Try to update with same content
    StyleManager.addRule('.test-selector', 'color: red;');

    expect(updateStylesSpy).not.toHaveBeenCalled();
  });

  it('Should remove CSS rule from style sheet', () => {
    // Add rule
    StyleManager.addRule('.test-selector', 'color: red;');

    // Remove rule
    StyleManager.removeRule('.test-selector');

    expect(StyleManager.styleMap.has('.test-selector')).toBe(false);
    expect(mockStyleElement.textContent).not.toContain('.test-selector');
  });

  it('Should clear all rules', () => {
    // Add multiple rules
    StyleManager.addRule('.selector1', 'color: red;');
    StyleManager.addRule('.selector2', 'color: blue;');

    // Clear rules
    StyleManager.clearRules();

    expect(StyleManager.styleMap.size).toBe(0);
    expect(mockStyleElement.textContent).toBe('');
  });

  it('Should handle multiple rules correctly', () => {
    StyleManager.addRule('.selector1', 'color: red;');
    StyleManager.addRule('.selector2', 'background: blue;');

    expect(StyleManager.styleMap.size).toBe(2);
    expect(mockStyleElement.textContent).toContain('.selector1 { color: red; }');
    expect(mockStyleElement.textContent).toContain('.selector2 { background: blue; }');
  });
});
