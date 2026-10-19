import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, render } from '@testing-library/react';
import { commands } from 'vitest/browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Placeholder from '../Placeholder';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;
const variants = [
  { name: 'Paragraph', Component: Placeholder.Paragraph, props: { graph: true, rows: 2 } },
  { name: 'Grid', Component: Placeholder.Grid, props: { rows: 2, columns: 2 } },
  { name: 'Graph', Component: Placeholder.Graph, props: {} }
];

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectMotion(host: ParentNode, animated: boolean) {
  const targets = host.querySelectorAll<HTMLElement>(
    '.rs-placeholder-graph, .rs-placeholder-paragraph-graph, .rs-placeholder-row'
  );
  expect(targets.length).toBeGreaterThan(0);
  targets.forEach(target => {
    const style = getComputedStyle(target);
    expect(style.animationName).toBe(animated ? 'placeholder-active' : 'none');
    expect(style.display).not.toBe('none');
    expect(target.getBoundingClientRect().height).toBeGreaterThan(0);
  });
}

describe.each(variants)('Placeholder.$name reduced motion', ({ Component, props }) => {
  const placeholder = (reduceMotion?: boolean, active = true) => (
    <CustomProvider reduceMotion={reduceMotion}>
      <Component {...props} active={active} />
    </CustomProvider>
  );

  for (const preference of preferences) {
    it.each(policies)(`honors provider %s with system ${preference}`, async policy => {
      await commands.setMotionPreference(preference);
      const { container } = render(placeholder(policy));
      expect(container.firstElementChild).toHaveAttribute('data-active', 'true');
      expectMotion(container, !(policy ?? preference === 'reduce'));
    });

    it.each(policies)(
      `honors provider %s in server markup with system ${preference}`,
      async policy => {
        await commands.setMotionPreference(preference);
        const host = document.createElement('div');
        host.innerHTML = renderToString(placeholder(policy));
        document.body.appendChild(host);
        try {
          expectMotion(host, !(policy ?? preference === 'reduce'));
        } finally {
          host.remove();
        }
      }
    );
  }

  it('responds to system preference changes', async () => {
    const { container } = render(placeholder());
    expectMotion(container, true);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(container, false);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(container, true);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { container, rerender } = render(placeholder(false));
    expectMotion(container, true);
    rerender(placeholder(true));
    expectMotion(container, false);
    rerender(placeholder(false));
    expectMotion(container, true);
    rerender(placeholder());
    expectMotion(container, false);
  });

  it('keeps inactive placeholders static regardless of the motion policy', () => {
    const { container, rerender } = render(placeholder(false, false));
    expectMotion(container, false);
    rerender(placeholder(true, false));
    expectMotion(container, false);
    rerender(placeholder(undefined, false));
    expectMotion(container, false);
  });
});
