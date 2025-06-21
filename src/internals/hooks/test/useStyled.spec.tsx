import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import useStyled from '../useStyled';
import StyleManager from '../../utils/style-sheet/style-manager';
import { CustomContext } from '@/internals/Provider/CustomContext';

// Mock StyleManager
vi.mock('../../utils/style-sheet/style-manager', () => ({
  default: {
    addRule: vi.fn(),
    removeRule: vi.fn()
  }
}));

describe('useStyled', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // Test component that uses the useStyled hook
  const TestComponent = ({
    cssVars = {},
    className,
    style,
    enabled = true,
    prefix = 'test'
  }: any) => {
    const styled = useStyled({
      cssVars,
      className,
      style,
      enabled,
      prefix
    });

    return (
      <div
        data-testid="styled-element"
        className={styled.className}
        style={styled.style}
        data-id={styled.id}
      >
        Test Component
      </div>
    );
  };

  it('should generate a unique class name', () => {
    const { getByTestId } = render(<TestComponent cssVars={{ '--test-var': 'value' }} />);
    const element = getByTestId('styled-element');

    expect(element.className).toMatch(/^test-/);
  });

  it('should combine with existing class name', () => {
    const { getByTestId } = render(
      <TestComponent className="existing-class" cssVars={{ '--test-var': 'value' }} />
    );
    const element = getByTestId('styled-element');

    expect(element.className).toContain('existing-class');
    expect(element.className).toMatch(/existing-class test-/);
  });

  it('should apply style prop', () => {
    const testStyle = { color: 'red' };
    const { getByTestId } = render(<TestComponent style={testStyle} />);
    const element = getByTestId('styled-element');

    expect(element.style.color).toBe('red');
  });

  it('should add CSS rules when cssVars are provided', () => {
    const cssVars = {
      '--rs-box-p': '10px',
      '--rs-box-m': '20px'
    };

    render(<TestComponent cssVars={cssVars} />);

    expect(StyleManager.addRule).toHaveBeenCalledTimes(2);

    const [selector, cssRules] = (StyleManager.addRule as any).mock.calls[0];
    expect(selector).toMatch(/^\.test-/);

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

    const { unmount } = render(<TestComponent cssVars={cssVars} />);
    unmount();

    expect(StyleManager.removeRule).toHaveBeenCalledTimes(2); // Once for main rule, once for reset rule
    expect((StyleManager.removeRule as any).mock.calls[0][0]).toMatch(/^\.test-/);
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
    expect(StyleManager.addRule).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
      nonce: cspNonce
    });
  });

  it('should handle CSS variable mapping correctly', () => {
    const cssVars = {
      '--rs-box-p': '10px',
      '--rs-box-w': '100px',
      '--rs-box-h': '50px',
      '--rs-box-c': 'red',
      '--rs-box-bg': 'blue',
      '--rs-box-rounded': '5px',
      '--rs-box-shadow': '0 2px 4px rgba(0,0,0,0.2)',
      '--rs-box-bd': '1px solid black'
    };

    render(<TestComponent cssVars={cssVars} />);

    const [, cssRules] = (StyleManager.addRule as any).mock.calls[0];

    expect(cssRules).toContain('padding: var(--rs-box-p)');
    expect(cssRules).toContain('width: var(--rs-box-w)');
    expect(cssRules).toContain('height: var(--rs-box-h)');
    expect(cssRules).toContain('color: var(--rs-box-c)');
    expect(cssRules).toContain('background: var(--rs-box-bg)');
    expect(cssRules).toContain('border-radius: var(--rs-box-rounded)');
    expect(cssRules).toContain('box-shadow: var(--rs-box-shadow)');
    expect(cssRules).toContain('border: var(--rs-box-bd)');
  });
});
