import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { commands } from 'vitest/browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Button from '../Button';
import IconButton from '../../IconButton';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;
const appearances = ['default', 'primary', 'link', 'subtle', 'ghost'] as const;

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectMotion(host: ParentNode, reduced: boolean) {
  const button = host.querySelector<HTMLElement>('[data-loading="true"]')!;
  const spinner = button.querySelector<HTMLElement>(':scope > .rs-btn-spin')!;
  const rotor = getComputedStyle(spinner, '::after');

  expect(rotor.animationName).toBe(reduced ? 'none' : 'buttonSpin');
  expect(parseFloat(rotor.width)).toBeGreaterThan(0);
  expect(parseFloat(rotor.height)).toBeGreaterThan(0);
  expect(rotor.display).not.toBe('none');
  expect(rotor.content).not.toBe('none');
  expect(parseFloat(rotor.borderTopWidth)).toBeGreaterThan(0);
  expect(rotor.borderTopColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(button.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(button.getBoundingClientRect().height).toBeGreaterThan(0);
  expect(button).toHaveAccessibleName('Save changes');
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toHaveAttribute('aria-disabled', 'true');
}

describe('Button loading reduced motion', () => {
  const button = (reduceMotion?: boolean, appearance: (typeof appearances)[number] = 'default') => (
    <CustomProvider reduceMotion={reduceMotion}>
      <Button loading appearance={appearance}>
        Save changes
      </Button>
    </CustomProvider>
  );

  for (const preference of preferences) {
    describe.each(appearances)(`appearance %s with system ${preference}`, appearance => {
      it.each(policies)('honors provider %s and preserves loading feedback', async policy => {
        await commands.setMotionPreference(preference);
        const { container } = render(button(policy, appearance));
        expectMotion(container, policy ?? preference === 'reduce');
      });
    });

    it.each(policies)(
      `honors provider %s in server markup with system ${preference}`,
      async policy => {
        await commands.setMotionPreference(preference);
        const host = document.createElement('div');
        host.innerHTML = renderToString(button(policy));
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
    const { container } = render(button());
    expectMotion(container, false);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(container, true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(container, false);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { container, rerender } = render(button(false));
    expectMotion(container, false);
    rerender(button(true));
    expectMotion(container, true);
    rerender(button(false));
    expectMotion(container, false);
    rerender(button());
    expectMotion(container, true);
  });

  it('follows the system preference without a provider', async () => {
    await commands.setMotionPreference('reduce');
    const { container } = render(<Button loading>Save changes</Button>);
    expectMotion(container, true);
  });

  it('preserves automatic loading, focus and activation blocking', async () => {
    let complete!: () => void;
    const task = new Promise<void>(resolve => (complete = resolve));
    const onClick = vi.fn(() => task);
    const { container, getByRole } = render(
      <CustomProvider reduceMotion>
        <Button autoLoading onClick={onClick}>
          Save changes
        </Button>
      </CustomProvider>
    );
    const control = getByRole('button');
    control.focus();
    fireEvent.click(control);
    expectMotion(container, true);
    expect(control).toHaveFocus();
    fireEvent.click(control);
    expect(onClick).toHaveBeenCalledTimes(1);
    await act(async () => complete());
    expect(container.querySelector('.rs-btn-spin')).toBeNull();
    expect(control).not.toHaveAttribute('aria-busy');
    expect(control).not.toHaveAttribute('aria-disabled');
    expect(control).toHaveFocus();
  });

  it('applies the preference to an IconButton loading indicator', () => {
    const { container } = render(
      <CustomProvider reduceMotion>
        <IconButton loading aria-label="Save changes" />
      </CustomProvider>
    );
    expectMotion(container, true);
  });

  it('keeps controlled loading transitions intact', () => {
    const view = (loading: boolean) => (
      <CustomProvider reduceMotion>
        <Button loading={loading}>Save changes</Button>
      </CustomProvider>
    );
    const { container, rerender, getByRole } = render(view(false));
    expect(container.querySelector('.rs-btn-spin')).toBeNull();
    rerender(view(true));
    expectMotion(container, true);
    rerender(view(false));
    expect(container.querySelector('.rs-btn-spin')).toBeNull();
    expect(getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('preserves loading semantics on an anchor', () => {
    const { container, getByRole } = render(
      <CustomProvider reduceMotion>
        <Button loading href="#save">
          Save changes
        </Button>
      </CustomProvider>
    );
    expectMotion(container, true);
    expect(getByRole('link')).toHaveAttribute('href', '#save');
  });

  it('keeps the provider in control of its loading animation', () => {
    const { container } = render(
      <CustomProvider reduceMotion>
        <Button loading data-rs-motion="allow">
          Save changes
        </Button>
      </CustomProvider>
    );
    expectMotion(container, true);
  });

  it('uses the nearest provider for each button', () => {
    const { container } = render(
      <CustomProvider reduceMotion>
        <div data-testid="outer">
          <Button loading>Save changes</Button>
        </div>
        <CustomProvider reduceMotion={false}>
          <div data-testid="inner">
            <Button loading>Save changes</Button>
          </div>
        </CustomProvider>
      </CustomProvider>
    );
    expectMotion(container.querySelector('[data-testid="outer"]')!, true);
    expectMotion(container.querySelector('[data-testid="inner"]')!, false);
  });
});
