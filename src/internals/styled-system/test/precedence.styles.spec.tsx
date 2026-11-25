import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button from '@/Button';
import Box from '@/internals/Box';
import { StyleManager } from '../style-manager';
import '@/Button/styles/index.scss';

const appearances = ['default', 'primary', 'subtle', 'ghost', 'link'] as const;
const cases = ['light', 'dark', 'high-contrast'].flatMap(theme =>
  ['ltr', 'rtl'].flatMap(dir => appearances.map(appearance => ({ theme, dir, appearance })))
);
const style = {
  color: '#123456',
  background: '#234567',
  borderColor: '#345678',
  borderWidth: '3px',
  padding: '17px',
  fontSize: '19px',
  borderRadius: '7px'
};
const read = (element: Element) => {
  const computed = getComputedStyle(element);
  return Object.fromEntries(
    [
      'color',
      'backgroundColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'borderTopWidth',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'fontSize',
      'borderTopLeftRadius'
    ].map(key => [key, computed[key]])
  );
};

afterEach(() => {
  cleanup();
  expect(StyleManager.styleMap.size).toBe(0);
  expect(StyleManager.ruleSelectors.size).toBe(0);
});

describe('explicit style property precedence', () => {
  it.each(cases)(
    'matches native style in $theme/$dir/$appearance',
    ({ theme, dir, appearance }) => {
      const { getByTestId } = render(
        <div className={`rs-theme-${theme}`} dir={dir}>
          <Button
            data-testid="actual"
            appearance={appearance}
            size="lg"
            c={style.color}
            bg={style.background}
            bc={style.borderColor}
            bw={style.borderWidth}
            p={style.padding}
            fs={style.fontSize}
            rounded={style.borderRadius}
          >
            Styled
          </Button>
          <Button data-testid="reference" appearance={appearance} size="lg" style={style}>
            Native style
          </Button>
        </div>
      );

      expect(read(getByTestId('actual'))).toEqual(read(getByTestId('reference')));
      expect(getComputedStyle(getByTestId('actual')).color).toBe('rgb(18, 52, 86)');
    }
  );

  it('preserves native style and important declarations', () => {
    const { getByTestId } = render(
      <>
        <style>{'.priority-important { color: rgb(45, 67, 89) !important; }'}</style>
        <Button data-testid="inline" c="#123456" style={{ color: '#234567' }}>
          Inline
        </Button>
        <Button data-testid="important" c="#123456" className="priority-important">
          Important
        </Button>
        <Box data-testid="hidden" display="block" hideFrom="md" />
      </>
    );

    expect(getComputedStyle(getByTestId('inline')).color).toBe('rgb(35, 69, 103)');
    expect(getComputedStyle(getByTestId('important')).color).toBe('rgb(45, 67, 89)');
    expect(getComputedStyle(getByTestId('hidden')).display).toBe('none');
  });

  it('does not style an unrelated element with the generated class name as its ID', () => {
    const { getByTestId } = render(
      <>
        <style>{'.priority-id-control { color: rgb(45, 67, 89); }'}</style>
        <Box data-testid="actual" c="#123456" />
        <span data-testid="control" className="priority-id-control" />
      </>
    );
    const actual = getByTestId('actual');
    const control = getByTestId('control');
    control.id = Array.from(actual.classList).find(name => name.startsWith('rs-box-'))!;

    expect(actual.hasAttribute('id')).toBe(false);
    expect(getComputedStyle(actual).color).toBe('rgb(18, 52, 86)');
    expect(getComputedStyle(control).color).toBe('rgb(45, 67, 89)');
  });

  it.each(['dialog.[section]/', 'dialog.Ω🧪/'])(
    'supports a React identifier prefix in base and responsive rules (%s)',
    async identifierPrefix => {
      const container = document.createElement('div');
      document.body.append(container);
      const root = createRoot(container, { identifierPrefix });
      try {
        await act(async () => {
          root.render(<Box c="#123456" p={{ xs: '5px', md: '19px' }} />);
        });
        const element = container.firstElementChild!;
        expect(getComputedStyle(element).color).toBe('rgb(18, 52, 86)');
        expect(getComputedStyle(element).paddingTop).toBe('19px');
      } finally {
        await act(async () => root.unmount());
        container.remove();
      }
    }
  );

  it.each(['namespace', 'method'])('renders style props without CSS.escape (%s)', unavailable => {
    vi.stubGlobal('CSS', unavailable === 'namespace' ? undefined : { ...CSS, escape: undefined });
    try {
      const { getByTestId } = render(<Box data-testid="without-css-escape" c="#123456" />);
      expect(getComputedStyle(getByTestId('without-css-escape')).color).toBe('rgb(18, 52, 86)');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
