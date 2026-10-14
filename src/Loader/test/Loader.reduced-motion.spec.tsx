import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, render } from '@testing-library/react';
import { commands } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Loader from '../Loader';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;
const speeds = ['normal', 'fast', 'slow', 'paused'] as const;

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectMotion(host: ParentNode, reduced: boolean, paused = false) {
  const status = host.querySelector<HTMLElement>('[role="status"]')!;
  const spinner = status.querySelector<HTMLElement>('.rs-loader-spin')!;
  const rotor = getComputedStyle(spinner, '::after');

  expect(rotor.animationName).toBe(reduced ? 'none' : 'loaderSpin');
  if (!reduced) expect(rotor.animationPlayState).toBe(paused ? 'paused' : 'running');
  expect(spinner.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(spinner.getBoundingClientRect().height).toBeGreaterThan(0);
  expect(rotor.display).not.toBe('none');
  expect(rotor.content).not.toBe('none');
  expect(parseFloat(rotor.borderTopWidth)).toBeGreaterThan(0);
  expect(rotor.borderTopColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(status).toHaveTextContent('Loading results');
  const label = host.querySelector('.rs-loader-content')!;
  expect(status).toHaveAttribute('aria-labelledby', label.id);
}

describe('Loader reduced motion', () => {
  const loader = (reduceMotion?: boolean, speed: (typeof speeds)[number] = 'normal') => (
    <CustomProvider reduceMotion={reduceMotion}>
      <Loader content="Loading results" speed={speed} />
    </CustomProvider>
  );

  for (const preference of preferences) {
    describe.each(speeds)(`speed %s with system ${preference}`, speed => {
      it.each(policies)('honors provider %s and preserves loading feedback', async policy => {
        await commands.setMotionPreference(preference);
        const { container } = render(loader(policy, speed));
        expectMotion(container, policy ?? preference === 'reduce', speed === 'paused');
      });
    });

    it.each(policies)(
      `honors provider %s in server markup with system ${preference}`,
      async policy => {
        await commands.setMotionPreference(preference);
        const host = document.createElement('div');
        host.innerHTML = renderToString(loader(policy));
        document.body.appendChild(host);
        try {
          expectMotion(host, policy ?? preference === 'reduce');
        } finally {
          host.remove();
        }
      }
    );
  }

  it('responds to system preference changes', async () => {
    const { container } = render(loader());
    expectMotion(container, false);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(container, true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(container, false);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { container, rerender } = render(loader(false));
    expectMotion(container, false);
    rerender(loader(true));
    expectMotion(container, true);
    rerender(loader(false));
    expectMotion(container, false);
    rerender(loader());
    expectMotion(container, true);
  });

  it('keeps a paused loader paused when reduced motion is disabled', async () => {
    const { container, rerender } = render(loader(undefined, 'paused'));
    expectMotion(container, false, true);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(container, true, true);
    rerender(loader(false, 'paused'));
    expectMotion(container, false, true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(container, false, true);
  });

  it('uses the nearest provider without inheriting an outer animation rule', () => {
    const { container } = render(
      <CustomProvider reduceMotion>
        <Loader
          content={
            <CustomProvider reduceMotion={false}>
              <div data-testid="inner">
                <Loader content="Loading results" />
              </div>
            </CustomProvider>
          }
        />
      </CustomProvider>
    );
    expectMotion(container.querySelector('[data-testid="inner"]')!, false);
    const outer = container.querySelector('.rs-loader-spin')!;
    expect(getComputedStyle(outer, '::after').animationName).toBe('none');
  });

  it('follows the system preference without a provider', async () => {
    await commands.setMotionPreference('reduce');
    const { container } = render(<Loader content="Loading results" />);
    expectMotion(container, true);
  });
});
