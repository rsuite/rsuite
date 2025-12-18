import { describe, it, expect, beforeEach } from 'vitest';
import { StyleCollector } from '../style-collector';

describe('StyleCollector', () => {
  let collector: StyleCollector;

  beforeEach(() => {
    collector = new StyleCollector();
  });

  describe('constructor', () => {
    it('should create an empty collector', () => {
      expect(collector.size).toBe(0);
    });

    it('should accept nonce parameter', () => {
      const collectorWithNonce = new StyleCollector('test-nonce');
      collectorWithNonce.addRule('.test', 'color: red;');
      const html = collectorWithNonce.getStyleElement();
      expect(html).toContain('nonce="test-nonce"');
    });
  });

  describe('addRule', () => {
    it('should add a CSS rule', () => {
      collector.addRule('.test', 'color: red;');
      expect(collector.size).toBe(1);
      expect(collector.hasRule('.test')).toBe(true);
    });

    it('should update existing rule', () => {
      collector.addRule('.test', 'color: red;');
      collector.addRule('.test', 'color: blue;');
      expect(collector.size).toBe(1);
      expect(collector.getStyleText()).toContain('color: blue;');
    });

    it('should handle multiple rules', () => {
      collector.addRule('.test1', 'color: red;');
      collector.addRule('.test2', 'color: blue;');
      collector.addRule('.test3', 'color: green;');
      expect(collector.size).toBe(3);
    });

    it('should handle media queries', () => {
      collector.addRule('@media (min-width: 768px)', '.test { color: red; }');
      expect(collector.hasRule('@media (min-width: 768px)')).toBe(true);
    });
  });

  describe('removeRule', () => {
    it('should remove a CSS rule', () => {
      collector.addRule('.test', 'color: red;');
      collector.removeRule('.test');
      expect(collector.size).toBe(0);
      expect(collector.hasRule('.test')).toBe(false);
    });

    it('should not error when removing non-existent rule', () => {
      expect(() => collector.removeRule('.non-existent')).not.toThrow();
    });
  });

  describe('hasRule', () => {
    it('should return true for existing rule', () => {
      collector.addRule('.test', 'color: red;');
      expect(collector.hasRule('.test')).toBe(true);
    });

    it('should return false for non-existent rule', () => {
      expect(collector.hasRule('.test')).toBe(false);
    });
  });

  describe('getStyleText', () => {
    it('should return empty string for empty collector', () => {
      expect(collector.getStyleText()).toBe('');
    });

    it('should return CSS text for single rule', () => {
      collector.addRule('.test', 'color: red;');
      const css = collector.getStyleText();
      expect(css).toContain('.test { color: red; }');
    });

    it('should return CSS text for multiple rules', () => {
      collector.addRule('.test1', 'color: red;');
      collector.addRule('.test2', 'color: blue;');
      const css = collector.getStyleText();
      expect(css).toContain('.test1 { color: red; }');
      expect(css).toContain('.test2 { color: blue; }');
    });
  });

  describe('getStyleElement', () => {
    it('should return empty string for empty collector', () => {
      expect(collector.getStyleElement()).toBe('');
    });

    it('should return style element HTML', () => {
      collector.addRule('.test', 'color: red;');
      const html = collector.getStyleElement();
      expect(html).toContain('<style data-rs-style-manager>');
      expect(html).toContain('.test { color: red; }');
      expect(html).toContain('</style>');
    });

    it('should include nonce attribute when provided', () => {
      const collectorWithNonce = new StyleCollector('abc123');
      collectorWithNonce.addRule('.test', 'color: red;');
      const html = collectorWithNonce.getStyleElement();
      expect(html).toContain('nonce="abc123"');
    });
  });

  describe('getStyleHTML', () => {
    it('should return object with __html property', () => {
      collector.addRule('.test', 'color: red;');
      const result = collector.getStyleHTML();
      expect(result).toHaveProperty('__html');
      expect(result.__html).toContain('.test { color: red; }');
    });
  });

  describe('clear', () => {
    it('should remove all rules', () => {
      collector.addRule('.test1', 'color: red;');
      collector.addRule('.test2', 'color: blue;');
      collector.clear();
      expect(collector.size).toBe(0);
      expect(collector.getStyleText()).toBe('');
    });
  });

  describe('size', () => {
    it('should return correct count', () => {
      expect(collector.size).toBe(0);
      collector.addRule('.test1', 'color: red;');
      expect(collector.size).toBe(1);
      collector.addRule('.test2', 'color: blue;');
      expect(collector.size).toBe(2);
      collector.removeRule('.test1');
      expect(collector.size).toBe(1);
    });
  });

  describe('SSR scenario', () => {
    it('should collect styles from multiple components', () => {
      // Simulate multiple Box components rendering
      collector.addRule('.rs-box-r1', '--rs-box-width: 200px; width: var(--rs-box-width);');
      collector.addRule('.rs-box-r2', '--rs-box-height: 100px; height: var(--rs-box-height);');
      collector.addRule('@media (min-width: 768px)', '.rs-box-r1 { --rs-box-width: 300px; }');

      expect(collector.size).toBe(3);
      const css = collector.getStyleText();
      expect(css).toContain('rs-box-r1');
      expect(css).toContain('rs-box-r2');
      expect(css).toContain('@media (min-width: 768px)');
    });
  });
});
