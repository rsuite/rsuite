import React, { StrictMode } from 'react';
import { cleanup, render } from '@testing-library/react';
import { page } from 'vitest/browser';
import { afterEach, beforeEach, expect, it } from 'vitest';
import Box from '@/Box';
import Button from '@/Button';
import CustomProvider from '@/CustomProvider';
import createStyleRegistry from '@/createStyleRegistry';
import StyleRegistry from '..';
import '@/Button/styles/index.scss';

const getStyle = (node: Element) => getComputedStyle(node);
const clientStyles = () =>
  Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-rs-style-registry-client]'));

beforeEach(async () => {
  expect(clientStyles()).toHaveLength(0);
  await page.viewport(1280, 800);
});

afterEach(async () => {
  cleanup();
  await Promise.resolve();
  expect(clientStyles()).toHaveLength(0);
  await page.viewport(1280, 800);
});

it('updates responsive styles and removes omitted properties without stale declarations', async () => {
  const registry = createStyleRegistry();
  const tree = (color?: string, padding?: { xs: string; md: string }) => (
    <StyleRegistry registry={registry}>
      <div style={{ color: '#010203' }}>
        <Box data-testid="box" c={color} p={padding} />
      </div>
    </StyleRegistry>
  );
  const view = render(tree('#123456', { xs: '5px', md: '19px' }));
  const box = view.getByTestId('box');
  expect(getStyle(box).color).toBe('rgb(18, 52, 86)');
  expect(getStyle(box).paddingTop).toBe('19px');
  await page.viewport(375, 800);
  expect(getStyle(box).paddingTop).toBe('5px');
  view.rerender(tree(undefined, { xs: '7px', md: '23px' }));
  expect(getStyle(box).color).toBe('rgb(1, 2, 3)');
  expect(getStyle(box).paddingTop).toBe('7px');
  await page.viewport(1280, 800);
  expect(getStyle(box).paddingTop).toBe('23px');
  view.rerender(tree());
  expect(getStyle(box).color).toBe('rgb(1, 2, 3)');
  expect(getStyle(box).paddingTop).toBe('0px');
});

it('keeps providers sharing one registry independent when a sibling unmounts', async () => {
  const registry = createStyleRegistry();
  const first = render(
    <StyleRegistry registry={registry}>
      <Box c="#123456" p={{ xs: '5px', md: '19px' }} />
    </StyleRegistry>
  );
  const second = render(
    <StyleRegistry registry={registry}>
      <Box data-testid="second" c="#654321" p={{ xs: '7px', md: '23px' }} />
    </StyleRegistry>
  );
  expect(clientStyles()).toHaveLength(2);
  first.unmount();
  await Promise.resolve();
  expect(clientStyles()).toHaveLength(1);
  const box = second.getByTestId('second');
  expect(getStyle(box).color).toBe('rgb(101, 67, 33)');
  expect(getStyle(box).paddingTop).toBe('23px');
  registry.flush();
  expect(registry.getStyleElement()).toBeNull();
  expect(getStyle(box).paddingTop).toBe('23px');
});

it('removes a nested registry while retaining its parent and a legacy sibling', async () => {
  const outer = createStyleRegistry();
  const inner = createStyleRegistry();
  const tree = (showInner: boolean) => (
    <>
      <StyleRegistry registry={outer}>
        <Box data-testid="outer" c="#123456" p="19px" />
        {showInner && (
          <StyleRegistry registry={inner}>
            <Box c="#654321" p="23px" />
          </StyleRegistry>
        )}
      </StyleRegistry>
      <Box data-testid="legacy" c="#aabbcc" p="29px" />
    </>
  );
  const view = render(tree(true));
  expect(clientStyles()).toHaveLength(2);
  view.rerender(tree(false));
  await Promise.resolve();
  expect(clientStyles()).toHaveLength(1);
  expect(getStyle(view.getByTestId('outer')).paddingTop).toBe('19px');
  expect(getStyle(view.getByTestId('outer')).color).toBe('rgb(18, 52, 86)');
  expect(getStyle(view.getByTestId('legacy')).paddingTop).toBe('29px');
  expect(getStyle(view.getByTestId('legacy')).color).toBe('rgb(170, 187, 204)');
});

