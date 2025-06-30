import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StyleManager } from '../style-manager';
import { CustomContext } from '@/internals/Provider/CustomContext';
import useStyled from '../useStyled';

// Mock StyleManager
vi.mock('../style-manager', () => ({
  StyleManager: {
    addRule: vi.fn(),
    removeRule: vi.fn()
  }
}));

describe('useStyled', () => {
  // Test component using useStyled
  const TestComponent = ({
    cssVars = {},
    className = '',
    style = {},
    enabled = true
  }: {
    cssVars?: Record<string, string>;
    className?: string;
    style?: React.CSSProperties;
    enabled?: boolean;
  }) => {
    const { className: styledClassName, style: styledStyle } = useStyled({
      cssVars,
      className,
      style,
      enabled,
      prefix: 'box'
    });

    return <div data-testid="styled-element" className={styledClassName} style={styledStyle} />;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock implementation for addRule to return a class name
    vi.mocked(StyleManager.addRule).mockImplementation(selector => {
      // For class selectors, return the selector as the className (without the dot)
      if (typeof selector === 'string' && selector.startsWith('.')) {
        return selector.substring(1); // Remove the dot
      }
      return 'rs-box-mock-id';
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('should generate a unique class name', () => {
    const { getByTestId } = render(<TestComponent cssVars={{ '--rs-box-p': '10px' }} />);
    const element = getByTestId('styled-element');

    // The className should contain the component ID which starts with rs-box-
    expect(element.className).toMatch(/rs-box/);
  });

  it('should combine with existing class name', () => {
    const { getByTestId } = render(
      <TestComponent className="existing-class" cssVars={{ '--rs-box-p': '10px' }} />
    );
    const element = getByTestId('styled-element');

    expect(element.className).toContain('existing-class');
    // Check that both class names are present
    expect(element.className).toMatch(/existing-class.*rs-box/);
  });

  it('should apply style prop', () => {
    const testStyle = { color: 'red', fontSize: '16px' };
    const { getByTestId } = render(<TestComponent style={testStyle} />);
    const element = getByTestId('styled-element');

    expect(element.style.color).toBe('red');
    expect(element.style.fontSize).toBe('16px');
  });

  it('should add CSS rules when cssVars are provided', () => {
    const cssVars = {
      '--rs-box-p': '10px',
      '--rs-box-m': '20px'
    };

    render(<TestComponent cssVars={cssVars} />);

    expect(StyleManager.addRule).toHaveBeenCalled();

    const calls = vi.mocked(StyleManager.addRule).mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const [selector, cssRules] = calls[0];
    expect(selector).toMatch(/^\.rs-box-/);

    expect(cssRules).toContain('--rs-box-p: 10px');
    expect(cssRules).toContain('--rs-box-m: 20px');
    expect(cssRules).toContain('padding: var(--rs-box-p)');
    expect(cssRules).toContain('margin: var(--rs-box-m)');
  });

  it('should not add CSS rules when enabled is false', () => {
    const cssVars = { '--rs-box-p': '10px' };

    render(<TestComponent cssVars={cssVars} enabled={false} />);

    expect(StyleManager.addRule).not.toHaveBeenCalled();
  });

  it('should remove CSS rules on unmount', () => {
    const cssVars = { '--rs-box-p': '10px' };

    // Reset mock before this specific test
    vi.mocked(StyleManager.removeRule).mockReset();

    const { unmount } = render(<TestComponent cssVars={cssVars} />);
    unmount();

    // Verify removeRule was called at least once
    expect(StyleManager.removeRule).toHaveBeenCalled();
  });

  it('should pass CSP nonce to StyleManager', () => {
    const cssVars = { '--rs-box-p': '10px' };
    const cspNonce = 'test-nonce';

    // Render with CustomContext providing CSP nonce
    render(
      <CustomContext.Provider value={{ csp: { nonce: cspNonce } }}>
        <TestComponent cssVars={cssVars} />
      </CustomContext.Provider>
    );

    // Check if nonce was passed to StyleManager
    expect(StyleManager.addRule).toHaveBeenCalled();

    // Get the first call arguments
    const calls = vi.mocked(StyleManager.addRule).mock.calls;
    const options = calls[0][2];

    // Verify nonce was passed correctly
    expect(options).toBeDefined();
    expect(options?.nonce).toBe(cspNonce);
  });

  it('should handle CSS variable mapping correctly', () => {
    const cssVars = {
      '--rs-box-p': '10px',
      '--rs-box-m': '20px'
    };

    render(<TestComponent cssVars={cssVars} />);

    // Verify addRule was called
    expect(StyleManager.addRule).toHaveBeenCalled();

    // Get the CSS rules from the first call
    const calls = vi.mocked(StyleManager.addRule).mock.calls;
    const cssRules = calls[0][1];

    // Check that CSS variables are mapped to their CSS properties
    expect(cssRules).toContain('--rs-box-p: 10px');
    expect(cssRules).toContain('padding: var(--rs-box-p)');
    expect(cssRules).toContain('--rs-box-m: 20px');
    expect(cssRules).toContain('margin: var(--rs-box-m)');
  });
});
