import React from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { commands, userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Bounce from '../Bounce';
import Slide from '../Slide';
import Modal from '../../Modal';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Modal/styles/index.scss';
import '../../Drawer/styles/index.scss';

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    setMotionPreference: (preference: 'reduce' | 'no-preference') => Promise<void>;
  }
}

const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

const setPreference = (preference: 'reduce' | 'no-preference') =>
  act(() => commands.setMotionPreference(preference));

const painted = () =>
  act(
    () =>
      new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      })
  );

describe.each([
  { name: 'Bounce', Component: Bounce },
  { name: 'Slide', Component: Slide }
])('$name native motion preference', ({ Component }) => {
  it('finishes active motion, stays still when restored, and animates the next direction', async () => {
    const entered = vi.fn();
    const exited = vi.fn();
    const preferenceChanged = vi.fn();
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    query.addEventListener('change', preferenceChanged);
    const props = { timeout: 60000, onEntered: entered, onExited: exited };
    const child = <div style={{ animationDuration: '60s', width: 120, height: 20 }} />;
    const { container, rerender } = render(
      <Component {...props} in transitionAppear>
        {child}
      </Component>
    );
    const node = container.firstElementChild as HTMLElement;
    try {
      expect(query.matches).toBe(false);
      expect(getComputedStyle(node).animationDuration).toBe('60s');
      expect(entered).not.toHaveBeenCalled();

      await setPreference('reduce');
      await waitFor(() => expect(entered).toHaveBeenCalledTimes(1));
      await painted();
      expect(getComputedStyle(node).animationDuration).toBe('0s');
      expect(node.getAnimations().some(animation => animation.playState === 'running')).toBe(false);

      await setPreference('no-preference');
      await painted();
      expect(getComputedStyle(node).animationDuration).toBe('0s');
      expect(entered).toHaveBeenCalledTimes(1);

      rerender(<Component {...props}>{child}</Component>);
      await painted();
      expect(getComputedStyle(node).animationDuration).toBe('60s');
      expect(node.getAnimations().some(animation => animation.playState === 'running')).toBe(true);
      expect(exited).not.toHaveBeenCalled();

      await setPreference('reduce');
      await waitFor(() => expect(exited).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(preferenceChanged).toHaveBeenCalledTimes(3));
      expect(preferenceChanged.mock.calls.every(([event]) => event.isTrusted)).toBe(true);
      expect(entered).toHaveBeenCalledTimes(1);
    } finally {
      query.removeEventListener('change', preferenceChanged);
    }
  });
});

describe.each([
  { name: 'Modal', Dialog: Modal },
  { name: 'Drawer', Dialog: Drawer }
])('$name reduced motion keyboard interaction', ({ name, Dialog }) => {
  it('opens, accepts native Tab and Escape, and restores focus without waiting for animation', async () => {
    await setPreference('reduce');
    const entered = vi.fn();
    const exited = vi.fn();
    const closed = vi.fn();
    const Fixture = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <Dialog
            open={open}
            animationTimeout={60000}
            style={{ animationDuration: '60s' }}
            onEntered={entered}
            onExited={exited}
            onClose={event => {
              closed(event);
              setOpen(false);
            }}
          >
            <input aria-label="Dialog field" />
          </Dialog>
        </>
      );
    };
    render(<Fixture />);
    const opener = screen.getByRole('button', { name: 'Open dialog' });
    await act(() => userEvent.click(opener));
    await waitFor(() => expect(entered).toHaveBeenCalledTimes(1));
    const dialog = screen.getByRole('dialog');
    expect(getComputedStyle(dialog).animationDuration).toBe('0s');
    expect(screen.getByTestId(`${name.toLowerCase()}-wrapper`)).to.have.focus;

    await userEvent.tab();
    expect(screen.getByRole('textbox', { name: 'Dialog field' })).to.have.focus;
    await act(() => userEvent.keyboard('{Escape}'));
    await waitFor(() => expect(exited).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(closed).toHaveBeenCalledTimes(1);
    const event = closed.mock.calls[0][0];
    expect((event.nativeEvent || event).isTrusted).toBe(true);
    expect(opener).to.have.focus;
  });
});