it('moves an existing provider to another registry without losing its styles', async () => {
  const first = createStyleRegistry();
  const second = createStyleRegistry();
  const tree = (registry: ReturnType<typeof createStyleRegistry>, color: string) => (
    <StyleRegistry registry={registry}>
      <Box data-testid="box" c={color} p="19px" />
    </StyleRegistry>
  );
  const view = render(tree(first, '#123456'));
  const node = view.getByTestId('box');
  view.rerender(tree(second, '#654321'));
  await Promise.resolve();
  expect(view.getByTestId('box')).toBe(node);
  expect(clientStyles()).toHaveLength(1);
  expect(getStyle(node).color).toBe('rgb(101, 67, 33)');
  expect(getStyle(node).paddingTop).toBe('19px');
});

it('separates nonce groups and replaces the previous nonce when context changes', () => {
  const registry = createStyleRegistry();
  const tree = (nonce: string) => (
    <StyleRegistry registry={registry}>
      <CustomProvider csp={{ nonce }}>
        <Box data-testid="first" c="#123456" p="19px" />
      </CustomProvider>
      <CustomProvider csp={{ nonce: 'other-nonce' }}>
        <Box data-testid="second" c="#654321" p="23px" />
      </CustomProvider>
    </StyleRegistry>
  );
  const view = render(tree('first-nonce'));
  expect(
    clientStyles()
      .map(style => style.nonce)
      .sort()
  ).toEqual(['first-nonce', 'other-nonce']);
  view.rerender(tree('updated-nonce'));
  expect(
    clientStyles()
      .map(style => style.nonce)
      .sort()
  ).toEqual(['other-nonce', 'updated-nonce']);
  expect(getStyle(view.getByTestId('first')).paddingTop).toBe('19px');
  expect(getStyle(view.getByTestId('second')).paddingTop).toBe('23px');
});

it('restores child rules after StrictMode cleanup and a conditional remount', async () => {
  const registry = createStyleRegistry();
  const tree = (visible: boolean) => (
    <StrictMode>
      <StyleRegistry registry={registry}>
        {visible && <Box data-testid="box" c="#123456" p={{ xs: '5px', md: '19px' }} />}
      </StyleRegistry>
    </StrictMode>
  );
  const view = render(tree(true));
  await Promise.resolve();
  expect(getStyle(view.getByTestId('box')).paddingTop).toBe('19px');
  view.rerender(tree(false));
  await Promise.resolve();
  expect(clientStyles()).toHaveLength(0);
  view.rerender(tree(true));
  await Promise.resolve();
  expect(getStyle(view.getByTestId('box')).color).toBe('rgb(18, 52, 86)');
  expect(getStyle(view.getByTestId('box')).paddingTop).toBe('19px');
});

it.each(['primary', 'link', 'ghost'] as const)(
  'preserves system props and explicit inline priority on a disabled %s button',
  async appearance => {
    const registry = createStyleRegistry();
    const tree = (inline: boolean) => (
      <StyleRegistry registry={registry}>
        <Button
          appearance={appearance}
          disabled
          c="#123456"
          p={{ xs: '5px', md: '19px' }}
          style={inline ? { color: '#654321' } : undefined}
        >
          Content
        </Button>
      </StyleRegistry>
    );
    const view = render(tree(false));
    const button = view.getByRole('button');
    expect(getStyle(button).color).toBe('rgb(18, 52, 86)');
    expect(getStyle(button).paddingTop).toBe('19px');
    await page.viewport(375, 800);
    expect(getStyle(button).paddingTop).toBe('5px');
    view.rerender(tree(true));
    expect(button.style.color).toBe('rgb(101, 67, 33)');
    // Button color changes keep their native CSS transition.
    await expect.poll(() => getStyle(button).color).toBe('rgb(101, 67, 33)');
    button.style.setProperty('color', '#aabbcc', 'important');
    await expect.poll(() => getStyle(button).color).toBe('rgb(170, 187, 204)');
  }
);
