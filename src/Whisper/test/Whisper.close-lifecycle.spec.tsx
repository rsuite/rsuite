import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';
import '../../Tooltip/styles/index.scss';

async function closeCustomOverlay(afterEntered: boolean) {
  const ref = React.createRef<WhisperInstance>();
  const callbacks = {
    onEnter: vi.fn(),
    onEntering: vi.fn(),
    onEntered: vi.fn(),
    onExit: vi.fn(),
    onExiting: vi.fn(),
    onExited: vi.fn()
  };
  const trusted: boolean[] = [];
  let enteredAtClose = 0;
  const closeRequests = vi.fn();
  const CustomOverlay = React.forwardRef<
    HTMLDivElement,
    { style: React.CSSProperties; onClose?: () => void }
  >(({ style, onClose }, forwarded) => (
    <div style={style} ref={forwarded} data-testid="close-lifecycle-overlay">
      <button
        onClick={event => {
          trusted.push(event.nativeEvent.isTrusted);
          enteredAtClose = callbacks.onEntered.mock.calls.length;
          closeRequests();
          onClose?.();
        }}
      >
        Close overlay
      </button>
    </div>
  ));
  const view = render(
    <Whisper
      {...callbacks}
      ref={ref}
      trigger="click"
      speaker={(props, forwarded) => (
        <CustomOverlay
          style={{ left: props.left, top: props.top }}
          onClose={props.onClose}
          ref={forwarded}
        />
      )}
    >
      <button onClick={event => trusted.push(event.nativeEvent.isTrusted)}>Open overlay</button>
    </Whisper>
  );

  try {
    await act(() => userEvent.click(screen.getByRole('button', { name: 'Open overlay' })));
    expect(ref.current?.getState().open).toBe(true);
    expect(callbacks.onEnter).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntering).toHaveBeenCalledTimes(1);
    if (afterEntered) {
      await waitFor(() => expect(callbacks.onEntered).toHaveBeenCalledTimes(1));
    }

    await act(() => userEvent.click(screen.getByRole('button', { name: 'Close overlay' })));
    expect(trusted).toEqual([true, true]);
    expect(closeRequests).toHaveBeenCalledTimes(1);
    if (afterEntered) {
      expect(enteredAtClose).toBe(1);
    }
    expect(ref.current?.getState().open).toBe(false);
    await waitFor(() => expect(callbacks.onExited).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId('close-lifecycle-overlay')).toBeNull();
    expect(callbacks.onExit).toHaveBeenCalledTimes(1);
    expect(callbacks.onExiting).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntered).toHaveBeenCalledTimes(enteredAtClose);
    console.info(
      '[whisper-close-phase]',
      JSON.stringify({
        afterEntered,
        enteredAtClose,
        enteredAfterClose: callbacks.onEntered.mock.calls.length,
        onExit: callbacks.onExit.mock.calls.length,
        onExiting: callbacks.onExiting.mock.calls.length,
        onExited: callbacks.onExited.mock.calls.length,
        trusted,
        open: ref.current?.getState().open,
        overlayMounted: !!screen.queryByTestId('close-lifecycle-overlay')
      })
    );
  } finally {
    view.unmount();
  }
}

describe('Whisper close lifecycle', () => {
  it('forwards Tooltip transition callbacks in order after native clicks', async () => {
    const callbacks = {
      onEnter: vi.fn(),
      onEntering: vi.fn(),
      onEntered: vi.fn(),
      onExit: vi.fn(),
      onExiting: vi.fn(),
      onExited: vi.fn()
    };
    const trusted: boolean[] = [];
    const view = render(
      <Whisper {...callbacks} trigger="click" speaker={<Tooltip>Native tooltip</Tooltip>}>
        <button onClick={event => trusted.push(event.nativeEvent.isTrusted)}>Toggle tooltip</button>
      </Whisper>
    );

    try {
      const button = screen.getByRole('button', { name: 'Toggle tooltip' });
      await act(() => userEvent.click(button));
      await waitFor(() => expect(callbacks.onEntered).toHaveBeenCalledTimes(1));
      const tooltip = screen.getByRole('tooltip');
      expect(button).to.have.attribute('aria-describedby', tooltip.id);

      await act(() => userEvent.click(button));
      await waitFor(() => expect(callbacks.onExited).toHaveBeenCalledTimes(1));
      expect(trusted).toEqual([true, true]);
      expect(screen.queryByRole('tooltip')).toBeNull();
      expect(button).not.to.have.attribute('aria-describedby');

      const orderedCallbacks = Object.values(callbacks);
      for (const callback of orderedCallbacks) {
        expect(callback).toHaveBeenCalledExactlyOnceWith(tooltip);
      }
      const order = orderedCallbacks.map(callback => callback.mock.invocationCallOrder[0]);
      expect(order).toEqual([...order].sort((a, b) => a - b));
    } finally {
      view.unmount();
    }
  });

  it('closes without completing an obsolete entry after native clicks', async () => {
    await closeCustomOverlay(false);
  });

  it('closes a custom overlay after entry with native clicks', async () => {
    await closeCustomOverlay(true);
  });
});
