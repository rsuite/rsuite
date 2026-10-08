import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { page } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Container from '@/Container';
import Text from '@/Text';
import Box from '@/internals/Box';
import { StyleManager } from '../style-manager';

const getStyle = (element: Element) => window.getComputedStyle(element);

describe('useStyled CSS rules', () => {
  beforeEach(async () => {
    StyleManager.clearRules();
    await page.viewport(1280, 800);
  });

  afterEach(async () => {
    cleanup();
    expect(StyleManager.styleMap.size).toBe(0);
    expect(StyleManager.ruleSelectors.size).toBe(0);
    StyleManager.clearRules();
    await page.viewport(1280, 800);
  });

  it('Should preserve responsive rules for different component types sharing a breakpoint', () => {
    const first = render(
      <Container data-testid="container" overflow={{ xs: 'visible', md: 'hidden' }} />
    );
    const container = first.getByTestId('container');
    expect(getStyle(container).overflow).toBe('hidden');

    const second = render(
      <Text data-testid="text" visibility={{ md: 'hidden' }}>
        Content
      </Text>
    );

    expect(getStyle(second.getByTestId('text')).visibility).toBe('hidden');
    expect(getStyle(container).overflow).toBe('hidden');
  });

  it('Should preserve an unchanged component when another component updates its styles', () => {
    const first = render(
      <Container data-testid="container" overflow={{ xs: 'visible', md: 'hidden' }} />
    );
    const second = render(
      <Text data-testid="text" visibility={{ md: 'hidden' }}>
        Content
      </Text>
    );
    const text = second.getByTestId('text');
    expect(getStyle(text).visibility).toBe('hidden');

    first.rerender(
      <Container data-testid="container" overflow={{ xs: 'visible', md: 'scroll' }} />
    );

    expect(getStyle(first.getByTestId('container')).overflow).toBe('scroll');
    expect(getStyle(text).visibility).toBe('hidden');

    first.rerender(<Container data-testid="container" overflow="clip" />);

    expect(getStyle(first.getByTestId('container')).overflow).toBe('clip');
    expect(getStyle(text).visibility).toBe('hidden');
  });

  it('Should preserve another component responsive styles when a component unmounts', () => {
    const first = render(<Container overflow={{ xs: 'visible', md: 'hidden' }} />);
    const second = render(
      <Text data-testid="text" visibility={{ md: 'hidden' }}>
        Content
      </Text>
    );
    const text = second.getByTestId('text');
    expect(getStyle(text).visibility).toBe('hidden');

    first.unmount();

    expect(getStyle(text).visibility).toBe('hidden');
  });

  it('Should preserve responsive styles when a nonresponsive component unmounts', () => {
    const first = render(<Container overflow="clip" />);
    const second = render(
      <Text data-testid="text" visibility={{ md: 'hidden' }}>
        Content
      </Text>
    );
    const text = second.getByTestId('text');
    expect(getStyle(text).visibility).toBe('hidden');

    first.unmount();

    expect(getStyle(text).visibility).toBe('hidden');
  });

  it('Should apply media styles after a newly mounted component base styles', () => {
    render(<Container overflow={{ xs: 'visible', md: 'hidden' }} />);
    const { getByTestId } = render(
      <Text data-testid="text" visibility={{ xs: 'visible', md: 'hidden' }} />
    );

    expect(getStyle(getByTestId('text')).visibility).toBe('hidden');
  });

  it('Should apply a responsive alias without an xs value', () => {
    const { getByTestId } = render(<Box data-testid="box" p={{ md: '20px' }} />);

    expect(getStyle(getByTestId('box')).paddingTop).toBe('20px');
  });

  it('Should apply a numeric zero xs value', () => {
    const { getByTestId } = render(<Box data-testid="box" z={{ xs: 0 }} />);

    expect(getStyle(getByTestId('box')).zIndex).toBe('0');
  });

  it('Should retain both xxl and 2xl rules at the same minimum width', async () => {
    await page.viewport(1600, 800);
    const { getByTestId } = render(
      <Box data-testid="box" overflow={{ xxl: 'hidden' }} visibility={{ '2xl': 'hidden' }} />
    );
    const box = getByTestId('box');

    expect(getStyle(box).overflow).toBe('hidden');
    expect(getStyle(box).visibility).toBe('hidden');
  });

  it('Should preserve styles through StrictMode effect setup and cleanup', () => {
    const { getByTestId } = render(
      <React.StrictMode>
        <Container data-testid="container" overflow={{ xs: 'visible', md: 'hidden' }} />
        <Text data-testid="text" p={{ md: '20px' }} />
      </React.StrictMode>
    );

    expect(getStyle(getByTestId('container')).overflow).toBe('hidden');
    expect(getStyle(getByTestId('text')).paddingTop).toBe('20px');
  });
});
